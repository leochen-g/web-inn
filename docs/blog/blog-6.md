# 在Nuxt中动态加载vuex模块的踩雷日志

> 转自：[开发笔记｜在Nuxt中动态加载模块的踩雷日志](https://medium.com/dezchuang/vue-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-%E5%9C%A8-nuxt-%E4%B8%AD%E4%BD%BF%E7%94%A8-vuex-registermodule-%E7%9A%84%E8%B8%A9%E9%9B%B7%E6%97%A5%E8%AA%8C-dde3e0972e44)

最近使用nuxt遇到的坑，使用vuex的时候在服务端注册后，在客户端无法调用。这里找到一个相对好点的解决方法，分享一下。

## 问题说明

这个bug是使用者用iOS的Safari在某个页面上操作时，会有「重复送出表单」的现象

## 前置知识
由于这个问题会牵扯到Vue生命周期挂钩，Vuex存储模块，Nuxt相关方法及SSR（服务器端渲染）等观念，建议对这些概念有不清楚的读者可以先从官方文件理解：

* [Vue lifecycle hook](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
* [Vuex module](https://vuex.vuejs.org/zh/guide/modules.html)
* [Vuex registerModule](https://vuex.vuejs.org/zh/guide/modules.html#%E6%A8%A1%E5%9D%97%E5%8A%A8%E6%80%81%E6%B3%A8%E5%86%8C)
* [Nuxt asyncData](https://nuxtjs.org/api/#the-asyncdata-method)
* [Nuxt fetch](https://nuxtjs.org/api/pages-fetch#the-fetch-method)

Vux生态系中的官方文件写得很详细，而且大部分也都有中文版本可以看，但常常有一些细节只有在英文版才有，所以还是建议尝试读英文版的。

## 问题分析

这个案例中使用Vue搭配Vuex及Nuxt来实现，在 lifecycle hook 中把 log打印出来验证只有这个页面有状况，而这一页当初实现时尝试使用 Vuex 的 registerModule 来动态载入 store module，于是来深入了解一下 registerModule 到底出了什么事。

观察devtool的networ，发现在有问题的页面中做SSR完后，也就是直接在这一页重新整理，这时任何有打API的请求都发了两次，而client side render呈现则不会，所以怀疑会不会有「重复注册module」的问题。

Google 后找到这一篇：[registerModule would be better to called in beforeCreate instead of asyncData](https://github.com/vuejs/vue-ssr-docs/issues/166?source=post_page-----dde3e0972e44----------------------)

这个 issue 原本的问题是在讨论「如果在 asyncData 做 registerModule，那麽 client 端会没有这个 module」。
原因是因为 asyncData 只会在 server 端被触发，所以如果 client 端需要认得这个 module，就需要利用会在 client 端被触发的 lifecycle hook 再做一次动态模组注册：

```
store.registerModule(‘a’, module, { preserveState: true }) 
```

而后面几则回复也有人像我一样遇到「重复注册 module」的问题，把每一条回复看完后，看到有人提供了一个解法的范例：

[maoberlehner/well-composed-frontend - Dynamically register store modules](https://github.com/maoberlehner/well-composed-frontend/commit/b1fa6ec58ef782b0230e11f87e80a4c1a2a5f810#diff-4167ed287472c29e9b46664c039d4466)

理解后依照他的方法后修正，就解决了自己项目中，页面会重复发两次 request 的问题，以下就来说明如何解决这个问题。

## 解法分析

### 1. 写一个「动态注册 module」的 plugin
```
/plugins/register-store.js
```
```
function registerStore({ module, moduleName, store }) {
  const moduleIsRegistered =
    store._modules.root._children[moduleName] !== undefined
  const stateExists = store.state[moduleName]
  if (!moduleIsRegistered) {
    store.registerModule(moduleName, module, { preserveState: stateExists })
  }
}

export default ({ app }, inject) => {
  inject('registerStore', registerStore)
}
```
首先将 registerModule 这个方法包成一个全站都可以使用的 plugin，方便未来其他地方也要动态注册模块时，可以避免再发生这个问题。

这边最核心的关键就是要检查这个 module 是不是已经注册了。

当 server 端已经注册而 client 端还没注册时，就会在 client 端进行注册并利用preserveState 这个属性将 module 中的资料同步到 client 端。

### 2. 在 Nuxt 中加 plugin 要在 nuxt.config.js 加设定
```
/nuxt.config.js
```

```
plugins: [
  { src: '~/plugins/register-store' },
  ...
],
```
### 3.在需要动态注册模块的那个 page 做 registerModule

```
/pages/myPage.vue
```

```
async fetch({ app, store }) {
  app.$registerStore({
    module: MyModule,
    moduleName: `myModule`,
    store
  })
  await store.dispatch('myModule/INIT_DATA')
},
beforeCreate() {
  this.$registerStore({
    module: MyModule,
    moduleName: `myModule`,
    store: this.$store
  })
},
beforeDestroy() {
  this.$store.unregisterModule('myModule')
}
```
这边我使用 Nuxt 中的 fetch 方法在 server 端先做注册 module，并且在注册后做 dispatch 先去取得该页面所需要的初始资料，先存放到 store module 中。

等到 beforeCreate 被触发时，再做一次动态注册 module，由于 beforeCreate 会在 server 与 client 端都被触发，此时因为 plugin 中有做「是否注册过」的检查，就可以避免重複注册的问题。

当时会有问题，可能就是在 client 端没有判断 module 是否已经存在，才会导致该页在做任何 action 时都发出两次的现象。

最后离开该页时，在 beforeDestroy 中做卸载即可完成整个动态注册 module 的实现。

## 结语

这是在项目中第一次使用 Vuex 的 registerModule 来开发，就不幸地踩到一个雷。

而 Nuxt 中为了实现 SSR 常会需要考虑 server 与 client 两边资料的问题，所以确实理解 Vue 的生命週期进程与 Vuex、Nuxt中的方法，了解自己所使用的框架与工具的观念细节，才能尽可能避免开发上遇到 tricky bug 的风险

## 参考资料

* [registerModule would be better to called in beforeCreate instead of asyncData](https://github.com/vuejs/vue-ssr-docs/issues/166)
* [maoberlehner/well-composed-frontend - Dynamically register store modules](https://github.com/maoberlehner/well-composed-frontend/commit/b1fa6ec58ef782b0230e11f87e80a4c1a2a5f810#diff-4167ed287472c29e9b46664c039d4466)