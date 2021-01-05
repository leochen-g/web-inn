# 安装 node 包常见问题整理

## node-sass mac 系统报错：Node Sass does not yet support your current environment: OS X 64-bit with Unsuppo

原因：由于不同平台的运行环境不一致导致的，或者该平台没有 sass 的环境。
解决方法：`npm rebuild node-sass`

## 解决 binding.gyp not found (xxx/xxx/xxx) while trying to load binding.gyp 问题

`Error: gyp failed with exit code: 1`

于是我手动删了`rm -rf ~/.node-gyp/`目录下的文件重新执行了`npm install node-gyp -g`，但并没有解决问题，反而来了一个新问题
`binding.gyp not found (xxx/xxx/xxx) while trying to load binding.gyp`
这个就尴尬了，网上一番查找折腾，最终用如下方法解决问题

更新一下 npm

```
sudo npm cache clean -f
sudo npm install npm -g
```

重新安装 node-gyp 来替换 node 自带 node-gyp

```
sudo npm uninstall node-gyp -g
sudo npm uninstall node-gyp
sudo npm install node-gyp -g
```

然后就好了。
