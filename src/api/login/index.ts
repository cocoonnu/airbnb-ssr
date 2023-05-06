// '000000': 操作成功
// '000001': 手机号已被注册  
// '000002': 密码不正确
// '000003': 手机号不正确  
// '000004': 其他异常  
// '000005': 登录过期

import { ElLoading } from 'element-plus'
import { airbnbDB } from '@/db/index';

const storeName = 'user'

// 用户注册
export async function userSignApi(params: any) {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })


    // 获取仓库中所有的用户数组
    let usersData: any = await airbnbDB.getList(storeName)

    let hasMobile = false
    usersData.map((user) => {
        if(user.mobile == params.mobile) hasMobile = true
    })


    if (hasMobile) {
        // 加载结束
        setTimeout(() => { loading.close() }, 500)

        return { code: '000001', message: '失败', data: false, ok: false }
    }

    // 将用户加入数据库
    Object.assign(params, { status: 0, token: '' })
    let result = await airbnbDB.updateItem(storeName, params)

    // 加载结束
    setTimeout(() => { loading.close() }, 500)

    if (result) {
        return { code: '000000', message: '成功', data: result, ok: true }
    } else {
        return { code: '000004', message: '失败', data: false, ok: false }
    }

}

// 用户登录
export async function userLoginApi(params: any) {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })


    // 获取仓库中所有的用户数组
    let usersData = await airbnbDB.getList(storeName)
    
    // 如果没有用户
    if (!usersData) {
        // 加载结束
        setTimeout(() => { loading.close() }, 500)
        return { code: '000003', message: '失败', data: false, ok: false }
    }


    let correct = false
    let codeData = '000003' // 默认手机号不正确

    // 校验手机号和密码
    usersData?.map(async function(user) {
        if (user.mobile == params.mobile && user.password == params.password) {
            correct = true
            codeData = '000000' // 成功

            // 保存 userToken（手机号 + 密码）
            const token = user.mobile + user.password
            localStorage.setItem('usertoken', token)

            // 更新状态 status
            const obj = { status: 1, token, id: user.id }
            Object.assign(params, obj)

            // 更新数据库中用户数据
            await airbnbDB.updateItem(storeName, params)
        }

        if (user.mobile == params.mobile && user.password != params.password) {
            codeData = '000002' // 密码不正确
        }
    })

    // 加载结束
    setTimeout(() => { loading.close() }, 500)

    if(correct) {
        return { code: codeData, message: '成功', data: true, ok: true }
    } else {
        return { code: codeData, message: '失败', data: false, ok: false }
    }

}

// 用户登出
export async function userLogoutApi() {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    // 获取仓库中所有的用户数组
    let usersData = await airbnbDB.getList(storeName)

    // 获取当前登录用户的 usertoken
    const token = localStorage.getItem('usertoken')

    // 更新当前用户状态
    usersData.map(async function (user) {
        if (user.token == token) {
            
            // 删除 token
            localStorage.removeItem('usertoken');
            Object.assign(user, { status: 0, token: '' })

            // 更新数据库中用户数据
            await airbnbDB.updateItem(storeName, user)
        }
    })

    // 加载结束
    setTimeout(() => { loading.close() }, 500)

    return true
} 