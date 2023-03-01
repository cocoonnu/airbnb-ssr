import { createApp } from "./main"

import { airbnbDB } from '@/db/index';
import stores from '@/db/index'

import { fetchLanguageApi } from '@/api/index'

import { ElMessage } from 'element-plus'


const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
    store.replaceState((window as any).__INITIAL_STATE__)
}

<<<<<<< HEAD
=======

>>>>>>> 17407da469eef09af5a37f87857599579f9bbfc6
router.beforeEach(async function (to, from, next) {

    // 打开所有仓库
    let result = await airbnbDB.openStore(stores, 'id')
    // if (result) console.log('所有对象仓库打开成功');


    // 查询并保存全局语言
    let resultLang = await fetchLanguageApi()
    store.commit('fetchLanguage', resultLang)


    // 获取登录状态
    let status = localStorage.getItem('usertoken') ? 1 : 0
    store.commit('getUserStatus', status)

    next()
<<<<<<< HEAD
=======
    
>>>>>>> 17407da469eef09af5a37f87857599579f9bbfc6
}) 


router.isReady().then(function() {
    app.mount('#app')
})

