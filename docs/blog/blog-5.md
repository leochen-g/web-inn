# Centos安装LNMP

## 安装mysql

```
下载Yum Repository

wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm

安装
yum -y install mysql57-community-release-el7-10.noarch.rpm

装MySQL服务器
yum -y install mysql-community-server

首先启动MySQL
systemctl start  mysqld.service

查看MySQL运行状态
systemctl status mysqld.service

查找默认root密码

grep "password" /var/log/mysqld.log

登录，初始需要设置密码

mysql -uroot -p

进入后设置新的密码

ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';

```

### 配置mysql允许root远程访问


```
mysql -u root -p

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;

flush privileges;

```

### 创建新用户并赋予数据库权限

新建数据库
```
create database 数据库名;
```
数据库赋权限
```
grant all privileges on 数据库名.* to '用户名'@'%' identified by '密码' with grant option;
```

## 安装nginx

```yum install nginx ```

启动

```nginx```

配置nginx 开机启动服务

```
cd /lib/systemd/system

vim nginx.service
```


```
 [Unit]
Description=The nginx HTTP and reverse proxy server
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
# Nginx will fail to start if /run/nginx.pid already exists but has the wrong
# SELinux context. This might happen when running `nginx -t` from the cmdline.
# https://bugzilla.redhat.com/show_bug.cgi?id=1268621
ExecStartPre=/usr/sbin/nginx
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s reload
ExecStop=/usr/sbin/nginx -s quit

[Install]
WantedBy=multi-user.target
```

```
# 加入开机自启动
systemctl enable nginx
# 取消开机自启动
systemctl disable nginx
# 启动nginx服务
systemctl start nginx.service
# 停止服务
systemctl stop nginx.service
# 重新启动服务
systemctl restart nginx.service
# 查看所有已启动的服务
systemctl list-units --type=service
# 查看服务当前状态
systemctl status nginx.service
```
常见错误解决：
> Warning: nginx.service changed on disk. Run 'systemctl daemon-reload' to reload units.

```systemctl daemon-reload```

## 安装php

```yum -y install php72w php72w-cli php72w-fpm php72w-common php72w-devel php72w-embedded php72w-gd php72w-mbstring php72w-mysqlnd php72w-opcache php72w-pdo php72w-xml```


设置开机启动
```
systemctl enable php-fpm.service
systemctl start php-fpm.service
```