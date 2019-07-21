import settingsRepository from "../../repositories/settingsRepository";
import syncRepository from "../../repositories/syncRepository";

const state = {
  connectionError: false,
  syncError: false,
  syncInProgress: false,
  token: "",
  username: "",
  lastSync: ""
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
  SET_CLOUD_LAST_SYNC(state, val) {
    state.lastSync = val;
  },
  SET_SYNC_IN_PROGRESS(state, val) {
    state.syncInProgress = val;
  },
  SET_SYNC_ERROR(state, val) {
    state.syncError = val;
  }
};

const actions = {
  clearConnectionError({commit}) {
    commit("SET_CONNECTION_ERROR", "");
  },
  clearSyncError({commit}) {
    commit("SET_SYNC_ERROR", "");
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
  resetSyncQueue() {
    syncRepository.resetQueue();
  },
  setIsSyncing({commit}, val) {
    commit("SET_SYNC_IN_PROGRESS", val);
  },
  setSyncError({commit}, val) {
    commit("SET_SYNC_ERROR", val);
  }
};


export default {
  state,
  mutations,
  actions
};
