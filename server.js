import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express()

    // 以中间件模式创建 Vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
    // 并让上级服务器接管控制
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    // 使用 vite 的 Connect 实例作为中间件
    // 如果你使用了自己的 express 路由（express.Router()），你应该使用 router.use
    app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl

        try {
            // 1. 读取 index.html
            let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')

            // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
            //    同时也会从 Vite 插件应用 HTML 转换。
            //    例如：@vitejs/plugin-react 中的 global preambles
            template = await vite.transformIndexHtml(url, template)

            // 3. 加载服务器入口
            const { render } = await vite.ssrLoadModule('/src/entry-server.ts')


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

    app.listen(5173, function() {
        console.log('服务端渲染成功! 点击进入: http://localhost:5173');
    })
}

createServer()
