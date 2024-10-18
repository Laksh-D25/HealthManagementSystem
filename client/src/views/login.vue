<template>
    <div class="grid grid-cols-2">
        <div>
            <img :src="imgsrc"/>
        </div>
        <div class="bg-yellow-200 grid justify-items-center"> 
            <div class="my-auto">
                <Card style="width: 25rem; overflow: hidden">
                <template #header>
                    <img alt="user header" :src="logo" class="" />
                </template>
                <template #content>
                    <div class="grid grid-rows-3 gap-5 justify-items-center">
                        <div>
                            <InputText v-model="username" type="text" placeholder="Username" />
                        </div>
                        <div>
                            <Password v-model="pw" :feedback="false" placeholder="Password"  />
                        </div>
                        <div class="flex justify-center mt-1">
                            <Button label="Login" class="w-full" @click="login"/>
                        </div>
                    </div>
                </template>
            </Card>
            </div>  
            
        </div>
    </div>
</template>

<script setup>
    import Button from 'primevue/button'
    import InputText from 'primevue/inputtext'
    import { appStore } from '../pinia/appPinia.js'
    import Card from 'primevue/card';
    import Password from 'primevue/password';
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    const username = ref()
    const pw = ref()
   
    const imgsrc = 'hospital.jpg'
    const logo = 'Pinia.png'
    
    const appPinia = appStore()
    const router = useRouter();

    async function login(){
        const redirect = await appPinia.login(username.value, pw.value);
        if(redirect != -1){
            console.log(redirect)
            switch(redirect){
                case 1: router.push('/admin'); break;
                case 2: router.push('/doctor'); break;
                case 3: router.push('/patient'); break;
                default: appPinia.setToast("Login Failed", "Login", "danger")
            }
        }else{
            appPinia.setToast("Login Failed", "Login", "danger")
        }
    }
</script>