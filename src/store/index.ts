import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { reqgetRoomList } from '@/api/home/index'
import { ElMessage } from 'element-plus'


// 声明仓库数据类型
export interface AllStateTypes {
    userState: number,
    roomList: Array<any>,
    language: string,
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
                console.log(result);


                if (result.code == '000000') {
                    state.roomList = result.data
                } else {
                    ElMessage.error('获取房屋列表失败')
                }
            }

        },

        modules: {
        }
    })

}



