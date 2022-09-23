# CentOS 7 安装指南
> 本文将演示在 VMware 上快速安装 CentOS 虚拟机

![CentOS](./img/centoslogo.png)
## 下载 CentOS 镜像
>我们安装CentOS-7-x86_64-Minimal-1810.iso，也就是精简版，选择这个版本的原因在于精简版消耗系统资源最少，也相对来说更加稳定。下面是各个版本的阿里云镜像下载地址:

版本|下载地址
---|---
精简版Minimal | http://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso
DVD版 | http://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso
完全版Everything | http://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Everything-2009.iso

## 创建CentOS虚拟机
>开始,点下一步

![centos1](img/centos1.jpg)

>下一步

![centos2](img/centos2.jpg)

>选择刚刚下载的iso镜像文件，下一步

![centos3](img/centos3.jpg)

>自定义虚拟机名称，更改虚拟机安装位置，下一步

![centos4](img/centos4.jpg)
:::warning 注意
虚拟机存放的目录不能有中文
:::
<br/>

>对虚拟机的配置进行分配

![centos5](img/centos5.jpg)
![centos6](img/centos6.jpg)
![centos7](img/centos7.jpg)
![centos8](img/centos8.jpg)
![centos9](img/centos9.jpg)
![centos10](img/centos10.jpg)
![centos11](img/centos11.jpg)
![centos12](img/centos12.jpg)
![centos13](img/centos13.jpg)

## CentOS安装
![centos](img/centos14.jpg)

![centos](img/centos15.jpg)

![centos](img/centos16.jpg)

![centos](img/centos17.jpg)

![centos](img/centos18.jpg)

![centos](img/centos19.jpg)

![centos](img/centos20.jpg)

![centos](img/centos21.jpg)

![centos](img/centos22.jpg)

![centos](img/centos23.jpg)

![centos](img/centos24.jpg)

![centos](img/centos25.jpg)

![centos](img/centos26.jpg)

![centos](img/centos27.jpg)

![centos](img/centos28.jpg)

![centos](img/centos29.jpg)

![centos](img/centos30.jpg)

![centos](img/centos31.jpg)

![centos](img/centos32.jpg)

![centos](img/centos33.jpg)

![centos](img/centos34.jpg)

![centos](img/centos35.jpg)

## 使用 Xshell 连接虚拟机
>如果使用 MacOS 可以选择
[Royal TSX](https://royalapps.com/ts/mac/features)

### 新建连接
![xshell](img/xshell1.jpg)
### 输入用户名
![xshell](img/xshell2.jpg)
### 输入密码
![xshell](img/xshell3.jpg)
### 登录Linux系统
![xshell](img/xshell4.jpg)

## 使用 Xftp 实现文件传输
### 在 Xshell 中打开 Xftp
![xftp](img/xftp1.jpg)
### 把 Windows 文件上传到 Linux
![xftp](img/xftp2.jpg)

:::tip 结束
:tada: :100: 恭喜你，CentOS 现已安装成功 :tada: :100:
:::
