## Vue3 + Vite + TS + ElementPlus 打造 SSR 网站应用



#### SSR 网站应用介绍

一个防爱彼迎的房屋租赁网站，通过对 SPA 应用的两次改造，从 0 到 1 实现服务端渲染

- 用户登录、注册等表单功能和后台管理的 实现
- 页面重定向，登录权限拦截
- 订单、历史记录模块的功能
- 切换全局语言（支持中英文）
- 首页 SSR 动态数据加载，服务端和客户端 vuex 数据同步
- 图片懒加载，异步组件的实现
- indexed DB 模拟数据库，mock 模拟后端接口
- ElementPlus 组件的基本使用
- 路由 mate 元信息处理，SEO 优化



#### 技术栈支持

- 项目前端是基于 Vue3 + TS + Vuex4 + Vite + Vue-router4 等 Vue3 全新生态系统打造。另外还使用了 ElementPlus 组件库进行了项目页面优化。同时手写 SSR 配置实现了首页的服务端渲染。



- 项目后台使用了 indexed DB 来存储用户数据、全局语言配置、订单信息、历史足迹等数据，同时自行开发一套 Mock 接口，供前端项目来调用，使得前后端在某种程度上做到了解耦。



所用到的技术栈有：

Vue3新特性、Vuex4、Typescript、ES6、flex布局、Sass、Mock、Nodejs、SSR、axios、Vite等





个人博客：https://blog.csdn.net/m0_63907100?spm=1000.2115.3001.5343



项目笔记：https://github.com/cocoonnu/WebProjects/blob/main/Markdown/Vue/Vue3_project.md





#### 网站预览

![home](mark-img/home.png)
