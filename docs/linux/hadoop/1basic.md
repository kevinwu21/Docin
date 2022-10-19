# Hadoop 环境搭建

![Hadooplogo](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/Hadooplogo.svg)

## 虚拟机网络配置

### windows 中配置虚拟网卡

 **控制面板 --> 所有控制面板项 --> 网络连接-->VMware Virtual Ethernet Adapter for VMnet8**

![hadoop1](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop1.jpg)

 **设置 VMware Virtual Ethernet Adapter for VMnet8 的属性**

![hadoop2](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop2.jpg)

### VMware 虚拟机网络配置

**VMware 打开“编辑 --> 虚拟机网络编辑器”**

![hadoop3](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop3.jpg)

![hadoop4](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop4.jpg)

### CentOS 配置

登录CentOS使用"ip addr"命令查看一下IP，运行效果如下:

```shell
ip addr
```



![hadoop5](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop5.jpg)

::: tip

使用“ip addr”命令查看到系统IP后，就可以通过 Xshell、SecureCRT、Royal TSX 这类客户端连接我们安装的 CentOS

:::

## 设置静态 IP

安装的时候，我们设置的是网络采取的是“dhcp”网络配置方式，这种方式IP是动态设置的，这个在我们以后的集群里面是不行的，所以我们设置成静态ip，具体的步骤如下:

### 编辑网络配置文件

```shell
# 进入网络配置目录
cd /etc/sysconfig/network-scripts/
# 查看网络配置文件
ls -al
```

![hadoop6](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop6.jpg)

```shell
# 编辑网络配置文件
vi + /etc/sysconfig/network-scripts/ifcfg-ens33
```

修改的时候请使用 ROOT 用户登录。

```shell
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
# 注意这个要注释或者删除
# BOOTPROTO="dhcp"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="e9ce67e1-7d2a-41b4-9989-dfbc75278d80"
DEVICE="ens33"
ONBOOT="yes"
IPV6_PRIVACY="no"

# 配置静态的IP:60网段
BOOTPROTO="static"
IPADDR=192.168.60.100 # 此处60根据自己配置的网段来配置
NETMASK=255.255.255.0
GATEWAY=192.168.60.1
DNS1=8.8.8.8
```

![hadoop7](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop7.jpg)

### 重启网络

```shell
# 重启网络
systemctl restart network
```

### 测试静态 IP 是否设置成功

```shell
# 检查IP地址是否与自己配置的静态IP一致
ip addr
# 检查外网能否正常访问
ping baidu.com
```

## 关闭防火墙

```shell
# 查看防火墙的信息
systemctl status firewalld

# 关闭防火墙:下次启动还会启动防火墙
systemctl stop firewalld

# 设置防火墙不随着系统的启动而启动
systemctl disable firewalld
```

**效果:**

![hadoop8](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop8.jpg)

## 关闭selinux

```shell
vi /etc/sysconfig/selinux
# 或者
vi /etc/selinux/config

# 把值由“enforcing”改成“disabled”
SELINUX=disabled
```

![hadoop9](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop9.jpg)

## 配置 hadoop 用户

> 安装系统的时候创建了一个名叫“hadoop”的用户，如果没用创建该用户，可以通过下面的方式创建

```shell
# 创建用户hadoop，指定它的工作目录
useradd -d /home/hadoop hadoop
# 分配密码
passwd hadoop
```

**如果是使用命令创建的用户，需要给 hadoop 用户分配管理员权限**

```shell
visudo
# 第100行
```

![hadoop10](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop10.jpg)

## 安装必要的软件

由于我们装的CentOS是精简版本，导致很多必要的软件没用安装，比如:vim、net-tools、 wget、ntpdate、jdk8，我们就先安装这几个软件。

**介绍**

| 软件       | 介绍                                                         |
| ---------- | ------------------------------------------------------------ |
| vim        | Vim是从 vi 发展出来的一个文本编辑器                          |
| net- tools | net-tools是一个软件工具包，包括route，ifconfig等命令         |
| wget       | wget是一个下载文件的工具，它用在命令行下。对于Linux用户是必不 可少的工具 |
| ntpdate    | 时间同步工具                                                 |
| bzip2      | bzip2压缩格式                                                |
| psmisc     | fuser命令                                                    |
| telnet     | 安装telnet                                                   |

**安装**

```shell
# 安装 vim
yum -y install vim

# 安装 net-tools
yum -y install net-tools

# 安装 wget
yum -y install wget

# 安装 ntpdate
yum -y install ntpdate

# 安装 openssl-devel
yum -y install openssl-devel

# 安装 bzip2
yum -y install bzip2

# fuser 属于 psmisc这个包
yum -y install psmisc

# 安装 telnet
yum -y install telnet telnet-server
```

## 时钟同步

下面完成时钟同步，我们以root用户登录虚拟机，然后完成如下配置:

**安装并启动 ntpdate**

```shell
# 安装 ntpdate
ntpdate yum -y install ntpdate

# 设置 ntpdate 随机启动
# systemctl disable ntpdate
# 将 disable 改为 enable
systemctl enable ntpdate

# 运行 ntpdate
ntpdate ntp4.aliyun.com
```

**给四台机器设置定时任务**

```shell
# 编辑定时任务
crontab -e
```

**添加下面一行**

```shell
# 表示每分钟执行一次时钟同步。
*/1 * * * * /usr/sbin/ntpdate ntp4.aliyun.com
```

**演示：**

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop11.jpg" alt="hadoop11" style="zoom:50%;" />



<br>

:::tip 达到的效果

会每分钟去同步一下集群的时间

:::

## 安装 JDK1.8

### **切换到hadoop用户**

```shell
su hadoop
```

### 下载 JDK1.8

123网盘：[jdk1.8-8u281](https://www.123pan.com/s/zCYKVv-2JXR)（推荐）

官网地址：https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html

![hadoop12](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk%2Fhadoop12.jpg)



### 通过 ftp 工具上传到 Linux

![hadoop13](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop13.jpg)

### 解压 JDK

```shell
tar -xvf jdk-8u281-linux-x64.tar.gz
# 此处 8u281 为 jdk 版本号，需要根据实际情况更改
```

### 配置环境变量

![hadoop14](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop14.jpg)

```shell
# 配置当前用户的环境变量
vi .bash_profile
```

![hadoop15](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop15.jpg)

```shell
# .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi

# JAVA_HOME 指定jdk的路径，也就是刚刚解压的路径
export JAVA_HOME=/home/hadoop/jdk1.8.0_281

# 指定classpath
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib

# 要把jdk的bin目录加入到path环境变量里面去。
export PATH=$PATH:$JAVA_HOME/bin
```

### 使得环境变量生效

```shell
source .bash_profile
```

### 查看 JDK 是否安装成功

```shell
java -version
```

![hadoop16](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop16.jpg)

## 拍摄快照

::: tip

在 VMware 中拍摄快照，起到备份的作用，以便后续出现问题时可以回退到当前状态

:::

![hadoop17](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop17.jpg)

## 克隆虚拟机

上面完成了CentOS虚拟机的配置包括网络配置，然后拍了快照，下面就就可以进行虚拟机的克隆了，由于我们后面使用的是hadoop的集群，如果一个一个虚拟机的安装会比较麻烦，还可以出错，这时候我们通过一个虚拟机的克隆就可以轻松的完成这项任务。

### 克隆四台虚拟机

**克隆: node01，node02，node03，node04**

![hadoop18](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop18.jpg)

![hadoop19](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop19.jpg)



**分别克隆四次虚拟机**

![hadoop20](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop20.jpg)

### 配置克隆虚拟机 IP

由于配置了静态IP，这里克隆以后会导致IP一样，我们需要修改一下IP，具体修改如下

同时也设置一下主机名。

| 主机名 | IP             |
| ------ | -------------- |
| node01 | 192.168.60.101 |
| node02 | 192.168.60.102 |
| node03 | 192.168.60.103 |
| node04 | 192.168.60.104 |

:::warning 注意:

 这里是配置的是60网段，这个网段可以根据自己虚拟机的实际情况来设定，不一定是60

:::

**分别对四台机器修改 IP：**

#### 192.168.60.101

![hadoop21](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop21.jpg)

#### 192.168.60.102

![hadoop22](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop22.jpg)

#### 192.168.60.103

![hadoop23](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop23.jpg)

#### 192.168.60.104

![hadoop24](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop24.jpg)

### 配置克隆虚拟机主机名

> 配置主机名可以修改 **/etc/hostname** 文件(一般使用这样)，或者通过“**hostnamectl set- hostname**”命令。

**配置之前，先切回 root 用户**

**把192.168.60.101设置成node01:**

```shell
hostnamectl set-hostname node01
```

**把192.168.60.102设置成node02:**

```shell
hostnamectl set-hostname node02
```

**把192.168.60.103设置成node03:**

```shell
hostnamectl set-hostname node03
```

**把192.168.60.104设置成node04:**

```shell
hostnamectl set-hostname node04
```

### 设置 IP 与主机名映射

**我们设置一下IP地址与主机名的映射关系，也就是以后可以通过主机名来相互访问**

```shell
vi /etc/hosts
```

**把下面的IP与主机映射内容追加到 /etc/hosts 文件**

```shell
192.168.60.101 node01
192.168.60.102 node02
192.168.60.103 node03
192.168.60.104 node04
```

**修改配置文件**

![hadoop25](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop25.jpg)

**达到的效果**

![hadoop26](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop26.jpg)

达到可以通过 ssh node01，而不是ssh 192.168.60.101这种方式登录系统。

:::warning 注意:

修改主机名以后，最好重新系统，保证修改的配置生效

:::

### 配置 windows 连接虚拟机的映射

> C:\Windows\System32\drivers\etc\hosts

:::warning 注意:

需要以管理员的权限来打开这个文件，然后再编辑。

:::

添加以下字段

```shell
# hadoop集群
192.168.60.101 node01
192.168.60.102 node02
192.168.60.103 node03
192.168.60.104 node04
```

![hadoop27](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop27.jpg)

### 配置ssh免密登录

上面设置完主机名与IP名映射以后，可以通过主机名代替IP，但是ssh登录得时候需要输入密 码，如果在集群里面，集群之间的需要相互调用，如果要输入密码的话，会影响集群之间的调 用，这时候我们可以配置系统之间的ssh免密码登录。

**1.切换到hadoop用户**

#### 2.SSH免秘钥生成

分别到四个虚拟机里面运行如下命令

```shell
ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa
```

#### 3.分发自己的密码给需要免密登录的其它主机

:::warning 注意:

要对自己进行免密登录。

:::

**node01上分别执行:**

```shell
ssh-copy-id hadoop@node01
ssh-copy-id hadoop@node02
ssh-copy-id hadoop@node03
ssh-copy-id hadoop@node04
```

**node02上分别执行:**

```shell
ssh-copy-id hadoop@node01
ssh-copy-id hadoop@node02
ssh-copy-id hadoop@node03
ssh-copy-id hadoop@node04
```

**node03上分别执行:**

```shell
ssh-copy-id hadoop@node01
ssh-copy-id hadoop@node02
ssh-copy-id hadoop@node03
ssh-copy-id hadoop@node04
```

**node04上分别执行:**

```shell
ssh-copy-id hadoop@node01
ssh-copy-id hadoop@node02
ssh-copy-id hadoop@node03
ssh-copy-id hadoop@node04
```

**4.测试**

**使用 ssh 连接指令测试四台虚拟机之间是否全都可以免密登陆**

![hadoop28](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop28.jpg)



:::tip 配置完成
分别对四台虚拟机拍摄快照，配置完成
:::