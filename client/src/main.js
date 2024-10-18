import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia'
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

//app
import login from './views/login.vue'

//admin
import dashboard_admin from './views/admin/dashboard.vue'; 
import schedule_admin from './views/admin/schedule.vue';

//doctor
import dashboard_doctor from './views/doctor/dashboard.vue';    
import schedule_doctor from './views/doctor/schedule.vue';
import consult_doctor from './views/doctor/consut.vue';
import record_doctor from './views/doctor/record.vue';


//patient
import patient_data_patient from './views/patient/patient_data.vue';
import dashboard_patient from './views/patient/patient_data.vue';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const routes = [
    {path: '/', component: login},
    {path: '/admin', component: dashboard_admin, children: [
        {path: 'patient', component: patient_data_patient},
        {path: 'appointment', component: schedule_admin}
    ]},
    {path: '/doctor', component: dashboard_doctor, children: [
        {path: 'patient', component: patient_data_patient},
        {path: 'appointment', component: schedule_doctor},
        {path: 'consultation', component: consult_doctor, children: [
            {path: 'record', component: record_doctor}
        ]}
    ]},
    {path: '/patient', component: dashboard_patient, children: [
        {path: 'information', component: patient_data_patient},
    ]}
]
    
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App);
app.use(pinia)
app.use(ToastService)
app.use(PrimeVue,{ theme: {
    preset: Aura,
    options: {
        prefix: 'p',
        darkModeSelector: 'none',
        cssLayer: false
    }
}})
app.use(router).mount("#app");
