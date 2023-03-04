import { createApp } from "./main"
import { airbnbDB } from '@/db/index';
import stores from '@/db/index'
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'


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


    router.beforeResolve((to, from, next) => {
        const toComponents = router.resolve(to).matched.flatMap(record =>
            Object.values(record.components)
        )
        const fromComponents = router.resolve(from).matched.flatMap(record =>
            Object.values(record.components)
        )

        const actived = toComponents.filter((c, i) => {
            return fromComponents[i] !== c
        })


        if (!actived.length) {
            return next()
        }

        // 可以添加loading（不过会和其他请求冲突，所以算了）
        // const loading = ElLoading.service({
        //     lock: true,
        //     text: 'Loading',
        //     background: 'rgba(255, 255, 255, 0.7)',
        // })

        Promise.all(actived.map(function(Component) {
            if (Component.asyncData) {

                return Component.asyncData({ store, route: router.currentRoute })
            }
        })).then(function() {

            // 结束loading
            // loading.close()
            next()
        })

    })

}) 


router.isReady().then(function() {
    app.mount('#app')
})

