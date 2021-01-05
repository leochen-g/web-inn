(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{319:function(n,t,e){"use strict";e.r(t);var s=e(38),o=Object(s.a)({},function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"安装-node-包常见问题整理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装-node-包常见问题整理","aria-hidden":"true"}},[n._v("#")]),n._v(" 安装 node 包常见问题整理")]),n._v(" "),e("h2",{attrs:{id:"node-sass-mac-系统报错：node-sass-does-not-yet-support-your-current-environment-os-x-64-bit-with-unsuppo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#node-sass-mac-系统报错：node-sass-does-not-yet-support-your-current-environment-os-x-64-bit-with-unsuppo","aria-hidden":"true"}},[n._v("#")]),n._v(" node-sass mac 系统报错：Node Sass does not yet support your current environment: OS X 64-bit with Unsuppo")]),n._v(" "),e("p",[n._v("原因：由于不同平台的运行环境不一致导致的，或者该平台没有 sass 的环境。\n解决方法："),e("code",[n._v("npm rebuild node-sass")])]),n._v(" "),e("h2",{attrs:{id:"解决-binding-gyp-not-found-xxx-xxx-xxx-while-trying-to-load-binding-gyp-问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#解决-binding-gyp-not-found-xxx-xxx-xxx-while-trying-to-load-binding-gyp-问题","aria-hidden":"true"}},[n._v("#")]),n._v(" 解决 binding.gyp not found (xxx/xxx/xxx) while trying to load binding.gyp 问题")]),n._v(" "),e("p",[e("code",[n._v("Error: gyp failed with exit code: 1")])]),n._v(" "),e("p",[n._v("于是我手动删了"),e("code",[n._v("rm -rf ~/.node-gyp/")]),n._v("目录下的文件重新执行了"),e("code",[n._v("npm install node-gyp -g")]),n._v("，但并没有解决问题，反而来了一个新问题\n"),e("code",[n._v("binding.gyp not found (xxx/xxx/xxx) while trying to load binding.gyp")]),n._v("\n这个就尴尬了，网上一番查找折腾，最终用如下方法解决问题")]),n._v(" "),e("p",[n._v("更新一下 npm")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("sudo npm cache clean -f\nsudo npm install npm -g\n")])])]),e("p",[n._v("重新安装 node-gyp 来替换 node 自带 node-gyp")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("sudo npm uninstall node-gyp -g\nsudo npm uninstall node-gyp\nsudo npm install node-gyp -g\n")])])]),e("p",[n._v("然后就好了。")])])},[],!1,null,null,null);t.default=o.exports}}]);