# koa实现webHook自动发布的钩子

## webHooK介绍

Webhook 允许我们通过在Github.com订阅事件后构建后或者安装Github应用。当其中之一的事件被触发时，我们可以发送HTTP POST请求到webhook的配置URL。Webhook可以用作升级一个issue追踪，触发CI构建，升级一个后端镜像，或者甚至是部署你的生产服务器。只有想不到，没有做不到。

通俗点说，webHook就是一个爱打小报告的小明同学。当你的仓库中有任何变化，无论是新代码提交了，还是有新的issue了，他都会报告给班主任（Payload URL）。班主任知道你做的事情后，就会做出相应的处理，“请家长”或者“罚站”喽，哈哈！你是不是有过这样的经历呢。今天我们就要把小明同学拉出来溜溜...

## webHook功能

### GitHub的webHook

* 自动化发布
* 更新指定接口
* 获取指定数据
* 结合微信机器人，可以向指定群发送消息
* 还有很多可以做的事情...

### Gitee的webHook
* 除了上述功能外还可以直接对接钉钉机器人，每次发版都会在钉钉群中发送消息（[查看详情](https://www.oschina.net/news/88733/gitee-dingding-webhook-support)）

## webHook的创建

这里以GitHub的webHook创建作为演示

### 步骤一 创建webHook

选择一个git仓库，可以是你的博客网站，也可以是你自己的小程序，随你喜欢喽。


