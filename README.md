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

这里使用方法比较简单，可以新建一个群，群名叫做 " 测试接口 " ，或者把已有的一个群名字改成 " 测试接口 " 。在 " 测试接口 " 这个群中发送列表中任意一个群的名字，后台会自动生成群成员名单到根目录下`members.txt`

# 后处理

如果需要判断某个名单中是否都已经进群，可以在 `process_py` 文件夹下找到相关处理代码。

首先将名单导入到 `attend.txt` ，只需要导入真实姓名即可，例如

```txt
张三
李四
王五
```
如果有相应联系方式也可以导入到 `phones.txt` ，例如

```txt
19294847589
19294847587
19294847586
```
接下来，进入文件下运行python脚本

```
$ cd process_py
$ python process.py
``` 

生成的结果在 `result.txt` 当中，例如

```txt
####需要拉进群的人
章三	16389478494


####需要改名字的人
三毛|undefined
呼呼|undefined
harry potter|21-本-章四
```

`需要拉进群的人` 指的是在名单中但没有进群的人，可以通过后面的联系方式寻人

`需要改名字的人` 中包含没有修改群昵称的人，用undefined表示，可以通过微信名比如“三毛”在群中找到ta并告知改昵称；同时也包含不在名单中但是私自进群的人（/没有按照要求改成真名的人），这部分人可以由群主清理出群。

> 本项目使用了wechaty的接口，一切解释权归wechaty所有，侵删。