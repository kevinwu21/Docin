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



:::warning 

完成此步骤以后，分别对四台虚拟机拍摄快照

:::

## 伪分布式搭建

Hadoop可以在单节点上以所谓的伪分布式模式运行，也就是一台机器承但全部的角色。

> 参考文档：https://hadoop.apache.org/docs/r3.1.4/hadoop-project-dist/hadoop-common/SingleCluster.html#Pseudo-Distributed_Operation

### 1.确保ssh对自己可以免密

```shell 
ssh-copy-id hadoop@localhost
```

### 2.下载hadoop-3.1.4.tar.gz，然后上传

### 3.解压hadoop安装文件

```shell
# 解压
tar -xvf hadoop-3.1.4.tar.gz
# 创建 hadoop 数据目录
mkdir -p /home/hadoop/hadoop-data/pseudo
```

### 4.配置环境变量

**以hadoop用户登录，在/home/hadoop/.bash_profile做如下配置：**

```shell
# JAVA_HOME 指定jdk的路径，也就是JKD的解压路径
export JAVA_HOME=/home/hadoop/jdk1.8.0_281

# 配置HADOOP_HOME，hadoop的路径
export HADOOP_HOME=/home/hadoop/hadoop-3.1.4

# 指定classpath
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib

# 把jdk的bin目录加到path环境变量，把hadoop的bin、sbin目录加到环境变量
export PATH=$PATH:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

### 5.配置hadoop-3.1.4/etc/hadoop/hadoop-env.sh文件

```shell
# 配置JAVA_HOME
export JAVA_HOME=/home/hadoop/jdk1.8.0_281
# 配置HADOOP_HOME
export HADOOP_HOME=/home/hadoop/hadoop-3.1.4
```

![hadoop29](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop29.jpg)

### 6.配置hadoop-3.1.4/etc/hadoop/core-site.xml文件

```shell
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
	<property>
		<!-- 配置HDFS -->
		<name>fs.defaultFS</name>
		<value>hdfs://localhost:9000</value>
	</property>
	<property>
		<!-- hadoop临时目录 -->
		<name>hadoop.tmp.dir</name>
		<value>/home/hadoop/hadoop-data/pseudo</value>
	</property>
</configuration>
```

### 7.配置hadoop-3.1.4/etc/hadoop/hdfs-site.xml文件

```shell
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
	<property>
		<!-- 配置副本数 -->
		<name>dfs.replication</name>
		<value>1</value>
  </property>
  <property>
		<!-- 配置secondary -->
		<name>dfs.namenode.secondary.http-address</name>
		<value>localhost:9868</value>
  </property>
</configuration>
```

### 8.配置workers文件

hadoop3.x 版本以前叫 slavers

里面配置的是 DataNode 信息。![hadoop30](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop30.jpg)

伪分布式需要在workers文件中配置localhost，如果已经是localhost则不需要更改

![hadoop31](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop31.jpg)

### 9.**测试运行**

* 进入hadoop主目录。

```shell
cd /home/hadoop/hadoop-3.1.4/bin/
```

* 格式化文件系统

```shell
hdfs namenode -format
```

![hadoop32](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop32.jpg)

如果能看见：**name has been successfully formatted.**  说明格式化成功了。

* 在sbin目录下启动伪分布式(NameNode、DataNode节点)

``` shell
# 进入sbin目录
cd /home/hadoop/hadoop-3.1.4/sbin/
# 启动
start-dfs.sh
```

* 查看是否正常启动

```shell
jps # jps指令可以查看java进程
```

![hadoop33](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop33.jpg)

```shell
# 一定要有这三个进程，才表示伪分布式启动成功! 
9154 NameNode
9478 SecondaryNameNode
9279 DataNode
```

* 浏览器查看下面三个URL

> http://node01:9870/dfshealth.html#tab-overview
>
> http://node01:9870/dfshealth.html#tab-datanode
>
> http://node01:9870/explorer.html#/

![hadoop34](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop34.jpg)

![hadoop35](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop35.jpg)

![hadoop36](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop36.jpg)

* 案例测试

**1.在HDFS里面创建两个目录user、input**

```shell
hdfs dfs -mkdir /user
hdfs dfs -mkdir /input
```

**去查看：http://node01:9870/explorer.html#/**

<hr>
**2.准备测试文件hello.txt，用来统计词频。**

```shell
hello world
hello hadoop
```

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop38.jpg" alt="hadoop38" style="zoom: 67%;" />

<hr>

**3.把上面的 hello.txt 上传到 hdfs 的目录 /input**

```shell
hdfs dfs -put hello.txt /input
```

![hadoop39](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop39.jpg)

<hr>

**4.统计上面 hello.txt 文件的词频**

/home/hadoop/hadoop-3.1.4/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.4.jar 这个jar文件里面会包含大量现成的的案例代码，里面就有一个统计词频的案例叫 “wordcount”。

![hadoop40](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop40.jpg)

**运行:**

```
hadoop jar /home/hadoop/hadoop-3.1.4/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.4.jar wordcount /input/ /output/wc
```

**运行过程:**

```shell
[hadoop@node01 hadoop-3.1.4]$ hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.4.jar wordcount /input/ /output/wc
2021-03-23 10:59:40,933 INFO impl.MetricsConfig: loaded properties
from hadoop-metrics2.properties
2021-03-23 10:59:41,005 INFO impl.MetricsSystemImpl: Scheduled Metric
snapshot period at 10 second(s).
2021-03-23 10:59:41,005 INFO impl.MetricsSystemImpl: JobTracker
metrics system started
2021-03-23 10:59:41,454 INFO input.FileInputFormat: Total input files
to process : 1
2021-03-23 10:59:41,491 INFO mapreduce.JobSubmitter: number of
splits:1
2021-03-23 10:59:41,650 INFO mapreduce.JobSubmitter: Submitting tokens
for job: job_local1410277363_0001
2021-03-23 10:59:41,651 INFO mapreduce.JobSubmitter: Executing with
tokens: []
2021-03-23 10:59:41,866 INFO mapreduce.Job: The url to track the job:
http://localhost:8080/
2021-03-23 10:59:41,866 INFO mapreduce.Job: Running job:
job_local1410277363_0001
2021-03-23 10:59:41,878 INFO mapred.LocalJobRunner: OutputCommitter
set in config null
2021-03-23 10:59:41,889 INFO output.FileOutputCommitter: File Output
Committer Algorithm version is 2
2021-03-23 10:59:41,889 INFO output.FileOutputCommitter:
FileOutputCommitter skip cleanup _temporary folders under output
directory:false, ignore cleanup failures: false
2021-03-23 10:59:41,889 INFO mapred.LocalJobRunner: OutputCommitter is
org.apache.hadoop.mapreduce.lib.output.FileOutputCommitter
2021-03-23 10:59:41,942 INFO mapred.LocalJobRunner: Waiting for map
tasks
2021-03-23 10:59:41,942 INFO mapred.LocalJobRunner: Starting task:
attempt_local1410277363_0001_m_000000_0
2021-03-23 10:59:41,961 INFO output.FileOutputCommitter: File Output
Committer Algorithm version is 2
2021-03-23 10:59:41,961 INFO output.FileOutputCommitter:
FileOutputCommitter skip cleanup _temporary folders under output
directory:false, ignore cleanup failures: false
2021-03-23 10:59:41,997 INFO mapred.Task:  Using
ResourceCalculatorProcessTree : [ ]
2021-03-23 10:59:41,999 INFO mapred.MapTask: Processing split:
hdfs://localhost:9000/input/hello.txt:0+26
2021-03-23 10:59:42,892 INFO mapreduce.Job: Job
job_local1410277363_0001 running in uber mode : false
2021-03-23 10:59:42,913 INFO mapreduce.Job:  map 0% reduce 0%
2021-03-23 10:59:42,930 INFO mapred.MapTask: (EQUATOR) 0 kvi
26214396(104857584)
2021-03-23 10:59:42,930 INFO mapred.MapTask:
mapreduce.task.io.sort.mb: 100
2021-03-23 10:59:42,930 INFO mapred.MapTask: soft limit at 83886080
2021-03-23 10:59:42,930 INFO mapred.MapTask: bufstart = 0; bufvoid =
104857600
2021-03-23 10:59:42,930 INFO mapred.MapTask: kvstart = 26214396;
length = 6553600
2021-03-23 10:59:42,949 INFO mapred.MapTask: Map output collector
class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
2021-03-23 10:59:43,265 INFO mapred.LocalJobRunner:
2021-03-23 10:59:43,272 INFO mapred.MapTask: Starting flush of map
output
2021-03-23 10:59:43,272 INFO mapred.MapTask: Spilling map output
2021-03-23 10:59:43,272 INFO mapred.MapTask: bufstart = 0; bufend =
41; bufvoid = 104857600
2021-03-23 10:59:43,272 INFO mapred.MapTask: kvstart =
26214396(104857584); kvend = 26214384(104857536); length = 13/6553600
2021-03-23 10:59:43,288 INFO mapred.MapTask: Finished spill 0
2021-03-23 10:59:43,353 INFO mapred.Task:
Task:attempt_local1410277363_0001_m_000000_0 is done. And is in the
process of committing
2021-03-23 10:59:43,374 INFO mapred.LocalJobRunner: map
2021-03-23 10:59:43,374 INFO mapred.Task: Task
'attempt_local1410277363_0001_m_000000_0' done.
2021-03-23 10:59:43,412 INFO mapred.Task: Final Counters for
attempt_local1410277363_0001_m_000000_0: Counters: 23
    File System Counters
        FILE: Number of bytes read=316536
        FILE: Number of bytes written=831784
        FILE: Number of read operations=0
        FILE: Number of large read operations=0
        FILE: Number of write operations=0
        HDFS: Number of bytes read=26
        HDFS: Number of bytes written=0
        HDFS: Number of read operations=5
        HDFS: Number of large read operations=0
        HDFS: Number of write operations=1
    Map-Reduce Framework
        Map input records=3
        Map output records=4
        Map output bytes=41
        Map output materialized bytes=43
        Input split bytes=102
        Combine input records=4
        Combine output records=3
        Spilled Records=3
        Failed Shuffles=0
        Merged Map outputs=0
        GC time elapsed (ms)=21
        Total committed heap usage (bytes)=127090688
    File Input Format Counters
        Bytes Read=26
2021-03-23 10:59:43,412 INFO mapred.LocalJobRunner: Finishing task:
attempt_local1410277363_0001_m_000000_0
2021-03-23 10:59:43,413 INFO mapred.LocalJobRunner: map task executor
complete.
2021-03-23 10:59:43,428 INFO mapred.LocalJobRunner: Waiting for reduce
tasks
2021-03-23 10:59:43,429 INFO mapred.LocalJobRunner: Starting task:
attempt_local1410277363_0001_r_000000_0
2021-03-23 10:59:43,463 INFO output.FileOutputCommitter: File Output
Committer Algorithm version is 2
2021-03-23 10:59:43,463 INFO output.FileOutputCommitter:
FileOutputCommitter skip cleanup _temporary folders under output
directory:false, ignore cleanup failures: false
2021-03-23 10:59:43,464 INFO mapred.Task:  Using
ResourceCalculatorProcessTree : [ ]
2021-03-23 10:59:43,465 INFO mapred.ReduceTask: Using
ShuffleConsumerPlugin:
org.apache.hadoop.mapreduce.task.reduce.Shuffle@21f0cd60
2021-03-23 10:59:43,466 WARN impl.MetricsSystemImpl: JobTracker
metrics system already initialized!
2021-03-23 10:59:43,507 INFO reduce.MergeManagerImpl: MergerManager:
memoryLimit=173133008, maxSingleShuffleLimit=43283252,
mergeThreshold=114267792, ioSortFactor=10,
memToMemMergeOutputsThreshold=10
2021-03-23 10:59:43,513 INFO reduce.EventFetcher:
attempt_local1410277363_0001_r_000000_0 Thread started: EventFetcher
for fetching Map Completion Events
2021-03-23 10:59:43,544 INFO reduce.LocalFetcher: localfetcher#1 about
to shuffle output of map attempt_local1410277363_0001_m_000000_0
decomp: 39 len: 43 to MEMORY
2021-03-23 10:59:43,550 INFO reduce.InMemoryMapOutput: Read 39 bytes
from map-output for attempt_local1410277363_0001_m_000000_0
2021-03-23 10:59:43,554 INFO reduce.MergeManagerImpl:
closeInMemoryFile -> map-output of size: 39, inMemoryMapOutputs.size()
-> 1, commitMemory -> 0, usedMemory ->39
2021-03-23 10:59:43,560 INFO reduce.EventFetcher: EventFetcher is
interrupted.. Returning
2021-03-23 10:59:43,561 INFO mapred.LocalJobRunner: 1 / 1 copied.
2021-03-23 10:59:43,561 INFO reduce.MergeManagerImpl: finalMerge
called with 1 in-memory map-outputs and 0 on-disk map-outputs
2021-03-23 10:59:43,567 INFO mapred.Merger: Merging 1 sorted segments
2021-03-23 10:59:43,567 INFO mapred.Merger: Down to the last merge-
pass, with 1 segments left of total size: 30 bytes
2021-03-23 10:59:43,568 INFO reduce.MergeManagerImpl: Merged 1
segments, 39 bytes to disk to satisfy reduce memory limit
2021-03-23 10:59:43,569 INFO reduce.MergeManagerImpl: Merging 1 files,
43 bytes from disk
2021-03-23 10:59:43,569 INFO reduce.MergeManagerImpl: Merging 0
segments, 0 bytes from memory into reduce
2021-03-23 10:59:43,569 INFO mapred.Merger: Merging 1 sorted segments
2021-03-23 10:59:43,575 INFO mapred.Merger: Down to the last merge-
pass, with 1 segments left of total size: 30 bytes
2021-03-23 10:59:43,576 INFO mapred.LocalJobRunner: 1 / 1 copied.
2021-03-23 10:59:43,630 INFO Configuration.deprecation: mapred.skip.on
is deprecated. Instead, use mapreduce.job.skiprecords
2021-03-23 10:59:43,684 INFO mapred.Task:
Task:attempt_local1410277363_0001_r_000000_0 is done. And is in the
process of committing
2021-03-23 10:59:43,689 INFO mapred.LocalJobRunner: 1 / 1 copied.
2021-03-23 10:59:43,689 INFO mapred.Task: Task attempt_local1410277363_0001_r_000000_0 is allowed to commit now
2021-03-23 10:59:43,937 INFO mapreduce.Job: Counters: 35
      File System Counters
          FILE: Number of bytes read=633190
          FILE: Number of read operations=0
          FILE: Number of large read operations=0
          FILE: Number of write operations=0
          HDFS: Number of bytes read=52
          HDFS: Number of bytes written=25
          HDFS: Number of read operations=15
          HDFS: Number of large read operations=0
          HDFS: Number of write operations=4
      Map-Reduce Framework
          Map input records=3
          Map output records=4
          Map output bytes=41
          Map output materialized bytes=43
          Input split bytes=102
          Combine input records=4
          Combine output records=3
          Reduce input groups=3
          Reduce shuffle bytes=43
          Reduce input records=3
          Reduce output records=3
          Spilled Records=6
          Shuffled Maps =1
          Failed Shuffles=0
          Merged Map outputs=1
          GC time elapsed (ms)=27
          Total committed heap usage (bytes)=254181376
      Shuffle Errors
 BAD_ID=0
          CONNECTION=0
          IO_ERROR=0
          WRONG_LENGTH=0
          WRONG_MAP=0
          WRONG_REDUCE=0
      File Input Format Counters
          Bytes Read=26
      File Output Format Counters
          Bytes Written=25
```

**5.查看运行结果目录**

```shell
# 查看运行结果目录
./bin/hdfs dfs -ls /output/wc/*
```

**通过命令行查看**

![hadoop41](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop41.jpg)

**通过浏览器查看**

![hadoop42](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop42.jpg)

**可以下载文件查看统计结果**

![hadoop43](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop43.jpg)

**6.查看具体的统计结果**

```shell
# 查看具体的统计结果
hdfs dfs -cat /output/wc/part-r-00000
# 下载HDFS文件内容到本地磁盘目录~/wc(当前用户的主目录) 
hdfs dfs -get /output/wc ~/wc
```

![hadoop44](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop44.jpg)

:::tip 恭喜你配置成功

到此步骤 hadoop 伪分布式已配置完成

关闭虚拟机前记得关闭 dfs 服务

:::

**7.关闭系统**

```shell
stop-dfs.sh
```

![hadoop45](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop45.jpg)

**8.关闭虚拟机，拍摄快照**

![hadoop46](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop46.jpg)

## 1.0 完全分布式

> 我们上面搭建的是伪分布式，就是多个角色由一个节点来承但，伪分布式是完全分布式的一种特例，下面我们来搭建hadoop1.x中的完全分布式，也是最简单的一种分布式搭建方式。

**搭建前提**

全分布的搭建是在上面四台虚拟机基础上搭建，具体包括以下几点。

1. 网络配置:静态ip、主机名配置、ip 与主机的映射
2. 关闭防火墙，关闭 SELINUX
3. 时钟同步
4. ssh 免密登录:四台机器之间可以 ssh 免密登录
5. 预装 JDK

**角色分配**

| 集群节点 | NameNode | SecondaryNameNode | DataNode |          说明          |
| :------: | :------: | :---------------: | :------: | :--------------------: |
|  node01  |  **※**   |                   |          |        名称节点        |
|  node02  |          |       **※**       |  **※**   | 第二名称节点、数据节点 |
|  node03  |          |                   |  **※**   |        数据节点        |
|  node04  |          |                   |  **※**   |        数据节点        |

**注意：我们这里搭建的完全分布式，其实是Hadoop1.x里面的完全分布式**

**搭建步骤**

**搭建的整体思想:**一台机器上将Hadoop配置完毕，然后然后将这个配置好的Hadoop使

用"scp"进行分发。

### 1.上传hadoop安装文件hadoop-3.1.4.tar.gz，然后解压

```shell
tar -xvf hadoop-3.1.4.tar.gz
```

### 2.在四台机器上面创建目录

```shell
mkdir -p /home/hadoop/hadoop-data/full
```

### 3.配置环境变量

在node01中用hadoop用户登录，在/home/hadoop/.bash_profile做如下配置:

```shell
# JAVA_HOME 指定jdk的路径，也就是JKD的解压路径
export JAVA_HOME=/home/hadoop/jdk1.8.0_281

# 配置HADOOP_HOME，hadoop的路径
export HADOOP_HOME=/home/hadoop/hadoop-3.1.4

# 指定classpath
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib

# 把jdk的bin目录加到path环境变量，把hadoop的bin、sbin目录加到环境变量
export PATH=$PATH:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

使用scp命令对.bash_profile文件往node02、node03、node04完成分发。

```shell
# 对node02进行分发
scp /home/hadoop/.bash_profile node02:/home/hadoop/

# 对node03进行分发
scp /home/hadoop/.bash_profile node03:/home/hadoop/

# 对node04进行分发
scp /home/hadoop/.bash_profile node04:/home/hadoop/
```

完成分发以后在node02、node02、node03、node04机器上分别使用source命令使得环境变量生效。

```shell
source .bash_profile
```

### 4.配置 node01 上的hadoop-3.1.4/etc/hadoop/hadoop-env.sh文件

```shell
# 配置JAVA_HOME
export JAVA_HOME=/home/hadoop/jdk1.8.0_281
# 配置HADOOP_HOME
export HADOOP_HOME=/home/hadoop/hadoop-3.1.4
```

![hadoop29](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop29.jpg)

### 5.配置 node01 上的hadoop-3.1.4/etc/hadoop/core-site.xml文件

```shell
<configuration>
	<property>
		<!-- 配置HDFS:配置的是NameNode的所在地 -->
		<name>fs.defaultFS</name>
		<value>hdfs://node01:9000</value>
  </property>
  <property>
		<!-- hadoop临时目录 -->
		<name>hadoop.tmp.dir</name>
		<value>/home/hadoop/hadoop-data/full</value>
  </property>
</configuration>
```

### 6.配置 node01 上的hadoop-3.1.4/etc/hadoop/hdfs-site.xml文件

```shell
<configuration>
	<property>
		<!-- 配置副本数为3 -->
		<name>dfs.replication</name>
		<value>3</value>
  </property>
  <property>
		<!-- 配置SNN为node02 -->
		<name>dfs.namenode.secondary.http-address</name>
		<value>node02:9868</value>
  </property>
</configuration>
```

### 7.配置workers文件

hadoop3.x版本以前叫slavers

里面配置的是DataNode信息

```shell
node02
node03
node04
```

### 8.使用 scp 向 node02、node03、node04 分发配置文件。

* **分发之前，在node01、node02、node03、node04先创建好目录结构**

```shell
mkdir -p /home/hadoop/hadoop-data/full
```

* **然后进入到hadoop的安装路径，此处是/home/hadoop，也就是之前创建的hadoop主目录**

```shell
cd /home/hadoop
```

* **使用 scp 命令在 node01 上对 hadoop-3.1.4 目录往 node02、node03、node04 完成分发**

```shell
# 对node02进行分发
scp -r /home/hadoop/hadoop-3.1.4 node02:/home/hadoop/

# 对node03进行分发
scp -r /home/hadoop/hadoop-3.1.4 node03:/home/hadoop/

# 对node04进行分发
scp -r /home/hadoop/hadoop-3.1.4 node04:/home/hadoop/
```

### 9.格式化

* 集群启动前，要先进行格式化，由于我们 NameNode 配置在 node01 上，所以是在 node01 上进行格式化，并且只要格式化一次。

```shell
hdfs namenode -format
```

### 10.启动集群

* 在 node01 上面启动集群，我们先启动hdfs。

```shell
# 在node01上启动
start-dfs.sh
```

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop47.jpg" alt="hadoop47" style="zoom:70%;" />

* 查看各个节点的角色的运行情况，我们使用**jps**命令。

```shell
jps
```

**node01 运行情况:**

```shell
[hadoop@node01 full]$ jps 
10435 NameNode 
10750 Jps
```

**node02 运行情况:**

```shell
[hadoop@node02 full]$ jps 
10603 Jps
10476 SecondaryNameNode
10397 DataNode
```

**node03 运行情况:**

```shell
[hadoop@node03 full]$ jps 
9938 DataNode
10050 Jps
```

**node04 运行情况:**

```shell
[hadoop@node04 full]$ jps 
10083 DataNode
10197 Jps
```

* 浏览器查看下面三个URL

> http://node01:9870/dfshealth.html#tab-overview
>
> http://node01:9870/dfshealth.html#tab-datanode
>
> http://node01:9870/explorer.html#/

**NameNode 运行情况:**

![hadoop48](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop48.jpg)

**DataNode 运行情况:**

![hadoop49](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop49.jpg)

**HDFS 运行情况:**

![hadoop50](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop50.jpg)

### 11.集群测试

我们还是以 wordcount 来做为测试

* 在HDFS里面创建两个目录 user、input

```shell
hdfs dfs -mkdir /user
hdfs dfs -mkdir /input
```

* 准备测试文件 hello.txt，用来统计词频

```shell
hello world
hello hadoop
```

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop38.jpg" alt="hadoop38" style="zoom: 67%;" />

* 把上面的 hello.txt 上传到 hdfs 的目录 /input

```shell
hdfs dfs -put hello.txt /input
```

* 统计上面hello.txt文件的词频

```shell
hadoop jar /home/hadoop/hadoop-3.1.4/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.4.jar wordcount /input/ /output/wc
```

* 查看运行结果

```shell
# 查看运行结构目录
hdfs dfs -ls /output/wc/*

# 查看具体的统计结果
hdfs dfs -cat /output/wc/part-r-00000

# 下载HDFS文件内容到本地磁盘目录~/wc 
hdfs dfs -get /output/wc ~/wc
```

### 12.关闭集群

```shell
stop-dfs.sh
```

### 13.拍摄快照

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop51.jpg" alt="hadoop51" style="zoom:40%;" />

:::tip 配置完成

完全分布式配置成功  :tada: :100: :trophy:

:::
