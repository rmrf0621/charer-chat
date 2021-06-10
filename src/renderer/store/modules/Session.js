
const state = {
    //选中得当前会话
    selectSession: null
}

const mutations = {
   SET_SELECT_SESSION(state, val){
       state.selectSession = val
   }
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}
