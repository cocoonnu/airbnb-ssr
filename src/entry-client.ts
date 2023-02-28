import { createApp } from "./main"

import { airbnbDB } from '@/db/index';
import stores from '@/db/index'

import { fetchLanguageApi } from '@/api/index'

import { ElMessage } from 'element-plus'


const { app, router, store } = createApp()

router.beforeEach(async function (to, from, next) {

    // 打开所有仓库
    let result = await airbnbDB.openStore(stores, 'id')
    if (result) console.log('所有对象仓库打开成功');


    // 查询并保存全局语言
    let resultLang = await fetchLanguageApi()
    store.commit('fetchLanguage', resultLang)


    // 获取登录状态
    let status = localStorage.getItem('usertoken') ? 1 : 0
    store.commit('getUserStatus', status)

    next()

    // 阻止登录用户进入登录页
    // if (to.path == '/login' ) {

        

    // } else {
    //     next()
    // }

}) 


router.isReady().then(function() {
    app.mount('#app')
})

