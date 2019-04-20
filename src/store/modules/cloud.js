import settingsRepository from "../../repositories/settingsRepository";

const state = {
  connectionError: false,
  syncInProgress: false,
  token: "",
  username: ""
};

const mutations = {
  SET_CONNECTION_ERROR(state, val) {
    state.connectionError = val;
  },
  SET_CLOUD_TOKEN(state, val) {
    state.token = val;
  },
  SET_CLOUD_USER(state, val) {
    state.username = val;
  },
  SET_SYNC_IN_PROGRESS(state, val) {
    state.syncInProgress = val;
  }
};

const actions = {
  clearConnectionError({commit}) {
    commit("SET_CONNECTION_ERROR", "");
  },
  setConnectionError({commit}, val) {
    commit("SET_CONNECTION_ERROR", val);
  },
  setCloudToken({commit}, {token, username}) {
    commit("SET_CLOUD_TOKEN", token);
    commit("SET_CLOUD_USER", username);
    settingsRepository.updateAppSettings({token});
    settingsRepository.updateAppSettings({username});
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
