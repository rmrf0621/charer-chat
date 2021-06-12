const state = {
    //选中得当前会话
    selectSession: null
}

const mutations = {
    SET_SELECT_SESSION(state, val) {
        state.selectSession = val
    },
    CLEAN_SELECT_SESSION(state) {
        state.selectSession = null
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}