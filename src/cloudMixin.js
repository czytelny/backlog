import cloudSettings from './cloud';
import syncRepository from './repositories/syncRepository';

export default {
  methods: {
    login(username, password) {
      syncRepository.login(username, password)
        .then(({data}) => {
          this.$Message.success(this.$t('cloud.user_success_connected'));
          this.$store.dispatch('setCloudToken', {token: data.token, username});
          this.$store.dispatch('clearConnectionError');
          this.initialSyncBoards();
        })
        .finally(() => {
          this.$store.dispatch('setIsConnecting', false);
        })
        .catch(({response}) => {
          this.$Message.error(this.$t('cloud.invalid_username_password'));
          this.$store.dispatch('setConnectionError', `${response.status}:${response.data}`);
          this.$store.dispatch('setCloudToken', {token: '', username: ''});
          console.log(response);
        });
    },
    initialSyncBoards() {
      const username = this.$store.state.cloud.username;
      this.$store.dispatch('setIsSyncing', true);
      this.$store.dispatch('resetSyncQueue');
      syncRepository.initialSync(username,
        this.$store.state.boards.rawBoards,
        this.$store.state.cloud.token,
        this.$store.state.cloud.lastSync)
        .then(({data}) => {
          this.$Message.success(this.$t('cloud.sync_success'));
          this.$store.dispatch('syncBoardsDone', data.boards);
          this.$store.dispatch('clearSyncError');
          this.$store.dispatch('updateLastSync', data.lastSyncDate);
        })
        .catch((err) => {
          this.$Message.error(this.$t('cloud.sync_error'));
          if (err.response) {
            this.$store.dispatch('setSyncError', `[${err.response.config.url}] - ${err.response.status}:${err.response.data}`);
          } else {
            this.$store.dispatch('setSyncError', `[${cloudSettings.boardsUrl(username)}] - ${err}`);
          }
        })
        .finally(() => {
          this.$store.dispatch('setIsSyncing', false);
        });
    },
    patchSyncBoards() {
      const {username, token, lastSync} = this.$store.state.cloud;
      this.$store.dispatch('setIsSyncing', true);
      syncRepository.patchSync(username, token, lastSync)
        .then(({data}) => {
          if (data) {
            this.$Message.success(this.$t('cloud.sync_success'));
            this.$store.dispatch('syncBoardsDone', data.boards);
            this.$store.dispatch('clearSyncError');
            this.$store.dispatch('updateLastSync', data.lastSyncDate);
          }
        })
        .catch((err) => {
          this.$Message.error(this.$t('cloud.sync_error'));
          if (err.response) {
            const {config, status, data} = err.response;
            this.$store.dispatch('setSyncError', `[${config.url}] - ${status}:${data}`);
          } else {
            this.$store.dispatch('setSyncError', `[${cloudSettings.boardPatchUrl(username)}] - ${err}`);
          }
        })
        .finally(() => {
          this.$store.dispatch('setIsSyncing', false);
        });

    },
  },
};
