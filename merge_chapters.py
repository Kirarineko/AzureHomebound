import re
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

ROOT = Path(__file__).resolve().parent
DEFAULT_NOVEL = '心火长明'
OUT_DIR = ROOT / '导出'
CHAPTER_RE = re.compile(r'^(\d+)_(.+)\.md$')
TITLE_RE = re.compile(r'^#*\s*(?:第\s*[0-9零一二三四五六七八九十百千]+\s*[章回节]\s*)?')


def load_chapters(novel_dir):
    chapters = []
    for p in novel_dir.iterdir():
        if not p.is_file():
            continue
        m = CHAPTER_RE.match(p.name)
        if m:
            chapters.append((int(m.group(1)), m.group(2), p))
    chapters.sort(key=lambda x: x[0])
    return chapters


def strip_title(text, title):
    """去掉章节文件自带的标题行。

    兼容三种写法：'# 第一章 落地过猛'、'第0000章 落地过猛'、以及光秃秃的'落地过猛'。
    去掉井号后仍需与文件名里的标题一致才删这一行，避免误删正文首行。
    """
    lines = text.strip().splitlines()
    if lines and TITLE_RE.sub('', lines[0].strip()).strip() == title:
        lines = lines[1:]
    return '\n'.join(lines).strip()


def main():
    novel_name = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_NOVEL
    novel_dir = ROOT / novel_name
    if not novel_dir.is_dir():
        print(f'目录不存在: {novel_dir}')
        return 1

    chapters = load_chapters(novel_dir)
    if not chapters:
        print(f'{novel_name} 下没有找到章节文件')
        return 1

    blocks = [f'《{novel_name}》全本（共 {len(chapters)} 章）']
    for num, title, path in chapters:
        body = strip_title(path.read_text(encoding='utf-8'), title)
        blocks.append(f'第{num:04d}章 {title}\n\n{body}')

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_file = OUT_DIR / f'{novel_name}_全本.txt'
    content = '\n\n'.join(blocks) + '\n'
    out_file.write_text(content, encoding='utf-8')

    print(f'已合并 {len(chapters)} 章，共 {len(content)} 字符')
    print(f'输出: {out_file}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
