# SCP资料库

做之前先参考了[https://github.com/xrr2016/vue-express-mongodb](https://github.com/xrr2016/vue-express-mongodb) 学习如何前后端分离

## 前端部分 (为确保能正常使用，请在PC端或者微信里打开)

前端有两大部分：[移动端页面](https://sadxu.top)和[后台页](https://sadxu.top/houtai.html)。

修改Vue-cli模板配置为多页面应用

### 移动端页面

+ 页面整体布局借鉴自APP [S.C.P.基金会中文数据库 作者是 Hongya Cui](https://itunes.apple.com/cn/app/s-c-p-%E5%9F%BA%E9%87%91%E4%BC%9A%E4%B8%AD%E6%96%87%E6%95%B0%E6%8D%AE%E5%BA%93/id1014080427?mt=8)
+ 原始数据从 [https://trow.cc/wiki/scp/start](https://trow.cc/wiki/scp/start) 爬取（见后端部分）
+ 使用UI库：[Muse-UI](http://www.muse-ui.org/#/index) 
	
##### 首页

显示爬取到的所有项，单击名称进入详情页

![首页](/readmesrc/firstpage.png)

##### 详情

左上方收藏按钮，右上方关闭 （展示数据为原始数据，暂未作进一步处理）

![详情页](/readmesrc/detail.png)

##### 侧边栏

切换页面

![侧边栏](/readmesrc/nav.png)

##### 随便看看

随机进入某一编号的详情页（由于scp未全部收录，有极大可能出现空白页）

![随便看看](/readmesrc/random.png)

##### 我的收藏

若未登录，会出现登陆和注册界面，登陆成功后进入收藏页（注册登陆未优化，可能有操作上的不便）

![我的收藏](/readmesrc/collect.png)

##### 关于

毫无意义的一个页面，本来想写一些更新动态和待做事项，结果永远是第一次更新的内容，也许是太懒了。

![关于](/readmesrc/about.png)

##### 在线交流（未做兼容，所以在部分浏览器中无法正常使用）

时间原因还没做，不过之前做了一个socket聊天的demo练手，就用它暂时代替：[http://sadxu.top:3000/chat](http://sadxu.top:3000/chat) 前端使用原生js，后端express，webpack打包

进入离开时背景改变并提示剩余人数
头像计划用随机生成的图案

![在线聊天](/readmesrc/chat.png)

+ 前端存储

使用localstorage存储

collect 收藏的scp id

email 没用

loginstatus 登录状态

myname 用户名

mypassword 密码

![localstorage](/readmesrc/localstorage.png)

>!!! 以上只在PC端和微信中测试过并能正常使用


## 后台部分

有两个页面：登陆页和操作页

[https://sadxu.top/houtai.html](https://sadxu.top/houtai.html)

目前后台账号仅有一个 xhc  151136  无法增加删除修改

##### 登陆页

3D效果照搬 [https://threejs.org/examples/#webgl_effects_anaglyph](https://threejs.org/examples/#webgl_effects_anaglyph)

Three.js以前接触过皮毛，写过几个及其简单的demo

（计划对背景和小球的样式修改一下）

![登陆页](/readmesrc/login.png)

##### 操作页
增加、删除、修改功能都有（只是很少用）

项目内容是markdown格式，左边修改，右边预览（和Vue官网上那个一样）

（发现左侧列表无法滚动，以后再改）

![后台](/readmesrc/houtai.png)


## 后端部分

> 语言： nodejs

> 框架： express

>服务器：阿里云ECS    47.100.0.143


>数据库：mongoDB     xhc:151136 （数据被人恶意清除了两次才加上密码）


服务器配置及部署参考自[阿里云部署](https://zhuanlan.zhihu.com/p/24474840?utm_medium=social&utm_source=ZHShareTargetIDMore)

+ 有三个表

	后台账户、scp项目、用户信息
	
	（还会加一个表用来存聊天数据）

	![数据表](/readmesrc/mongodb.png)

+ 后端主要提供接口

+ 爬虫 spider.js

	- 特定编号的项目爬不到数据（404），原因未知

	- 原始数据的markdown语法可能过老或者是自定义的，marked解析不出来，可能要修改一下marked源码里的正则表达式
	
		 (marked提供的接口只能修改渲染的样式，无法修改捕获规则(大概))

	- 现在只爬了0 - 50号

+ 之前以http访问的时候，在移动端总会被插入广告，后来全改为了https
就是加载更慢了（服务器带宽只有1M）
	
	计划用OSS优化一下
	
---

>完成度大概75%
