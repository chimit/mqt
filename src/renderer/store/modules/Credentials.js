const state = {
  credentials: {
    protocol: null,
    hostname: null,
    clientId: null,
    username: null,
    password: null,
    lwTopic: null,
    lwMessage: null,
    lwQos: 0,
    lwRetain: false
  }
}

const mutations = {
  SET_CREDENTIALS (state, credentials) {
    state.credentials = credentials
  }
}

const actions = {
  setCredentials ({ commit }, credentials) {
    commit('SET_CREDENTIALS', credentials)
  }
}

export default {
  state,
  mutations,
  actions
}
