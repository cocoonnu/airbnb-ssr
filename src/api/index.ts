import { http } from '@/utils/http'
import IndexedDB from '@/utils/indexedDB'
const airbnbDB = new IndexedDB('airbnbDB')
import { ElLoading } from 'element-plus'


// 真实接口（测试接口）
export const reqgetCategoryList = function () {
    return http.httpRequestGet(`http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList`,{});
}


// mock 接口

// 查询所有数据（测试接口）
export async function fetchMockData() {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    // 首先打开数据库及对象仓库
    await airbnbDB.openStore('room', 'id')

    // 再查询所有数据库数据
    const result = await airbnbDB.getList('room')

    // 查询之后分成功态和失败态
    if(result) {

        // 加载结束
        setTimeout(() => { loading.close() }, 1000)

        return { code: '200', message: '成功', data: result, ok: true }
    } else {

        // 加载结束
        setTimeout(() => { loading.close() }, 1000)

        return { code: '204', message: '失败', data: false, ok: false }
    }
}

// 保存当前语言包
export async function saveLanguageApi(language: any) {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    // 首先打开数据库及对象仓库
    await airbnbDB.openStore('language', 'id')


    // 再更新仓库中的语言属性（id = 1）
    let result = await airbnbDB.updateItem('language', { id: 1, language })

    if (result) {

        // 加载结束
        setTimeout(() => { loading.close() }, 500)

        return { code: '200', message: '成功', data: '切换语言成功', ok: true }
    } else {

        // 加载结束
        setTimeout(() => { loading.close() }, 500)

        return { code: '204', message: '失败', data: '切换语言失败', ok: false }
    }
}

// 查询当前语言包
export async function fetchLanguageApi() {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    // 首先打开数据库及对象仓库
    await airbnbDB.openStore('language', 'id')


    // 再查询仓库中的语言属性（id = 1）
    let result = await airbnbDB.getItem('language', 1)

    // 加载结束
    setTimeout(() => { loading.close() }, 200)

    if (result) {
        return { code: '200', message: '成功', data: result, ok: true }
    } else {
        return { code: '204', message: '失败', data: false, ok: false }
    }
}

