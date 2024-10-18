<template>
    <Button @click="appPinia.setToast('Help', 'Test', 'success')">Click</Button>
</template>

<script setup>
    import Button from 'primevue/button'
    import { appStore } from '../pinia/appPinia.js'
    
    const appPinia = appStore()
</script>