# 启动pad微信
### 0. 申请 Token
运行代码需要先获取 PadLocal token。

可以在线领取：pad-local.com，注册将获得一个 7 天免费的试用 Token。

### 1. 准备运行环境
[Install Node](https://nodejs.org/), 运行需要先安装nodejs，推荐使用16版本以上，可以通过下面的命令查看自己电脑或者服务器上的node版本。
```
$ node --version 
``` 
### 2. 安装项目依赖
第一次运行项目需要先安装依赖，命令行运行下面指令

```
$ cd wechaty-puppet-padlocal-demo # 进入你的项目目录下
$ npm install
``` 

### 3. 将获取的 PadLocal Token 放入`main.ts`
打开`main.ts`文件，第12行用第0步获取的token替换`Your Token Here`


### 4. 运行项目
```
$ npm run demo
```
![carbon](https://user-images.githubusercontent.com/64943823/117439626-a6cde080-af65-11eb-85a5-815aa422b5c5.png)

扫码即可与你的微信建立通道，可以进行下一步操作。`main.ts`是主要的代码文件，如果需要进行个性化开发，可以参考官方[API文档](https://wechaty.js.org/docs/)

# 获取群成员名单
`main.ts`中固定触发获取名单的群叫做 " 测试接口 " 

这里使用方法比较简单，可以新建一个群，群名叫做 " 测试接口 " ，或者把已有的一个群名字改成 " 测试接口 " 。在 " 测试接口 " 这个群中发送列表中任意一个群的名字，后台会自动生成群成员名单，根目录下`members.txt`

