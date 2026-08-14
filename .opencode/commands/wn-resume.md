---
description: 继续 / 恢复 / 列出 whatsnext 任务. 新 session 无需历史对话即可复活任务, 也可重启已搁置任务
---

**前置(幂等)**: 用 skill 工具加载 `whatsnext` skill, 确保契约已在上下文. 若 skill 工具不可用, 直接 Read `.opencode/skills/whatsnext/SKILL.md`(全局安装时 `~/.config/opencode/skills/whatsnext/SKILL.md`). 已装载则直接进下一步.

Read `<基准>/references/resume.md`(项目安装时基准 = `.opencode/skills/whatsnext/`, 全局安装时 = `~/.config/opencode/skills/whatsnext/`), 严格按其步骤继续 / 恢复 / 列出任务. 该文件是权威规范, 以它为准. 用户指定的任务(若有): $ARGUMENTS

本命令专一, 只做继续 / 恢复 / 列出. 若参数意图不属于本动作, 不代跑, 只提示用户改用 `/wn`(智能分诊)或正确的 `/wn-*`.
