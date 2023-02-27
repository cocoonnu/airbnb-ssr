import { createApp } from "./main"
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
    const { app, router } = createApp()

    await router.push(url)
    await router.isReady()

    const html = renderToString(app)
    return html
}