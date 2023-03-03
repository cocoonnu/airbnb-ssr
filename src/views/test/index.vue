<script lang="ts">
import { useStore } from '@/store'

export default ({

    setup() {
        const store = useStore()

        let roomList = store.state.categoryList[0]

        return {
            roomList
        }
    },

    async asyncData({ store, route }: any) {
        await store.dispatch('getCategoryList')
    }
})

</script>

<template>
    <div>{{ roomList }}</div>
</template>