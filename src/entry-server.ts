import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
    const { app, router, store } = createApp()

    await router.push(url)
    await router.isReady()

    // 匹配路由组件
    const matchedComponents = router.currentRoute.value.matched.flatMap(record =>
        Object.values(record.components)
    )

    // 对所有匹配的路由组件调用里面的 asyncData 函数
    await Promise.all(matchedComponents.map(function (Component) {
        if (Component.asyncData) {
            

            // asyncData 函数接收这些参数  route这个没用！！！
            return Component.asyncData({ store, route: router.currentRoute })
        }
    }))


    const appHtml = await renderToString(app)
    const state = store.state

    return { appHtml, state }
}