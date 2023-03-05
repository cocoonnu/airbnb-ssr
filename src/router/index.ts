import { homedir } from 'os'
import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router'
import { createWebHistory } from 'vue-router'
import { createMemoryHistory } from 'vue-router'

let title = 'Airbnb爱彼迎 - 全球民宿_公寓_短租_住宿_预订平台'
let keywords = 'Airbnb,bnb,爱彼迎,爱彼迎官网,民宿,民宿预订平台,名宿,酒店预定,公寓,短租,住宿'
let description = 'Airbnb爱彼迎是全球民宿短租公寓预订平台,全球百万特色民宿、短租、酒店、公寓、客栈房源,价格优惠,更有树屋、海景别墅、花园洋房等多种特色住宿预订供您选择'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: 'Airbnb爱彼迎 - 登录注册',
            keywords: '',
            description: '',
            keepAlive: false
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title,
            keywords,
            description,
            keepAlive: false
        }
    },
    {
        path: '/detail/:id/:title',
        name: 'detail',
        component: () => import('@/views/detail/index.vue'),
        meta: {
            title: 'Airbnb爱彼迎 - ',
            keywords: '',
            description: '',
            keepAlive: false
        }
    },
    {
        path: '/record',
        name: 'record',
        component: () => import('@/views/record/index.vue'),
        meta: {
            title: 'Airbnb爱彼迎 - 历史记录',
            keywords: '',
            description: '',
            keepAlive: false
        }
    },
    {
        path: '/',
        redirect: '/home'
    }  

]


export function createSSRRouter() {

    return createRouter({

        scrollBehavior() {
            
            // 页面滚动
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })            
        },

        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),

        routes,
    })

}