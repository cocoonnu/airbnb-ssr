import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { reqgetRoomList } from '@/api/home/index'
import { reqgetCategoryList } from '@/api/index'



import { reqgetRoomList, reqgetRoomListMock } from '@/api/home/index'
import { reqgetCategoryList } from '@/api/index'
import { reqgetRoomDetail } from '@/api/detail'


// 声明仓库数据类型
export interface AllStateTypes {
    userState: number,
    roomList: Array<any>,
    roomDetail: any,
    language: string,
    categoryList: Array<any>

    // 分页器
    roomTotal: number,
    roomPageSize: number

    // 订单侧边栏显示
    orderDrawer: Boolean
    orderList: Array<any>
}


// injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol()


// 导出自定义 useStore
export function useStore() {
    return baseUseStore(key)
}


export function createSSRStore() { 

    return createStore({
        state: {
            userState: 0,
            roomList: [],
            roomDetail: {},
            language: 'zh',
            categoryList: [],
            roomTotal: 0,
            roomPageSize:6,
            orderDrawer: false,
            orderList: []
        },

        getters: {

        },

        mutations: {

            fetchLanguage(state, value) {
                state.language = value
            },

            getUserStatus(state, value) {
                state.userState = value
            },

            fetchorderDrawer(state, value) {
                state.orderDrawer = value
            },

            fetchOrderList(state, value) {
                state.orderList = value
            }
        },

        actions: {

            // 获取房屋列表
            async getRoomList({ state }, params) {

                // 合并参数
                Object.assign(params, { pageSize: state.roomPageSize })

                let result = await reqgetRoomList(params)
                // console.log(result);


                if (result.code == '000000') {

                    // 获取房屋列表数据、总数
                    state.roomList = result.result.orders.data
                    state.roomTotal = result.result.total
                    
                } else {
                    console.log('获取房屋列表失败')
                }
            },


            // 获取房屋详细数据
            async getRoomDetail({ state }, params) {

                let result = await reqgetRoomDetail(params)
                // console.log(result)
                
                if (result.code == '000000') {
                    state.roomDetail = result.result

                } else {
                    console.log('获取房屋列表失败')
                }

                return true
            },



            async getCategoryList({ state }) {
                let result = await reqgetCategoryList()

                if (result.code == 200) state.categoryList = result.data
                else console.log('获取数据失败');
            }

        },

        modules: {
        }
    })

}



