# 安装过程

现在，您已完成 OpenCore 的设置，您终于能够启动，但是有一些主要的事情需要记住：

* 对于macOS启用最佳的 BIOS 设置 
* 阅读 [多引导指南](https://hackintosh-multiboot.gitbook.io/hackintosh-multiboot/) ，看一看 [Multiboot](https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap.html#prerequisites) 特定的 quirks
  * 主要和多个系统装在一个硬盘上的人相关
* 和 [一般故障处理](../troubleshooting/troubleshooting.md) 页面
* 阅读 [macOS 启动过程](../troubleshooting/boot.md)
  * 可以帮助第一次安装的人更好地理解他们可能被卡住的地方
* 还有极大的耐心

## 仔细检查您的工作

在启动之前，我们应关注的最后一件事是您的 EFI 是如何设置的：

好的 EFI          |  坏的 EFI
:-------------------------:|:-------------------------:
![](../images/installation/install-md/good-efi.png)  |  ![](../images/installation/install-md/bad-efi.png)
在 EFI 分区上找的到 EFI 文件夹 | 没有 EFI 文件夹
编译好的 ACPI 文件（.aml） | 未编译的 ACPI 文件（.dsl）
不包括 DSDT |* 包括 DSDT
已删除不必要的驱动程序（.efi） | 使用默认的驱动程序
已删除不必要的工具（.efi） | 保留默认工具
Kexts 文件夹中的所有文件都以 .kext 结束 | 包括源代码和文件夹
在 EFI/OC 下找的到config.plist | 既不重命名也不将 .plist 放置在正确的位置
仅使用所需的kexts| 下载了列出的每个kext

提醒一下， 配置检查网站是一个非常好用的在线工具：

* [**配置检查器**](https://opencore.slowgeek.com)

## 启动OpenCore USB

所以现在你终于准备好把u盘插入电脑并从它开机了。请记住，大多数笔记本电脑和一些台式机仍然会默认使用Windows的内部驱动器，您需要在BIOS启动选项中手动选择OpenCore。你需要检查用户手册或使用一点谷歌来找出什么Fn键访问BIOS和启动菜单(如。Esc、F2、F10或F12)

一旦你启动USB，你可能会看到以下启动选项:

1. Windows
2. macOS Base System (External) / Install macOS Catalina (External)
3. OpenShell.efi
4. Reset NVRAM

对我们来说， **选项 2.** 是我们想要的。根据安装程序的制作方式，如果在 Linux 或 Windows 中创建，它可以显示为**"macOS Base System (External)"** 如果在 macOS 中创建，则显示为 **"Install macOS Catalina (External)"**

## macOS 安装程序

所以，您终于启动了安装程序，完成了冗长的操作并进入安装程序!现在你已经走到这一步了，主要的事情要记住:

* 要安装macOS的驱动器必须同时具有 **GUID分区方案**和**APFS**
  * 机械硬盘（HDD）上的High Sierra 和所有的 Sierra 用户需要使用 macOS 日志(HFS+)
* 这个驱动器也 **必须** 拥有一个 200MB 的分区
  * 默认情况下，macOS将安装200MB的新格式化驱动器
  * 参见 [多引导指南](https://hackintosh-multiboot.gitbook.io/hackintosh-multiboot/) 获得有关Windows驱动器分区的更多信息

一旦开始安装，您将需要等待直到系统重新启动。您将再次想要引导到OpenCore，但不是选择您的USB安装程序/恢复-您将想要选择macOS安装程序在硬盘上继续安装。你应该得到一个苹果标志，几分钟后你应该在底部得到一个计时器，上面写着“还有x分钟”。这可能是喝点饮料或吃点零食的好时机，因为这需要一段时间。它可能会重启几次，但如果一切顺利，它最终会弹出“设置你的Mac屏幕”。

完成! 🎉
您需要浏览安装后页面来完成系统的设置。
