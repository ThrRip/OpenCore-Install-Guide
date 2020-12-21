const {
    description
} = require('../package')

module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },

    title: 'OpenCore 安装指南',
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ["link", {
            rel: "'stylesheet",
            href: "/styles/website.css"
        },]
    ],
    base: '/OpenCore-Install-Guide/',

    watch: {
        $page(newPage, oldPage) {
            if (newPage.key !== oldPage.key) {
                requestAnimationFrame(() => {
                    if (this.$route.hash) {
                        const element = document.getElementById(this.$route.hash.slice(1));

                        if (element && element.scrollIntoView) {
                            element.scrollIntoView();
                        }
                    }
                });
            }
        }
    },

    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-multimd-table'), {
                rowspan: true,
            });
        }
    },

    theme: 'vuepress-theme-succinct',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: true,
        repo: 'https://github.com/ThrRip/OpenCore-Install-Guide',
        editLinks: true,
        editLinkText: '帮助我们改进此页面！',
        logo: 'homepage.png',
        nav: [{
            text: 'Dortania 指南系列 - 由 ThrRip 翻译',
            ariaLabel: '语言菜单',
            items: [{
                text: 'ThrRip 开源主站',
                link: 'https://thrrip.github.io/'
            },
            {
                text: 'ACPI 快速入门',
                link: 'https://dortania.github.io/Getting-Started-With-ACPI/'
            },
            {
                text: 'OpenCore 安装后指南',
                link: 'https://dortania.github.io/OpenCore-Post-Install/'
            },
            {
                text: 'GPU 买家指南',
                link: 'https://dortania.github.io/GPU-Buyers-Guide/'
            },
            {
                text: '无线网卡买家指南',
                link: 'https://dortania.github.io/Wireless-Buyers-Guide/'
            },
            {
                text: 'Hackintosh 硬件避坑指南',
                link: 'https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/'
            },
            ]
        },
        ],
        sidebar: [{
            title: '介绍',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                'prerequisites',
                {
                    title: '硬件限制',
                    collapsable: true,
                    path: 'macos-limits',
                    children: [
                        'find-hardware'
                    ]
                },
                'terminology',
                'why-oc',
            ]

        },
        {
            title: '创建 USB',
            collapsable: false,
            sidebarDepth: 2,
            children: [{
                title: '创建 USB',
                collapsable: true,
                path: '/installer-guide/',
                sidebarDepth: 1,
                children: [
                    '/installer-guide/mac-install',
                    '/installer-guide/winblows-install',
                    '/installer-guide/linux-install',
                ],
            },
                '/installer-guide/opencore-efi',
                'ktext',
            ['https://dortania.github.io/Getting-Started-With-ACPI/', 'ACPI 快速入门'],
                '/config.plist/',
            ]
        },
        {
            title: '配置',
            collapsable: false,
            children: [{
                title: '英特尔桌面 config.plist',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/config.plist/penryn', 'Penryn'],
                    ['/config.plist/clarkdale', 'Clarkdale'],
                    ['/config.plist/sandy-bridge', 'Sandy Bridge'],
                    ['/config.plist/ivy-bridge', 'Ivy Bridge'],
                    ['/config.plist/haswell', 'Haswell'],
                    ['/config.plist/skylake', 'Skylake'],
                    ['/config.plist/kaby-lake', 'Kaby Lake'],
                    ['/config.plist/coffee-lake', 'Coffee Lake'],
                    ['/config.plist/comet-lake', 'Comet Lake'],
                ]
            },
            {
                title: '英特尔笔记本电脑 config.plist',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/config-laptop.plist/arrandale', 'Arrandale'],
                    ['/config-laptop.plist/sandy-bridge', 'Sandy Bridge'],
                    ['/config-laptop.plist/ivy-bridge', 'Ivy Bridge'],
                    ['/config-laptop.plist/haswell', 'Haswell'],
                    ['/config-laptop.plist/broadwell', 'Broadwell'],
                    ['/config-laptop.plist/skylake', 'Skylake'],
                    ['/config-laptop.plist/kaby-lake', 'Kaby Lake'],
                    ['/config-laptop.plist/coffee-lake', 'Coffee Lake and Whiskey Lake'],
                    ['/config-laptop.plist/coffee-lake-plus', 'Coffee Lake Plus and Comet Lake'],
                    ['/config-laptop.plist/icelake', 'Ice Lake'],
                ]
            },
            {
                title: '英特尔高端桌面 config.plist',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    '/config-HEDT/nehalem',
                    '/config-HEDT/ivy-bridge-e',
                    '/config-HEDT/haswell-e',
                    '/config-HEDT/broadwell-e',
                    '/config-HEDT/skylake-x',
                ]
            },
            {
                title: 'AMD 桌面 config.plist',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    '/AMD/fx',
                    '/AMD/zen',
                ]
            },
            ]
        },
        {
            title: '安装',
            collapsable: false,
            children: [
                '/installation/installation-process',

            ]
        },
        {
            title: '故障排除',
            collapsable: false,
            children: [
                '/troubleshooting/troubleshooting',
                {
                    title: '',
                    collapsable: false,
                    children: [
                        '/troubleshooting/extended/opencore-issues',
                        '/troubleshooting/extended/kernel-issues',
                        '/troubleshooting/extended/userspace-issues',
                        '/troubleshooting/extended/post-issues',
                        '/troubleshooting/extended/misc-issues',

                    ]
                },
                '/troubleshooting/debug',
                '/troubleshooting/boot',
            ]
        },
        {
            title: '安装后指南',
            collapsable: false,
            children: [
                ['https://dortania.github.io/OpenCore-Post-Install/', '安装后指南'],
                {
                    title: 'Universal',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/security', '安全与文件保险箱'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/audio', '修复音频'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/oc2hdd', '不再通过 USB 引导'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/update', '更新 OpenCore、内核扩展和 macOS'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/drm', '修复数字版权管理（DRM）'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/iservices', '修复 Apple 服务（iServices）'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/pm', '修复电源管理'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/sleep', '修复睡眠'],
                        ['https://dortania.github.io/OpenCore-Post-Install/usb/', '修复 USB'],
                    ]
                },
                {
                    title: '笔记本电脑细节',
                    collapsable: true,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/laptop-specific/battery', '修复电量读取及显示'],

                    ]
                },
                {
                    title: '美化',
                    collapsable: true,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/cosmetic/verbose', '修复分辨率和啰嗦模式（Verbose）'],
                        ['https://dortania.github.io/OpenCore-Post-Install/cosmetic/gui', '添加图形界面和启动声音'],
                    ]
                },
                {
                    title: '多重启动',
                    collapsable: true,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap', '设置 Bootstrap.efi'],
                        ['https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp', '安装启动转换助理（BootCamp）'],
                    ]
                },
                {
                    title: '杂项',
                    collapsable: true,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/misc/rtc', '修复实时时钟（RTC）'],
                        ['https://dortania.github.io/OpenCore-Post-Install/misc/msr-lock', '修复 CFG Lock'],
                        ['https://dortania.github.io/OpenCore-Post-Install/misc/nvram', '模拟 NVRAM'],
                    ]
                },
            ]
        },
        {
            title: '附加',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                '/extras/kaslr-fix',
                '/extras/spoof',
                '/extras/big-sur/',
                ['https://github.com/ThrRip/OpenCore-Install-Guide/tree/master/clover-conversion', '从 Clover 过渡到 OpenCore'],
                '/extras/smbios-support.md',
            ]
        },
        {
            title: '其他',
            collapsable: false,
            children: [
                'CONTRIBUTING',
                '/misc/credit',
            ]
        },
        ],
    },
    plugins: [
        '@vuepress/plugin-back-to-top',
        'vuepress-plugin-smooth-scroll',
        ['vuepress-plugin-medium-zoom',
            {
                selector: "img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }],
    ]
}
