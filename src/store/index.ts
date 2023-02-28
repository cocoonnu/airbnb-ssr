import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { ElMessage } from 'element-plus'

import { reqgetRoomList } from '@/api/home/index'
import { reqgetCategoryList } from '@/api/index'


// 声明仓库数据类型
export interface AllStateTypes {
    userState: number,
    roomList: Array<any>,
    language: string,
    categoryList: Array<any>
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
            language: 'zh',
            categoryList: []
        },

        getters: {

        },

        mutations: {

            fetchLanguage(state, value) {
                state.language = value
            },

            getUserStatus(state, value) {
                state.userState = value
            }

        },

        actions: {

            async getRoomList({ state }) {
                let result = await reqgetRoomList()

                if (result.code == '000000') {
                    state.roomList = result.data
                } else {
                    ElMessage.error('获取房屋列表失败')
                }
            },

            async getCategoryList({ state }) {
                let result = await reqgetCategoryList()

                if (result.code == 200) {
                    state.categoryList = result.data
                }
                
            }

        },

        modules: {
        }
    })

}



