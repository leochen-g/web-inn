# mysql 创建新用户并给授权指定的数据库权限

mysql 创建新用户并给授权指定的数据库权限

## 1、使用 root 管理员登陆 mysql

`mysql -u root -proot;`

## 2、创建新用户
```
//低版本数据库
create user '用户民'@'%' identified by '密码';
//高版本数据库
create user '用户名'@'%' identified with mysql_native_password by '密码';
flush privileges;
```

> ‘%’ - 所有情况都能访问

>  ‘localhost’ - 本机才能访问

> ’111.222.33.44‘ - 指定 ip 才能访问

## 修改密码:

```
alter user '用户名'@'%' identified by '密码';
flush privileges;
```

这个时候访问，是除了默认生成information_schema和test数据库，看不到任何其它的数据库信息

## 3、给该用户添加权限

```
//指定数据库
grant all privileges on 想授权的数据库.* to '用户名'@'%';
//全部数据库
grant all privileges on *.* to '用户名'@'%';
flush privileges;
```

> all 可以替换为 select,delete,update,create,drop

## 4、删除用户
```
delete from mysql.user where user='用户名';
drop user '用户名'@'%';
flush privileges;
```
