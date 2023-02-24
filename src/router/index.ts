import { homedir } from 'os'
import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router' // mode: 'hash'
import { createWebHistory } from 'vue-router' // mode: 'history'
import { airbnbDB } from '@/db/index';
import stores from '@/db/index'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/',
        redirect: '/login'
    }  

]

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes,
})


router.beforeEach(async function () {
    let result = await airbnbDB.openStore(stores, 'id')
    
    if(result) console.log('所有对象仓库打开成功');
}) 

export default router