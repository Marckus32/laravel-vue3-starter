import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import axios from 'axios'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus);

window.axios = axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.baseURL = process.env.MIX_APP_URL_API;

app.mount("#app")