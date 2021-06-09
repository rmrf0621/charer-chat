// vuex 设置token
// const token = {
//     state:{
//         tokenVal:null
//     },
//     mutations:{
//         setToken(val){
//             state.tokenVal = val
//         },
//         clearToken(){
//             state.tokenVal = null
//         }
//     },
//     actions:{
//         setToken(context){
//             context.commit('increment')
//         }
//     }

// }

// 当前登录用户的token，account
const state = {
    token : null,
    account:null
}
const mutations={
    SET_TOKEN(state,val){
        state.token = val
    },
    SET_ACCOUNT(state,val){
      state.account = val
    },
    CLEAR_TOKEN(state){
        state.token = null
        state.account = null
    }
}

const actions = {
    AsyncSetToken ({ commit },tokenV) {
      commit('SET_TOKEN',tokenV)
    }
  }
  

export default {
    state,
    mutations,
    actions
  }
