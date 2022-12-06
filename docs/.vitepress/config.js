export default ({
  base:'/',
  title: 'noteWk',
  titleTemplate: 'noteWk',
  lang: 'zh-CN',
  description: 'A VitePress site',
  // 暗色模式切换按钮
  appearance: 'true',
  // 忽略死链接 当设置为true时VitePress不会因为死链接而导致构建失败
  ignoreDeadLinks: true,
  // 头 <head>要在页面HTML的标记中呈现的其他元素
  head: [
    ['link', { rel: 'icon', href: 'https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/noteWk_logo.svg' }]
  ],
  // 开启最近更新时间 使用git commit获取时间戳 此选项启用默认主题以显示页面的最后更新时间。
  lastUpdated: true,
  // 配置markdown格式
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },

  // Theme related configurations.
  themeConfig: {
    logo: '/notewk_logo.png',
    nav: [
      { text: '首页',link: '/' },
      { text: 'Windows',
        items: [
          { text: '🧬 应用软件', link: '/windows/application/1qq' },
          { text: '🔔 使用技巧', link: '/windows/tip/1stopWinUpdate' },
          { text: '🔍 开发环境', link: '/windows/dev/1java' }
        ]
      },
      { text: 'MacOS',
        items: [
          { text: '🍎 Awesome Mac', link: 'https://kevinwu_21.gitee.io/awesome-mac' },
          { text: '📚 应用软件', link: '/mac/application/chrome' },
          { text: '📔 开发环境', link: '/mac/dev/1java' },
          { text: '🛠 系统偏好设置', link: '/mac/preferences/general' },
        ]
      },
      { text: 'Linux',
        items: [
          { text: '💡 命令手册', link: '/linux/command/catalogue' },
          { text: '💿 安装指南', link: '/linux/install/centos' },
          { text: '📕 开发环境', link: '/linux/dev/1java' },
          { text: '📊 Hadoop', link: '/linux/hadoop/1basic' },
        ]
      },
      { text: '更多',
        items: [
          { text: '💥 Markdown 格式', link: '/more/1md-format' },
          { text: '🧰 Git团队开发手册', link: '/more/Git团队开发手册' },
        ]
      }
    ],
    sidebar: {
      '/windows/':[
        {
          text: 'Windows 应用软件',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text: 'QQ',
              link: '/windows/application/1qq',
            },
            {
              text: '微信',
              link: '/windows/application/2wechat',
            },
          ]
        },
        {
          text: 'Windows 使用技巧',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'禁用 Windows 系统更新',
              link: '/windows/tip/1stopWinUpdate',
            }
          ]
        },
        {
          text: 'Windows 开发环境',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'Java',
              link: '/windows/dev/1java',
            }
          ]
        }
      ],
      '/mac/':[
        {
          text: 'MacOS 应用软件',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'Chrome 谷歌浏览器',
              link: '/mac/application/chrome',
            },
            {
              text:'VSCode',
              link: '/mac/application/vscode',
            },
            {
              text:'IDEA',
              link: '/mac/application/idea',
            },
            {
              text:'VMware Fusion',
              link: '/mac/application/vmware',
            }
          ]
        },
        {
          text: 'MacOS 开发环境',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'Java',
              link: '/mac/dev/1java',
            }
          ]
        },
        {
          text: 'MacOS 系统偏好设置',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'通用',
              link: '/mac/preferences/general',
            }
          ]
        }
      ],
      '/linux/':[
        {
          text: 'Linux 命令手册',
          // 是否显示折叠按钮
          collapsible: false,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'目录',
              link: '/linux/command/catalogue',
            }
          ]
        },
        {
          text: 'Linux 安装指南',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'CentOS 7',
              link: '/linux/install/centos',
            },
            {
              text:'Ubuntu',
              link: '/linux/install/ubuntu',
            }
          ]
        },
        {
          text: 'Linux 开发环境',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'Java',
              link: '/linux/dev/1java',
            }
          ]
        },
        {
          text: 'Hadoop 大数据',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text:'基本环境搭建',
              link: '/linux/hadoop/1basic'
            },
            {
              text:'伪分布式',
              link: '/linux/hadoop/2pseudoDistribution'
            },
            {
              text:'1.x 完全分布式',
              link: '/linux/hadoop/3fullyDistribution1'
            },
            {
              text:'HDFS HA 高可用',
              link: '/linux/hadoop/4hdfs-ha'
            },
            {
              text:'HDFS Java开发',
              link: '/linux/hadoop/5hdfs-java'
            },
          ]
        }
      ],
      '/more/':[
        {
          text: '更多',
          // 是否显示折叠按钮
          collapsible: true,
          // 默认是否折叠
          collapsed: false,
          items:[
            {
              text: 'Markdown 格式指南',
              link: '/more/1md-format',
            },
            {
              text: 'Git团队开发手册',
              link: '/more/Git团队开发手册',
            },
          ]
        }
      ]
    },
    // 跳转社交平台
    socialLinks: [
      // You can also add custom icons by passing SVG as string:
      {
        icon: {
          svg: '<svg t="1662100724577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1657" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#888888" p-id="1658"></path></svg>'
        },
        link: 'https://gitee.com/kevinwu_21'
      },
      { icon: 'github', link: 'https://github.com/kevinwu21' }
    ],
    footer: {
      message: '<a href="https://beian.miit.gov.cn/">湘ICP备2022023238号-1</a>',
      copyright: 'Copyright © 2022-present <a href="https://gitee.com/kevinwu_21">Kevin Wu</a>'
    }
  }
})
