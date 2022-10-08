# Chrome 谷歌浏览器

<img src="https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/google_chrome.jpg" alt="google_chrome"  />

## Chrome 网页翻译功能

>谷歌翻译停服后，Chrome无法自动翻译？解决办法如下

### 1.打开终端 Terminal

![image-20221008192813117](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221008192813117.png)

### 2.修改 hosts 文件

* **终端执行以下命令**

```shell
sudo vim /etc/hosts
```

* **然后输入 Mac 密码，注意输入密码时界面不会显示密码信息，输完密码按回车即可**

效果如下：

![image-20221008193020536](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221008193020536.png)

![image-20221008194012499](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221008194012499.png)

**粘贴内容如下**

```shell
# google翻译
203.208.39.226 translate.google.com
203.208.39.226 translate.googleapis.com
```

![image-20221008194550237](https://notewk-1304925042.cos.ap-guangzhou.myqcloud.com/notewk/image-20221008194550237.png)

:::tip 大功告成

到这一步，配置完成，快去试试翻译功能吧 

 :tada: :100: :trophy:

:::

