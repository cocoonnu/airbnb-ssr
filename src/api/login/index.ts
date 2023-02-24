// code: '000000' 表示'操作成功'  code: '000001'表示'数据已存在'  code: '000002'表示'密码不正确'
// code: '000003'表示'手机号不正确'  code: '000004'表示'其他异常'  code: '000005'表示'登录过期'

import { ElLoading } from 'element-plus'
import { airbnbDB } from '@/db/index';


// 对象仓库名
const storeName = 'user'

// mock接口：用户注册
export async function userSignApi(params: any) {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })


    // 获取仓库中所有的用户数组
    let usersData = await airbnbDB.getList(storeName)

    let hasMobile = false
    usersData.map((user) => {
        if(user.mobile == params.mobile) hasMobile = true
    })


    if (hasMobile) {
        // 加载结束
        setTimeout(() => { loading.close() }, 500)

        return { code: '000001', message: '手机号已被注册', data: false, ok: false }
    }

    let result = await airbnbDB.updateItem(storeName, params)

    // 加载结束
    setTimeout(() => { loading.close() }, 500)

    if (result) {
        return { code: '000000', message: '成功', data: result, ok: true }
    } else {
        return { code: '000004', message: '失败', data: false, ok: false }
    }

}