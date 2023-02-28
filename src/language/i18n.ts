import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

export function createSSRI18n() {

    return createI18n({
        legacy: false,
        locale: 'zh',
        messages: {
            zh,
            en
        }
    })

}
