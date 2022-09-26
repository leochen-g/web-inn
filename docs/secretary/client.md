# 智能微秘书客户端

---
sidebar: auto
---


[![ 由Wechaty提供 ](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![node version](https://img.shields.io/badge/node-%3E%3D12-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.63-blue.svg)](https://github.com/Chatie/wechaty)
![](https://img.shields.io/badge/Window-green.svg)
![](https://img.shields.io/badge/Mac-yellow.svg)
![](https://img.shields.io/badge/Centos-blue.svg)


## 智能微秘书

让你闲置的微信号成为你的日常小秘书（没有闲置的也没关系，添加我的小助手微信号）。

帮你创建定时任务，每日提醒，纪念日提醒，当日提醒。当然基础的给女朋友的每日说功能也是必备的，而且小助手版每日说为那些非常优秀的程序员准备了多女朋友定时发送提醒功能。同时自带微信机器人功能，群资讯消息定时发送，群机器人聊天，垃圾分类，天气查询，土情话查询，老黄历查询，顺口溜查询等众多功能


## 安装

### 1、安装Node

Node请选择大于10的版本安装

### 2、拉取项目并安装依赖

拉取项目前，国内用户请配置好npm的淘宝源，**(很重要，防止下载chromium失败，因为下载文件在150M左右，请耐心等待)**
```
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set puppeteer_download_host https://npm.taobao.org/mirrors
```

请自行安装好git客户端，没有客户端的可以直接下载zip包

```
git clone https://github.com/gengchen528/wechat-assistant-pro.git // 下载zip包的忽略本步骤

cd wechat-assistant-pro
npm install
```
### 3、修改配置文件

根目录下存在一个`env.js`文件，配置文件中填写对应的`key`和`secret`。 （[智能微秘书](https://wechat.aibotk.com/)平台注册后获取）


### 4、本地启动项目

```
npm run start // 启动
```

执行完成后请等待下载puppet，直到出现二维码界面，此时可进入[智能微秘书](https://wechat.aibotk.com/)进行扫码登录，或者直接扫码登录均可


### 5、服务器部署启动项目

服务器部署项目时，请全局安装进程守护工具`pm2`,命令`npm i pm2 -g`。执行安装完成后

```
npm run pm2 //启动后台运行 此操作产生的log日志在logs/文件夹中，如果有报错请自行查看log
npm run stop // 停止pm2
npm run restart //重启pm2
```

## 登录智能微秘书平台配置

以上操作完成后，就可以在[智能微秘书](https://wechat.aibotk.com/)平台进行个性配置和关键词配置。记得每次修改后，给你的微信发送重启命令（此命令在关键词事件中配置）




## 常见问题解决方法

### 常见问题解决基本方案
* 先检查node版本是否大于12
* 确认npm已经配置好淘宝源  
* 存在package-lock.json文件先删除
* 删除`node_modules`后重新执行`npm install` 或`cnpm install`
* 配置文件是否按照要求设置
* 本地网络是否存在限制，是否开启了代理服务
* 本地防火墙是否关闭

### 1、我的微信号无法登陆

从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。 验证是否被限制登陆： https://wx.qq.com 上扫码查看是否能登陆，如果无法登录我也是没有办法的，请不要再问我改怎么解决了。 更多内容详见：

[Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)

[[谣言] 微信将会关闭网页版本](https://github.com/Chatie/wechaty/issues/990)

[新注册的微信号无法登陆](https://github.com/Chatie/wechaty/issues/872)

### 2、执行npm run start时无法安装puppet-puppeteer&&Chromium

#### Centos7下部署出现问题

![](https://user-gold-cdn.xitu.io/2019/4/2/169dc293e5113f27?w=2812&h=2052&f=jpeg&s=708875)

问题原因:[https://segmentfault.com/a/1190000011382062](https://segmentfault.com/a/1190000011382062)

解决方案:安装依赖
```
#依赖库
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
 #字体
yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
```
#### windows下，下载puppeteer失败
链接：https://pan.baidu.com/s/1YF09nELpO-4KZh3D2nAOhA 
提取码：0mrz 

把下载的文件放到如下图路径，并解压到当前文件夹中即可
![](https://user-gold-cdn.xitu.io/2019/4/2/169dc293e777f981?w=867&h=186&f=png&s=11203)

#### ubuntu下，下载puppeteer失败 
问题原因：[https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)

解决方案：安装依赖库
```
 sudo apt-get  gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
### 3、类似Failed to download Chromium rxxx的问题

` ERROR: Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.{ Error: read ETIMEDOUT at _errnoException (util.js:1041:11) at TLSWrap.onread (net.js:606:25) code: 'ETIMEDOUT', errno: 'ETIMEDOUT', syscall: 'read' } ` 

解决方案：[https://github.com/GoogleChrome/puppeteer/issues/1597](https://github.com/GoogleChrome/puppeteer/issues/1597)

`npm config set puppeteer_download_host=https://npm.taobao.org/mirrors`

`sudo npm install puppeteer --unsafe-perm=true --allow-root`

### 4、如图所示问题解决办法，关闭win/mac防火墙；如果公司网络有限制的话也可能引起无法启动问题

![](http://image.bloggeng.com/WechatIMG7619.png)

### 5、centos下提示无法启动浏览器进程如下图

![](http://image.xkboke.com/aibotk/public/kbap8w56GBZWqjYd_WechatIMG174.png)

解决方案：
```shell
sudo yum install nss
```

### 5. 更多问题
关于wechaty的相关接口，请
[参考wechaty官网文档](https://docs.chatie.io/v/zh/)，如果以上还没有解决你的问题，请先往wechaty的项目[issues](https://github.com/Chatie/wechaty/issues)中查找是否存在相同的问题，由于本项目是依赖wechaty开发，所以启动时遇到的问题大部分是wechaty的。


## 注意

 本项目属于个人兴趣开发，开源出来是为了技术交流，请勿使用此项目做违反微信规定或者其他违法事情。
 
 建议使用小号进行测试，有被微信封禁网页端登录权限的风险（客户端不受影响），请确保自愿使用。
 
 ## 体验与技术交流
 
 欢迎有兴趣的小伙伴可以加小助手微信进行体验，回复`“加群”`进入微信小助手项目交流群

 ![](https://user-gold-cdn.xitu.io/2019/2/28/1693401c6c3e6b02?w=430&h=430&f=png&s=53609)

 ### 小助手功能一览
 | 功能       | 触发事件 | 触发事件案例                                        | 回复内容                                                | 说明                                                                                                                       |
| ------------ | ---------- | --------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 当天定时提醒 | 定时提醒 | “提醒 我 18:00 下班了，记得带好随身物品” | “亲爱的Leo_chen，温馨提醒：下班了，记得带好随身物品” | 此提醒到时间只执行一次，如没有提示设置提醒成功，请检查设置日期格式是否正确，关键词之间需用空格隔开 |
| 每天定时提醒 | 定时提醒 | “提醒 我 每天 18:00 下班了，记得带好随身物品” | “亲爱的Leo_chen，温馨提醒：下班了，记得带好随身物品” | 此提醒每天到时间都会执行，此提醒到时间只执行一次，如没有提示设置提醒成功，请检查设置日期格式是否正确，关键词之间需用空格隔开 |
| 指定日期提醒 | 定时提醒 | “提醒 我 2019-09-10 8:00 还有7天是女朋友生日了，准备一下” | “亲爱的Leo_chen，温馨提醒：还有7天是女朋友生日了，准备一下” | 此提醒只执行一次，此提醒到时间只执行一次，如没有提示设置提醒成功，请检查设置日期格式是否正确，关键词之间需用空格隔开 |
| 垃圾分类 | 垃圾分类 | “？苹果”或 “?香蕉皮”或 “电池是什么垃圾” | 对应的垃圾分类说明                                 | 交流群中也可以触发                                                                                                  |
| 天气查询 | 天气查询 | “上海天气”                                        | 对应城市天气信息                                    | 交流群中也可以触发                                                                                                  |
| 名人名言 | 名人名言 | “名人名言”                                        | 返回名人名言                                          | 交流群中也可以触发                                                                                                  |
| 老黄历查询 | 老黄历  | “黄历2019-6-13”                                     | 返回老黄历的内容                                    | 日期请填写农历时间，月份和日期不要带0；交流群中也可以触发                                        |
| 姓氏起源 | 姓氏起源 | “姓陈” 或 “陈姓”                             | 返回陈姓起源                                          |                                                                                                                              |
| 星座运势 | 星座运势 | “*双子座”                                          | 返回双子座当日运势                                 | 默认返回当日运势 交流群中也可以触发                                                                         |
| 歇后语    | 歇后语  | “歇后语”                                           | 返回一条歇后语                                       | 交流群中也可以触发                                                                                                  |
| 顺口溜    | 顺口溜  | “顺口溜”                                           | 返回一条顺口溜                                       | 交流群中也可以触发                                                                                                  |
| 绕口令    | 绕口令  | “绕口令”                                           | 返回一条绕口令                                       | 交流群中也可以触发                                                                                                  |
| 神回复    | 神回复  | “神回复”                                           | 返回一条神回复                                       | 交流群中也可以触发                                                                                                  |
| 我要国旗 | 我要国旗 | ”我要国旗” | 返回带国旗的头像                       | 交流群中也可以触发                  |
| 获取表情包 | 获取表情包 | ”表情包你好坏” | 返回你好坏的表情包                     | 交流群中也可以触发                  |
| 获取美女图 | 获取美女图 | ”美女图” | 返回随机美女图                     | 交流群中也可以触发                  |
| 机器人回复 | 机器人回复 | 除以上关键词外，其他文字会触发机器人自动回复 | 机器人自动回复                                       | 交流群中也可以触发                                                                                                  |
 
更多功能正在添加中，赶快亲自试一试吧，相信你会挖掘出更多好玩的功能

另外我的公众号已经接入微软小冰，关注后发语音会有小姐姐的声音陪你聊天，也可以和她文字聊天，有兴趣可以试试看，单身的欢迎来撩

![](https://user-gold-cdn.xitu.io/2019/3/1/169381d277ba6401?w=258&h=258&f=png&s=42373)


## 字典说明

### 资讯字典
| sortId | 对应资讯 | 说明                                  |
| ------ | ---------- | --------------------------------------- |
| 38     | 汉服新闻 | 民族文化汉服新闻资讯 |
| 37     | 房产新闻 | 房产写字楼新闻资讯 |
| 36     | 科学探索 | 探索宇宙和科学的真相 |
| 35     | 汽车新闻 | 汽车行业新闻资讯接口 |
| 34     | 互联网资讯 | 互联网资讯新闻接口 |
| 33     | 动漫资讯 | 全网热点动漫资讯，带你了解二次元世界 |
| 32     | 财经新闻 | 财经资讯，了解身边的经济大事 |
| 31     | 游戏资讯 | 游戏资讯接口，提供游戏每日精选新闻 |
| 30     | CBA新闻  | CBA新闻API、中国男子职业篮球赛资讯等 |
| 29     | 人工智能 | AI人工智能行业相关新闻资讯API |
| 28     | 区块链新闻 | 区块链行业相关新闻资讯API    |
| 27     | 军事新闻 | 军事资讯API、军情动态、科技发展等 |
| 26     | 足球新闻 | 国足资讯API、国足明星动态等 |
| 24     | 创业新闻 | 互联网行业新闻API、创新、创业人物动态 |
| 23     | 移动互联 | 移动互联网行业资讯API          |
| 22     | IT资讯   | IT行业相关新闻资讯API           |
| 21     | VR科技   | VR虚拟现实相关新闻资讯API     |
| 20     | NBA新闻  | NBA动态API、篮球赛等             |
| 19     | 苹果新闻 | Apple产品动态API，果粉、教程帮助 |
| 18     | 旅游资讯 | 旅游、周边、景点新闻资讯API |
| 17     | 健康知识 | 健康知识、养生、中西医资讯API |
| 11     | 美女图片 | 美女图片、大家都懂             |
| 14     | 奇闻异事 | 世界奇闻资讯API、民间趣事、灵异事件等 |
| 13     | 科技新闻 | 信息科技行业新闻API、物理科技 |
| 12     | 体育新闻 | 国内外体育API、体育明星动态等 |
| 10     | 娱乐新闻 | 娱乐新闻API、明星花边、探班、娱乐活动等 |
| 8      | 国际新闻 | 国际新闻API接口服务             |
| 7      | 国内新闻 | 国内新闻API接口服务             |
| 5      | 社会新闻 | 社会新闻API接口服务             |

### 事件字典
目前上线的有以下事件功能，后续还会继续上线更多功能，如果你有更好的接口可以提供，欢迎提交pr或进群交流

| event     | 功能说明 | 使用说明                  | 举例说明：假设设置的关键词为‘？’ | 返回内容                            |
| --------- | ---------- | ----------------------------- | -------------------------------- | --------------------------------------- |
| rubbish   | 垃圾分类 | 设置事件触发的关键词+垃圾名称 | ？苹果                        | 垃圾分类结果                      |
| mingyan   | 名人名言 | 设置触发的关键词      | ？                              | 返回一条名人名言                |
| star      | 星座运势 | 设置触发的关键词+星座 | ？巨蟹座                     | 返回今日该星座运势             |
| xing      | 姓氏起源 | 设置触发的关键词+姓氏 | ？陈                           | 返回‘陈’姓起源                |
| lunar     | 老黄历查询 | 设置触发的关键词+农历日期 | ？2019-7-15                     | 返回指定日期的老黄历，注意日期首位不带0 |
| goldreply | 神回复  | 设置触发的关键词      | ？                              | 一条神回复                         |
| xhy       | 歇后语  | 设置触发的关键词      | ？                              | 一条歇后语                         |
| rkl       | 绕口令  | 设置触发的关键词      | ？                              | 一条绕口令                         |
| skl       | 顺口溜  | 设置触发的关键词      | ？                              | 一个顺口溜                         |
| avatar    | 我要国旗（暂时关闭）  | 设置触发的关键词     | ？                            | 返回一个带国旗的头像                 |
| emo       | 获取表情包 | 设置触发的关键词     | ？哈哈                        | 返回哈哈的表情包                 |
| meinv      | 获取美女图 | 设置触发的关键词     | ？                       | 返回随机美女高清图               |
