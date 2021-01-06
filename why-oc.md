# 为什么 OpenCore 胜过 Clover 和其他引导加载程序

* 支持的版本：0.6.4

这个部分简要地概述了为什么社区正在向 OpenCore 过渡，而且目的是为了消除一些在社区中的错误观念。如果你只是想安装 macOS，可以跳过此页面。

* [为什么 OpenCore 胜过 Clover 和其他引导加载程序](#为什么-opencore-胜过-clover-和其他引导加载程序)
  * OpenCore 的功能
  * 软件支持
  * 内核扩展注入
* [OpenCore 的缺点](#opencore-的缺点)
* [常见的错误观念](#常见的错误观念)
  * 因为 OpenCore 还处在测试阶段，所以它不稳定吗？
  * OpenCore 是否始终注入 SMBIOS 和 ACPI 数据到其他的操作系统内？
  * 使用 OpenCore 需要重新安装操作系统吗？
  * OpenCore 是否只支持限定版本的 macOS？

## OpenCore 的功能

* 更多的操作系统支持！
  * OpenCore 现在直接支持更多版本的 OS X 和 macOS，而且不用经历使用 Clover 和 Chameleon 时需要的痛苦 Hackintosh。
  * 这包括的操作系统里，包含很旧的 10.4 Tiger 而且甚至也包含最新的版本 11 Big Sur！
* 就大体而言，使用 OpenCore 的系统比使用 Clover 的引导速度更快，因为它不执行一些没有必要的修复
* 整体稳定性更好，因为补丁可以更精确：
  * [macOS 10.15.4 更新](https://www.reddit.com/r/hackintosh/comments/fo9bfv/macos_10154_update/)
  * AMD OSX 补丁不需要在每次小型的安全更新之后都进行更新
* 在很多情况下，整体安全性更好：
  * 不需要关闭系统完整性保护（SIP）
  * 内建的文件保险箱 2 支持
  * [保险库](https://dortania.github.io/OpenCore-Post-Install/universal/security.html#Vault)允许为避免不想要的自定义而创建 EFI 快照
  * 真正的安全启动支持
    * 来自 UEFI 的和来自 Apple 的变体都支持
* 启动转换助理和启动设备的选择都被读取启动磁盘设置的 NVRAM 变量支持，就像一台真实的 Mac。
* 通过 `boot.efi` 支持引导热键——在启动时按住 `Option` 或 `ESC` 以选择启动的设备，按住 `Cmd+R` 进入恢复模式或者 `Cmd+Opt+P+R` 以重置 NVRAM。

## 软件支持

有人想从其他引导加载程序转换到 OpenCore 的最大原因实际上是软件支持：

* 内核扩展不再为 Clover 测试：
  * 发现内核扩展的一个 Bug？很多开发者，包括 [Acidanthera](https://github.com/acidanthera) 组织（大部分你最喜欢的内核扩展的制作者）都不会提供支持，除非你使用的是 OpenCore
* 很多固件驱动器都被合并到了 OpenCore 中：
  * [APFS 支持](https://github.com/acidanthera/AppleSupportPkg)
  * [文件保险箱支持](https://github.com/acidanthera/AppleSupportPkg)
  * [固件补丁](https://github.com/acidanthera/AptioFixPkg)
* [AMD OSX 补丁](https://github.com/AMD-OSX/AMD_Vanilla/tree/opencore):
  * 拥有基于 AMD 的硬件？启动 macOS 所需的内核补丁不再支持 Clover——现在只支持 OpenCore。

## 内核扩展注入

为更好地理解 OpenCore 的内核扩展注入系统，我们需要先看一看 Clover 是怎样工作的：

1. 使用补丁将系统完整性保护开放
2. 使用布丁启用 XNU 的僵尸代码以进行内核扩展注入
3. 修复注入内核扩展需要的竞态条件
4. 注入内核扩展
5. 使用补丁还原系统完整性保护

Clover 的方式中需要注意的地方：

* 把 XNU 的僵尸代码看作是从 10.7 版本以来就未使用过的代码，但令人印象深刻的是 Apple 依然没有移除这些代码
  * 操作系统更新经常破坏这个补丁，例如最近的 10.14.4 和 10.15
* 关闭系统完整性保护然后尝试重新打开它，别以为还有什么需要说的
* 几乎被 macOS 11.0 Big Sur 破坏
* 支持早至 10.5 的所有 OS X

现在来看看 OpenCore 的方式：

1. 将现有的预链接的内核和内核扩展准备好注入
2. 在带有新内核扩展的情况下重建 EFI 源内部的缓存
3. 加入新的缓存

OpenCore 的方式中需要注意的地方：

* 与操作系统无关的预链接内核格式自10.6（v2）以来一直保持不变，支持很难被打破。
  * OpenCore 也支持预链接内核（v1，在 10.4 和 10.5 中被发现）、无缓存、Mac OS X Mach 内核扩展内存缓存（Mkext）和内核收集（KernelCollections），意味着它也适当地支持所有英特尔版本的 OS X 或 macOS
* 稳定性更好，因为所涉及的补丁要少得多

# OpenCore 的缺点

实际上大部分的 Clover 功能在 OpenCore 的一些类型的设置项中都被支持，然而当需要过渡到 OpenCore 时你应该着重关注 OpenCore 没有的功能是否会影响到你自己：

* 不支持引导基于 MBR 的操作系统
  * 解决方法是在 OpenCore 中链接加载 rEFInd 一次
* 不支持基于 UEFI 的虚拟 BIOS（VBIOS）补丁
  * 然而这可以在 macOS 中完成
* 不支持为典型的 GPU 自动加载设备属性
  * 例如：InjectIntel、InjectNvidia 和 InjectAti
  * 但是这可以手动完成：[GPU 补丁](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/)
* 不支持 IRQ 冲突修复
  * 可以使用 [SSDTTime](https://github.com/corpnewt/SSDTTime) 解决
* 不支持为较旧的 CPU 生成 P 和 C 状态
* 不支持针对目标 ACPI 桥（Target Bridge ACPI）的修复
* 不支持硬件 UUID 注入
* 不支持自动检测大部分 Linux 引导加载程序Does not support auto-detection for many Linux bootloader
  * 可以在 `BlessOverride` 中添加一个条目来解决
* 不支持 Clover 的很多 XCPM 布丁
  * 例如：Ivy Bridge XCPM 补丁
* 不支持隐藏特定驱动器
* 不支持在 OpenCore 菜单中更改设置
* 不修复 PCIRoot UID 值
* 不支持仅 macOS 的 ACPI 注入和修复

# 常见的错误观念

## OpenCore 还处在测试阶段，所以它不稳定吗

简短回答：不

详细回答：不

OpenCore 的版本号并不代表项目的质量。相反，这更像是一种看到项目的垫脚石的方式。Acidathera 仍然有很多他们想对这个项目所做的，包括整体的改进和更多的功能支持。

例如，OpenCore 会经过适当的安全审核，以确保它符合 UEFI 安全启动的要求，并且是唯一一个经过这些严格审查并获得此类支持的 Hackintosh 引导加载程序。

版本 0.6.1 最初设计为 OpenCore 的官方发行版，因为它适用于 UEFI/Apple 安全启动，并将是 OpenCore 作为公共工具发布的 1 周年纪念日。然而，由于 macOS Big Sur 的情况以及 OpenCore 为支持它而进行的预链接器重写，1.0.0 被决定再推迟一年。

当前的路线：

* 2019：Beta 版本
* 2020：安全启动
* 2021：优化

所以不要认为版本号是一项阻碍，相反，这是值得期待的。

## OpenCore 是否始终注入 SMBIOS 和 ACPI 数据到其他的操作系统内

在默认情况下，OpenCore 将会假定所有操作系统在 ACPI 和 SMBIOS 信息方面都应该得到同等对待。这种想法的原因主要由以下三部分组成：

* 这允许正确的多系统启动支持，比如 [启动转换助理（BootCamp）](https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp.html)
* 避免制作糟糕的 DSDT 并鼓励正确的 ACPI 规范
* 避免一些信息被注入多次的边缘情况，常见于 Clover
  * 例如：你要怎么在从 boot.efi 启动后处理 SMBIOS 和 ACPI 注入，然后又将它们移除？已经存储于在内存中的更改，尝试撤销是非常危险的。这也是 Clover 的方法不受欢迎的原因。

然而，OpenCore 中有设置项允许通过补丁设置 macOS 从哪里读取 SMBIOS 信息，以将 SMBIOS 注入为仅限 macOS 的形式。`CustomSMIOSGuid` 设置项和设置为 `Custom` 的 `CustomSMBIOSMode` 在未来可能会无法使用，所以我们只推荐在其他操作系统中出现某些软件损坏的情况下使用此选项。为了最好的稳定性，请关闭这些设置项。

## 使用 OpenCore 需要重新安装操作系统吗

如果你有一个“纯净”的安装则不需要——指操作系统是否以任何方式被篡改，例如在系统盘中安装第三方内核扩展或 Apple 不支持的其他修改。当您的系统被您或第三方实用程序（如 Hackintool）严重篡改时，我们建议重新安装以避免任何潜在问题。

对于 Clover 用户的特别注意事项：使用 OpenCore 安装时，请重置您的 NVRAM。许多 Clover 变量可能与 OpenCore 和 macOS 冲突。

* 注意：已经发现 Thinkpad 笔记本电脑在 OpenCore 中进行 NVRAM 重置后会变砖，在这些机器上我们推荐通过升级 BIOS 来重置 NVRAM。

## OpenCore 是否只支持限定版本的 macOS

从 OpenCore 0.6.2 开始，您可以启动所有 Intel 版本的 macOS，一直到 OS X 10.4！然而，正确的支持取决于您的硬件，所以请您自己验证：[硬件限制](macos-limits.md)

::: details macOS 安装相册

Acidanthera 测试了很多的版本，而且我也在我的老旧的 HP DC 7900（酷睿 2 四核 Q8300）上运行了很多版本的 OS X。这是我测试过的版本的相册：

>  译者注：上方的“我”并非指译者。

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.4-Tiger.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.5-Leopard.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.6-Snow-Loepard.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.7-Lion.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.8-MountainLion.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.9-Mavericks.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.10-Yosemite.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.12-Sierra.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.13-HighSierra.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.15-Catalina.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/11-Big-Sur.png)

:::

## OpenCore 是否支持较旧的硬件

从现在开始，只要操作系统本身支持，大多数英特尔的硬件都是受支持的。但是请参考[硬件限制页面](macos-limits.md)以获得更多关于哪些硬件在哪些版本的 OS X 和 macOS 的信息。

目前，英特尔的 Yonah 系列和更新的 CPU 都和 OpenCore 一起正确地测试了。

## OpenCore 是否支持 Windows/Linux 的引导

OpenCore的工作方式与任何其他引导加载程序相同，因此它以同样的方式尊重其他操作系统。对于任何操作系统的具有不规则路径或名称的引导加载程序，只需将其添加到 BlessOverride 部分即可。

## Hackintosh 的合法性

Hackintosh 所处的位置是一个法律灰色地带，这主要是因为虽然这不是非法的，但我们实际上违反了 EULA。这是不违法的原因：

* 我们将会从 [Apple 的服务器直接](https://github.com/corpnewt/gibMacOS/blob/master/gibMacOS.command#L84)下载 macOS
* 我们这样做是为了用于非营利组织的教学和个人使用
  * 打算将 Hackintosh 作为工作或者希望重新售卖它的人请参考 [Psystar 公司的情况](https://en.wikipedia.org/wiki/Psystar_Corporation)和 Apple 的当地法律

而 EULA 规定 macOS 只能安装在真正的 Mac 上，（[2B-i 部分](https://www.apple.com/legal/sla/docs/macOSCatalina.pdf)）或者在正版 Mac 上运行的虚拟机（[2B-iii 部分](https://www.apple.com/legal/sla/docs/macOSCatalina.pdf)），但是没有可执行的法律完全禁止这一点。然而，重新打包和自定义 macOS 安装器确实存在[违反《数字千年版权法》](https://en.wikipedia.org/wiki/Digital_Millennium_Copyright_Act)等问题。

* **注意**：我们不是官方的法律顾问，所以如果您有任何顾虑，请您自己做适当的评估，并与您的律师讨论。

## macOS 是否支持英伟达的 GPU

由于以 Nvidia 在较新版本的支持为中心的问题，很多用户出于某种原因得出的结论是，macOS 从未支持 Nvidia GPU，而且现在也不支持。然而，Apple 在其最新的操作系统中仍然维护和支持带有 Nvidia GPU 的 Mac，就像 2013 年的 MacBook Pro 机型上安装了 Kelper 核心的 GPU。

主要的问题与任何新的 Nvidia GPU 有关，因为 Apple 停止了为新的设备安装 Nvidia 的 GPU，因此他们从来没有得到 Apple 的官方操作系统支持。所以用户不得不以依赖 Nvidia 的第三方驱动程序为替代。由于 Apple 新推出的安全引导系统存在问题，他们无法再支持这些 WebDriver，因此 Nvidia 无法将其发布到新的平台上，将其限制在 macOS 10.13 High Sierra。

对于更多在操作系统上的支持的信息，查看此处：[GPU 卖家指南](https://dortania.github.io/GPU-Buyers-Guide/)
