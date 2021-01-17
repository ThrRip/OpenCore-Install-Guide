# 一般故障排除

* 支持的版本: 0.6.5

本节用于那些在引导 OpenCore、macOS 或在 macOS 中遇到问题的人。如果您对 macOS 启动过程中的确切位置感到困惑，阅读 [macOS 启动过程](../troubleshooting/boot.md) 页面，可以帮助你更好的理解出现的错误

**如果您的问题未涵盖，请阅读官方的 OpenCore 文档： [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf)**. 本文档将介绍有关 OpenCore 工作原理的更多详细信息，并包含有关所有受支持的quirks的更多详细信息。

## 目录

如果您不确定当前滞留在哪里，请参阅此处：[了解 macOS 启动过程](../troubleshooting/boot.md)

* [OpenCore 启动问题](./extended/opencore-issues.md)
  * 本节涉及引导实际的 USB 并访问 OpenCore 的选取器。选取器后任何内容，如引导 macOS，都应在下面看到
* [内核空间问题](./extended/kernel-issues.md)
  * 涵盖从 OpenCore 菜单中选择 macOS 的那一刻起，许多在早期启动过程中发生的一切，直到 Apple 图标和安装程序界面加载之前的位置
* [用户空间问题](./extended/userspace-issues.md)
  * 涵盖从加载 macOS 的界面到在驱动器上安装 macOS 的过程
* [安装后问题](./extended/post-issues.md)
  * 安装 macOS 并完全启动后覆盖问题
* [杂项问题](./extended/misc-issues.md)
  * 涵盖 macOS 安装后或其他操作的问题
