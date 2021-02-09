(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{487:function(t,e,a){t.exports=a.p+"assets/img/good-efi.cdd27487.png"},488:function(t,e,a){t.exports=a.p+"assets/img/bad-efi.3a816e2e.png"},628:function(t,e,a){"use strict";a.r(e);var r=a(25),n=Object(r.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"安装过程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#安装过程"}},[t._v("#")]),t._v(" 安装过程")]),t._v(" "),r("p",[t._v("现在，您已完成 OpenCore 的设置，您终于能够启动，但是有一些主要的事情需要记住：")]),t._v(" "),r("ul",[r("li",[t._v("对于 macOS 启用最佳的 BIOS 设置")]),t._v(" "),r("li",[t._v("阅读 "),r("a",{attrs:{href:"https://hackintosh-multiboot.gitbook.io/hackintosh-multiboot/",target:"_blank",rel:"noopener noreferrer"}},[t._v("多引导指南"),r("OutboundLink")],1),t._v(" ，看一看 "),r("a",{attrs:{href:"https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap.html#prerequisites",target:"_blank",rel:"noopener noreferrer"}},[t._v("Multiboot"),r("OutboundLink")],1),t._v(" 特定的设置项\n"),r("ul",[r("li",[t._v("主要与把多个系统装在一个硬盘上的用户有关")])])]),t._v(" "),r("li",[t._v("和 "),r("RouterLink",{attrs:{to:"/troubleshooting/troubleshooting.html"}},[t._v("一般故障处理")]),t._v(" 页面")],1),t._v(" "),r("li",[t._v("阅读 "),r("RouterLink",{attrs:{to:"/troubleshooting/boot.html"}},[t._v("macOS 启动过程")]),t._v(" "),r("ul",[r("li",[t._v("可以帮助第一次安装的人更好地理解他们可能被卡住的地方")])])],1),t._v(" "),r("li",[t._v("还有极度的耐心")])]),t._v(" "),r("h2",{attrs:{id:"仔细检查您的工作"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#仔细检查您的工作"}},[t._v("#")]),t._v(" 仔细检查您的工作")]),t._v(" "),r("p",[t._v("在启动之前，我们应关注的最后一件事是您的 EFI 是如何设置的：")]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",{staticStyle:{"text-align":"center"}},[t._v("好的 EFI")]),t._v(" "),r("th",{staticStyle:{"text-align":"center"}},[t._v("坏的 EFI")])])]),t._v(" "),r("tbody",[r("tr",[r("td",{staticStyle:{"text-align":"center"}},[r("img",{attrs:{src:a(487),alt:""}})]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[r("img",{attrs:{src:a(488),alt:""}})])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[t._v("在 EFI 分区上找的到 EFI 文件夹")]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[t._v("没有 EFI 文件夹")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[t._v("编译好的 ACPI 文件（.aml）")]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[t._v("未编译的 ACPI 文件（.dsl）")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[t._v("不包括 DSDT")]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[t._v("* 包括 DSDT")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[t._v("已删除不必要的驱动程序（.efi）")]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[t._v("使用默认的驱动程序")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[t._v("已删除不必要的工具（.efi）")]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[t._v("保留默认工具")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[t._v("Kexts 文件夹中的所有文件都以 .kext 结束")]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[t._v("包括源代码和文件夹")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[t._v("在 EFI/OC 下找得到 config.plist")]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[t._v("既不重命名也不将 .plist 放置在正确的位置")])]),t._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[t._v("仅使用所需的内核扩展")]),t._v(" "),r("td",{staticStyle:{"text-align":"center"}},[t._v("下载了列出的每个内核扩展")])])])]),t._v(" "),r("p",[t._v("提醒一下， 配置检查网站是一个非常好用的在线工具：")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://opencore.slowgeek.com",target:"_blank",rel:"noopener noreferrer"}},[r("strong",[t._v("配置检查器")]),r("OutboundLink")],1)])]),t._v(" "),r("h2",{attrs:{id:"启动opencore-usb"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#启动opencore-usb"}},[t._v("#")]),t._v(" 启动OpenCore USB")]),t._v(" "),r("p",[t._v("所以现在，你终于准备好把 U 盘插入电脑并从它启动了。请记住，大多数笔记本电脑和一些台式机仍然会默认使用 Windows 的内部驱动器，您需要在 BIOS 启动选项中手动选择 OpenCore。你需要查找用户手册或使用谷歌来找出使用什么 Fn 键来访问 BIOS 和启动菜单（例如：Esc、F2、F10 或 F12）")]),t._v(" "),r("p",[t._v("一旦你从 USB 启动，你可能会看到以下启动选项:")]),t._v(" "),r("ol",[r("li",[t._v("Windows")]),t._v(" "),r("li",[t._v("macOS Base System (External) / Install macOS Catalina (External)")]),t._v(" "),r("li",[t._v("OpenShell.efi")]),t._v(" "),r("li",[t._v("Reset NVRAM")])]),t._v(" "),r("p",[t._v("对我们来说， "),r("strong",[t._v("选项 2.")]),t._v(" 是我们想要的。根据安装程序的制作方式，如果在 Linux 或 Windows 中创建，它可以显示为**“macOS Base System (External)”** 如果在 macOS 中创建，则显示为 "),r("strong",[t._v("“Install macOS Catalina (External)”")])]),t._v(" "),r("h2",{attrs:{id:"macos-安装程序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#macos-安装程序"}},[t._v("#")]),t._v(" macOS 安装程序")]),t._v(" "),r("p",[t._v("所以，您终于启动了安装程序，完成了冗长的操作并进入安装程序!现在你已经走到这一步了，主要的事情要记住:")]),t._v(" "),r("ul",[r("li",[t._v("要安装macOS的驱动器必须同时具有 "),r("strong",[t._v("GUID分区方案")]),t._v("和"),r("strong",[t._v("APFS")]),t._v(" "),r("ul",[r("li",[t._v("机械硬盘（HDD）上的 High Sierra 和所有的 Sierra 用户需要使用 macOS 日志式（HFS+）")])])]),t._v(" "),r("li",[t._v("这个驱动器也 "),r("strong",[t._v("必须")]),t._v(" 拥有一个 200MB 的分区\n"),r("ul",[r("li",[t._v("默认情况下，macOS 将安装 200MB 的新格式化驱动器")]),t._v(" "),r("li",[t._v("参见"),r("a",{attrs:{href:"https://hackintosh-multiboot.gitbook.io/hackintosh-multiboot/",target:"_blank",rel:"noopener noreferrer"}},[t._v("多启动项指南"),r("OutboundLink")],1),t._v("获得有关 Windows 驱动器分区的更多信息")])])])]),t._v(" "),r("p",[t._v("一旦开始安装，您将需要等待直到系统重新启动。您将再次想要引导到OpenCore，但不是选择您的USB安装程序/恢复-您将想要选择macOS安装程序在硬盘上继续安装。你应该得到一个苹果标志，几分钟后你应该在底部得到一个计时器，上面写着“还有x分钟”。这可能是喝点饮料或吃点零食的好时机，因为这需要一段时间。它可能会重启几次，但如果一切顺利，它最终会弹出“设置你的Mac屏幕”。")]),t._v(" "),r("p",[t._v("完成! 🎉\n您需要浏览安装后页面来完成系统的设置。")])])}),[],!1,null,null,null);e.default=n.exports}}]);