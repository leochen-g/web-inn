module.exports = {
  base: "/web-inn/",
  title: "雷欧的前端客栈",
  description: "前端客栈,带你走进全栈进阶之路,vue学习,react学习,Node,最新的全栈学习资源",
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-101688512-1'
      }
    ]
  ],
  head: [
    ["link", { rel: "icon", href: "/img/logo.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      }
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "前端客栈,小K博客,小k博客,前端,Node,Vue,React,2020最新前端资讯,2020前端技术合集,2020前端,Vue SSR"
      }
    ]
  ],
  themeConfig: {
    search: true,
    searchMaxSuggestions: 10,
    rightGroup:[
      {
        title:"关注作者公众号",
        desc:"共走前端全栈之路",
        imgSrc:'/img/wechat.jpg'
      },
      {
        title:"小助手",
        desc:"扫二维码，回复’前端客栈‘进群学习",
        imgSrc:'/img/wechat-assistant.png'
      }
    ],
    nav: [
      { text: "首页", link: "/" },
      { text: "博文", link: "/blog/" },
      { text: "前端", link: "/web/" },
      { text: "Node", link: "/node/" },
      { text: "微信每日说", link: "/wechatBot/" },
      { text: "Github", link: "https://github.com/gengchen528/" }
    ],
    sidebar: {
      "/web/": [
        {
          title: "css基础",
          collapsable: true,
          children: ["css-1", "css-2", "css-3"]
        },
        {
          title: "js基础",
          collapsable: true,
          children: ["js-1", "js-2", "js-3"]
        }
      ],
      "/node/": [
        {
          title: "Node基础",
          collapsable: true,
          children: ["1","2"]
        }
      ],
      "/blog/": [
        {
          title: "前端",
          collapsable: true,
          children: ["blog-1","blog-2","blog-6"]
        },
        {
          title: "服务器",
          collapsable: true,
          children: ["blog-7","blog-8"]
        }
      ]
    },
    sidebarDepth: 2,
    lastUpdated: "Last Updated"
  }
};
