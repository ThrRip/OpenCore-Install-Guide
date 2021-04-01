# 选择正确的 SMBIOS

当您最终为您的电脑找出了一个合适的 SMBIOS 后，您会明白这不只是简单地对应 CPU 型号。SMBIOS 会影响电脑的工作状态，如 CPU 电源管理、GPU 配置、USB 映射等

选择 SMBIOS 的时候，您需要考虑以下几点：

* CPU 类型
  * 要明白您的硬件到底是属于移动端、桌面端还是服务器平台，他们会影响睡眠和系统稳定性
  * 这同时决定能否启用 Apple XCPM 和影响 CPU 变频
    * 这两个功能大部分情况下可以通过 CPUFriend 来修复: [修复电源管理](https://dortania.github.io/OpenCore-Post-Install/universal/pm.html)
  * AMD CPU 不需要关心这个
* GPU 类型
  * 许多东西都会被这个所影响，如 GPU 电源管理(AGPM)、显示输出支持（AGDP）、睡眠（AGDC）等
    * 要特别注意 [Mac Mini](#mac-mini) 这个 SMBIOS， 它只使用移动端硬件，并不能很好地匹配台式机的硬件。这就是我们极度不推荐它的原因，除非将其用于 [Intel NUC 系列](https://www.intel.ca/content/www/ca/en/products/boards-kits/nuc.html) 和那些基于移动端硬件的电脑
    * 笔记本也应当十分小心，一个带有独显的 SMBIOS 会假设所有的显示输出都是应该通过独显来实现的，而一台搭载 Optimus 双显卡切换技术的笔记本的独显需要通过核显来输出画面，如果没有经过适当的处理，可能会导致黑屏等问题
  * 没有内置核心显卡的 CPU 要特别注意，如果 SMBIOS 带有一个核显（如：所有的 iMac SMBIOS），而您的 CPU 没有，预览等功能会无法使用
    * 对于这种情况，请使用 iMac Pro 以及 Mac Pro SMBIOS
  * DRM 也和这个设置相关，可以通过这个方法来修复：[修复 DRM](https://dortania.github.io/OpenCore-Post-Install/universal/drm.html)

* OS 版本支持
  * 主要和较旧的硬件相关，尽管 macOS 仍然支持这些 CPU，但是不再支持同时期的 SMBIOS
    * Arrandale CPU 就是一个很好的例子, 它们仍然被 macOS 11 Big Sur 所支持（但是只有在 10.13.6 及更旧的版本才有核显驱动)
* USB 设备
  * 每个 SMBIOS 拥有他们自己的 USB 端口映射，当应用于您的机器时会导致 USB 问题
    * 更多详情请访问：[USB 端口映射](https://dortania.github.io/OpenCore-Post-Install/usb/)
  * 除此之外，Skylake 及更新架构的 SMBIOS 还需要一个 [USBX 设备](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/SSDT-EC-USBX.dsl#L54L79) 来修复 USB 供电
    * 查看这个页面获取详情：[修复 USB 电源](https://dortania.github.io/OpenCore-Post-Install/usb/misc/power.html)

::: details 支持 XCPM 的 SMBIOS

| SMBIOS |
| :--- |
| MacBook8,1+ |
| MacBookAir6,x+ |
| MacBookPro11,x+ |
| Macmini7,1+ |
| iMac14,x+ |
| iMacPro1,1 |
| MacPro6,1+ |

:::

## 如何选择 SMBIOS

一般情况下，我们推荐以这样的步骤来选择 SMBIOS：

1. 找到相同的 CPU 代数，并且性能级别（tier）尽可能地相近
2. 根据实际情况来选择只有核显、既有核显又有独显、或是没有核显的 SMBIOS
3. 最后检查细节

注意事项：

* `iMacPro1,1` 和 `MacPro7,1` 是仅有的 2 个会让独立显卡来处理包括后台渲染和其它本应由核显来处理的工作的 SMBIOS 
  * 除非您确实需要，我们才会向您推荐这些 SMBIOS。如果您的电脑不属于以下类型（如：HEDT/服务器/AMD），睡眠功能很可能会损坏，您将需要修复电源管理：[修复电源管理](https://dortania.github.io/OpenCore-Post-Install/universal/pm.html)
  * 要注意这个 SMBIOS 需要一个 Polaris、Vega 或者 Navi 核心的 GPU 来正确工作
* `iMac20,2` 是一个定制的 SMBIOS，这意味着它只用于 Apple 定制的 i9-10910 CPU，除非您拥有 i9-10900K，否则我们推荐使用 `iMac20,1`
* 应尽量避免使用 Mac mini 的 SMBIOS，除非你在使用没有内建显示器的移动端硬件
  * Intel NUC 最适合使用这些 SMBIOS
* 无核显的 CPU 要**谨慎地**选择 SMBIOS，一个 iMac SMBIOS 会认为 CPU 带有核显，所以您需要寻找一个没有核显的 SMBIOS，如 iMac Pro 或者 Mac Pro
  * 它们也适用于 AMD 平台，因为 AMD CPU 没有可驱动的核显

## macOS SMBIOS 列表

下面是一个完整的 SMBIOS 列表，列出了 macOS 所有支持过的 SMBIOS，还包含了一些额外的信息，如配置的 CPU 和 GPU

* [MacBook](#macbook)
* [MacBook Air](#macbook-air)
* [MacBook Pro](#macbook-pro)
* [Mac Mini](#mac-mini)
* [iMac](#imac)
* [iMac Pro](#imac-pro)
* [Mac Pro](#mac-pro)
* [Xserve](#xserve)
* [其它 SMBIOS](#其它-smbios)

这些信息从 [EveryMac](https://everymac.com) 和 [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg) 提取

**注意事项**:

* 每个 CPU 架构旁边的字母代表着 CPU 的性能级别，如下表:

| 字母 | 类型 |
| :--- | :--- |
| Y | 移动端（低性能） |
| U, M | 移动端（中等性能） |
| H, QM, HQ | 移动端（高性能） |
| S | 桌面端 |
| EP, SP, W, X | HEDT/服务器 |

### MacBook

| SMBIOS | CPU 架构 | GPU | board-id | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| MacBook1,1     | Yonah(M)        | GMA 950                       | Mac-F4208CC8       | 10.4.6 (8I2025) | 10.6.8 |
| MacBook2,1     | Merom(M)        | GMA 950                       | Mac-F4208CA9   | 10.4.8 (8N1108) | 10.7.5 |
| MacBook3,1     | Merom(M)        | GMA X3100                     | Mac-F22788C8   | 10.5 (9A3111) | ^^ |
| MacBook4,1     | Penryn(M)       | GMA X3100                     | Mac-F22788A9   | 10.5.2 (9C2015) | ^^ |
| MacBook5,1     | Penryn(M)       | GeForce 9400M                 | Mac-F42D89C8   | 10.5.5 (9F2114) | 10.11.6 |
| MacBook5,2     | Penryn(M)       | GeForce 9400M                 | Mac-F22788AA   | 10.5.6 (9G2110) | ^^ |
| MacBook6,1     | Penryn(M)       | GeForce 9400M                 | Mac-F22C8AC8   | 10.6.1 (10A2047) | 10.13.6 |
| MacBook7,1     | Penryn(M)       | GeForce 320M                  | Mac-F22C89C8   | 10.6.3 (10D2162) | ^^ |
| MacBook8,1     | Broadwell(Y)    | HD 5300                       | Mac-BE0E8AC46FE800CC | 10.10.2 (14C2061) | 现在 |
| MacBook9,1     | Skylake(Y)      | HD 515                        | Mac-9AE82516C7C6B903 | 10.11.4 (15E2066) | ^^ |
| MacBook10,1    | Kaby Lake(Y)    | HD 615                        | Mac-EE2EBD4B90B839A8 | 10.12.5 (16F207) | ^^ |

### MacBook Air

| SMBIOS | CPU 架构 | GPU | board-id | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| MacBookAir1,1  | Merom(M)        | GMA X3100     (11")                | Mac-F42C8CC8 | 10.5.1 (9B2324) | 10.7.5 |
| MacBookAir2,1  | Penryn(M)       | GeForce 9400M (13")                | Mac-F42D88C8 | 10.5.5 | 10.11.6 |
| MacBookAir3,1  | Penryn(M)       | GeForce 320M  (11")                | Mac-942452F5819B1C1B | 10.6.4 (10F3061) | 10.13.6 |
| MacBookAir3,2  | Penryn(M)       | GeForce 320M  (13")                | Mac-942C5DF58193131B | 10.6.4 (10F3061) | ^^ |
| MacBookAir4,1  | Sandy Bridge(M) | HD 3000 (11")                      | Mac-C08A6BB70A942AC2 | 10.7 (11A2063) | ^^ |
| MacBookAir4,2  | Sandy Bridge(M) | HD 3000 (13")                      | Mac-742912EFDBEE19B3 | 10.7 (11A2063) | ^^ |
| MacBookAir5,1  | Ivy Bridge(U)   | HD 4000 (11")                      | Mac-66F35F19FE2A0D05 | 10.7.4 (11E2520) | 10.15.7 |
| MacBookAir5,2  | Ivy Bridge(U)   | HD 4000 (13")                      | Mac-2E6FAB96566FE58C | 10.8.2 (12C2034) | ^^ |
| MacBookAir6,1  | Haswell(U)      | HD 5000 (11")                      | Mac-35C1E88140C3E6CF | 10.8.4 (12E3067) | 现在 |
| MacBookAir6,2  | Haswell(U)      | HD 5000 (13")                      | Mac-7DF21CB3ED6977E5 | 10.8.4 (12E3067) | ^^ |
| MacBookAir7,1  | Broadwell(U)    | HD 6000 (11")                      | Mac-9F18E312C5C2BF0B | 10.10.2 (14C2507) | ^^ |
| MacBookAir7,2  | Broadwell(U)    | HD 6000 (13")                      | Mac-937CB26E2E02BB01 | 10.10.2 (14C2507) | ^^ |
| MacBookAir8,1  | Amber Lake(Y)   | UHD 617 (13")                      | Mac-827FAC58A8FDFA22 | 10.14.1 (18B2084) | ^^ |
| MacBookAir8,1  | Amber Lake(Y)   | UHD 617 (13")                      | Mac-226CB3C6A851A671 | 10.14.5 (18F2058) | ^^ |
| MacBookAir9,1  | Ice Lake(Y)     | Iris Plus G4/G7 (13")              | Mac-0CFF9C7C2B63DF8D | 10.15.4 (19E287) | ^^ |

### MacBook Pro

| SMBIOS | CPU 架构 | GPU | board-id | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| MacBookPro1,1  | Yonah(M)        | Radeon X1600 (15")                 | Mac-F425BEC8 | 10.4.5 (8G1453) | 10.6.8 |
| MacBookPro1,2  | Yonah(M)        | Radeon X1600 (17")                 | Mac-F42DBEC8 | 10.4.6 (8I2032) | ^^ |
| MacBookPro2,1  | Merom(M)        | Radeon X1600 (15")                 | Mac-F42189C8 | 10.4.8 (8N1051) | 10.7.5 |
| MacBookPro2,2  | Merom(M)        | Radeon X1600 (17")                 | Mac-F42187C8 | 10.4.8 (8N1037) | ^^ |
| MacBookPro3,1  | Merom(M)        | GeForce 8600M GT (15/17")          | Mac-F4238BC8 | 10.4.9 (8Q1058) | 10.11.6 |
| MacBookPro4,1  | Penryn(M)       | GeForce 8600MG GT (17")            | Mac-F42C89C8 | 10.5.2 (9C2018) | ^^ |
| MacBookPro5,1  | Penryn(M)       | GeForce 9400M/9600M GT (15")       | Mac-F42D86C8 | 10.5.5 (9F2114) | ^^ |
| MacBookPro5,2  | Penryn(M)       | GeForce 9400M/9600M GT (17")       | Mac-F2268EC8 | 10.5.6 (9G2141) | ^^ |
| MacBookPro5,3  | Penryn(M)       | GeForce 9400M/9600M GT (15")       | Mac-F22587C8 | 10.5.7 (9J3050) | ^^ |
| MacBookPro5,4  | Penryn(M)       | GeForce 9400M/9600M GT (15")       | Mac-F22587A1 | 10.5.7 (9J3050) | ^^ |
| MacBookPro5,5  | Penryn(M)       | GeForce 9400M/9600M GT (13")       | Mac-F2268AC8 | 10.5.7 (9J3050) | ^^ |
| MacBookPro6,1  | Arrandale(M)    | HD Graphics/GeForce GT 330M (17")  | Mac-F22589C8 | 10.6.3 (10D2063a) | 10.13.6 |
| MacBookPro6,2  | Arrandale(M)    | HD Graphics/GeForce GT 330M (15")  | Mac-F22586C8 | 10.6.3 (10D2094) | 10.13.6 |
| MacBookPro7,1  | Penryn(M)       | GeForce 320M (13")                 | Mac-F222BEC8 | 10.6.3 (10D2125) | ^^ |
| MacBookPro8,1  | Sandy Bridge(M) | HD 3000 (13")                      | Mac-94245B3640C91C81 | 10.6.6 (10J3210) | ^^ |
| MacBookPro8,2  | Sandy Bridge(QM)| HD 3000/Radeon HD 6490M (15")      | Mac-94245A3940C91C80 | 10.6.6 (10J3210) | ^^ |
| MacBookPro8,3  | Sandy Bridge(QM)| HD 3000/Radeon HD 6750M (17")      | Mac-942459F5819B171B | 10.6.6 (10J3210) | ^^ |
| MacBookPro9,1  | Ivy Bridge(QM)  | HD 4000/GeForce GT 650M (15")      | Mac-4B7AC7E43945597E | 10.7.3 (11D2097) | 10.15.7 |
| MacBookPro9,2  | Ivy Bridge(M)   | HD 4000 (13")                      | Mac-6F01561E16C75D06 | 10.7.3 (11D2515) | ^^ |
| MacBookPro10,1 | Ivy Bridge(QM)  | HD 4000/GeForce GT 650M (15")      | Mac-C3EC7CD22292981F | 10.7.4 (11E2068) | ^^ |
| MacBookPro10,2 | Ivy Bridge(M)   | HD 4000 (13")                      | Mac-AFD8A9D944EA4843 | 10.8.2 (12C2034) | ^^ |
| MacBookPro11,1 | Haswell(U)      | Iris 5100 (13")                    | Mac-189A3D4F975D5FFC | 10.9 (13A2093) | 现在 |
| MacBookPro11,2 | Haswell(HQ)     | Iris Pro 5200 (15")                | Mac-3CBD00234E554E41 | 10.9 (13A3017) | ^^ |
| MacBookPro11,3 | Haswell(HQ)     | Iris Pro 5200/GeForce GT 750M (15")| Mac-2BD1B31983FE1663 | 10.9 (13A3017) | ^^ |
| MacBookPro11,4 | Haswell(HQ)     | Iris Pro 5200 (15")                | Mac-06F11FD93F0323C5 | 10.10.3 (14D2134) | ^^ |
| MacBookPro11,5 | Haswell(HQ)     | Iris Pro 5200/Radeon R9 M370X (15")| Mac-06F11F11946D27C5 | 10.10.3 (14D2134) | ^^ |
| MacBookPro12,1 | Broadwell(U)    | Iris 6100 (13")                    | Mac-E43C1C25D4880AD6 | 10.10.2 (14C2507) | ^^ |
| MacBookPro13,1 | Skylake(U)      | Iris 540 (13")                     | Mac-473D31EABEB93F9B | 10.12 (16A2323a) | ^^ |
| MacBookPro13,2 | Skylake(U)      | Iris 550 (13")                     | Mac-66E35819EE2D0D05 | 10.12.1 (16B2657) | ^^ |
| MacBookPro13,3 | Skylake(H)      | HD 530/Radeon Pro 450 (15")        | Mac-A5C67F76ED83108C | 10.12.1 (16B2659) | ^^ |
| MacBookPro14,1 | Kaby Lake(U)    | Iris Plus 640 (13")                | Mac-B4831CEBD52A0C4C | 10.12.5 (16F2073) | ^^ |
| MacBookPro14,2 | Kaby Lake(U)    | Iris Plus 650 (13")                | Mac-CAD6701F7CEA0921 | 10.12.5 (16F2073) | ^^ |
| MacBookPro14,3 | Kaby Lake(H)    | HD 630/Radeon Pro 555 (15")        | Mac-551B86E5744E2388 | 10.12.5 (16F2073) | ^^ |
| MacBookPro15,1 | Coffee Lake(H)  | UHD 630/Radeon Pro 555X (15")      | Mac-937A206F2EE63C01 | 10.13.6 (17G2112) | ^^ |
| MacBookPro15,2 | Coffee Lake(U)  | Iris Plus 655 (13")                | Mac-827FB448E656EC26 | 10.13.6 (17G2112) | ^^ |
| MacBookPro15,3 | Coffee Lake(H)  | UHD 630/Radeon Pro Vega 16 (15")   | Mac-1E7E29AD0135F9BC | 10.14.1 (18B3094) | ^^ |
| MacBookPro15,4 | Coffee Lake(U)  | Iris Plus 645 (13")                | Mac-53FDB3D8DB8CA971 | 10.14.5 (18F2058) | ^^ |
| MacBookPro16,1 | Coffee Lake(H)  | UHD 630/Radeon Pro 5300 (16")      | Mac-E1008331FDC96864 | 10.15.1 (19B2093) | ^^ |
| MacBookPro16,2 | Ice Lake(U)     | Iris Plus G4/G7 (13")              | Mac-5F9802EFE386AA28 | 10.15.4 (19E2269) | ^^ |
| MacBookPro16,3 | Coffee Lake(U)  | Iris Plus 645 (13")                | Mac-E7203C0F68AA0004 | 10.15.4 (19E2269) | ^^ |
| MacBookPro16,4 | Coffee Lake(H)  | UHD 630/Radeon Pro 5600M (16")     | Mac-A61BADE1FDAD7B05 | 10.15.1 (19B2093) | ^^ |

### Mac Mini

| SMBIOS | CPU 架构 | GPU | board-id | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Macmini1,1     | Yonah(M)        | GMA 950                       | Mac-F4208EC8           | 10.4.5 (8H1619) | 10.6.8 |
| Macmini2,1     | Merom(M)        | GMA 950                       | Mac-F4208EAA           | 10.4.10 (8R3014) | 10.7.5 |
| Macmini3,1     | Penryn(M)       | GeForce 9400M                 | Mac-F22C86C8           | 10.5.6 (9G2030) | 10.11.6 |
| Macmini4,1     | Penryn(M)       | GeForce 320M                  | Mac-F2208EC8           | 10.6.4 (10F2025) | 10.13.6 |
| Macmini5,1     | Sandy Bridge(M) | HD 3000                       | Mac-8ED6AF5B48C039E1   | 10.7 (11A2061) | ^^ |
| Macmini5,2     | Sandy Bridge(M) | Radeon HD 6630M               | Mac-4BC72D62AD45599E   | 10.7 (11A2061) | ^^ |
| Macmini5,3     | Sandy Bridge(QM)| HD 3000                       | Mac-7BA5B2794B2CDB12   | 10.7 (11A2061) | ^^ |
| Macmini6,1     | Ivy Bridge(M)   | HD 4000                       | Mac-031AEE4D24BFF0B1   | 10.8.1 (12B2080) | 10.15.7 |
| Macmini6,2     | Ivy Bridge(QM)  | HD 4000                       | Mac-F65AE981FFA204ED   | 10.8.1 (12B2080) | ^^ |
| Macmini7,1     | Haswell(U)      | HD 5000 or Iris 5100          | Mac-35C5E08120C7EEAF   | 10.10 (14A389) | 现在 |
| Macmini8,1     | Coffee Lake(H)  | UHD 630                       | Mac-7BA5B2DFE22DDD8C   | 10.14 (18A2063) | ^^ |

### iMac

| SMBIOS | CPU 架构 | GPU | board-id | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| iMac4,1        | Yonah(M)        | Radeon X1600                  | Mac-F42786C8   | 10.4.4 (8G1165)      | 10.6.8 |
| iMac4,2        | Yonah(M)        | GMA 950                       | Mac-F4218EC8   | 10.4.7 (8I2057)      | ^^ |
| iMac5,1        | Merom(M)        | Radeon X1600                  | Mac-F4228EC8   | 10.4.7 (8K1106)      | 10.7.5 |
| iMac5,2        | Merom(M)        | GMA 950                       | Mac-F4218EC8   | 10.4.7 (8K1106)      | ^^ |
| iMac6,1        | Merom(M)        | GeForce 7300GT                | Mac-F4218FC8   | 10.4.7 (8K1123)      | ^^ |
| iMac7,1        | Merom(M)        | Radeon HD 2400 XT             | Mac-F42386C8   | 10.4.10 (8R4031)      | 10.11.6 |
| iMac8,1        | Penryn(M)       | Radeon HD 2400 XT             | Mac-F227BEC8   | 10.5.2 (9C2028)      | ^^ |
| iMac9,1        | Penryn(M)       | GeForce 9400M                 | Mac-F2218FA9   | 10.5.6 (9G2030)      | ^^ |
| iMac10,1       | Wolfdale(S)     | GeForce 9400M                 | Mac-F221DCC8   | 10.6.1 (10A2155)      | 10.13.6 |
| iMac10,1       | Wolfdale(S)     | Radeon HD 4670                | Mac-F2268CC8   | 10.6.1 (10A2155)      | ^^ |
| iMac11,1       | Lynnfield(S)    | Radeon HD 4850                | Mac-F2268DAE   | 10.6.2 (10C2234)      | ^^ |
| iMac11,2       | Clarkdale(S)    | Radeon HD 4670                | Mac-F2238AC8   | 10.6.3 (10D2322a)      | ^^ |
| iMac11,3       | Clarkdale(S)    | Radeon HD 5670                | Mac-F2238BAE   | 10.6.3 (10D2322a)      | ^^ |
| iMac12,1       | Sandy Bridge(S) | Radeon HD 6750M               | Mac-942B5BF58194151B | 10.6.6 (10J4026)      | ^^ |
| iMac12,2       | Sandy Bridge(S) | Radeon HD 6770M               | Mac-942B59F58194171B | 10.6.6 (10J4026)      | ^^ |
| iMac13,1       | Ivy Bridge(S)   | GeForce GT 640M               | Mac-00BE6ED71E35EB86 | 10.8.2 (12C3104)      | 10.15.7 |
| iMac13,1       | Ivy Bridge(S)   | HD 4000                       | Mac-00BE6ED71E35EB86 | 10.8.2 (12C3104)      | ^^ |
| iMac13,2       | Ivy Bridge(S)   | GeForce GTX 660M              | Mac-FC02E91DDD3FA6A4 | 10.8.2 (12C2037)      | ^^ |
| iMac13,3       | Ivy Bridge(S)   | HD 4000                       | Mac-7DF2A3B5E5D671ED | 10.8.2 (12C2037)      | ^^ |
| iMac14,1       | Haswell(S)      | Iris Pro 5200                 | Mac-031B6874CF7F642A | 10.8.4 (12E4022)      | ^^ |
| iMac14,2       | Haswell(S)      | GeForce GT 750M               | Mac-27ADBB7B4CEE8E61 | 10.8.4 (12E4022)      | ^^ |
| iMac14,3       | Haswell(S)      | GeForce GT 755M               | Mac-77EB7D7DAF985301 | 10.8.4 (12E4022)      | ^^ |
| iMac14,4       | Haswell(U)      | HD 5000                       | Mac-81E3E92DD6088272 | 10.9.3 (13D2061)      | 现在 |
| iMac15,1       | Haswell(S)      | Radeon R9 M290X               | Mac-42FD25EABCABB274 | 10.10 (14A389)      | ^^ |
| iMac16,1       | Broadwell(U)    | HD 6000 or Iris Pro 6200      | Mac-A369DDC4E67F1C45 | 10.11 (15A2301)      | ^^ |
| iMac16,2       | Broadwell(S)    | Iris Pro 6200                 | Mac-FFE5EF870D7BA81A | 10.11 (15A2301)      | ^^ |
| iMac17,1       | Skylake(S)      | Radeon R9 M380                | Mac-DB15BD556843C820, Mac-65CE76090165799A, Mac_B809C3757DA9BB8D | 10.11 (15A4310)      | ^^ |
| iMac18,1       | Kaby Lake(U)    | Iris Plus 640                 | Mac-4B682C642B45593E | 10.12.4 (16E2193)      | ^^ |
| iMac18,2       | Kaby Lake(S)    | Radeon Pro 555                | Mac-77F17D7DA9285301 | 10.12.4 (16F2073)      | ^^ |
| iMac18,3       | ^^              | Radeon Pro 570                | Mac-BE088AF8C5EB4FA2 | 10.12.4 (16F2073)      | ^^ |
| iMac19,1       | Coffee Lake(S)  | Radeon Pro 570X               | Mac-AA95B1DDAB278B95 | 10.14.4 (18E226)      | ^^ |
| iMac19,2       | ^^              | Radeon Pro 555X               | Mac-63001698E7A34814 | 10.14.4 (18E226)      | ^^ |
| iMac20,1       | Comet Lake(S)   | Radeon Pro 5300               | Mac-CFF7D910A743CAAF | 10.15.6 (19G2005)      | ^^ |
| iMac20,2       | ^^              | ^^                            | Mac-AF89B6D9451A490B | 10.15.6 (19G2005)      | ^^ |

### iMac Pro

| SMBIOS | CPU 架构 | GPU | board-id | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| iMacPro1,1     | Skylake-W    | Vega 56                       | Mac-7BA5B2D9E42DDD94       | 10.13.2 (17C2111) | 现在 |

### Mac Pro

| SMBIOS | CPU 架构 | GPU | board-id | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| MacPro1,1      | Woodcrest      | GeForce 7300 GT               | Mac-F4208DC8           | 10.4.7 (8K1079) | 10.7.5 |
| MacPro2,1      | Clovertown     | ^^                            | Mac-F4208DA9           | 10.4.9 (8P4037) | ^^ |
| MacPro3,1      | Harpertown     | Radeon HD 2600 XT             | Mac-F42C88C8           | 10.5.1 (9B2117) | 10.11.6 |
| MacPro4,1      | Nehalem        | GeForce GT 120                | Mac-F221BEC8           | 10.5.6 (9G3553) | ^^ |
| MacPro5,1      | Nehalem        | Radeon HD 5770                | Mac-F221BEC8           | 10.6.4 (10F2521) | 10.14.6 |
| MacPro5,1      | Westmere EP    | ^^                            | Mac-F221BEC8           | 10.6.4 (10F2521) | ^^ |
| MacPro6,1      | Ivy Bridge EP  | FirePro D300                  | Mac-F60DEB81FF30ACF6   | 10.9.1 (13B4116) | 现在 |
| MacPro7,1      | Cascade Lake-W | Radeon Pro 580X               | Mac-27AD2F918AE68F61   | 10.15.0 (19A583) | ^^ |

### Xserve

| SMBIOS | CPU 架构 | GPU | board-id | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Xserve1,1      | Woodcrest    | Radeon X1300                  | Mac-F4208AC8           | Server 10.4.8 (8N1215) | Server 10.7.5 |
| Xserve2,1      | Harpertown   | ^^                            | Mac-F42289C8           | Server 10.5 (9B2117) | ^^ |
| Xserve3,1      | Nehalem EP   | GeForce GT 120                | Mac-F223BEC8           | Server 10.5.6 | 10.11.6 |

### 其它 SMBIOS

以下所有型号的机器都不被 OpenCore 所支持，但是我们还是记录下来以便参考

* Apple 开发平台
  * [Developer Transition Kit](#developer-transition-kit)
* Apple Silicon
  * [Mac Mini](#mac-mini-apple-silicon)
  * [MacBook Air](#macbook-air-apple-silicon)
  * [MacBook Pro](#macbook-pro-apple-silicon)
* PowerPC
  * [PowerBook](#powerbook-powerpc)
  * [iBook](#ibook-powerpc)
  * [PowerMac](#powermac-powerpc)
  * [iMac](#imac-powerpc)
  * [eMac](#emac-powerpc)
  * [Cube](#cube-powerpc)
  * [Mac Mini](#mac-mini-powerpc)
  * [Xserve](#xserve-powerpc)
  
::: details Apple Silicon 平台的特别之处

与 Apple 自研 CPU 有关的一些信息：

* 不依赖于 ACPI 或 UEFI
* 固件中不存在 DeviceProperties
* 对于 iOS/iPadOS 应用程序，使用 iPad8,6
* board-id 只应用于基于 Intel 的 Mac，PowerPC 和 ARM 不存在该项

:::

#### Developer Transition Kit

| SMBIOS | 年份 | CPU 架构 | Secure Enclave 标识符 | 最初支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| ADP2,1 | Mid 2005 | Intel Prescott | N/A | 10.4.1 (8B1025) |
| ADP3,2 | Mid 2020 | Apple A12Z | J273 | 11.0.0 (20A5299w) |

#### Mac Mini - Apple Silicon

| SMBIOS | 年份 | CPU 架构 | Secure Enclave 标识符 | 最初支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| MacMini9,1 | Late 2020 |  Apple M1 | J274 | 11.0.0 (20A2411) |

#### MacBook Air - Apple Silicon

| SMBIOS | 年份 | CPU 架构 | Secure Enclave 标识符 | 最初支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| MacBookAir10,1 | Late 2020 |  Apple M1 | J313 | 11.0.0 (20A2411) |

#### MacBook Pro - Apple Silicon

| SMBIOS | 年份 | CPU 架构 | Secure Enclave 标识符 | 最初支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| MacBookPro17,1 | Late 2020 | Apple M1 | J293 | 11.0.0 (20A2411) |

::: details Power PC SMBIOS 列表

#### PowerBook - PowerPC

| SMBIOS | 年份 | CPU 架构 | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| PowerBook1,1 | Mid-1999 | PowerPC 750 (G3) | 8.6 | 10.3.9 |
| PowerBook3,1 | Early 2000 | ^^ | 9.0.2 | 10.4.11 |
| PowerBook3,2 | Early 2001 | PowerPC 7410 (G4) | 9.1 | ^^ |
| PowerBook3,3 | Late 2001 | PowerPC 7440 (G4) | 9.2.1 | ^^ |
| PowerBook3,4 | Mid-2002 | PowerPC 7451 (G4) | 9.2.2 | ^^ |
| PowerBook3,5 | Late 2002 | PowerPC 7455 (G4) | ^^ | 10.5.8 |
| PowerBook5,1 | Early 2003 | ^^ | 10.2.4 | ^^ |
| PowerBook5,2 | Late 2003 | PowerPC 7447 (G4) | 10.2.7 | ^^ |
| PowerBook5,3 | ^^ | ^^ | ^^ | ^^ |
| PowerBook5,4 | Mid-2004 | PowerPC 7447a (G4) | 10.3.3 | ^^ |
| PowerBook5,5 | ^^ | ^^ | ^^ | ^^ |
| PowerBook5,6 | Early 2005 | 10.3.7 | ^^ | ^^ |
| PowerBook5,7 | ^^ | ^^ | ^^ | ^^ |
| PowerBook5,8 | Late 2005 | ^^ | 10.4.2 | ^^ |
| PowerBook5,9 | ^^ | ^^ | ^^ | ^^ |
| PowerBook6,1 | Early 2003 | PowerPC 7455 (G4) | 10.2.3 | ^^ |
| PowerBook6,2 | ^^ | ^^ | ^^ | ^^ |
| PowerBook6,4 | Mid-2004 | PowerPC 7447a (G4) | 10.2.7 | ^^ |
| PowerBook6,8 | Early 2005 | ^^ | 10.3.7 | ^^ |

#### iBook - PowerPC

| SMBIOS | 年份 | CPU 架构 | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| PowerBook2,1 | Mid-1999 | PowerPC 750 (G3) | 8.6 | 10.3.9 |
| PowerBook2,2 | Late 20000 | PowerPC 750cx (G3) | 9.0.4 | 10.4.11 |
| PowerBook4,1 | Late 2002 | PowerPC 7455 (G4) | 9.2.2 | 10.5.8 |
| PowerBook4,2 | Early 2002 | PowerPC 750cx (G3) | 9.2.1 | 10.4.11 |
| PowerBook4,3 | Mid-2002 | PowerPC 750fx (G3) | 9.2.2 | ^^ |
| PowerBook6,3 | Late 2003 | PowerPC 7457 (G4) | 10.3 (7B85) | ^^ |
| PowerBook6,5 | Mid-2004 | PowerPC 7447a (G4) | 10.3.3 (7G51) | 10.5.8 |
| PowerBook6,7 | Mid-2005 | ^^ | 10.4.2 (8D37) | ^^ |

#### PowerMac - PowerPC

| SMBIOS | 年份 | CPU 架构 | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| PowerMac1,1 | Early 1999 | PowerPC 750 (G3) | 8.5.1 | 10.4.11 |
| PowerMac1,2 | Mid 1999 | PowerPC 7400 (G4) | 8.6 | ^^ |
| PowerMac3,1 | ^^ | ^^ | ^^ | ^^ |
| PowerMac3,2 | Mid-2001 | PowerPC 7450 (G4) | 9.2 | ^^ |
| PowerMac3,3 | Mid-2000 | PowerPC 7400 (G4) | 9.0.4 | ^^ |
| PowerMac3,4 | Early 2001 | PowerPC 7410 (G4) | 9.1 | ^^ |
| PowerMac3,5 | Mid-2001 | PowerPC 7450 (G4) | 9.2 | 10.5.8 |
| PowerMac3,6 | Mid-2002 | PowerPC 7455 (G4) | 9.2.2 | ^^ |
| PowerMac7,2 | Mid-2003 | PowerPC 970 (G5) | 10.2.7 | ^^ |
| PowerMac7,3 | Early-2005 | PowerPC 970fx (G5) | 10.4 | ^^ |
| PowerMac9,1 | Late 2004 | ^^ | 10.3.5 (8E90) | ^^ |
| PowerMac11,2 | Late 2005 | PowerPC 970MP (G5) | 10.4.2 | ^^ |

#### iMac - PowerPC

| SMBIOS | 年份 | CPU 架构 | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| iMac,1 | Mid 1998 | PowerPC 750 (G3) | 8.1 | 10.3.9 |
| PowerMac2,1 | Late 1999 | ^^ | 8.6 | 10.4.11 |
| PowerMac2,2 | Mid 2000 | ^^ | 9.0.4 | 10.3.9 |
| PowerMac4,1 | Early 2001 | PowerPC 750cx (G3) | 9.1 | 10.4.11 |
| PowerMac4,2 | Early 2002 | PowerPC 7441 (G4) | 9.2.2 | ^^ |
| PowerMac4,5 | Mid-2002 | PowerPC 7445 (G4) | 9.2.2 | ^^ |
| PowerMac6,1 | Early 2003 | ^^ | 10.2.3 | 10.5.8 |
| PowerMac6,3 | Late 2003 | ^^ | 10.3.1 | ^^ |
| PowerMac8,1 | Mid-2004 | PowerPC 970 (G5) | 10.3.5 (7P35) | ^^ |
| PowerMac8,2 | Mid-2005 | ^^ | 10.4 (8A428) | ^^ |
| PowerMac12,1 | Late 2005 | PowerPC 970fx (G5) | 10.4.2 (8E102) | ^^ |

#### eMac - PowerPC

| SMBIOS | 年份 | CPU 架构 | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| PowerMac4,4 | Mid-2003 | PowerPC 7445 (G4 | 9.2.2 | 10.5.8 |
| PowerMac6,4 | Early 2004 | PowerPC 7447a (G4) | 10.3.3 | ^^ |

#### Cube - PowerPC

| SMBIOS | 年份 | CPU 架构 | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| PowerMac5,1 | Mid-2000 | PowerPC 7400 (G4) | 9.0.4 | 10.4.11 |
| PowerMac5,2 | ^^ | ^^ | ^^ | ^^ |

#### Mac Mini - PowerPC

| SMBIOS | 年份 | CPU 架构 | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| PowerMac10,1 | Early 2005 | PowerPC 7447a (G4) | 10.3.7 (7T11) | 10.5.8 |
| PowerMac10,2 | Late 2005 | ^^ | 10.4.2 (8D40) | ^^ |

#### Xserve - PowerPC

| SMBIOS | 年份 | CPU 架构 | 最初支持的版本 | 最后支持的版本 |
| :--- | :--- | :--- | :--- | :--- |
| RackMac1,1 | Mid-2002 | PowerPC 7455 (G4) | 10.1.5 (6C115) | Server 10.5.8 |
| RackMac1,2 | Early 2003 | ^^ | 10.2.4 (6I34) | ^^ |
| RackMac3,1 | Early 2004 | PowerPC 970fx (G5) | 10.3.0 | ^^ |

:::
