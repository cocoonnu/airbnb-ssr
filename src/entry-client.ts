import { createApp } from "./main"

const { app, router } = createApp()

router.isReady().then(function() {
    app.mount('#app')
})

