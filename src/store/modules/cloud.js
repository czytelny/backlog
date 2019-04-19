const state = {
  syncInProgress: false,
  token: ""
};

const mutations = {
  SET_CLOUD_TOKEN(state, val) {
    state.token = val;
  },
  SET_SYNC_IN_PROGRESS(state, val) {
    state.syncInProgress = val;
  }
};

const actions = {
  setCloudToken({commit}, val) {
    commit("SET_CLOUD_TOKEN", val);
  },
  setIsSyncing({commit}, val) {
    commit("SET_SYNC_IN_PROGRESS", val);
  }
};


export default {
  state,
  mutations,
  actions
};
