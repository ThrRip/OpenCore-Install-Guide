---
home: true
heroImage: /dortania-logo-clear.png
heroText: Dortania 的 OpenCore 安装指南
actionText: 快速入门→
actionLink: prerequisites.md

meta:
- name: description
  content: 当前支持版本 0.6.5
---

# 什么是 OpenCore？此指南适合谁？

OpenCore 就是我们所说的“引导加载程序”——它是一些很复杂的，用于为 macOS 准备系统的程序——特别是为 macOS 注入新的数据，比如 SMBIOS、ACPI 表和内核扩展。OpenCore 和其他引导加载程序（例如 Clover）的不同在于，它是为了安全和质量设计的，允许我们使用很多能在真实的 Mac 上使用的安全功能，例如系统完整性保护和文件保险箱。如果想要更深入地了解，可以访问：[为什么 OpenCore 胜过 Clover 和其他引导加载程序](why-oc.md)。

本指南主要注重于以下两个方面：

* 在您的 X86 架构的 PC 上安装 macOS
* 告诉您怎样使您的黑苹果（Hackintosh）正常运行

就因为如此，你可能仍然需要查阅、学习，甚至使用百度和 Google，这并不是一个一键安装的软件包。

请记住，OpenCore 现在依然较新而且还在测试阶段。与此同时，可以逐渐证明它在很多——几乎所有方面都比 Clover 好，OpenCore 依然在经常更新，所以很多配置经常改变（例如新的选项取代了旧的选项）。

最后，遇到问题的人可以访问 [r/Hackintosh subreddit](https://www.reddit.com/r/hackintosh/) 和 [r/Hackintosh Discord](https://discord.gg/u8V7N5C) 以得到更多帮助。

**本指南由 [ThrRip](https://github.com/ThrRip) 翻译，由 [ilikemacOS](https://github.com/ilikemacOS)、[sumingyd](https://github.com/sumingyd) 进行部分翻译和校对 - 并非官方 OpenCore安装指南**
