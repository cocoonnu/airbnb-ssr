// '000000': 操作成功
// '000001': 订单号已经预定
// '000004': 其他异常

import { ElLoading } from 'element-plus'
import { airbnbDB } from '@/db/index';

const storeName = 'order'

// 立即预定
export async function saveOrderApi(params: any) {
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })


    // 获取仓库中所有的订单数组
    let ordersData = await airbnbDB.getList(storeName)


    // 判断是否已经预定 
    let hasOrders = false
    ordersData.map((order) => {
        if (order.orderId == params.orderId) hasOrders = true
    })


    if (hasOrders) {
        // 加载结束
        setTimeout(() => { loading.close() }, 500)

        return { code: '000001', message: '预定失败', data: false, ok: false }
    }

    // 将订单加入数据库
    let result = await airbnbDB.updateItem(storeName, params)

    // 加载结束
    setTimeout(() => { loading.close() }, 500)

    if (result) {
        return { code: '000000', message: '预定成功', data: result, ok: true }
    } else {
        return { code: '000004', message: '预定失败', data: false, ok: false }
    }

}


// 查询订单列表
export async function fetchOrderApi() {

    // 获取仓库中所有的订单数组
    let ordersData = await airbnbDB.getList(storeName)

    return { code: '000000', message: '查询订单成功', data: ordersData, ok: true }
}


// 延迟效果接口
export async function delayFetchOrderApi() {

    // 延迟加载
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve( true )
        }, 1500)
    })
}


// 删除订单
export async function deleteOrderApi(orderId) {
    
    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })

    // 获取仓库中所有的订单数组
    let ordersData = await airbnbDB.getList(storeName)


    ordersData.map(async function (order) {
        if (order.orderId == orderId) {

            // 删除该订单（传入 keypath: id）
            await airbnbDB.deleteItem(storeName, order.id)
        }
    })

    // 加载结束
    setTimeout(() => { loading.close() }, 300)

    return true
} 

