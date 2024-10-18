import { defineStore } from 'pinia'
import axios from 'axios'

export const appStore = defineStore('appStore', {
    state: () => {
        return {
            toast_object: null,
            sessionID: null
        }
    },
    getters: {

    },
    actions: {
        setToast(message, sum, sev){
            this.toast_object = { severity: sev, summary: sum, detail: message, life: 3000 }
        },

        async login(username, password) {
            const loginData = {
                "username": username,
                "password": password
            };

            try{
                const data = await axios.post("http://localhost:3000/login", loginData, {
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                })
                this.sessionID = data.sessionID
                return data.authLevel;
            }catch(e){
                console.log(e)
            }   
            return -1;
        }
        
    }, persist: true
})