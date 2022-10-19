# HDFS Java开发

上面我们使用 HDFS 命令来操作 HDFS 里面的文件与目录。我们其实也可以通过 Java 代码来操作 HDFS 里面的文件与目录，写代码之前我们先搭建环境。我们这里使用 maven 来管理 Hadoop 依赖。

## 初始化环境

* ### 把 hadoop-3.1.4.tar.gz 解压到本地一个非英文目录下

:::warning 下载地址

123网盘：[hadoop-3.1.4](https://www.123pan.com/s/zCYKVv-sJXR)（精简版)(推荐）

阿里云镜像：https://mirrors.aliyun.com/apache/hadoop/common/hadoop-3.3.4/hadoop-3.3.4.tar.gz

:::

* ### （此步骤 macOS 不需要）导入 winutils 工具包：

#### **1.将 winutils 中 bin 目录下的 hadoop.dll、winutils.exe 拷贝到 hadoop-3.1.4 的bin目录下**

![image-20221019181233967](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019181233967.png)

#### **2.将 winutils 中 bin 目录下的 hadoop.dll 拷贝到 C:\Windows\System32 目录**

![image-20221019181310413](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019181310413.png)

**3.配置环境变量 HADOOP_HOME、HADOOP_USER_NAME**

系统环境变量

* HADOOP_HOME：配置的是 Hadoop 的目录路径

  ![image-20221019181806354](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019181806354.png)

* HADOOP_USER_NAME：配置的是我们 Linux 集群里面安装 Hadoop 集群的用户名

![image-20221019181828744](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019181828744.png)

* PATH 中将 Hadoop 的 bin目录添加进去

```txt
%HADOOP_HOME%\bin
```

## 配置 IDEA

* ### IDEA 安装 Big Data Tools 插件

> Preferences --> Plugins --> Marketplace --> 搜索 Big Data Tools --> Install

![image-20221019182424607](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019182424607.png)

* ### 配置 Big Data Tools

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019184635575.png" alt="image-20221019184635575" style="zoom:50%;" />

![image-20221019184626561](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019184626561.png)

* ### 查看 HDFS 是否连接成功

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019184859957.png" alt="image-20221019184859957" style="zoom:60%;" />

::: tip 配置完成

到这一步如果连接成功并能看到 HDFS 文件目录则说明配置成功  :tada: :100: :trophy:

:::