import settingsRepository from '@/repositories/settingsRepository'

const state = {
  wasImported: true,
  itemCreationDate: true,
  prependNewItems: true,
  stickBoardsOnTop: false,
  markdownMode: true,
  dbLocation: '',
  darkTheme: false,
  showUpdates: true
}

const mutations = {
  SET_SETTINGS (state, settings) {
    Object.assign(state, settings)
  },
  SET_DB_LOCATION (state, newDbLocation) {
    state.dbLocation = newDbLocation
  },
  SET_PREPEND_NEW_ITEM (state, val) {
    state.prependNewItems = val
  },
  SET_MARKDOWN_MODE (state, val) {
    state.markdownMode = val
  },
  SET_DARK_THEME (state, val) {
    state.darkTheme = val
  },
  SET_ITEM_CREATION_DATE (state, val) {
    state.itemCreationDate = val
  },
  SET_STICK_BOARDS_ON_TOP (state, val) {
    state.stickBoardsOnTop = val
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
  setPrependNewItem ({commit}, prependNewItems) {
    commit('SET_PREPEND_NEW_ITEM', prependNewItems)
    settingsRepository.updateAppSettings({prependNewItems})
  },
  setMarkdownMode ({commit}, markdownMode) {
    commit('SET_MARKDOWN_MODE', markdownMode)
    settingsRepository.updateAppSettings({markdownMode})
  },
  setDarkTheme ({commit}, darkTheme) {
    commit('SET_DARK_THEME', darkTheme)
    settingsRepository.updateAppSettings({darkTheme})
  },
  setItemCreationDate ({commit}, itemCreationDate) {
    commit('SET_ITEM_CREATION_DATE', itemCreationDate)
    settingsRepository.updateAppSettings({itemCreationDate})
  },
  setStickBoardsOnTop ({commit}, stickBoardsOnTop) {
    commit('SET_STICK_BOARDS_ON_TOP', stickBoardsOnTop)
    settingsRepository.updateAppSettings({stickBoardsOnTop})
  },
  setShowUpdates ({commit}, showUpdates) {
    commit('SET_SHOW_UPDATES', showUpdates)
    settingsRepository.updateAppSettings({showUpdates})
  }
}

export default {
  state,
  mutations,
  actions
}
