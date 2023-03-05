// '000000': 操作成功
// '000001': 订单号已经预定
// '000004': 其他异常

import { ElLoading } from 'element-plus'
import { airbnbDB } from '@/db/index';

const storeName = 'record'

// 保存历史记录
export async function saveRecordApi(params: any) {

    // 获取仓库中所有的用户历史记录
    let userRecord = await airbnbDB.getList(storeName)

    // 获取当前用户的 usertoken
    let usertoken = localStorage.getItem('usertoken')


    let hasRecord = false  // 房间号是否已经存在
    let hasRecordList = false // 用户历史记录是否为空
    let id = null // keypath
    let recordList = [] // 该用户历史记录列表

    userRecord.map((record) => {

        // 查找当前用户历史记录
        if (record.usertoken == usertoken) {

            // 判断该房间号是否已经存在 
            record.recordList.map((recordListItem) => {

                if (recordListItem.recordId == params.recordId) hasRecord = true

            })

            // 如果该房间号历史记录不存在
            if (!hasRecord) {
                id = record.id // keypath
                recordList = record.recordList
                recordList.push(params)
                hasRecordList = true // 用户历史记录不为空
            }
        }

    })


    if (hasRecord) {
        return { code: '000001', message: '历史记录已经存在', data: false, ok: false }        
    }


    let result = null
    if (hasRecordList) {

        // 更新用户订单
        result = await airbnbDB.updateItem(storeName, { id, usertoken, recordList })

    } else {

        // 创建用户订单
        recordList.push(params)

        result = await airbnbDB.updateItem(storeName, {
            usertoken,
            recordList,
            // keypath 自动会传入
        })
    }


    if (result) {
        return { code: '000000', message: '保存历史记录成功', data: result, ok: true }
    } else {
        return { code: '000004', message: '保存历史记录失败', data: false, ok: false }
    }

}


// 查询历史记录列表
export async function fetchRecordApi() {

    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    // 获取仓库中所有的用户订单
    let userRecord = await airbnbDB.getList(storeName)

    // 获取当前用户的 usertoken
    let usertoken = localStorage.getItem('usertoken')

    let recordList = []

    // 查找当前用户历史记录列表
    userRecord.map((record) => {
        if (record.usertoken == usertoken) {
            recordList = record.recordList
        }
    })

    setTimeout(() => { loading.close() }, 500)

    return { code: '000000', message: '查询成功', data: recordList, ok: true }
}


// 延迟效果接口
export async function delayFetchRecordApi() {

    // 延迟加载
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve(true)
        }, 1500)
    })
}