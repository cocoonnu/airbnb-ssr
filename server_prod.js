import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import serveStatic from 'serve-static'
import { createServer as createViteServer } from 'vite'
import { render } from './dist/server/entry-server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express()

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    app.use(serveStatic(path.resolve(__dirname, 'dist/client'), { index: false }))

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl

        try {

            // 1. 读取 index.html
            let template = fs.readFileSync( path.resolve(__dirname, 'dist/client/index.html'), 'utf-8' )


            // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
            //    函数调用了适当的 SSR 框架 API。
            //    例如 ReactDOMServer.renderToString()
            const { appHtml, state } = await render(url)


            // 获取路由中的元信息（服务端渲染时改变标题）            
            const { meta } = state.route
            const { title, keywords, description } = meta


            // 5. 注入渲染后的应用程序 HTML 到模板占位符中（重点！）
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)
                .replace('\'<!--vuex-state-->\'', JSON.stringify(state))
                .replace('<title>', `<title>${title}`)
                .replace('<meta name="keywords" content="" />', `<meta name="keywords" content="${keywords}" />`)
                .replace('<meta name="description" content="" />', `<meta name="description" content="${description}" />`)


            // 6. 返回渲染后的 HTML。
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

        } catch (e) {
            // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回你的实际源码中。
            vite.ssrFixStacktrace(e)
            next(e)
        }
    })

    app.listen(5173, function () {
        console.log('点击进入: http://localhost:5173', '生产环境')
    })
}

createServer()