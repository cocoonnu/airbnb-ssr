import { ElLoading } from 'element-plus'
import { airbnbDB } from '@/db/index'


// 保存当前语言包
export async function saveLanguageApi(language: any) {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    // 更新仓库中的语言属性（id = 1）
    let result = await airbnbDB.updateItem('language', { id: 1, language })
    localStorage.setItem('language', language)

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


    // 再查询仓库中的语言属性（id = 1）
    let result = await airbnbDB.getItem('language', 1)

    // 加载结束
    setTimeout(() => { loading.close() }, 200)

    // @ts-ignore
    return result ? result.language : 'zh'
}

