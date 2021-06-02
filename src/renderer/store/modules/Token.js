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

const state = {
    token : null
}
const mutations={
    SET_TOKEN(state,val){
        state.token = val
        console.log(state.token)
    },
    CLEAR_TOKEN(state){
        state.token = null
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
