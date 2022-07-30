import { isAuth } from "../../../helpers/isAuth";

const DemoRoutes = [
    {
        path: "/demo/first",
        name: "demo.index",
        component: ()=> import("../views/Index.vue"),
        meta: {
            auth:true
        },
        beforeEnter: isAuth
    },
    {
        path: "/demo/second",
        name: "demo.second",
        component: ()=> import("../views/Second.vue"),
        meta: {
            auth:true
        },
        beforeEnter: isAuth
    }
]

export default DemoRoutes