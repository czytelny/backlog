import settingsRepository from './../../repositories/settingsRepository';

const state = {
  authenticated: false,
  wasImported: true,
  itemCreationDate: true,
  prependNewItems: true,
  stickBoardsOnTop: false,
  markdownMode: true,
  dbLocation: '',
  darkTheme: false,
  showUpdates: true,
  keyBindings: settingsRepository.keyBindings,
  token: '',
  username: '',
  language: '',
  languages: [
    {
      code: 'ptBR',
      label: 'Brazilian Portuguese',
    },
    {
      code: 'zh',
      label: '中文',
    },
    {
      code: 'en',
      label: 'English',
    }, {
      code: 'hr',
      label: 'Croatian',
    },
    {
      code: 'pl',
      label: 'Polish',
    },
  ],
};

const mutations = {
  SET_AUTHENTICATED(state, authenticated) {
    state.authenticated = authenticated
  },
  SET_SETTINGS(state, settings) {
    state.keyBindings = {...state.keyBindings, ...settings.keyBindings};
    Object.assign(state, settings);
  },
  SET_DB_LOCATION(state, newDbLocation) {
    state.dbLocation = newDbLocation;
  },
  SET_DARK_THEME(state, val) {
    state.darkTheme = val;
  },
  SET_ITEM_CREATION_DATE(state, val) {
    state.itemCreationDate = val;
  },
  SET_SHOW_UPDATES(state, val) {
    state.showUpdates = val;
  },
  SET_LANGUAGE(state, val) {
    state.language = val;
  },
};

const actions = {
  fetchSettings({commit}) {
    const settings = settingsRepository.getAppSettings();
    commit('SET_CLOUD_TOKEN', settings.token);
    commit('SET_CLOUD_USER', settings.username);
    commit('SET_CLOUD_LAST_SYNC', settings.lastSync);
    commit('SET_SETTINGS', settings);
  },
  setDbLocation({commit}, dbLocation) {
    commit('SET_DB_LOCATION', dbLocation);
    settingsRepository.updateAppSettings({dbLocation});
  },
  setDarkTheme({commit}, darkTheme) {
    commit('SET_DARK_THEME', darkTheme);
    settingsRepository.updateAppSettings({darkTheme});
  },
  setItemCreationDate({commit}, itemCreationDate) {
    commit('SET_ITEM_CREATION_DATE', itemCreationDate);
    settingsRepository.updateAppSettings({itemCreationDate});
  },
  setShowUpdates({commit}, showUpdates) {
    commit('SET_SHOW_UPDATES', showUpdates);
    settingsRepository.updateAppSettings({showUpdates});
  },
  setupKeyBindings() {
    if (!settingsRepository.hasKeyBindingsProperty()) {
      settingsRepository.setupKeyBindings();
    } else { // check out if there are any missing shortcuts...
      const repoKeys = settingsRepository.getKeyBindings();
      for (let property in settingsRepository.keyBindings) {
        if (!repoKeys[property]) {
          settingsRepository.addKeyBinding(property, settingsRepository.keyBindings[property]);
        }
      }
    }
  },
  changeLanguage({commit}, code) {
    settingsRepository.updateAppSettings({language: code});
    commit('SET_LANGUAGE', code);
  },
  resetKeyBindings() {
    settingsRepository.setupKeyBindings();
  },
  updateKeyBinding(context, {id, combination, isMac}) {
    settingsRepository.updateKeyBinding(id, combination, isMac);
  },
};

export default {
  state,
  mutations,
  actions,
};
