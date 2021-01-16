# OpenCore 快速入门

在我们开始制作一套 OpenCore 基层系统之前，我们需要先了解一些事情。

## 先决条件

1. <span style="color:red">_**[重要]**_ </span>时间和耐心。
   * 如果你有截止日期的限制或者重要的工作，不要开始做这件事。Hackintosh 不应该在你的主要工作环境的PC上被作为一项依赖。
2. <span style="color:red">_**[重要]**_ </span>**了解你的硬件**
   * 你的 CPU 名称和生产时期
   * 你的独立显卡
   * 你的存储设备（机械硬盘/固态硬盘，NVMe/AHCI/RAID/IDE 类型配置）
   * 如果你的笔记本电脑/台式电脑来自于一家设备制造商，你还需要了解它的型号
   * 你的**以太网芯片组**
   * 你的无线局域网/蓝牙芯片组
3. <span style="color:red">_**[重要]**_ </span>**对于命令行的基本知识，知道如何使用终端/命令行**
   * 这不仅仅只是[重要]，这是整个指南的基础。如果你不知道如何 `cd` 到一个目录或者删除一个文件，很抱歉，我们没办法帮助你。
4. <span style="color:red">_**[重要]**_ </span>有一台与在 _**兼容性**_ 部分看到的相似的设备。
   * [关于硬件限制的页面](macos-limits.md)
5. <span style="color:red">_**[重要]**_ </span>最少拥有：
   * 12GB USB，如果你打算使用 macOS 进行创建 USB
   * 4GB USB，如果你打算使用 Windows 或 Linux 进行创建USB
6. <span style="color:red">_**[重要]**_ </span> **以太网连接**（无 Wi-Fi 加密狗，USB 型以太网适配器需要 macOS 的支持才可以工作）你必须知道你的以太网网卡的型号
   * 你必须具有物理型以太网网卡或者一个兼容的 macOS 的以太网加密狗/适配器。如果你有一个 [兼容的无线网卡](https://dortania.github.io/Wireless-Buyers-Guide/)，还可以使用它。
     * 注意，大多数的无线网卡是不被 macOS 支持的
   * 如果你无法使用以太网，但是有一台 Android 手机，你可以将你的 Android 手机连接至 Wi-Fi 然后用 USB 和 [HoRNDIS](https://joshuawise.com/horndis#available_versions) 使你的 PC 连接至 Internet。
7. <span style="color:red">_**[重要]**_ </span>**合理的系统安装：**
   * 像这样：
     * macOS（一个较新的版本会更好）
     * Windows（Windows 10，版本 1703 或者更高版本）
     * Linux（纯净且正常运行，带有 Python 2.7 或更高版本）
   * 对于 Windows 和 Linux 用户，你正在使用的磁盘驱动器上要留有 **15GB** 空闲空间。在 Windows 中，你的系统盘 (C:) 必须最少留有 15GB 的空闲。
   * 对于 macOS 用户，系统盘上要留有 **30GB** 的空闲空间。
   * 本指南中的很多工具也依赖于[已安装的 Python](https://www.python.org/downloads/)
