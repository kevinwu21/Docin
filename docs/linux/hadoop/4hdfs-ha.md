# HDFS HA - HDFS高可用

>上面我们搭建的完全分布式环境是属于Hadoop1.x的，这个版本的完全分布式存在 高可用(High Availability) 、扩展性    方面的问题。

## 搭建准备

先创建目录，包括 ha、dir-shared、zk 三个目录，由于是被不同集群角色使用，不同节点上创建的目录不一样。

```shell
# 指定 hadoop HA 临时目录(node01、node02、node03、node04)
mkdir -p /home/hadoop/hadoop-data/ha
# 指定 JournalNode 在本地磁盘存放数据的位置(node01、node02、node03)
mkdir -p /home/hadoop/hadoop-data/ha/dir-shared
# 配置 zookeeper 的临时目录(node02、node03、node04)
mkdir -p /home/hadoop/hadoop-data/zk
```

## 搭建 zookeeper 集群

根据集群的角色的分配，需要在 node02、node03、node04 上面配置 zookeeper

:::tip 安装 zookeeper 的步骤

先在 node02 上面配置好 zookeeper 然后再使用 scp 分发到 node03、 node04 上面

:::

* **先登录 node02 解压 zookeeper**

```shell
# 解压zookeeper
tar -xvf zookeeper-3.4.14.tar.gz
# 进入zookeeper主目录
cd /home/hadoop/zookeeper-3.4.14
```

* **配置 zookeeper 的环境变量**

在 node01 打开配置文件:

```shell
vim ~/.bash_profile
```

```shell
# JAVA_HOME jdk目录
export JAVA_HOME=/home/hadoop/jdk1.8.0_281
# HADOOP_HOME hadoop目录
export HADOOP_HOME=/home/hadoop/hadoop-3.1.4
# ZOOKEEPER_HOME zookeeper目录
export ZOOKEEPER_HOME=/home/hadoop/zookeeper-3.4.14

# 指定classpath
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib

# 把jdk、hadoop、zk的bin目录加入到环境变量
export PATH=$PATH:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$ZOOKEEPER _HOME/bin
```

向 node02、node03、node04 进行环境变量文件的分发

```shell
# 向node02进行分发
scp ~/.bash_profile node02:/home/hadoop/
# 向node03进行分发
scp ~/.bash_profile node03:/home/hadoop/
# 向node04进行分发
scp ~/.bash_profile node04:/home/hadoop/
```

分发完成后，记得在四台虚拟机中分别使用 source .bash_profile 使环境变量配置文件生效

```shell
source ~/.bash_profile
```

## 配置 zookeeper

* ### 在 node02 进入 zookeeper 的配置文件目录

```shell
# 进入目录
cd /home/hadoop/zookeeper-3.4.14/conf
# 查看目录结构
ll
```

![ha1](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha1.jpg)

<br>

* ### **把 zoo_sample.cfg 改名为 zoo.cfg**

> zoo.cfg 是 zookeeper 的配置文件

```shell
# 复制 zoo_sample.cfg 改名为 zoo.cfg
cp zoo_sample.cfg zoo.cfg
```

<br>

* ### **编辑 zoo.cfg ，添加如下配置**

```shell
# 配置zookeeper的临时目录
dataDir=/home/hadoop/hadoop-data/zk

# 配置zookeeper集群服务器编号，以及对应的主机名、通信端口(心跳检测端口)、选举端口号。
server.1=node02:2888:3888
server.2=node03:2888:3888
server.3=node04:2888:3888
```

<br>

* ### **在 node02 上向 node03、node04 分发已经配置好的 zookeeper**

```shell
# 向node03分发
scp -r /home/hadoop/zookeeper-3.4.14 node03:/home/hadoop/
# 向node04分发
scp -r /home/hadoop/zookeeper-3.4.14 node04:/home/hadoop/
```

<br>

* ### **在 zookeeper 的 dataDir 目录下创建一个 myid 文件**

node02:

```shell
# 在node02机器上，创建目录
mkdir -p /home/hadoop/hadoop-data/zk

# 进入目录
cd /home/hadoop/hadoop-data/zk

# 把“1”写入myid
echo 1 > myid

# 查看“1”有没有写入成功
cat myid
```

node03:

```shell
# 在node03机器上，创建目录
mkdir -p /home/hadoop/hadoop-data/zk

# 进入目录
cd /home/hadoop/hadoop-data/zk

# 把“2”写入myid
echo 2 > myid

# 查看“2”有没有写入成功
cat myid
```

node04:

```shell
# 在node04机器上，创建目录
mkdir -p /home/hadoop/hadoop-data/zk

# 进入目录
cd /home/hadoop/hadoop-data/zk

# 把“3”写入myid
echo 3 > myid

# 查看“3”有没有写入成功
cat myid
```

## 配置集群

* ### 在 node01 上配置hadoop-env.sh文件

:::tip 可选择

如果在1.0完全分布式的基础上配置，此步骤可省略

:::

```shell
vim /hadoop-3.1.4/etc/hadoop/hadoop-env.sh
```

```shell
# 第54行 配置JAVA_HOME
export JAVA_HOME=/home/hadoop/jdk1.8.0_281

# 第58行 配置HADOOP_HOME
export HADOOP_HOME=/home/hadoop/hadoop-3.1.4
```

![ha2](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha2.jpg)

* ### 配置 core-site.xml

```shell
vim /hadoop-3.1.4/etc/hadoop/core-site.xml
```

```shell
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
	<!-- 指定hdfs的nameservice为mycluster -->
	<property>
  	<name>fs.defaultFS</name>
    <value>hdfs://mycluster</value>
  </property>
	<!-- 指定hadoop临时目录 -->
	<property>
		<name>hadoop.tmp.dir</name>
		<value>/home/hadoop/hadoop-data/ha</value>
	</property>
	<!-- 指定zookeeper集群地址 -->
	<property>
  	<name>ha.zookeeper.quorum</name>
    <value>node02:2181,node03:2181,node04:2181</value>
  </property>
</configuration>
```

* ### 配置 hdfs-site.xml

```shell
vim /hadoop-3.1.4/etc/hadoop/hdfs-site.xml
```

```shell
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
    <!-- 配置副本数为3 -->
    <property>
        <name>dfs.replication</name>
        <value>3</value>
    </property>

    <!-- 指定hdfs的nameservice为mycluster，需要和core-site.xml中的“fs.defaultFS”保持⼀致 -->
    <property>
        <name>dfs.nameservices</name>
        <value>mycluster</value>
    </property>

    <!-- mycluster下面有两个NameNode，分别是nn1，nn2 -->
    <property>
        <name>dfs.ha.namenodes.mycluster</name>
        <value>nn1,nn2</value>
    </property>

    <!-- nn1的RPC通信地址 -->
    <property>
        <name>dfs.namenode.rpc-address.mycluster.nn1</name>
        <value>node01:8020</value>
    </property>
    <!-- nn2的RPC通信地址 -->
    <property>
        <name>dfs.namenode.rpc-address.mycluster.nn2</name>
        <value>node02:8020</value>
    </property>

    <!-- nn1的http通信地址 -->
    <property>
        <name>dfs.namenode.http-address.mycluster.nn1</name>
        <value>node01:9870</value>
    </property>
    <!-- nn2的http通信地址 -->
    <property>
        <name>dfs.namenode.http-address.mycluster.nn2</name>
        <value>node02:9870</value>
    </property>

    <!-- 指定活跃NameNode的元数据在JournalNode上的存放位置 -->
    <property>
        <name>dfs.namenode.shared.edits.dir</name>
        <value>qjournal://node01:8485;node02:8485;node03:8485/mycluster</value>
    </property>

    <!-- 指定JournalNode在本地磁盘存放数据的位置 -->
    <property>
        <name>dfs.journalnode.edits.dir</name>
        <!-- 此目录一定要创建 -->
        <value>/home/hadoop/hadoop-data/ha/dir-shared</value>
    </property>
    
    <!-- nn对jn检测的重试次数，默认为10次，每次1000ms，故网络情况差需要增加，这里设置为30次 -->
    <property>
         <name>ipc.client.connect.max.retries</name>
         <value>30</value>
    </property>

    <!-- 下面的配置都是关于故障转移 -->

    <!-- 开启NameNode失败自动切换 -->
    <property>
        <name>dfs.ha.automatic-failover.enabled</name>
        <!-- true：表示自动切换；false：手动切换 -->
        <value>true</value>
    </property>

    <!-- 被DFS客户端用来确定哪个NameNode是当前活跃的NameNode -->
    <property>
        <name>dfs.client.failover.proxy.provider.mycluster</name>
        <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
    </property>

    <!-- 下面配置的是隔离机制 -->

    <!-- 配置“状态隔离”机制方法，就是主NameNode发生故障以后要进行隔离，防止“脑裂” -->
    <!-- 配置的时候，一行一个 -->
    <property>
        <name>dfs.ha.fencing.methods</name>
        <value>
          sshfence
          shell(/bin/true)
        </value>
    </property>

    <!-- 使sshfence隔离机制时需要ssh免登陆 -->
    <property>
        <name>dfs.ha.fencing.ssh.private-key-files</name>
        <!-- 注意此密钥文件，根据自己的实际路径，与实际名称来配置 -->
        <value>/home/hadoop/.ssh/id_dsa</value>
    </property>

    <!-- 配置sshfence隔离机制超时时间 -->
    <property>
        <name>dfs.ha.fencing.ssh.connect-timeout</name>
        <value>30000</value>
    </property>
</configuration>
```

* ### 配置workers文件(3版本以前叫slavers)，里面配置的是DataNode信息

:::tip 可选择

如果在1.0完全分布式的基础上配置，此步骤可省略

:::

```shell
vim + /home/hadoop/hadoop-3.1.4/etc/hadoop/workers
```

**设置如下信息**

```shell
node02
node03
node04
```

到这一步完成了Hadoop的配置

* ### 分发Hadoop配置文件

在node01上使用scp命令对hadoop目录往node02、node03、node04完成分发。

```shell
# 对node02进行分发
scp -r /home/hadoop/hadoop-3.1.4 node02:/home/hadoop/

# 对node03进行分发
scp -r /home/hadoop/hadoop-3.1.4 node03:/home/hadoop/

# 对node04进行分发
scp -r /home/hadoop/hadoop-3.1.4 node04:/home/hadoop/
```

## 集群初始化

配置了HA高可用的集群的初始化，跟以前的集群初始化有本质上的区别，会牵涉到很多个步骤

### 1.启动 Zookeeper

Zookeeper不像Hadoop，只需要在NameNode上启动，其他其它也会启动，所以需要在每台服务器上$ZOOKEEPER_HOME/bin目录下执行 “zkServer.sh” 文件

* **我们到 node02、node03、node04 启动 Zookeeper**

```shell
# 启动zookeeper
zkServer.sh start
```

* **查看 Zookeeper 启动状态**

```shell
zkServer.sh status
```

**node02 运行的可能情况**

![ha3](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha3.jpg)

**node03 运行的可能情况**

![ha4](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha4.jpg)

**node04 运行的可能情况**

![ha5](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha5.jpg)

:::warning 注意

我们搭建的 Zookeeper 集群是3台，分别是 node02、node03、node04 ，这三台中满足“一主二从”，并且三台机器都有“QuorumPeerMain”后台进程。这三台 Zookeeper 哪台是 leader 哪两台是 follower 有很大的随机性。

:::

### 2.启动 JournalNode

* **到 node01、node02、node03 启动 JournalNode 进程**

```shell
# 启动命令
hadoop-daemon.sh start journalnode
```

![ha6](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha6.jpg)

![ha7](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha7.jpg)

![ha8](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha8.jpg)

### 3.初始化 NN1/NN2

* **在 node01 上格式化**

```shell
hdfs namenode -format
```

* **在 node01 节点上启动 namenode 节点**

```shell
hadoop-daemon.sh start namenode
```

* **在 node02 节点上拷贝 node01 的元数据信息**

```shell
hdfs namenode -bootstrapStandby
```

运行结果:

![ha9](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha9.jpg)

### 4.Zookeeper 中初始化集群

**zk 安装在 node02、node03、node04 上面，我们任意登录一台，比如登录 node02，先进入下面的目录**

```shell
# 进入bin目录
cd /home/hadoop/zookeeper-3.4.14/bin
```

![ha10](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha10.jpg)

* **运行 Zookeeper 客户端**

```shell
# 运行zk客户端
zkCli.sh
# 查看zookeeper的根目录
ls /
```

运行情况:

![ha11](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha11.jpg)

* **在 Zookeeper 中初始化HA**

:::warning 注意

此步骤必须在namenode上，也就是node01

:::

```shell
# 在node01上运行
hdfs zkfc -formatZK
```

![ha12](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha12.jpg)

**到 zookeeper 客户端里面查看初始化的 HA**

```shell
ls /
ls /hadoop-ha
ls /hadoop-ha/mycluster	
```

运行结果:

![ha13](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha13.jpg)

:::tip 配置完成

到这一步基本完成配置，下面进行测试

:::

## 测试集群

### 在 node01 启动 HDFS

```shell
# 由于zookeeper已经启动，只需要在node01启动HDFS即可
start-dfs.sh
```

![ha14](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha14.jpg)

### 查看集群启动情况

node01运行情况:

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha15.jpg" alt="ha15" style="zoom:82%;" />

node02运行情况:

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha16.jpg" alt="ha16" style="zoom:80%;" />

node03运行情况:

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha17.jpg" alt="ha17" style="zoom:92%;" />

node04运行情况:

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha18.jpg" alt="ha18" style="zoom:94%;" />

集群后台进程情况汇总:

|                       node01                       |                            node02                            |                   node03                    |           node04            |
| :------------------------------------------------: | :----------------------------------------------------------: | :-----------------------------------------: | :-------------------------: |
| DFSZKFailoverController<br>JournalNode<br>NameNode | DataNode<br/>NameNode<br/>QuorumPeerMain<br/>JournalNode<br/>DFSZKFailoverController | QuorumPeerMain<br/>JournalNode<br/>DataNode | QuorumPeerMain<br/>DataNode |

**说明:**

**NameNode：名称节点进程**

**DataNode：数据节点进程**

**DFSZKFailoverController：ZKFC进程**

**JournalNode：JNN进程**

**QuorumPeerMain：zookeeper集群进程**

### 查看 Zookeeper

**通过查看zookeeper里面注册信息会发现，里面多了两个节点，分别是 ActiveBreadCrumb, ActiveStandbyElectorLock**

```shell
# 在node02上运行zk客户端
zkCli.sh
# 在zookeeper客户端里面运行
ls /hadoop-ha/mycluster
```

运行结果:

![ha19](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha19.jpg)

**查看 ActiveBreadCrumb 内容:**

```shell
get /hadoop-ha/mycluster/ActiveBreadCrumb
```

运行结果:

![ha20](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha20.jpg)

通过查明 ActiveBreadCrumb 发现注册的活跃主节点是 node01

### 在浏览器中查看集群

* **通过下面命令查看端口信息**

```shell
ss -nal | grep 192.168.60.101
```

运行效果:	

![ha21](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha21.jpg)

```shell
# node01为nn1
http://node01:9870/dfshealth.html
# node02为nn2
http://node02:9870/dfshealth.html
# HDFS
http://node01:9870/explorer.html
```

**node01显示“active”**

![ha22](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha22.jpg)

**node02显示“standby”**

![ha23](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha23.jpg)

### 测试故障自动切换

我们搭建HA高可用，就是为了解决单点故障，现在我们来测试一下，我们可以关闭node01的 namenode进程，然后再启动namenode进程，来模拟主节点故障，然后查看集群的情况，是否实现了活跃主节点的切换。

**在node01上关闭namenode进程**

```shell
# 先关闭namenode
hadoop-daemon.sh stop namenode
# 再启动namenode
hadoop-daemon.sh start namenode
```

运行效果:

![ha24](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha24.jpg)

![ha25](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha25.jpg)

## 集群的启动与关闭

* **集群启动：先启动 zookeeper，然后再启动 hdfs**

  * 分别在node02、node03、node04启动zookeeper

  ```shell
  zkServer.sh start
  ```

  * 在node01启动HDFS

  ```shell
  start-dfs.sh
  ```

运行结果:		

![ha26](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha26.jpg)

通过 start-dfs.sh 启动集群的时候，启动顺序是：

先启动 namenode，然后启动 datanode，再启动 JNN，最后启动 ZKFC

<hr>

* **集群关闭：先关hdfs，再关zookeeper**

  * **在node01关闭HDFS**

  ```shell
  stop-dfs.sh
  ```

  * **在node02、node03、node04关闭zookeeper**

  ```shell
  zkServer.sh stop
  ```

运行结果:

![ha27](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha27.jpg)

通过 stop-dfs.sh 关闭的时候，关闭的顺序是：

先关闭 namenode，然后关闭 datanode，然后关闭 JNN，然后关闭 ZKFC

## 拍摄快照

* 关闭集群、关闭虚拟机后 分别对四台虚拟机拍摄快照

![ha28](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/ha28.jpg)

:::tip 配置完成

HDFS HA 配置成功  :tada: :100: :trophy:

:::