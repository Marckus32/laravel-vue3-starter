import store from "../store"

const isAuth = (to, from, next) => {
    const user = store.getters.getUser
    const isLoggedIn = user.token ? true : false
    // If Empty
    if(!isLoggedIn){        
        next({ name: "login" })
    }else{
        next()
    }
}

// const store = useStore()    
const checkLogin = (to, from, next) => {    
    const user = store.getters.getUser
    const isLoggedIn = user.token ? true : false
    // If Empty
    if(!isLoggedIn){
        next()
    }else{
        next({ name: "demo.index" })
    }
}

export { isAuth, checkLogin }