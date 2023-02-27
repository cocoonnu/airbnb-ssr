import { createApp } from "./main"
import { airbnbDB } from '@/db/index';
import stores from '@/db/index'


const { app, router } = createApp()

router.beforeEach(async function () {
    let result = await airbnbDB.openStore(stores, 'id')

    if (result) console.log('所有对象仓库打开成功');
}) 


router.isReady().then(function() {
    app.mount('#app')
})

