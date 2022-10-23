# HDFS Java开发

上面我们使用 HDFS 命令来操作 HDFS 里面的文件与目录。我们其实也可以通过 Java 代码来操作 HDFS 里面的文件与目录，写代码之前我们先搭建环境。我们这里使用 maven 来管理 Hadoop 依赖。

## 初始化环境

* ### 把 hadoop-3.1.4.tar.gz 解压到本地一个非英文目录下

:::tip 下载地址

123网盘：[hadoop-3.1.4](https://www.123pan.com/s/zCYKVv-sJXR)（精简版)(推荐）

阿里云镜像：https://mirrors.aliyun.com/apache/hadoop/common/hadoop-3.3.4/hadoop-3.3.4.tar.gz

:::

* ### 导入 winutils 工具包：
:::warning 注意
此步骤 macOS 不需要配置
:::

#### **1.将 winutils 中 bin 目录下的 hadoop.dll、winutils.exe 拷贝到 hadoop-3.1.4 的bin目录下**

![image-20221019181233967](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019181233967.png)

#### **2.将 winutils 中 bin 目录下的 hadoop.dll 拷贝到 C:\Windows\System32 目录**

![image-20221019181310413](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019181310413.png)

* ### 配置环境变量 HADOOP_HOME、HADOOP_USER_NAME

系统环境变量

1. HADOOP_HOME：配置的是 Hadoop 的目录路径

  ![image-20221019181806354](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019181806354.png)

2. HADOOP_USER_NAME：配置的是我们 Linux 集群里面安装 Hadoop 集群的用户名

![image-20221019181828744](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221019181828744.png)

3. PATH 中将 Hadoop 的 bin目录添加进去

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

## 创建 Maven 项目

* ### 1. 新建 Maven 项目

![image-20221020111844412](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221020111844412.png)

* ### 2. 导入hadoop的依赖

**配置 pom.xml 文件**

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd]
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.kevin.hdfs</groupId>
  <artifactId>HDFS</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>pom</packaging>

  <!-- 属性 -->
  <properties>
    <!-- hadoop 版本 -->
    <hadoop.version>3.1.4</hadoop.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <!-- 依赖 -->
  <dependencies>
    <dependency>
      <groupId>org.apache.hadoop</groupId>
      <artifactId>hadoop-client</artifactId>
      <version>${hadoop.version}</version>
    </dependency>
    <dependency>
      <groupId>org.apache.hadoop</groupId>
      <artifactId>hadoop-common</artifactId>
      <version>${hadoop.version}</version>
    </dependency>
    <dependency>
      <groupId>org.apache.hadoop</groupId>
      <artifactId>hadoop-hdfs</artifactId>
      <version>${hadoop.version}</version>
    </dependency>
    <dependency>
      <groupId>org.apache.hadoop</groupId>
      <artifactId>hadoop-mapreduce-client-core</artifactId>
      <version>${hadoop.version}</version>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.testng</groupId>
      <artifactId>testng</artifactId>
      <version>RELEASE</version>
    </dependency>
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
    </dependency>
  </dependencies>

</project>

```

## HDFS 操作

* ### 1. 使用 HDFS 创建目录

```java
/**
 * 创建目录
 * @throws IOException
 */
@Test
public void mkDir() throws IOException {
  // 创建配置类
  Configuration conf = new Configuration();
  // 配置集群的连接位置
  conf.set("fs.defaultFS","hdfs://node01:8020");
  // 创建目录
  String filePath = "/input/mkdir";
  Path path = new Path(filePath);

  // 操作文件系统，得到文件系统的实例
  FileSystem fs = FileSystem.get(conf);

  // 创建文件夹
  if(!fs.exists(path)){
    // 文件夹不存在
    boolean bool = fs.mkdirs(path);
    System.out.println(bool);
  }else{
    System.out.println(filePath + "已存在");
  }
}
```

* ### 2. 上传文件

**在项目根目录下创建一个 word.txt 文件**

```java
/**
 * 上传文件
 * @throws IOException
 */
@Test
public void uploadFile() throws IOException {
  // 创建配置类
  Configuration conf = new Configuration();
  // 配置要连接的 hdfs 集群
  conf.set("fs.defaultFS","hdfs://node01:8020");
  // 操作文件系统，得到文件系统的实例
  FileSystem fileSystem = FileSystem.get(conf);
  // 将 word.txt 从本地上传到 /input/word.txt
  fileSystem.copyFromLocalFile(new Path("word.txt"),
                               new Path("/input/word.txt"));
  //释放资源
  fileSystem.close();
}
```

* ### 3. 下载文件

```java
/**
 * 下载文件
 * @throws IOException
 */
@Test
public void downloadFile() throws IOException {
    // 创建配置类
    Configuration conf = new Configuration();
    // 配置要连接的 hdfs 集群
    conf.set("fs.defaultFS","hdfs://node01:8020");
    // 操作文件系统，得到文件系统的实例
    FileSystem fileSystem = FileSystem.get(conf);
    // 将 /input/word.txt 从 hdfs 下载到本地，注意此处本地根目录为项目根目录
    fileSystem.copyToLocalFile(new Path("/input/word.txt"),
                               new Path("./src/download.txt"));
    // 释放资源
    fileSystem.close();
}
```

* ### 4.删除文件或目录

```java
/**
 * 删除文件
 * @throws IOException
 */
@Test
public void deleteFile() throws IOException {
    // 创建配置类
    Configuration conf = new Configuration();
    // 配置要连接的 hdfs 集群
    conf.set("fs.defaultFS","hdfs://node01:8020");
    // 操作文件系统，得到文件系统的实例
    FileSystem fileSystem = FileSystem.get(conf);
    // 删除 /input/mkdir 目录
    fileSystem.delete(new Path("/input/mkdir"),true);
    // 删除 /input/word.txt 文件
    fileSystem.delete(new Path("/input/word.txt"),true);
    // 释放资源
    fileSystem.close();
}
```