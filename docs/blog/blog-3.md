# Centos下使用docker部署easy-mock平台


## 更新PIP

### 注意事项

1、安装docker后python报警告

```/usr/lib/python2.7/site-packages/requests/__init__.py:80: RequestsDependencyWarning: urllib3 (1.22) or chardet (2.2.1) doesn't match a supported version!RequestsDependencyWarning)```

原因：python库中urllib3 (1.22) or chardet (2.2.1) 的版本不兼容
解决方法： 

```pip uninstall urllib3```

```pip uninstall chardet```

```pip install requests```



## Centos 安装docker并启动

## Centos 安装Docker Compose

## 配置Docker-Compose文件

## Centos 安装nginx 并配置

