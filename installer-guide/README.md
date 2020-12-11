# 创建 USB

* 支持的版本：0.6.4

所需条件：

* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)，强烈推荐运行调试版本以获得显示更多信息
* 使用 [ProperTree](https://github.com/corpnewt/ProperTree) 编辑 .plist 文件（OpenCore Configurator是另一个工具，但是严重过期，而且 Mackie 的版本是已经确定有错误的。**请不惜一切代价地避免使用这些工具！**）。
* 如果你想使用 OpenCore 作为你的主要引导加载程序，你需要完全从你的系统中移除 Clover。保留基于 Clover 的 EFI 的一份备份。查看这里以知道哪些需要被清除：[从 Clover 转换](https://github.com/dortania/OpenCore-Install-Guide/tree/master/clover-conversion)

### 在线安装器 vs 离线安装器

离线安装器带有一个 macOS 的完整副本，然而在线安装器都是只有一个恢复模式镜像（约 500MB），它可以在启动时从 Apple 服务器下载 macOS。

* 离线
  * 只能在 macOS 中制作
  * Windows/Linux 没有装配完整安装器所需要的 APFS/HFS 驱动器
* 在线
  * 可以在 macOS/Linux/Windows 中制作
  * 需要一个通过在目标设备上的 macOS 支持的网络适配器工作的 Internet 连接

### 制作安装器

取决于你在使用哪个操作系统，查看适用于你的制作安装器详情部分：

* [macOS 用户](../installer-guide/mac-install.md)
  * 支持 OS X 10.4 到至今的版本
  * 支持经典和 UEFI 安装
* [Windows 用户](../installer-guide/winblows-install.md)
  * 支持 OS X 10.7 到至今的版本
  * 只支持在线安装
  * 支持经典和 UEFI 安装
* [Linux 用户（UEFI）](../installer-guide/linux-install.md)
  * 支持 OS X 10.7 到至今的版本
  * 只支持在线安装
  * 适用于支持 UEFI 引导的设备
