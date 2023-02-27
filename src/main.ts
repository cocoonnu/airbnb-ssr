import { createSSRApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { store, key } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from '@/language/i18n'

export function createApp() {
    const app = createSSRApp(App)
    
    // 路由
    app.use(router)
    
    // vuex
    app.use(store, key)
    
    // ElementPlus
    app.use(ElementPlus)
    
    // 语言配置
    app.use(i18n)

    return { app, router }
}

// import { createSSRApp } from 'vue'
// import App from './App.vue'
// import { createSSRRouter } from './router'
// import ElementPlus, { ElMessage } from 'element-plus'
// import 'element-plus/dist/index.css'
// import { createSSRI18n } from './language/i18n'
// import { createSSRStore, key } from './store'
// import { sync } from 'vuex-router-sync'

// export function createApp() {
//     const app = createSSRApp(App)
//     const store = createSSRStore()
//     const router = createSSRRouter()
//     const i18n = createSSRI18n()
//     sync(store, router)
//     app.config.globalProperties.$message = ElMessage
//     app.use(store, key)
//     app.use(router)
//     app.use(ElementPlus)
//     app.use(i18n)
//     return { app, router, store }
// }

// export function asyncDataFilter(actived: any, store: any, route: any) {
//     return Promise.all(actived.map((Component: any) => {
//         if (Component.asyncData) {
//             return Component.asyncData({
//                 store,
//                 route
//             })
//         }
//     }))
// }


// 原
// import { createApp } from 'vue'
// import App from './App.vue'
// import './style.css'
// import router from './router'
// import { store, key } from './store'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import i18n from '@/language/i18n'



// const app = createApp(App)
// // 路由
// app.use(router)

// // vuex
// app.use(store, key)


// // ElementPlus
// app.use(ElementPlus)


// // 语言配置
// app.use(i18n)

// app.mount('#app')
