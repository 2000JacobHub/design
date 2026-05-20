---
name: ui-design-rules
description: Project-wide UI design constraints for this codebase — required image/icon sources (Iconify for icons, Picsum Photos for placeholders, Pexels for real photos, unDraw for illustrations), banned components (Shadcn/Material UI defaults without deep customization, emoji as functional icons, linear `ease-in-out` animations), banned copy (jargon/empty buzzwords, Lorem Ipsum placeholder text, passive voice and long sentences), and typography rules (every displayed number must use the mono font via the `tabular-nums` class, including SVG chart axis/labels). Use whenever generating or editing UI in this project, picking an icon/image/illustration source, choosing or styling a component, rendering numeric values, or writing user-facing Chinese/English copy.
---

# UI 设计规范

本项目下生成或修改任何 UI、挑选图像/图标资源、撰写界面文案时，必须满足以下约束。规则适用于所有页面、组件、原型与设计稿对齐的代码。

## 图片系统使用
- 图标：使用 Iconify 图标库（https://iconify.design）
- 占位图：使用 Picsum Photos（https://picsum.photos）
- 真实图片：使用 Pexels 搜索（https://www.pexels.com）
- 插画：使用 unDraw（https://undraw.co）

## 组件禁止
- Shadcn/Material UI 默认组件（必须深度定制）
- Emoji 作为功能图标
- 线性动画（ease-in-out）

## 文案禁止
- 高深的专业名词和无意义的空话
- Lorem Ipsum 占位文本
- 被动语态和长句

## 字体排版
- 所有展示出来的数字都必须使用等宽字体（JetBrains Mono）。本项目通过 `tabular-nums` 类（globals.css 已将其映射到 `--font-mono`）实现，给含数字的元素加上 `tabular-nums` 即可。
- 适用范围包括但不限于：KPI 数值、百分比、变化量（如「较昨日 +12」「↑ 0.42」这类中文+数字混排也要加）、时间/日期、排名、表格数字、图表的坐标轴刻度与数据标签、悬浮提示里的数值。
- SVG 内的 `<text>` 同样适用：直接给 `<text>` 加 `className="tabular-nums"`（类选择器对 SVG 文本生效）。
- 中文+数字混排时整段加 `tabular-nums` 即可——中文无等宽字形会自动回退到正文字体，只有数字走等宽，不影响中文显示。
