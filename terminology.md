# 专业术语

术语 | 说明
--- | ---
**macOS**        | Apple 自己的基于 UNIX 的操作系统，用于 Mac 电脑，是“让 Mac 成为 Mac 的操作系统”（"What makes a Mac a Mac"）。  
**Windows**      | Microsoft（微软）的专有操作系统，用在了很多各种各样的设备上（如果你不想头痛，保持在此系统）  
**Linux**        | 基于 Linux 内核，像 Unix 的开源操作系统家族，首个操作系统内核由 Linus Torvalds 发布于 1991 年 11 月 17 日。Linux 通常被打包进 Linux 发行版。注意，虽然 macOS 和 Linux 可能都是基于 UNIX 的，但它们有很大的不同。
**Distros（发行版）**      | 英文“Distros”是 Distributions 的缩写形式。Linux 发行版是 Linux 的分发方式。然而，当 macOS 具有发行版时，发行版就成了 macOS 安装程序和一些不是来自 Apple 的应用程序的混合。**请勿使用 macOS 发行版。**  
**Hackintosh**   | 将 macOS 安装到普通 PC 上的过程，注意，**Hackintosh 不是操作系统**，它也可以指代被经过修改而让 macOS 可以运行于其上的设备。例如：*I installed macOS on this Windows machine, therefore I have a Hackintosh. But I did NOT install "Hackintosh".（我在一台 Windows 设备上安装了 macOS，所以我进行了 macOS。但是我不是安装了“Hacintosh”。）*  
**Bootloader（引导加载程序）**   | 加载操作系统的一些软件，通常由操作系统开发者创建。从技术上讲，OpenCore 本身并不是引导加载程序（查看下方对引导管理器的解释）。Apple 的 Boot.efi 其实就是在 Hackintosh 或 Mac 中的引导加载程序。
**引导管理器** | 管理引导加载程序的一些软件——我们有很多：Clover、systemd-boot、OpenCore、rEFInd、rEFIt……这些通常被看作是为真正的引导加载程序准备操作系统的软件。
---
术语 | 说明
--- | ---
**OpenCore**   | 在进行 Hackintosh 时的一个新的热门话题，由 [Acidanthera 团队](https://github.com/acidanthera)基于安全要求创建，有更快的引导速度，比 Clover 更轻量化。设置好它，需要做很多的工作，但是也支持比 Clover 更多的原生功能（例如休眠、文件保险箱 2、引导热键……）。
**Clover**  | 认为 OpenCore 发布后对经典启动支持有问题的一个引导加载程序。本指南中不会包含此软件的使用。
**ACPI**  | 高级配置与能源接口（The Advanced Configuration and Power Interface，即 ACPI）为操作系统提供了一个可以发现并配置计算机硬件的开放基础，更多信息将会在此指南的剩下部分提到
**.AML** | ACPI 编译后的文件格式，你的 PC 将会执行它。`.DAT` 是另一个具有完全相同用途的扩展。
**.DSL** | ACPI 的源代码——这是你需要为你的电脑编辑并编译的文件。**不要**将这个文件格式与`.ASL`混在一起。
**Kexts（内核扩展）**   | 也称为  **K**ernel **Ext**ensions ，是 macOS 的驱动。它们用于执行不同的任务，例如用于达到不同目的的设备驱动（在 Hackintosh 中），例如修改操作系统、注入信息或执行任务。内核扩展不是优秀的 Hackintosh 的唯一部分，因为它们通常会被 ACPI 修改和修复。
**BIOS**  | 是固件用于在启动过程（上电启动）中进行硬件初始化，并为操作系统和软件提供运行时服务的基本的输入/输出系统。BIOS 固件已经预安装于一台个人电脑的主板上，是上电后首先运行的软件。（来源：维基百科）它是从上世纪 70 年代就被制造出来，且沿用至今的一部分典型软件。
**UEFI**  | The Unified Extensible Firmware Interface (UEFI) is a specification that defines a software interface between an operating system and platform firmware. UEFI replaces the legacy Basic Input/Output System (BIOS) firmware interface originally present in all IBM PC-compatible personal computers, with most UEFI firmware implementations providing support for legacy BIOS services. UEFI can support remote diagnostics and repair of computers, even with no operating system installed. (source: Wikipedia)
**UEFI Drivers** | Like any other OS, UEFI has drivers and they're loaded by Clover or OpenCore. They're also meant to load devices or perform other tasks, like loading Apple's HFS drives with HfsPlus.efi, patching macOS's `boot.efi` and so on. You may find them as `Clover Drivers` or `OpenCore Drivers`, they're all UEFI drivers. (Note: only use drivers that are meant for that specific boot manager. More info can be found on the [Clover Conversion page](https://github.com/dortania/OpenCore-Install-Guide/tree/master/clover-conversion)).
---
Term | Description
--- | ---
**EFI**   | It can denote two things: <br/>- Mac's firmware, which is the same as UEFI, but pretty modified for Macs only, so not so "Universal"<br/>- The partition on your hard drive that stores software read by the UEFI to load OSes (like the Windows bootloader) or UEFI Applications (like OpenCore), it's FAT32 formatted and has an ID type of EF00 (in hex). It can be named ESP or SYSTEM, and it's usually from 100MB to 400MB in size but the size doesn't reflect upon anything.
**MBR**   | Master Boot Record is a special type of boot sector at the very beginning of partitioned computer mass storage devices like fixed disks or removable drives intended for use with IBM PC-compatible systems and beyond. The concept of MBRs was publicly introduced in 1983 with PC DOS 2.0. The MBR holds the information on how the logical partitions, containing file systems, are organized on that medium. The MBR also contains executable code to function as a loader for the installed operating system—usually by passing control over to the loader's second stage, or in conjunction with each partition's volume boot record (VBR). This MBR code is usually referred to as a boot loader (source: Wikipedia). This format is used on BIOS/Legacy setups. The MBR format supports a maximum of 2TiB of size and a max of 4 Primary partitions.
**GPT**   | GUID Partition Table (GPT) is a standard for the layout of partition tables of a physical computer storage device, such as a hard disk drive or solid-state drive, using universally unique identifiers, which are also known as globally unique identifiers (GUIDs). Forming a part of the Unified Extensible Firmware Interface (UEFI) standard (Unified EFI Forum-proposed replacement for the PC BIOS), it is nevertheless also used for some BIOS systems, because of the limitations of master boot record (MBR) partition tables, which use 32 bits for logical block addressing (LBA) of traditional 512-byte disk sectors (source: Wikipedia). Usually, this is the disk format you want to use on a UEFI system.
