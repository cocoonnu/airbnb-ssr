import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // AutoImport({
        //     resolvers: [ElementPlusResolver()],
        // }),
        // Components({
        //     resolvers: [ElementPlusResolver()],
        // }),
    ],

    resolve: {
        // 配置路径别名
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },

    define: {
        'process.env': {},
    },

    // 配置 scss 入口文件
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/scss/variable.scss";`
            }
        }
    },

    // 配置代理
    server: {
        host: 'localhost',
        port: 5173,
        proxy: {
            '/release': {
                target: 'http://110.42.184.111',
                rewrite: path => path.replace(/^\/release/, '')
            }
        }
    }

})