---
description: 初始化当前仓库的 whatsnext 计划区(幂等). 开第一个任务前铺地基, 不新建任务
---

**前置(幂等)**: 用 skill 工具加载 `whatsnext` skill, 确保契约已在上下文. 若 skill 工具不可用, 直接 Read `.opencode/skills/whatsnext/SKILL.md`(全局安装时 `~/.config/opencode/skills/whatsnext/SKILL.md`). 已装载则直接进下一步.

Read `<基准>/references/init.md`(项目安装时基准 = `.opencode/skills/whatsnext/`, 全局安装时 = `~/.config/opencode/skills/whatsnext/`), 严格按其步骤初始化本仓库的 whatsnext 计划区. 该文件是权威规范, 以它为准.

用户附加输入(若有): $ARGUMENTS

本命令专一, 只做初始化(铺地基, 不建任务). 若参数意图不属于本动作, 不代跑, 只提示用户改用 `/wn`(智能分诊)或正确的 `/wn-*`.
