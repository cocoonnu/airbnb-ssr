import { createApp } from "./main"
import { airbnbDB } from '@/db/index';
import stores from '@/db/index'
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'
import { toRaw } from '@vue/reactivity'

 
const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
    store.replaceState((window as any).__INITIAL_STATE__)
}

router.beforeEach(async function () {
    
    // 打开所有仓库
    await airbnbDB.openStore(stores, 'id')

    // 获取全局语言
    let lang = localStorage.getItem('language') ? localStorage.getItem('language') : 'zh'
    store.commit('fetchLanguage', lang)

    // 获取登录状态
    let status = localStorage.getItem('usertoken') ? 1 : 0
    store.commit('getUserStatus', status)
}) 


router.isReady().then(function() {
    
    // 实现路由组件在不刷新的路由跳转下也能执行asyncData函数
    router.beforeResolve((to, from, next) => {
        const toComponents = router.resolve(to).matched.flatMap(record =>
            Object.values(record.components)
        )
        const fromComponents = router.resolve(from).matched.flatMap(record =>
            Object.values(record.components)
        )

        // 获取跳转前后不重复的组件
        const actived = toComponents.filter((c, i) => {
            return fromComponents[i] !== c
        })


        if (!actived.length) {
            return next()
        }

        Promise.all(actived.map(function (Component) {
            if (Component.asyncData) {

                return Component.asyncData({ store, route: router.currentRoute })
                // return Component.asyncData({ store, route: to })
            }
        })).then(function () {

            // 结束loading
            next()
        })

    })


    app.mount('#app')
})

// 实现在不刷新的路由跳转下也能匹配mate信息
router.afterEach((to, from, next) => {

    // 填充 mate 元信息
    const { meta } = to
    const { title, keywords, description } = meta
    const detailTitle = to.params?.title

    if (detailTitle) {
        document.title = title ? `${title}${detailTitle}` : ''
    } else {
        document.title = title ? `${title}` : ''
    }

    const keywordsMeta = document.querySelector('meta[name="keywords"]')
    keywordsMeta?.setAttribute("content", `${keywords}`)

    const descriptionMeta = document.querySelector('meta[name="description"]')
    descriptionMeta?.setAttribute("content", `${description}`)
})