// '000000': 操作成功
// '000001': 订单号已经预定
// '000004': 其他异常

import { ElLoading } from 'element-plus'
import { airbnbDB } from '@/db/index';
import { pa } from 'element-plus/es/locale';

const storeName = 'order'

// 立即预定
export async function saveOrderApi(params: any) {

    // 创建 mock 加载效果
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
    })


    // 获取仓库中所有的用户订单
    let userOrders = await airbnbDB.getList(storeName)
    
    // 获取当前用户的 usertoken
    let usertoken = localStorage.getItem('usertoken')


    let hasOrders = false  // 订单号是否已经存在
    let hasOrderList = false // 用户订单是否为空
    let id = null // keypath
    let orderList = [] // 用户订单列表

    userOrders.map((order) => {

        // 查找当前用户订单
        if (order.usertoken == usertoken) {
            
            // 判断订单号是否已经预定 
            order.orderList.map((orderListItem) => {
                if (orderListItem.orderId == params.orderId) hasOrders = true                
            })            

            // 确定参数
            id = order.id
            orderList = order.orderList
            orderList.push(params)
            hasOrderList = true // 用户订单不为空
        }

    })


    if (hasOrders) {
        // 加载结束
        setTimeout(() => { loading.close() }, 500)

        return { code: '000001', message: '预定失败', data: false, ok: false }
    }

    let result = null
    if (hasOrderList) {

        // 更新用户订单
        result = await airbnbDB.updateItem(storeName, { id, usertoken, orderList })

    } else {
        
        // 创建用户订单
        orderList.push(params)

        result = await airbnbDB.updateItem(storeName, { 
            usertoken,
            orderList,
            // keypath 自动会传入
        })
    }


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

    // 获取仓库中所有的用户订单
    let userOrders = await airbnbDB.getList(storeName)

    // 获取当前用户的 usertoken
    let usertoken = localStorage.getItem('usertoken')

    let orderList = []

    // 查找当前用户订单列表
    userOrders.map((order) => {
        if (order.usertoken == usertoken) {
            orderList = order.orderList
        }
    })

    return { code: '000000', message: '查询成功', data: orderList, ok: true }
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

    // 获取仓库中所有的用户订单
    let userOrders = await airbnbDB.getList(storeName)

    // 获取当前用户的 usertoken
    let usertoken = localStorage.getItem('usertoken')

    let orderList = []
    let id = null // keypath


    // 查找当前用户订单列表
    userOrders.map((order) => {
        if (order.usertoken == usertoken) {

            // 删除订单列表中的订单
            order.orderList.map(async (orderListItem, index) => {

                if (orderListItem.orderId == orderId) {

                    order.orderList.splice(index, 1)
                    id = order.id
                    orderList = order.orderList
                    await airbnbDB.updateItem(storeName, { id, usertoken, orderList })
                }

            })
        }
    })

    return { code: '000000', message: '删除订单成功', data: orderList, ok: true }
}

