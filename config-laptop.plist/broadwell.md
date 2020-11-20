# Broadwell 笔记本电脑

| 支持 | 版本 |
| :--- | :--- |
| 支持的 OpenCore 版本 | 0.6.3 |
| 初始 macOS 支持版本 | OS X 10.10, Yosemite |

## 起点

虽然制作一个 config.plist 文件似乎很难，但其实并不是。它只是需要一些时间，但是此指南将会告诉你如何配置所有项目，你不会被抛弃在寒风中。这同时代表，如果你有问题，再浏览一遍你的配置以确保它们全部正确。使用 OpenCore 时较为重要的几点：

* **所有属性都必须被定义**，OpenCore 不会自动填上默认值，所以**不要删除任何属性，除非明确地告知了需要删除**。如果本指南没有阐述某个属性，保留它的默认值。
* **Sample.plist 不能直接使用**，你必须将它配置得适合你的电脑。
* **不要使用针对性的配置器（configurator）**，它们只会几乎不会考虑到 OpenCore 的配置，甚至有些配置器——例如 Mackie 的——会添加 Clover 的属性然后使 plist 出错！

尽管如此，还是简短地提示一下我们需要的工具：

* [ProperTree](https://github.com/corpnewt/ProperTree)
  * 通用的 plist 编辑器
* [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS)
  * 用于生成 SMBIOS 数据
* [示例/config.plist](https://github.com/acidanthera/OpenCorePkg/releases)
  * 查看之前的部分以了解如何获得：[config.plist Setup](../config.plist/README.md)

**而且，请在放置好 OpenCore 之前不止一遍地阅读此指南，以确保你已经无误地配置了 OpenCore。记住，指南中的图片并非一直都是最新的，所以请阅读它们下面的文本，如果遇到没有提及的属性，保留它们的默认值即可。**

## ACPI

![ACPI](../images/config/config-laptop.plist/broadwell/acpi.png)

### Add

::: tip 信息

这是你为你的系统添加 SSDT 的地方，它们对于 **引导 macOS** 非常重要，而且很多用于 [定位 USB](https://dortania.github.io/OpenCore-Post-Install/usb/)、 [屏蔽不支持的显卡](https://dortania.github.io/OpenCore-Post-Install/) 等等。 对于我们的的系统来说，**它们甚至是引导时不可或缺的项目**。可以在这里找到制作和使用它们的指南：[**Getting started with ACPI**](https://dortania.github.io/Getting-Started-With-ACPI/)

我们需要添加一些 SSDT 来得到一些 Clover 提供的功能：

| 需要的 SSDT | 说明 |
| :--- | :--- |
| **[SSDT-PLUG](https://dortania.github.io/Getting-Started-With-ACPI/)** | 允许使用 Haswell 或更高版本的 CPU 的原生电源管理。查看 [Getting Started With ACPI Guide](https://dortania.github.io/Getting-Started-With-ACPI/) 以了解更多。 |
| **[SSDT-EC](https://dortania.github.io/Getting-Started-With-ACPI/)** | Fixes the embedded controller, see [Getting Started With ACPI Guide](https://dortania.github.io/Getting-Started-With-ACPI/) 以了解更多。 |
| **[SSDT-GPIO](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/decompiled/SSDT-GPI0.dsl)** | 创建根端，让 VoodooI2C 可以连接，如果 VoodooI2C 运行出现问题可以尝试使用 [SSDT-XOSI](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-XOSI.aml) 来代替。注意，英特尔 NUC 不需要此 SSDT。 |
| **[SSDT-PNLF](https://dortania.github.io/Getting-Started-With-ACPI/)** | 修复亮度控制，查看 [Getting Started With ACPI Guide](https://dortania.github.io/Getting-Started-With-ACPI/) 以了解更多。注意，英特尔 NUC 不需要此 SSDT。 |

注意，你**不应该**在这里添加你生成的 `DSDT.aml`，因为他已经在你的硬件里了。所以它如果已经存在，删除你的 `config.plist` 中对应的条目和位于 EFI/OC/ACPI 目录下的 `DSDT.aml` 。

想了解更深层的内容，例如转存 DSDT、怎样编译 SSDT 并使其符合标准，请查看 [**Getting started with ACPI**](https://dortania.github.io/Getting-Started-With-ACPI/) **页面。** 符合标准的 SSDT 的后缀名为 **.aml** （有些情况下隐藏）而且应当放在 `EFI/OC/ACPI` 目录下，**必须** 在你的 `ACPI -> Add` 中被说明。

:::

### Delete

这个部分会在加载的时候排除一些 ACPI 表，对于我们来说可以忽略。

### Patch

::: tip 信息

这个部分允许我们通过 OpenCore 以动态的方式修改 ACPI 的一部分（例如 DSDT、SSDT 等等）对于我们来说，我们需要以下这些：

* OSI 重命名
  * 当使用 SSDT- XOSI 时需要这个项目，因为我们需要重定向所有 OSI 请求到这个 SSDT，**如果你使用 SSDT-GPIO，则不需要**

| Comment | String | Change _OSI to XOSI |
| :--- | :--- | :--- |
| Enabled | Boolean | YES |
| Count | Number | 0 |
| Limit | Number | 0 |
| Find | Data | 5f4f5349 |
| Replace | Data | 584f5349 |

:::

### Quirks

与 ACPI 有联系的设置，所有内容保持默认，因为我们没有用到这些偏好设置。

## Booter

![Booter](../images/config/config-universal/aptio-iv-booter.png)

这个部分提供与 boot.efi 相关的 OpenRuntime 补丁设置，用于代替 AptioMemoryFix.efi。

### MmioWhitelist

这个部分允许一些本来不被允许的空间直接通过 macOS，与 `DevirtualiseMmio` 搭配时很有用。

### Quirks

::: tip 信息
关于 boot.efi 的补丁和修补硬件的设置，对于我们来说，保持默认值即可。
:::
::: details 更多深层的信息

* **AvoidRuntimeDefrag**: YES
  * 修复 UEFI 运行时服务，例如日期、时间、NVRAM（非易失性随机访问存储器）、电源控制等等。
* **EnableWriteUnprotector**: YES
  * 需要用于从 CR0 寄存器移除写入保护。
* **SetupVirtualMap**: YES
  * 修复 SetVirtualAddresses 请求至虚拟地址，技嘉主板需要此项目以解决较早出现的内核错误。
  
:::

## DeviceProperties

![DeviceProperties](../images/config/config-laptop.plist/broadwell/DeviceProperties.png)

### Add

从一张表设置设备属性。

::: tip PciRoot(0x0)/Pci(0x2,0x0)

这个部分通过 WhateberGreen 的 [Framebuffer Patching Guide（框架缓冲存储器补丁指南）](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md)进行配置，用于设置重要的核芯显卡属性。

当你在设置核芯显卡时，下面的表格应该可以帮助你找到正确的值来设置。这是对于部分值的解释：

* **AAPL,ig-platform-id**
  * 这个属性用于内部设置核芯显卡
* **类型**
  * 说明这个属性是否向笔记本电脑推荐（即拥有内置显示器的）或向英特尔 NUC 推荐（即独立的可接线的“盒子”）

一般情况下，请在设置你的核芯显卡属性时跟随这些步骤。如果有不一样的地方，跟随表格下方的配置注解：

1. 在初始配置你的 config.plist 时，只设置 AAPL,ig-platform-id——通常已经足够了。
2. 如果你在启动（macOS）后没有得到图形加速（7MB 内存和半透明的程序坞背景），那么你可能需要尝试不同的 `AAPL,ig-platform-id` 值，添加预留图形内存布丁，甚至是添加一个 `device-id` 属性。

| AAPL,ig-platform-id | 类型 | 注释 |
| ------------------- | ---- | ------- |
| **06002616** | Laptop | Broadwell 笔记本电脑的推荐值 |
| **02001616** | NUC | Broadwell NUC 的推荐值 |

##### 配置注解

* 对于 HD5600 你需要添加 `device-id` 并伪装为 `16260000`：

| Key | Type | Value |
| :--- | :--- | :--- |
| device-id | data | 26160000

* 在有些情况下，你无法在你的 UEFI 固件中设置动态显存技术中的预留部分为 96MB 或更高，那么你可能会遇到内核错误。通常它们将预留部分设置为 32MB，在那种情况下，这些值需要添加到你的核芯显卡属性

| Key | Type | Value |
| :--- | :--- | :--- |
| framebuffer-patch-enable | Data | 01000000 |
| framebuffer-stolenmem | Data | 00003001 |
| framebuffer-fbmem | Data | 00009000 |

:::

::: tip PciRoot(0x0)/Pci(0x1b,0x0)

`layout-id`

* 为应用 AppleALC 音频注入，你需要对“你的主板上用的是哪个音频解码器”和“选择与其匹配的 AppleALC 的布局”进行你自己的研究。[AppleALC Supported Codecs](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs).
* 你可以直接删除这项属性，因为我们现在暂时用不到它。

对于我们来说，我们会使用启动参数 `alcid=xxx` 来替代以达到同样目标。 `alcid` 会覆盖所有其他存在的布局 ID。关于此项目的更多信息收录于 [OpenCore 安装后指南](https://dortania.github.io/OpenCore-Post-Install/)

:::

### Delete

从表中删除设备属性，对于我们来说可以忽略。

## Kernel

![Kernel](../images/config/config-universal/kernel-legacy-XCPM.png)

### Add

这里是具体说明哪个内核扩展将会被加载、以怎样的顺序加载及每个内核扩展所支持的架构的地方。一般情况下我们推荐保持由 ProperTree 完成的内容。然而 32 位 CPU 请看下面：

::: details 更多深层的信息

你需要始终记得的主要事情是：

* 加载顺序
  * 记住，所有的插件要在它的依赖*之后*加载。
  * 这也表明一些像 Lilu 一样的内核扩展**必须** 在 VirtualSMC、AppleALC、WhateverGreen 等等之前加载。

一个简短的提示，[ProperTree](https://github.com/corpnewt/ProperTree) 的用户可以执行 **Cmd/Ctrl + Shift + R** 以按照正确的顺序添加他们的所有内核扩展，而不用手动填写每个内核扩展。

* **Arch**
  * 此内核扩展所支持的架构
  * 当前支持的值有 `Any`、 `i386`（32 位）和 `x86_64`（64 位）
* **BundlePath**
  * 内核扩展的名称
  * 例如：`Lilu.kext`
* **Enabled**
  * 已经自己解释了，要么启用，要么禁用内核扩展
* **ExecutablePath**
  * 隐藏在内核扩展中的实际的可执行文件的路径，你可以通过右键单击并选择 `Show Package Contents`（`显示包内容`）来查看你的内核扩展的可执行文件路径。一般情况下，它们都是 `Contents/MacOS/Kext`，但有些也会在 `Plugin` 有内核扩展。注意，只有 plist 的内核扩展不需要填写此项。
  * 例如：`Contents/MacOS/Lilu`
* **MinKernel**
  * 你的内核扩展被注入的最低内核版本，查看下方的表格以获得更多可选的值
  * 例如：`12.00.00` for OS X 10.8
* **MaxKernel**
  * 你的内核扩展被注入的最高内核版本，查看下方的表格以获得更多可选的值
  * 例如：`11.99.99` for OS X 10.7
* **PlistPath**
  * 隐藏在内核扩展中的 `info.plist` 的路径
  * 例如：`Contents/Info.plist`
  
::: details 内核支持表格

| macOS/OS X 版本 | MinKernel | MaxKernel |
| :--- | :--- | :--- |
| 10.4 | 8.0.0 | 8.99.99 |
| 10.5 | 9.0.0 | 9.99.99 |
| 10.6 | 10.0.0 | 10.99.99 |
| 10.7 | 11.0.0 | 11.99.99 |
| 10.8 | 12.0.0 | 12.99.99 |
| 10.9 | 13.0.0 | 13.99.99 |
| 10.10 | 14.0.0 | 14.99.99 |
| 10.11 | 15.0.0 | 15.99.99 |
| 10.12 | 16.0.0 | 16.99.99 |
| 10.13 | 17.0.0 | 17.99.99 |
| 10.14 | 18.0.0 | 18.99.99 |
| 10.15 | 19.0.0 | 19.99.99 |
| 11 | 20.0.0 | 20.99.99 |

:::

### Emulate

需要用于伪装不支持的 CPU，例如奔腾和赛扬

* **CpuidMask**：留空
* **CpuidData**：留空

### Force

用于从系统卷中加载内核扩展，仅适用于缓存中没有某些内核扩展的旧操作系统（例如 OS X 10.6 中的 IONetworkingFamily）。

对于我们来说可以忽略。

### Block

在加载的时候排除一些内核扩展。与我们无关。

### Patch

同时为内核和内核扩展应用补丁。

### Quirks

::: tip 信息

设置与内核有关，对于我们来说打开以下的偏好设置即可：

| Quirk | Enabled | 注释 |
| :--- | :--- | :--- |
| AppleCpuPmCfgLock | NO | 如果要运行 10.10 或更低版本，或者无法在 BIOS 里关闭 `CFG-Lock`，则需要打开 |
| AppleXcpmCfgLock | YES | 如果 `CFG-Lock` 已经在 BIOS 中关闭，则不需要打开 |
| DisableIOMapper | YES | 如果 `VT-D` 已经在 BIOS 中关闭，则不需要打开 |
| LapicKernelPanic | NO | 惠普设备需要这个偏好设置 |
| PanicNoKextDump | YES | |
| PowerTimeoutKernelPanic | YES | |
| XhciPortLimit | YES | |

:::

::: details 更多深层的信息

* **AppleCpuPmCfgLock**: NO
  * 只在 CFG-Lock 无法在 BIOS 中关闭时需要
  * 只能在 Ivy Bridge 或更旧的 CPU 上使用
    * 注意：Broadwell 或更旧的 CPU 当运行 10.10 或更旧的操作系统时需要此项
* **AppleXcpmCfgLock**: YES
  * 只在 CFG-Lock 无法在 BIOS 中关闭时需要
  * 只能在 Haswell 或更旧的 CPU 上使用
    * 注意：Ivy Bridge-E 也包括在内，因为它支持 XCPM
* **CustomSMBIOSGuid**: NO
  * 在 UpdateSMBIOSMode 设置为 `Custom` 时使用 GUID 补丁。通常戴尔的笔记本电脑会需要
  * 在 UpdateSMBIOSMode 设置为 Custom 模式时打开此项也可以让 SMBIOS 不要注入为非 Apple 操作系统，然而我们不认可这种方式，因为它会破坏 Bootcamp 的兼容性。在你自己承担风险时使用
* **DisableIoMapper**: YES
  * 如果在 BIOS 中无法关闭 VT-D 或其他的操作系统需要它，则使用此项绕过 VT-D，更好地代替了 `dart=0`，因为 SIP（系统完整性保护）可以在 macOS 10.15 Catalina 中保持开启。
* **DisableLinkeditJettison**: YES
  * 允许 Lilu 和其他内核扩展在不使用 `keepsyms=1` 时获得更可靠的性能
* **DisableRtcChecksum**: NO
  * 在写入最初校验和（0x58-0x59）时阻止 AppleRTC，进行 BIOS 重置或在重启/关机后自动进入安全模式的用户需要此项。
* **ExtendBTFeatureFlags** NO
  * 对于在非 Apple 或非奋威网卡上出现持续性问题有帮助
* **LapicKernelPanic**: NO
  * 使 AP 核心被 LAPIC（本地高级可编程中断控制器）中断时不发生内核错误，一般用于惠普的设备。Clover 中与其有相同效果的是 `Kernel LAPIC`
* **LegacyCommpage**: NO
  * 为 64 位处理器解决在 macOS 中对 SSSE3 的依赖，主要用于 64 位奔腾 4 CPU（例如：Prescott）
* **PanicNoKextDump**: YES
  * 允许在内核错误来临时读取内核错误日志
* **PowerTimeoutKernelPanic**: YES
  * 帮助修复 Catalina 中电源改变后由 Apple 驱动程序引起的内核错误，尤其是数字音频。
* **XhciPortLimit**: YES
  * 这其实是 15 个接口限制的补丁，不要依赖于它，因为不能保证它是修复 USB 的解决方案。请在可能的时候 [定位 USB](https://dortania.github.io/OpenCore-Post-Install/usb/)。

原因就是 UsbInjectAll 在 macOS 中内建的工具没有适当的电流调节。用一个只有 plist 的内核扩展来描述你的接口更为简洁，并且不会浪费运行时的内存等等。

:::

### Scheme

设置与经典启动（Legacy booting）有关（例如 10.4-10.6），大多数情况下你可以跳过，然而对于一些使用经典启动的操作系统，你可以查看下方：

::: details 更多深层的信息

* **FuzzyMatch**: True
  * 用于忽略内核在缓存时的校验和，以代替选择最新的可用缓存。可以帮助在很多运行 10.6 的设备上提高引导性能。
* **KernelArch**: x86_64
  * 设置内核的架构类型，你可以在 `Auto`, `i386`（32 位）和 `x86_64`（64 位）中选择。
  * 如果你要引导需要 32 位内核的旧操作系统（例如 10.4 和 10.5），我们推荐将其设置为 `Auto` 并让 macOS 基于你的 SMBIOS 进行抉择。查看下面的表格以获得所有支持的值：
    * 10.4-10.5 — `x86_64`、`i386` 或 `i386-user32`
      * `i386-user32` 指向 32 位用户控件，所以 32 位 CPU 必须使用这个值（或是缺少 SSSE3 的 CPU）
      * `x86_64` 将会仍然包含一个 32 位的内核空间，然而将会在 10.4/10.5 中确保用户空间是 64 位的
    * 10.6 — `i386`、`i386-user32` 或 `x86_64`
    * 10.7 — `i386` 或 `x86_64`
    * 10.8 or newer — `x86_64`

* **KernelCache**: Auto
  * 设置内核缓存类型，主要对调试有用，所以我们推荐设置为 `Auto` 以获得最好的支持

:::

## Misc

![Misc](../images/config/config-universal/misc.png)

### Boot

Settings for boot screen (Leave everything as default).

### Debug

::: tip Info

Helpful for debugging OpenCore boot issues(We'll be changing everything *but* `DisplayDelay`):

| Quirk | Enabled |
| :--- | :--- |
| AppleDebug | YES |
| ApplePanic | YES |
| DisableWatchDog | YES |
| Target | 67 |

:::

::: details More in-depth Info

* **AppleDebug**: YES
  * Enables boot.efi logging, useful for debugging. Note this is only supported on 10.15.4 and newer
* **ApplePanic**: YES
  * Attempts to log kernel panics to disk
* **DisableWatchDog**: YES
  * Disables the UEFI watchdog, can help with early boot issues
* **DisplayLevel**: `2147483650`
  * Shows even more debug information, requires debug version of OpenCore
* **SerialInit**: NO
  * Needed for setting up serial output with OpenCore
* **SysReport**: NO
  * Helpful for debugging such as dumping ACPI tables
  * Note that this is limited to DEBUG versions of OpenCore
* **Target**: `67`
  * Shows more debug information, requires debug version of OpenCore

These values are based of those calculated in [OpenCore debugging](../troubleshooting/debug.md)

:::

### Security

::: tip Info

Security is pretty self-explanatory, **do not skip**. We'll be changing the following:

| Quirk | Enabled | Comment |
| :--- | :--- | :--- |
| AllowNvramReset | YES | |
| AllowSetDefault | YES | |
| ScanPolicy | 0 | |
| SecureBootModel | Default |  This is a word and is case-sensitive, set to `Disabled` if you do not want secure boot(ie. you require Nvidia's Web Drivers) |
| Vault | Optional | This is a word, it is not optional to omit this setting. You will regret it if you don't set it to Optional, note that it is case-sensitive |

:::

::: details More in-depth Info

* **AllowNvramReset**: YES
  * Allows for NVRAM reset both in the boot picker and when pressing `Cmd+Opt+P+R`
* **AllowSetDefault**: YES
  * Allow `CTRL+Enter` and `CTRL+Index` to set default boot device in the picker
* **ApECID**: 0
  * Used for netting personalized secure-boot identifiers, currently this quirk is unreliable due to a bug in the macOS installer so we highly encourage you to leave this as default.
* **AuthRestart**: NO
  * Enables Authenticated restart for FileVault 2 so password is not required on reboot. Can be considered a security risk so optional
* **BootProtect**: Bootstrap
  * Allows the use of Bootstrap.efi inside EFI/OC/Bootstrap instead of BOOTx64.efi, useful for those wanting to either boot with rEFInd or avoid BOOTx64.efi overwrites from Windows. Proper use of this quirks is covered here: [Using Bootstrap.efi](https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap.html#preparation)
* **DmgLoading**: Signed
  * Ensures only signed DMGs load
* **ExposeSensitiveData**: `6`
  * Shows more debug information, requires debug version of OpenCore
* **Vault**: `Optional`
  * We won't be dealing vaulting so we can ignore, **you won't boot with this set to Secure**
  * This is a word, it is not optional to omit this setting. You will regret it if you don't set it to `Optional`, note that it is case-sensitive
* **ScanPolicy**: `0`
  * `0` allows you to see all drives available, please refer to [Security](https://dortania.github.io/OpenCore-Post-Install/universal/security.html) section for further details. **Will not boot USB devices with this set to default**
* **SecureBootModel**: Default
  * Enables Apple's secure boot functionality in macOS, please refer to [Security](https://dortania.github.io/OpenCore-Post-Install/universal/security.html) section for further details.
  * Note: Users may find upgrading OpenCore on an already installed system can result in early boot failures. To resolve this, see here: [Stuck on OCB: LoadImage failed - Security Violation](/troubleshooting/extended/kernel-issues.md#stuck-on-ocb-loadimage-failed-security-violation)

:::

### Tools

Used for running OC debugging tools like the shell, ProperTree's snapshot function will add these for you.

### Entries

Used for specifying irregular boot paths that can't be found naturally with OpenCore.

Won't be covered here, see 8.6 of [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) for more info

## NVRAM

![NVRAM](../images/config/config-universal/nvram.png)

### Add

::: tip 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14

Used for OpenCore's UI scaling, default will work for us. See in-depth section for more info

:::

::: details More in-depth Info

Booter Path, mainly used for UI Scaling

* **UIScale**:
  * `01`: Standard resolution
  * `02`: HiDPI (generally required for FileVault to function correctly on smaller displays)

* **DefaultBackgroundColor**: Background color used by boot.ef
  * `00000000`: Syrah Black
  * `BFBFBF00`: Light Gray

:::

::: tip 4D1FDA02-38C7-4A6A-9CC6-4BCCA8B30102

OpenCore's NVRAM GUID, mainly relevant for RTCMemoryFixup users

:::

::: details More in-depth Info

* **rtc-blacklist**: <>
  * To be used in conjunction with RTCMemoryFixup, see here for more info: [Fixing RTC write issues](https://dortania.github.io/OpenCore-Post-Install/misc/rtc.html#finding-our-bad-rtc-region)
  * Most users can ignore this section

:::

::: tip 7C436110-AB2A-4BBB-A880-FE41995C9F82

System Integrity Protection bitmask

* **General Purpose boot-args**:

| boot-args | Description |
| :--- | :--- |
| **-v** | This enables verbose mode, which shows all the behind-the-scenes text that scrolls by as you're booting instead of the Apple logo and progress bar. It's invaluable to any Hackintosher, as it gives you an inside look at the boot process, and can help you identify issues, problem kexts, etc. |
| **debug=0x100** | This disables macOS's watchdog which helps prevents a reboot on a kernel panic. That way you can *hopefully* glean some useful info and follow the breadcrumbs to get past the issues. |
| **keepsyms=1** | This is a companion setting to debug=0x100 that tells the OS to also print the symbols on a kernel panic. That can give some more helpful insight as to what's causing the panic itself. |
| **alcid=1** | Used for setting layout-id for AppleALC, see [supported codecs](https://github.com/acidanthera/applealc/wiki/supported-codecs) to figure out which layout to use for your specific system. More info on this is covered in the [Post-Install Page](https://dortania.github.io/OpenCore-Post-Install/) |

* **GPU-Specific boot-args**:

| boot-args | Description |
| :--- | :--- |
| **-wegnoegpu** | Used for disabling all other GPUs than the integrated Intel iGPU, useful for those wanting to run newer versions of macOS where their dGPU isn't supported |

* **csr-active-config**: `00000000`
  * Settings for 'System Integrity Protection' (SIP). It is generally recommended to change this with `csrutil` via the recovery partition.
  * csr-active-config by default is set to `00000000` which enables System Integrity Protection. You can choose a number of different values but overall we recommend keeping this enabled for best security practices. More info can be found in our troubleshooting page: [Disabling SIP](../troubleshooting/extended/post-issues.md#disabling-sip)

* **run-efi-updater**: `No`
  * This is used to prevent Apple's firmware update packages from installing and breaking boot order; this is important as these firmware updates (meant for Macs) will not work.

* **prev-lang:kbd**: <>
  * Needed for non-latin keyboards in the format of `lang-COUNTRY:keyboard`, recommended to keep blank though you can specify it(**Default in Sample config is Russian**):
  * American: `en-US:0`(`656e2d55533a30` in HEX)
  * Full list can be found in [AppleKeyboardLayouts.txt](https://github.com/acidanthera/OpenCorePkg/blob/master/Utilities/AppleKeyboardLayouts/AppleKeyboardLayouts.txt)
  * Hint: `prev-lang:kbd` can be changed into a String so you can input `en-US:0` directly instead of converting to HEX

| Key | Type | Value |
| :--- | :--- | :--- |
| prev-lang:kbd | String | en-US:0 |

:::

### Delete

Forcibly rewrites NVRAM variables, do note that `Add` **will not overwrite** values already present in NVRAM so values like `boot-args` should be left alone.

* **LegacyEnable**: NO
  * Allows for NVRAM to be stored on nvram.plist, needed for systems without native NVRAM

* **LegacyOverwrite**: NO
  * Permits overwriting firmware variables from nvram.plist, only needed for systems without native NVRAM

* **LegacySchema**:
  * Used for assigning NVRAM variables, used with LegacyEnable set to YES

* **WriteFlash**: YES
  * Enables writing to flash memory for all added variables.

## PlatformInfo

![PlatformInfo](../images/config/config-laptop.plist/broadwell/smbios.png)

::: tip Info

For setting up the SMBIOS info, we'll use CorpNewt's [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS) application.

For this Broadwell example, we chose the MacBookPro12,1 SMBIOS. The typical breakdown is as follows:

| SMBIOS | CPU Type | GPU Type | Display Size |
| :--- | :--- | :--- | :--- |
| MacBook8,1 | Dual Core 7w(Low End) | iGPU: HD 5300 | 12" |
| MacBookAir7,1 | Dual Core 15w | iGPU: HD 6000 | 11" |
| MacBookAir7,2 | Dual Core 15w | iGPU: HD 6000 | 13" |
| MacBookPro12,1 | Dual Core 28w(High End) | iGPU: Iris 6100 | 13" |
| MacBookPro11,2 | Quad Core 45w | iGPU: Iris Pro 5200 | 15" |
| MacBookPro11,3 | Quad Core 45w | iGPU: Iris Pro 5200 + dGPU: GT750M | 15" |
| MacBookPro11,4 | Quad Core 45w | iGPU: Iris Pro 5200 | 15" |
| MacBookPro11,5 | Quad Core 45w | iGPU: Iris Pro 5200 + dGPU: R9 M370X | 15" |
| iMac16,1 | NUC Systems | HD 6000/Iris Pro 6200 |  N/A |

Run GenSMBIOS, pick option 1 for downloading MacSerial and Option 3 for selecting out SMBIOS.  This will give us an output similar to the following:

```sh
  #######################################################
 #               MacBookPro12,1 SMBIOS Info            #
#######################################################

Type:         MacBookPro12,1
Serial:       C02M9SYJFY10
Board Serial: C02408101J9G2Y7A8
SmUUID:       7B227BEC-660D-405F-8E60-411B3E4EF055
```

The `Type` part gets copied to Generic -> SystemProductName.

The `Serial` part gets copied to Generic -> SystemSerialNumber.

The `Board Serial` part gets copied to Generic -> MLB.

The `SmUUID` part gets copied to Generic -> SystemUUID.

We set Generic -> ROM to either an Apple ROM (dumped from a real Mac), your NIC MAC address, or any random MAC address (could be just 6 random bytes, for this guide we'll use `11223300 0000`. After install follow the [Fixing iServices](https://dortania.github.io/OpenCore-Post-Install/) page on how to find your real MAC Address)

##### Reminder that you want either an invalid serial or valid serial numbers but those not in use, you want to get a message back like: "Invalid Serial" or "Purchase Date not Validated"

[Apple Check Coverage page](https://checkcoverage.apple.com)

**Automatic**: YES

* Generates PlatformInfo based on Generic section instead of DataHub, NVRAM, and SMBIOS sections

:::

### Generic

::: details More in-depth Info

* **AdviseWindows**: NO
  * Used for when the EFI partition isn't first on the Windows drive

* **SystemMemoryStatus**: Auto
  * Sets whether memory is soldered or not in SMBIOS info, purely cosmetic and so we recommend `Auto`
  
* **ProcessorType**: `0`
  * Set to `0` for automatic type detection, however this value can be overridden if desired. See [AppleSmBios.h](https://github.com/acidanthera/OpenCorePkg/blob/master/Include/Apple/IndustryStandard/AppleSmBios.h) for possible values

* **SpoofVendor**: YES
  * Swaps vendor field for Acidanthera, generally not safe to use Apple as a vendor in most case

* **UpdateDataHub**: YES
  * Update Data Hub fields

* **UpdateNVRAM**: YES
  * Update NVRAM fields

* **UpdateSMBIOS**: YES
  * Updates SMBIOS fields

* **UpdateSMBIOSMode**: Create
  * Replace the tables with newly allocated EfiReservedMemoryType, use `Custom` on Dell laptops requiring `CustomSMBIOSGuid` quirk
  * Setting to `Custom` with `CustomSMBIOSGuid` quirk enabled can also disable SMBIOS injection into "non-Apple" OSes however we do not endorse this method as it breaks Bootcamp compatibility. Use at your own risk

:::

## UEFI

![UEFI](../images/config/config-universal/aptio-iv-uefi-laptop.png)

**ConnectDrivers**: YES

* Forces .efi drivers, change to NO will automatically connect added UEFI drivers. This can make booting slightly faster, but not all drivers connect themselves. E.g. certain file system drivers may not load.

### Drivers

Add your .efi drivers here.

Only drivers present here should be:

* HfsPlus.efi
* OpenRuntime.efi

### APFS

Settings related to the APFS driver, leave everything here as default.

### Audio

Related to AudioDxe settings, for us we'll be ignoring(leave as default). This is unrelated to audio support in macOS.

* For further use of AudioDxe and the Audio section, please see the Post Install page: [Add GUI and Boot-chime](https://dortania.github.io/OpenCore-Post-Install/)

### Input

Related to boot.efi keyboard passthrough used for FileVault and Hotkey support, leave everything here as default as we have no use for these quirks. See here for more details: [Security and FileVault](https://dortania.github.io/OpenCore-Post-Install/)

### Output

Relating to OpenCore's visual output,  leave everything here as default as we have no use for these quirks.

### ProtocolOverrides

Mainly relevant for Virtual machines, legacy macs and FileVault users. See here for more details: [Security and FileVault](https://dortania.github.io/OpenCore-Post-Install/)

### Quirks

::: tip Info
Relating to quirks with the UEFI environment, for us we'll be changing the following:

| Quirk | Enabled | Comment |
| :--- | :--- | :--- |
| IgnoreInvalidFlexRatio | YES | |
| ReleaseUsbOwnership | YES | |
| UnblockFsConnect | NO | Needed mainly by HP motherboards |

:::

::: details More in-depth Info

* **DeduplicateBootOrder**: YES
  * Request fallback of some Boot prefixed variables from `OC_VENDOR_VARIABLE_GUID` to `EFI_GLOBAL_VARIABLE_GUID`. Used for fixing boot options.

* **IgnoreInvalidFlexRatio**: YES
  * Fix for when MSR_FLEX_RATIO (0x194) can't be disabled in the BIOS, required for all pre-Skylake based systems
* **ReleaseUsbOwnership**: YES
  * Releases USB controller from firmware driver, needed for when your firmware doesn't support EHCI/XHCI Handoff. Most laptops have garbage firmwares so we'll need this as well
* **RequestBootVarRouting**: YES
  * Redirects AptioMemoryFix from `EFI_GLOBAL_VARIABLE_GUID` to `OC_VENDOR_VARIABLE_GUID`. Needed for when firmware tries to delete boot entries and is recommended to be enabled on all systems for correct update installation, Startup Disk control panel functioning, etc.

* **UnblockFsConnect**: NO
  * Some firmware block partition handles by opening them in By Driver mode, which results in File System protocols being unable to install. Mainly relevant for HP systems when no drives are listed

:::

### ReservedMemory

Used for exempting certain memory regions from OSes to use, mainly relevant for Sandy Bridge iGPUs or systems with faulty memory. Use of this quirk is not covered in this guide

## Cleaning up

And now you're ready to save and place it into your EFI under EFI/OC.

For those having booting issues, please make sure to read the [Troubleshooting section](https://dortania.github.io/OpenCore-Install-Guide/troubleshooting/troubleshooting.html) first and if your questions are still unanswered we have plenty of resources at your disposal:

* [r/Hackintosh Subreddit](https://www.reddit.com/r/hackintosh/)
* [r/Hackintosh Discord](https://discord.gg/2QYd7ZT)

**Sanity check**:

So thanks to the efforts of Ramus, we also have an amazing tool to help verify your config for those who may have missed something:

* [**Sanity Checker**](https://opencore.slowgeek.com)

Note that this tool is neither made nor maintained by Dortania, any and all issues with this site should be sent here: [Sanity Checker Repo](https://github.com/rlerdorf/OCSanity)

### Config reminders

**HP Users**:

* Kernel -> Quirks -> LapicKernelPanic -> True
  * You will get a kernel panic on LAPIC otherwise
* UEFI -> Quirks -> UnblockFsConnect -> True

## Intel BIOS settings

* Note: Most of these options may not be present in your firmware, we recommend matching up as closely as possible but don't be too concerned if many of these options are not available in your BIOS

### Disable

* Fast Boot
* Secure Boot
* Serial/COM Port
* Parallel Port
* VT-d (can be enabled if you set `DisableIoMapper` to YES)
* CSM
* Thunderbolt(For initial install, as Thunderbolt can cause issues if not setup correctly)
* Intel SGX
* Intel Platform Trust
* CFG Lock (MSR 0xE2 write protection)(**This must be off, if you can't find the option then enable `AppleXcpmCfgLock` under Kernel -> Quirks. Your hack will not boot with CFG-Lock enabled**)
  * For 10.10 and older, you'll need to enable AppleCpuPmCfgLock as well

### Enable

* VT-x
* Above 4G decoding
* Hyper-Threading
* Execute Disable Bit
* EHCI/XHCI Hand-off
* OS type: Windows 8.1/10 UEFI Mode
* DVMT Pre-Allocated(iGPU Memory): 64MB
* SATA Mode: AHCI

## Now with all this done, head to the [Installation Page](../installation/installation-process.md)
