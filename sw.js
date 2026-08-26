/* ================================================================
 * Service Worker — 《青空归处：心火长明》阅读器 PWA
 *
 * 缓存策略：
 * - 应用外壳（index.html / manifest / 图标）：预缓存
 * - 页面导航：network-first，断网时回退到缓存的 index.html
 * - 章节正文（raw.githubusercontent.com 或本站 .md）：stale-while-revalidate
 *   ——先秒开缓存，后台顺带更新（作者改稿后下一次打开即是新版）
 * - GitHub API（章节发现）：network-first，断网回退缓存
 * - Google Fonts：cache-first（内容按 URL 版本化，不会过期）
 * - 其余（giscus、TTS API、非 GET）：不拦截，直接走网络
 *
 * 发布新版时：改 SW_VERSION，activate 阶段会清掉旧缓存。
 * ============================================================== */
const SW_VERSION = 'v1';
const SHELL_CACHE = 'xinhuo-shell-' + SW_VERSION;
const CONTENT_CACHE = 'xinhuo-content-' + SW_VERSION;

const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const API_HOSTS = ['api.github.com'];
const CHAPTER_HOSTS = ['raw.githubusercontent.com'];

function isChapterRequest(url){
  if(CHAPTER_HOSTS.includes(url.hostname)) return true;
  // 本站相对路径加载的章节 .md（GitHub API 不可用时的回退路径）
  return url.origin === location.origin && /\.md$/i.test(url.pathname);
}

function canCache(res){
  return res && (res.ok || res.type === 'opaque');
}

async function networkFirst(request, cacheName, fallbackUrl){
  const cache = await caches.open(cacheName);
  try{
    const res = await fetch(request);
    if(canCache(res)) cache.put(request, res.clone());
    return res;
  }catch(e){
    const hit = await cache.match(request) || (fallbackUrl && await cache.match(fallbackUrl));
    if(hit) return hit;
    throw e;
  }
}

async function staleWhileRevalidate(request, cacheName){
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const net = fetch(request).then(res=>{
    if(canCache(res)) cache.put(request, res.clone());
    return res;
  }).catch(()=>null);
  if(hit) return hit;
  const res = await net;
  if(res) return res;
  return new Response('离线且缓存中没有该内容', {status: 503, statusText: 'Offline'});
}

async function cacheFirst(request, cacheName){
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if(hit) return hit;
  const res = await fetch(request);
  if(canCache(res)) cache.put(request, res.clone());
  return res;
}

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(SHELL_CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', e=>{
  e.waitUntil((async()=>{
    const keep = [SHELL_CACHE, CONTENT_CACHE];
    for(const key of await caches.keys()){
      if(!keep.includes(key)) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e=>{
  const request = e.request;
  if(request.method !== 'GET') return;
  const url = new URL(request.url);
  if(url.protocol !== 'https:' && url.protocol !== 'http:') return;

  // 页面导航：网络优先，断网回退外壳
  if(request.mode === 'navigate'){
    e.respondWith(networkFirst(request, SHELL_CACHE, './index.html'));
    return;
  }
  // 章节正文：缓存优先 + 后台更新
  if(isChapterRequest(url)){
    e.respondWith(staleWhileRevalidate(request, CONTENT_CACHE));
    return;
  }
  // GitHub API（章节列表发现）：网络优先，断网回退
  if(API_HOSTS.includes(url.hostname)){
    e.respondWith(networkFirst(request, CONTENT_CACHE));
    return;
  }
  // 网络字体：缓存优先
  if(FONT_HOSTS.includes(url.hostname)){
    e.respondWith(cacheFirst(request, CONTENT_CACHE));
    return;
  }
  // 本站静态资源（图标等）：缓存优先
  if(url.origin === location.origin){
    e.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }
  // 其余（giscus、TTS API 等）：不拦截
});
