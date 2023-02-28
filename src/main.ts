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

export function createApp() {
    const app = createSSRApp(App)
    
    // 路由
    const router = createSSRRouter()
    app.use(router)
    
    // vuex
    const store = createSSRStore()
    app.use(store, key)
    
    // ElementPlus
    app.use(ElementPlus)
    app.provide(ID_INJECTION_KEY, {
        prefix: Math.floor(Math.random() * 10000),
        current: 0,
    })
    
    // 语言配置
    const i18n = createSSRI18n()
    app.use(i18n)

    return { app, router, store }
}