# Centos下使用docker安装LNMP


## 安装docker

```yum install -y docker```

启动docker服务并设置为开机自启动

```
systemctl start docker
systemctl enable docker
```

## 安装mysql docker

```docker pull mysql```

配置

```docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 --name cyt_mysql mysql```

说明

```
-p:端口映射，映射容器的3306
后面就是密码和名称
```


## 安装php

```docker pull php:7.2-fpm```

创建 PHPfpm 容器

```
docker run -d -v /data/nginx/www:/var/www/html -p 9000:9000 --link lph_mysql:mysql --name lph_phpfpm php:7.2-fpm 
```
命令参数解释：
```
-v 前面是主机的目录映射容器的目录
link：挂上msyql
```



## 安装nginx 

```docker pull ngixn```

挂载配置文件，在centos中

```
mkdir -p /data/nginx/conf
mkdir -p /data/nginx/conf.d
mkdir -p /data/nginx/www
mkdir -p /data/nginx/www/html
mkdir -p /data/nginx/logs
mkdir -p /data/nginx/ssl
```

在```/data/nginx/conf/```新建```nginx.conf```文件，并拷贝出docker中nginx的对应配置信息

在```/data/nginx/conf.d/```新建```ndefault.conf```文件，并拷贝出docker中nginx的对应配置信息


执行以下命令启动容器

```
docker run --detach \
        --link lph_phpfpm:phpfpm \
        --name lph_nginx \
        -p 443:443\
        -p 80:80 \
        -v /data/nginx/www:/usr/share/nginx/html:rw\
        -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:rw\
        -v /data/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf:rw\
        -v /data/nginx/logs:/var/log/nginx/:rw\
        -v /data/nginx/ssl:/etc/nginx/ssl:rw\
        -d nginx
```

## 进入docker镜像

```docker run -i -t nginx /bin/bash```

## docker基本命令

```
$ docker ps // 查看所有正在运行容器
$ docker stop containerId // containerId 是容器的ID

$ docker ps -a // 查看所有容器
$ docker ps -a -q // 查看所有容器ID

$ docker stop $(docker ps -a -q) //  stop停止所有容器
$ docker  rm $(docker ps -a -q) //   remove删除所有容器

```

## 注意

此方式只适合单个网站容器化
