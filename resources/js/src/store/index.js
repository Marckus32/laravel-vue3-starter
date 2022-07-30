import { createStore } from "vuex";
import AuthModule from "./modules/AuthModule";
import createPersistedState from "vuex-persistedstate";
const store = createStore({
    modules: {
        AuthModule
    },
    plugins: [createPersistedState()],
})

export default store