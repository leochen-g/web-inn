module.exports = {
  base:'/web-inn/',
  title: '前端客栈',
  description: '全栈进阶之路',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;' }],
  ],
  themeConfig: {
    search: true,
    searchMaxSuggestions: 10,
    nav: [
      { text: 'home', link: '/' },
      { text: '前端', link: '/web/' },
      { text: '后端', link: '/node/' },
      { text: '微信每日说', link: '/wechatBot/' },
      { text: 'Github', link: 'https://github.com/gengchen528/' },
    ],
    sidebar: {
      '/web/':[
        {
          title:'css基础',
          collapsable: true,
          children: [
            '1','2','3'
          ]
        },
      ],
      '/node/':[
        {
          title:'Node基础',
          collapsable: true,
          children: [
            '1'
          ]
        },
      ],

    },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated'
  }
};
