// 当前登录用户的token，account
const state = {
    token: null,
    //account: null,
    userconfig: null
}
const mutations = {
    SET_TOKEN(state, val) {
        state.token = val
    },
    SET_ACCOUNT(state, val) {
        state.account = val
    },
    SET_USER_CONFIG(state, val) {
        state.userconfig = val
    },
    CLEAR_TOKEN(state) {
        state.token = null
        state.account = null
    }
}

const actions = {
    AsyncSetToken({ commit }, tokenV) {
        commit('SET_TOKEN', tokenV)
    }
}


export default {
    state,
    mutations,
    actions
}