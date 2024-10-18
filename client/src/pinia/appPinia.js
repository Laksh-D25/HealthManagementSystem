import { defineStore } from 'pinia'

export const appStore = defineStore('appStore', {
    state: () => {
        return {
            toast_object: null
        }
    },
    getters: {
        
    },
    actions: {
        setToast(message, sum, sev){
            this.toast_object = { severity: sev, summary: sum, detail: message, life: 3000 }
        }
    }, persist: true
})