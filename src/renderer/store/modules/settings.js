import settingsRepository from '@/repositories/settingsRepository'

const state = {
  wasImported: true,
  itemCreationDate: true,
  prependNewItems: true,
  stickBoardsOnTop: false,
  markdownMode: true,
  dbLocation: '',
  darkTheme: false
}

const mutations = {
  SET_SETTINGS (state, settings) {
    Object.assign(state, settings)
  }
}

const actions = {
  fetchSettings ({commit}) {
    commit('SET_SETTINGS', settingsRepository.getAppSettings())
  }
}

export default {
  state,
  mutations,
  actions
}
