import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

// Routes
import DemoRoutes from "../modules/demo/router/demo_router";

import {checkLogin} from '../helpers/isAuth'



const routes = [
    {
        path: "/",
        redirect: "/login",
        meta: { auth: true },
        component: () => import("../layout/Layout.vue"),
        children: [
            {
                path: "/example-page",
                component: import("../views/Example.vue"),
            },
            ...DemoRoutes
        ]
    },
    {
        path: "/",        
        component: () => import("../layout/AuthLayout.vue"),
        children: [
            {
                path: "/login",
                name: "login",
                component: () => import("../views/Login.vue"),
                beforeEnter: checkLogin
            },
            {
                path: "/register",
                name: "register",
                component: () => import("../views/Register.vue"),
            },
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
    {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("../views/404.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
