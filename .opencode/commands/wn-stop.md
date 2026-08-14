---
description: 搁置一个 whatsnext 任务(可逆), 记录搁置原因与重启条件并归档. 仅在用户明确要暂停 / 放弃任务时用
---

**前置(幂等)**: 用 skill 工具加载 `whatsnext` skill, 确保契约已在上下文. 若 skill 工具不可用, 直接 Read `.opencode/skills/whatsnext/SKILL.md`(全局安装时 `~/.config/opencode/skills/whatsnext/SKILL.md`). 已装载则直接进下一步.

Read `<基准>/references/stop.md`(项目安装时基准 = `.opencode/skills/whatsnext/`, 全局安装时 = `~/.config/opencode/skills/whatsnext/`), 严格按其步骤搁置任务. 该文件是权威规范, 以它为准. 用户指定的任务(若有): $ARGUMENTS

本命令专一, 只做搁置. 若参数意图不属于本动作, 不代跑, 只提示用户改用 `/wn`(智能分诊)或正确的 `/wn-*`.
