import settingsRepository from './../../repositories/settingsRepository'

const state = {
  wasImported: true,
  itemCreationDate: true,
  prependNewItems: true,
  stickBoardsOnTop: false,
  markdownMode: true,
  dbLocation: '',
  darkTheme: false,
  showUpdates: true,
  keyBindings: settingsRepository.keyBindings
}

const mutations = {
  SET_SETTINGS (state, settings) {
    state.keyBindings = {...state.keyBindings, ...settings.keyBindings}
    Object.assign(state, settings)
  },
  SET_DB_LOCATION (state, newDbLocation) {
    state.dbLocation = newDbLocation
  },
  SET_DARK_THEME (state, val) {
    state.darkTheme = val
  },
  SET_ITEM_CREATION_DATE (state, val) {
    state.itemCreationDate = val
  },
  SET_SHOW_UPDATES (state, val) {
    state.showUpdates = val
  }
}

const actions = {
  fetchSettings ({commit}) {
    commit('SET_SETTINGS', settingsRepository.getAppSettings())
  },
  setDbLocation ({commit}, dbLocation) {
    commit('SET_DB_LOCATION', dbLocation)
    settingsRepository.updateAppSettings({dbLocation})
  },
  setDarkTheme ({commit}, darkTheme) {
    commit('SET_DARK_THEME', darkTheme)
    settingsRepository.updateAppSettings({darkTheme})
  },
  setItemCreationDate ({commit}, itemCreationDate) {
    commit('SET_ITEM_CREATION_DATE', itemCreationDate)
    settingsRepository.updateAppSettings({itemCreationDate})
  },
  setShowUpdates ({commit}, showUpdates) {
    commit('SET_SHOW_UPDATES', showUpdates)
    settingsRepository.updateAppSettings({showUpdates})
  },
  setupKeyBindings () {
    if (!settingsRepository.hasKeyBindingsProperty()) {
      settingsRepository.setupKeyBindings()
    } else { // check out if there are any missing shortcuts...
      const repoKeys = settingsRepository.getKeyBindings()
      for (let property in settingsRepository.keyBindings) {
        if (!repoKeys[property]) {
          settingsRepository.addKeyBinding(property, settingsRepository.keyBindings[property])
        }
      }
    }
  },
  resetKeyBindings () {
    settingsRepository.setupKeyBindings()
  },
  updateKeyBinding ({commit}, {id, combination, isMac}) {
    settingsRepository.updateKeyBinding(id, combination, isMac)
  }
}

export default {
  state,
  mutations,
  actions
}
