# 伪分布式搭建

Hadoop可以在单节点上以所谓的伪分布式模式运行，也就是一台机器承但全部的角色。

> 参考文档：https://hadoop.apache.org/docs/r3.1.4/hadoop-project-dist/hadoop-common/SingleCluster.html#Pseudo-Distributed_Operation

## 1.确保ssh对自己可以免密
```shell
ssh-copy-id hadoop@localhost
```
## 2.下载hadoop-3.1.4.tar.gz，然后上传

## 3.解压hadoop安装文件

```shell
# 解压
tar -xvf hadoop-3.1.4.tar.gz
# 创建 hadoop 数据目录
mkdir -p /home/hadoop/hadoop-data/pseudo
```

## 4.配置环境变量

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

## 5.配置hadoop-3.1.4/etc/hadoop/hadoop-env.sh文件

```shell
# 配置JAVA_HOME
export JAVA_HOME=/home/hadoop/jdk1.8.0_281
# 配置HADOOP_HOME
export HADOOP_HOME=/home/hadoop/hadoop-3.1.4
```

![hadoop29](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop29.jpg)

## 6.配置hadoop-3.1.4/etc/hadoop/core-site.xml文件

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

## 7.配置hadoop-3.1.4/etc/hadoop/hdfs-site.xml文件

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

## 8.配置workers文件

hadoop3.x 版本以前叫 slavers

里面配置的是 DataNode 信息。![hadoop30](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop30.jpg)

伪分布式需要在workers文件中配置localhost，如果已经是localhost则不需要更改

![hadoop31](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop31.jpg)

## 9.**测试运行**

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

## 10.案例测试

**1.在HDFS里面创建两个目录user、input**

```shell
hdfs dfs -mkdir /user
hdfs dfs -mkdir /input
```

**去查看：http://node01:9870/explorer.html#/**



**2.准备测试文件hello.txt，用来统计词频。**


```shell
hello world
hello hadoop
```

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop38.jpg" alt="hadoop38" style="zoom: 67%;" />





**3.把上面的 hello.txt 上传到 hdfs 的目录 /input**


```shell
hdfs dfs -put hello.txt /input
```

![hadoop39](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/hadoop39.jpg)



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