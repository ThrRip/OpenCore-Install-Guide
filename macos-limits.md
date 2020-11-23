# 硬件限制

对于 macOS，你需要在涉足安装之前意识到有许多的硬件限制。这些限制直到 Apple 支持更多的硬件时才能解决，所以我们会被 Apple 或者由社区创建的补丁限制。

主要的需要检查的硬件部分有：

* [CPU](#cpu-支持)
* [GPU](#gpu-支持)
* [主板](#主板支持)
* [存储](#存储支持)
* [有线网络](#有线网络)
* [无线网络](#无线网络)
* [杂项](#杂项)

对于此话题的更多详细的指南，请查看这些：

* [GPU 买家指南](https://dortania.github.io/GPU-Buyers-Guide/)
  * 检查你的 GPU 是否支持、可以运行哪个版本的 macOS。
* [无线网卡买家指南](https://dortania.github.io/Wireless-Buyers-Guide/)
  * 检查你的无线网卡是否被支持。
* [Hackintosh 硬件避坑指南](https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/)
  * 关于哪些硬件不能购买和有关硬件的陷阱的综合指南。

## CPU 支持

对于 CPU 支持，我们有以下的分析：

* 32 位和 64 位 CPU 都被支持
  * 这是操作系统支持你的架构的需求，更多信息请查看下方的“CPU 要求”部分
* 英特尔桌面 CPU 都被支持
  * 在此指南中，从 Yonah 到 Comet Lake 都被支持。
* 英特尔高端桌面和服务器 CPU。
  * 在此指南中，从 Nehalem 到 Cascade Lake X 都被支持。
* 英特尔酷睿“i”系列和至强系列笔记本 CPU
  * 在此指南中，从 Arrendale 到 Ice Lake 都被支持。
  * 注意，凌动移动端、赛扬和奔腾 CPU 不被支持
* AMD 的 Bulldozer（第 15 代）桌面端、Jaguar（第 16 代）和 Ryzen（第 17 代）CPU
  * 笔记本 CPU **不被**支持
  * 注意，不是 macOS 的所有功能都支持 AMD，更多信息请查看下方

**更多深层的信息请查看这里：[Hackintosh 硬件避坑指南](https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/)**

::: details CPU 要求

架构要求

* 32 位 CPU 支持 10.4.1 到 10.6.8
  * 注意，10.7.x 需要 64 位用户空间，所以将 32 位 CPU 限制到了 10.6
* 64-bit CPU 支持 10.4.1 到当前最新版本

SEE 要求：

* 所有英特尔版本的 OS X/macOS 需要 SSE3
* 所有 64 位版本的 OS X/macOS 需要 SSSE3
  * 对于缺少 SSSE3 的 CPU（例如一些 64 位奔腾 CPU），推荐运行 32 位用户空间（`i386-user32`）
* macOS 10.12 和更高版本需要 SSE4
* macOS 10.14 和更高版本需要 SSE4.2
  * SSE4.1 CPU 支持 [telemetrap.kext](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/post-28447707)
  * 较新的 AMD 驱动也因为 Metal 支持而需要 SSE4.2。解决方案请查看这里：[MouSSE: SSE4.2 emulation](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/)

固件要求：

* OS X 10.4.1 到 10.4.7 需要 EFI32（例如 IA32（32 位版本）的 OpenCore)
  * OS X 10.4.8 到 10.7.5 支持 EFI32 和 EFI64
* OS X 10.8 和更高版本需要 EFI64（例如 x64（64 位版本）的 OpenCore)
* OS X 10.7 到 10.9 需要 PartitionDxe.efi 以启动恢复（Recovery）分区

内核要求：

* OS X 10.4 和 10.5 需要 32 位的内核扩展，因为只支持 32 位内核空间
  * OS X 10.6 和 10.7 支持 32 位和 64 位的内核空间
* OS X 10.8 和更高版本需要 64 位内核扩展，因为只支持 64 位内核空间
  * 运行 `lipo -archs` 以知道你的内核扩展支持什么架构（记得在二进制文件上运行，并且不需要 .kext 后缀名）

特殊要求：

* Lilu 和它的插件需要 10.8 或更高版本来运行
  * 我们推荐在低版本的 OS X 中使用 FakeSMC
* OS X 10.6 和更低版本需要启用 RebuildAppleMemoryMap
  * 此项用于解决低版本的内核问题

:::

::: details 英特尔 CPU 支持表

支持来源于 Vanilla Kernels（即没有修改）：

| CPU 世代 | 初始支持版本 | 最高支持版本 | 注释 | CPUID |
| :--- | :--- | :--- | :--- | :--- |
| [奔腾 4](https://en.wikipedia.org/wiki/Pentium_4) | 10.4.1 | 10.5.8 | 仅用于开发包 | 0x0F41 |
| [Yonah](https://en.wikipedia.org/wiki/Yonah_(microprocessor)) | 10.4.4 | 10.6.8 | 32 位 | 0x0006E6 |
| [Conroe](https://en.wikipedia.org/wiki/Conroe_(microprocessor)), [Merom](https://en.wikipedia.org/wiki/Merom_(microprocessor)) | 10.4.7 | 10.11.6 | 不支持 SSE4 | 0x0006F2 |
| [Penryn](https://en.wikipedia.org/wiki/Penryn_(microarchitecture)) | 10.4.10 | 10.13.6 | 不支持 SSE4.2 | 0x010676 |
| [Nehalem](https://en.wikipedia.org/wiki/Nehalem_(microarchitecture)) | 10.5.6 | <span style="color:green"> 当前版本 </span> | N/A | 0x0106A2 |
| [Lynnfield](https://en.wikipedia.org/wiki/Lynnfield_(microprocessor)), [Clarksfield](https://en.wikipedia.org/wiki/Clarksfield_(microprocessor)) | 10.6.3 | ^^ | 10.14+ 无核芯显卡支持 | 0x0106E0 |
| [Westmere, Clarkdale, Arrandale](https://en.wikipedia.org/wiki/Westmere_(microarchitecture)) | 10.6.4 | ^^ | ^^ | 0x0206C0 |
| [Sandy Bridge](https://en.wikipedia.org/wiki/Sandy_Bridge) | 10.6.7 | ^^ | ^^ | 0x0206A0(M/H) |
| [Ivy Bridge](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) | 10.7.3 | ^^ | 11+ 无核芯显卡支持 | 0x0306A0(M/H/G) |
| [Ivy Bridge-E5](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) | 10.9.2 | ^^ | N/A | 0x0306E0 |
| [Haswell](https://en.wikipedia.org/wiki/Haswell_(microarchitecture)) | 10.8.5 | ^^ | ^^ | 0x0306C0(S) |
| [Broadwell](https://en.wikipedia.org/wiki/Broadwell_(microarchitecture)) | 10.10.0 | ^^ | ^^ | 0x0306D4(U/Y) |
| [Skylake](https://en.wikipedia.org/wiki/Skylake_(microarchitecture)) | 10.11.0 | ^^ | ^^ | 0x0506e3(H/S) 0x0406E3(U/Y) |
| [Kaby Lake](https://en.wikipedia.org/wiki/Kaby_Lake) | 10.12.4 | ^^ | ^^ | 0x0906E9(H/S/G) 0x0806E9(U/Y) |
| [Coffee Lake](https://en.wikipedia.org/wiki/Coffee_Lake) | 10.12.6 | ^^ | ^^ | 0x0906EA(S/H/E) 0x0806EA(U)|
| [Amber](https://en.wikipedia.org/wiki/Kaby_Lake#List_of_8th_generation_Amber_Lake_Y_processors), [Whiskey](https://en.wikipedia.org/wiki/Whiskey_Lake_(microarchitecture)), [Comet Lake](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.14.1 | ^^ | ^^ | 0x0806E0(U/Y) |
| [Comet Lake](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.15.4 | ^^ | ^^ | 0x0906E0(S/H)|
| [Ice Lake](https://en.wikipedia.org/wiki/Ice_Lake_(microprocessor)) | ^^ | ^^ | ^^ | 0x0706E5(U) |

:::

::: details macOS 中的 AMD CPU 限制

很遗憾，很多 macOS 中的功能完全不支持 AMD，且很多其他部分都有损坏。它们包括：

* 基于 AppleHV 的虚拟机
  * 包括 VMWare、Parallels、Docker、Android Studios 等等
  * 唯一的可能性时 VirtualBox，因为它有自己的虚拟化技术
  * VMware 10 和 Parallels 13.1.0 支持它们自己的虚拟化技术，但是使用过期的虚拟机软件会产生很大的安全风险
* Adobe 支持
  * 大部分的 Adobe 套装基于英特尔 的 Memfast 指令集，运行于 AMD CPU 会导致崩溃
  * 你可以关闭一些功能，例如 RAW 支持来解决崩溃问题：[Adobe Fixes](https://gist.github.com/naveenkrdy/26760ac5135deed6d0bb8902f6ceb6bd)
* 32 位支持
  * 对于 Mojave 和更低版本中一些依然基于 32 位的软件，需要注意 Vanilla 的补丁不支持 32 位指令集
  * 一个解决办法是安装一个 [自定义内核](https://amd-osx.com/download/kernel.html)，但是这样会损失你的 iMessage 支持
* 很多应用程序上持续存在的问题
  * 基于音频的应用程序更容易遇到问题，例如 Logic Pro
  * DaVinci Resolve 已经被发现偶尔会出现问题

:::

## GPU 支持

GPU 支持很复杂，涉及到市面上几乎所有的 GPU，通常的分析是下面这样的：

* AMD 的基于 GCN 的 GPU 被最新版本的 macOS 支持
  * 但是 AMD APU 并没有被支持
  * AMD Polaris 系列中[基于 Lexa 的核心](https://www.techpowerup.com/gpu-specs/amd-lexa.g806)也不被支持
  * 微星的 Navi 核心显卡用户的特别注意事项：[Installer not working with 5700XT #901](https://github.com/acidanthera/bugtracker/issues/901)
    * macOS 11（Big Sur）中不再存在此问题。
* Nvidia 的 GPU 支持更为复杂：
  * [Maxwell（9XX）](https://en.wikipedia.org/wiki/GeForce_900_series) 和 [Pascal（10XX）](https://en.wikipedia.org/wiki/GeForce_10_series)GPU 被限制到了 macOS 10.13 High Sierra
  * [Nvidia 的 Turing（20XX、](https://en.wikipedia.org/wiki/GeForce_20_series)[16XX）](https://en.wikipedia.org/wiki/GeForce_16_series)的 GPU **不被任何 macOS 版本支持**
  * [Nvidia 的 Ampere（30XX）](https://en.wikipedia.org/wiki/GeForce_30_series)GPU **不被任何 macOS 版本支持**
  * [Nvidia 的 Kepler（6XX、](https://en.wikipedia.org/wiki/GeForce_600_series)[7XX）](https://en.wikipedia.org/wiki/GeForce_700_series)GPU 支持最新版本的 macOS（包括 macOS 11 Big Sur）
    * 这是因为 Apple 依然支持一些 [包含 Nvidia GPU 的 MacBook Pro](https://dortania.github.io/GPU-Buyers-Guide/modern-gpus/nvidia-gpu.html)
* Intel 的 [GT2+ 级](https://en.wikipedia.org/wiki/Intel_Graphics_Technology)系列核芯显卡
  * 此指南覆盖了从 Ivy Bridge 到 Ice Lake 的核芯显卡支持
    * 对于 GMA 系列的 iGPU 的信息可以在这里找到：[GMA 补丁](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/)
  * 注意，GT2 指的是核芯显卡的级别，在奔腾、赛扬和凌动上发现的低端的 GT1 核芯显卡在 macOS 中不被支持

**带有独立显卡的笔记本电脑** 的重要注意事项：

* 90% 的独立显卡都不会正常工作，因为它们接入后的配置不被 macOS 支持（自动切换显卡）。带有 NVIDIA 独立显卡，通常被称为最佳条件。因为不可能利用独立显卡作为内置屏幕的显示输出，所以一般情况下建议屏蔽它们，并将它们的电源关闭（稍后将会涵盖在此指南中）。
* 然而，在有些情况下，独立显卡驱动了任何外接显示输出（HDMI、mini DisplayPort 等等），可能工作也可能不工作；在那种情况下，它们会正常工作，你需要保持它打开并运行。
* 然而，有些笔记本电脑罕见地不支持自动切换显卡，所以可以使用独立显卡（如果被 macOS 支持），但是接入并安装通常会导致问题。

**被支持的 GPU 的完整列表，请查看 [GPU 买家指南](https://dortania.github.io/GPU-Buyers-Guide/)**

::: details 英特尔 GPU 支持表

| GPU 世代 | 初始支持版本 | 最新支持版本 | 注释 |
| :--- | :--- | :--- | :--- |
| [第 3 代 GMA](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Third_generation) | 10.4.1 | 10.7.5 | [需要 32 位内核和补丁](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/legacy-intel/) |
| [第 4 代 GMA](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen4) | 10.5.0 | ^^ | ^^ |
| [Arrendale（HD Graphics）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen5) | 10.6.4 | 10.13.6 | 只支持 LVDS、eDP 但不支持外接显示输出 |
| [Sandy Bridge（HD 3000）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen6) | 10.6.7 | ^^ | N/A |
| [Ivy Bridge（HD 4000）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.7.3 | 10.15.7 | ^^ |
| [Haswell（HD 4XXX, 5XXX）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.8.5 | <span style="color:green"> 当前版本 </span> | ^^ |
| [Broadwell（5XXX, 6XXX）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen8) | 10.10.0 | ^^ | ^^ |
| [Skylake（HD 5XX）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.11.0 | ^^ | ^^ |
| [Kaby Lake（HD 6XX）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.12.4 | ^^ | ^^ |
| [Coffee Lake（UHD 6XX）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.13.6 | ^^ | ^^ |
| [Comet Lake（UHD 6XX）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.15.4 | ^^ | ^^ |
| [Ice Lake（Gx）](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen11) | 10.15.4 | ^^ | 需要在启动参数中添加 `-igfxcdc` 和 `-igfxdvmt` |
| [Tiger Lake（Xe）](https://en.wikipedia.org/wiki/Intel_Xe) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> 无可用驱动 </span> |

注意：Apple 在 macOS 11 Big Sur 中保留了 Ivy Bridge 的核芯显卡的驱动，然而它们正在计划移除。请意识到它们可能会在过些时候被删除。

:::

::: details AMD GPU 支持表

| GPU 世代 | 初始支持版本 | 最新支持版本 | 注释 |
| :--- | :--- | :--- | :--- |
| [X800](https://en.wikipedia.org/wiki/Radeon_X800_series) | 10.3.x | 10.7.5 | 需要 32 位内核 |
| [X1000](https://en.wikipedia.org/wiki/Radeon_X1000_series) | 10.4.x | ^^ | N/A |
| [Terascale](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Terascale 2/3](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.6.x | ^^ | ^^ |
| [GCN 1](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.8.3 | <span style="color:green"> 当前版本 </span> | ^^ |
| [GCN 2/3](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.10.x | ^^ | ^^ |
| [Polaris 10](https://en.wikipedia.org/wiki/Radeon_RX_400_series), [20](https://en.wikipedia.org/wiki/Radeon_RX_500_series) | 10.12.1 | ^^ | ^^ |
| [Vega 10](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.12.6 | ^^ | ^^ |
| [Vega 20](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.14.5 | ^^ | ^^ |
| [Navi 10](https://en.wikipedia.org/wiki/Radeon_RX_5000_series) | 10.15.1 | ^^ | 需要在启动参数中添加 `agdpmod=pikera` |
| [Navi 20](https://en.wikipedia.org/wiki/Radeon_RX_6000_series) | 11.1 | ^^ | ^^ |

:::

::: details Nvidia GPU 支持表

| GPU 世代 | 初始支持版本 | 最新支持版本 | 注释 |
| :--- | :--- | :--- | :--- |
| [GeForce 6](https://en.wikipedia.org/wiki/GeForce_6_series) | 10.2.x | 10.7.5 | 需要 32 位核心和 [NVCAP 补丁](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [GeForce 7](https://en.wikipedia.org/wiki/GeForce_7_series) | 10.4.x | ^^ | [需要 NVCAP 补丁](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [Tesla](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Tesla V2](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)#Tesla_2.0) | 10.5.x | ^^ | ^^ |
| [Fermi](https://en.wikipedia.org/wiki/Fermi_(microarchitecture)) | 10.7.x | ^^ | ^^ |
| [Kepler](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.7.x | <span style="color:green"> 当前版本 </span> | N/A |
| [Kepler V2](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.8.x | ^^ | ^^ |
| [Maxwell](https://en.wikipedia.org/wiki/Maxwell_(microarchitecture)) | 10.10.x | 10.13.6 | [需要 WebDriver](https://www.nvidia.com/download/driverResults.aspx/149652/) |
| [Pascal](https://en.wikipedia.org/wiki/Pascal_(microarchitecture)) | 10.12.4 | ^^ | ^^ |
| [Turing](https://en.wikipedia.org/wiki/Turing_(microarchitecture)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> 无驱动可用 </span> |
| [Ampere](https://en.wikipedia.org/wiki/Ampere_(microarchitecture)) | ^^ | ^^ | ^^ |

:::

## 主板支持

大部分情况下，所有的主板都和 CPU 的支持一样。特殊的，B550 主板有问题：

* [~~AMD 的 B550 主板~~](https://en.wikipedia.org/wiki/List_of_AMD_chipsets)

然而，感谢近期所做的开发，B550 主板现在现在已经可以配合附加的 [SSDT-CPUR](https://github.com/naveenkrdy/Misc/blob/master/SSDTs/SSDT-CPUR.dsl) 启动。更多的信息将会在[收集文件](./ktext.md) 和 [Zen 的 config.plist 部分](./AMD/zen.md)

## 存储支持

对于大部分情况，所有基于 SATA 的驱动器都被支持，而且大部分 NVMe 的驱动器也一样运行得好。这里只有一小部分例外：

* **三星 PM981、PM991 and 镁光 2200S NVMe SSD**
  * 这些 SSD 不兼容即插即用（导致内核错误）所以需要 [NVMeFix.kext](https://github.com/acidanthera/NVMeFix/releases) 以修复这些内核问题。注意，这些驱动可能导致引导问题——即便配合 NVMeFix.kext。
  * 根据一些相关的注解，三星 970 EVO Plus NVMe SSD 也存在同样的问题，但是已经在一次固件更新中被修复了；在[这里](https://www.samsung.com/semiconductor/minisite/ssd/download/tools/)得到更新（通过 Windows 下的 Samsung Magician 或可引导的 ISO）。
  * 同时需要注意的是，为 HDD 加速而使用 [英特尔傲腾内存](https://www.intel.com/content/www/us/en/architecture-and-technology/optane-memory.html) 或者 [镁光 3D XPoint](https://www.micron.com/products/advanced-solutions/3d-xpoint-technology) 的笔记本电脑在 macOS 中不受支持。一些用户曾报告在 Catalina 中成功运行——甚至是读写也完全支持，但是我们强烈推荐移除傲腾内存以排除潜在的启动问题。

## 有线网络

实际上，所有的有线网络适配器在 macOS 中都有某种形式的支持，无论是使用内建驱动或是社区制作的内核扩展。主要的例外：

* Intel 的 2.5GB 以太网 i225 网络
  * 在高端桌面 Comet Lake 主板上被发现
  * 可行的变通办法：[来源](https://www.hackintosh-forum.de/forum/thread/48568-i9-10900k-gigabyte-z490-vision-d-er-läuft/?postID=606059#post606059) 和 [示例](../config.plist/comet-lake.md#deviceproperties)
* Intel 的服务器网卡
  * 对于 [X520 和 X540 芯片组](https://www.tonymacx86.com/threads/how-to-build-your-own-imac-pro-successful-build-extended-guide.229353/)的可行变通办法
* Mellanox 和 Qlogic 服务器网卡

## 无线网络

大部分笔记本电脑自带的 Wi-Fi 芯片都不被支持，因为它们通常由 Intel/Qualcomm 制造。如果你比较幸运，你可能会有一块 Atheros 芯片，但是对它的支持仅持续到了 High Sierra。
最佳选项是获取一块博通（Broadcom）的无线网卡，查看 [无线网卡买家指南](https://dortania.github.io/Wireless-Buyers-Guide/) for recommendations.

## 杂项

* **指纹传感器**
  * 目前没有任何方式来模拟 Touch ID 传感器，所以指纹传感器不能工作。
* **Windows Hello 面部识别**
  * 一些笔记本电脑带有连接至 I2C 的 Windows Hello 面部识别（并使用你的核芯显卡），那些将不会工作。
  * 一些笔记本电脑带有连接至 USB 的 Windows Hello 面部识别，如果你比较幸运，那你可能会得到摄像头的功能，但没有更多别的作用。
* **英特尔智音技术（Smart Sound Technology）**
  * 带有英特尔智音技术的笔记本电脑，将不会有任何连接到英特尔智音技术的设备正常工作，因为它不被支持。你可以在 Windows 上的设备管理器中查看。
* **耳机组合插孔**
  * 一些带有耳机组合插孔的笔记本电脑可能无法通过它得到音频输入，所以不得不使用内建麦克风或者外接的 USB 音频输入设备。
* **雷雳 USB-C 接口**
  * （Hackintosh）的雷雳接口在 macOS 中的支持目前依然存在问题，目前很多笔记本电脑都带有的 Alpine Ridge 控制器更是如此。有人曾尝试过让控制器保持通电，这可以让雷雳接口和 USB-C 工作在热插拔模式下，但这是以内核错误和/或 USB-C 睡眠后中断为代价的。如果你想使用 USB-C 一侧的端口并且可以正常睡眠，你必须将它插入并且保持插入。
  * 注意：这不适用于仅限 USB-C 的接口——仅适用于雷雳 3 和 USB-C 混合的接口。
  * 在 BIOS 中关闭雷雳接口可以解决这个问题。
