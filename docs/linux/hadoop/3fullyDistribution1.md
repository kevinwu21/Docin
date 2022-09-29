# 1.x 完全分布式

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

**搭建的整体思想：一台机器上将Hadoop配置完毕，然后然后将这个配置好的Hadoop使用"scp"进行分发**

## 1.上传hadoop安装文件hadoop-3.1.4.tar.gz，然后解压

```shell
tar -xvf hadoop-3.1.4.tar.gz
```

## 2.在四台机器上面创建目录

```shell
mkdir -p /home/hadoop/hadoop-data/full
```

## 3.配置环境变量

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

## 4.配置 node01 上的hadoop-3.1.4/etc/hadoop/hadoop-env.sh文件

```shell
# 配置JAVA_HOME
export JAVA_HOME=/home/hadoop/jdk1.8.0_281
# 配置HADOOP_HOME
export HADOOP_HOME=/home/hadoop/hadoop-3.1.4
```

![hadoop29](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop29.jpg)

## 5.配置 node01 上的hadoop-3.1.4/etc/hadoop/core-site.xml文件

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

## 6.配置 node01 上的hadoop-3.1.4/etc/hadoop/hdfs-site.xml文件

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

## 7.配置workers文件

hadoop3.x版本以前叫slavers

里面配置的是DataNode信息

```shell
node02
node03
node04
```

## 8.使用 scp 向 node02、node03、node04 分发配置文件。

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

## 9.格式化

* 集群启动前，要先进行格式化，由于我们 NameNode 配置在 node01 上，所以是在 node01 上进行格式化，并且只要格式化一次。

```shell
hdfs namenode -format
```

## 10.启动集群

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

## 11.集群测试

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

## 12.关闭集群

```shell
stop-dfs.sh
```

## 13.拍摄快照

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop51.jpg" alt="hadoop51" style="zoom:40%;" />

:::tip 配置完成

完全分布式配置成功  :tada: :100: :trophy:

:::