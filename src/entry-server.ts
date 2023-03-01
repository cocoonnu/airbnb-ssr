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

<<<<<<< HEAD
    // 对所有匹配的路由组件调用里面的 asyncData 函数
    await Promise.all(matchedComponents.map(function (Component) {
        if (Component.asyncData) {
=======
    // console.log('匹配组件', matchedComponents)

    // 对所有匹配的路由组件调用里面的 asyncData 函数
    await Promise.all(matchedComponents.map(function(Component) {
        if(Component.asyncData) {
>>>>>>> 17407da469eef09af5a37f87857599579f9bbfc6

            // asyncData 函数接收这些参数
            return Component.asyncData({ store, route: router.currentRoute })
        }
    }))
<<<<<<< HEAD


=======
    
    
>>>>>>> 17407da469eef09af5a37f87857599579f9bbfc6
    const appHtml = await renderToString(app)
    const state = store.state

    return { appHtml, state }
}