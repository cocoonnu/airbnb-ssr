import { createSSRApp } from 'vue'
import App from './App.vue'
import './style.css'

import { createSSRRouter } from './router'
import { createSSRStore, key } from './store'

import ElementPlus from 'element-plus'
import { ID_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'

import { createSSRI18n } from '@/language/i18n'

import '@/mock/mockServe'

import VueLazyload from 'vue-lazyload'
import loadingimage from './assets/loading.gif'

import { sync } from 'vuex-router-sync'
 

export function createApp() {
    const app = createSSRApp(App)
    const router = createSSRRouter()
    const store = createSSRStore()
    const i18n = createSSRI18n()

    // vuex 同步路由信息
    sync(store, router)

    // 路由
    app.use(router)
    
    // vuex
    app.use(store, key)
    
    // ElementPlus
    app.use(ElementPlus)
    app.provide(ID_INJECTION_KEY, {
        prefix: Math.floor(Math.random() * 10000),
        current: 0,
    })
    
    // 图片懒加载
    app.use(VueLazyload, {
        preLoad: 1.3,
        error: loadingimage,
        loading: loadingimage,
        attempt: 1
    })

    // 语言配置
    app.use(i18n)

    return { app, router, store }
}