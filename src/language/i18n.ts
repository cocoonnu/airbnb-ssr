import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 返回一个语言配置
const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    messages: {
        zh,
        en
    }
})

export default i18n

// export function createSSRI18n() {
//     return createI18n({
//         locale: 'zh',
//         messages: {
//             zh,
//             en
//         }
//     })
// }
