const state = {
    user : {
        id      : null,
        name    : null,
        token   : null
    }
}

const getters = {
    getUser: (state) => state.user
}

const actions = {   

    login({ commit }, userData){
        commit('setUser',userData)
        return userData
    },

    logout({ commit }){        
        commit('unSetUser')
    }
}

const mutations = {    
    setUser: (state,userData) => {
        state.user.id = userData.user.id
        state.user.name = userData.user.name
        state.user.token = userData.token
    },
    unSetUser: (state) => {
        state.user.id = null
        state.user.name = null
        state.user.token = null
    }

}

const AuthModule = {
    state,
    getters,
    actions,
    mutations
}

export default AuthModule


// export default class AuthModule extends VuexModule