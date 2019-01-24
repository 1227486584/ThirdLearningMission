import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: { 
        userName:'',
        identity:'',
        token:'',
    },
    mutations: {
        setName(state, name) {
            state.userName = name
          },
        setIdentity(state,identity){
            state.identity = identity
        },
        setToken (state, token) {
            state.token = token
            sessionStorage.setItem('token', token)
          },
        logOut (state) {
            state.token = ''
            sessionStorage.removeItem('token')
        },
    }
})