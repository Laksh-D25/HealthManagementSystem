<template>
    <Router-View/>
    <Toast/>
</template>

<script setup>
    import Toast from 'primevue/toast';
    import { watch, ref } from 'vue'
    import { useToast } from 'primevue/usetoast';
    import { appStore } from './pinia/appPinia.js'
    import { storeToRefs } from 'pinia'

    const toast = useToast();

    const appPinia = appStore()
    const { toast_object } = storeToRefs(appPinia)

    watch(toast_object, () => {
       toast.add(toast_object.value)
    })
</script>