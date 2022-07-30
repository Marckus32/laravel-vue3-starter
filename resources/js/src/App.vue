<template>
    <router-view></router-view>
</template>

<script>
import axios from 'axios'
import { defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { handleError } from "./services/error.service";
import { ElMessage } from "element-plus";

export default defineComponent({
    name: "app",
    setup() {
        const store = useStore()

        onBeforeMount(() => {
            axios.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${store.getters.getUser.token}`
                return config
            })
            axios.interceptors.response.use(
                (response) => response,
                (error) => {
                    ElMessage.error(handleError(error));
                    return Promise.reject(error)
                }
            )
        })
    },
})
</script>
