import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

// 声明仓库数据类型
export interface AllStateTypes {
    userState: number
}


// injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol()


// 导出自定义 useStore
export function useStore() {
    return baseUseStore(key)
}


// 导出 store
export const store = createStore({
    state: {
        userState: 0
    },

    mutations: {
        changeUserState(state, value) {
            state.userState = value
        }
    },

    actions: {

    },

    modules: {
    }
})