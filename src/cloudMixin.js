import cloudSettings from "./cloud";
import {initialSync, login} from "./repositories/syncRepository";

export default {
  methods: {
    login(username, password) {
      login(username, password)
        .then(({data}) => {
          this.$Message.success("User successfully connected");
          this.$store.dispatch("setCloudToken", {token: data.token, username});
          this.$store.dispatch("clearConnectionError");
          this.initialSyncBoards();
        })
        .finally(() => {
          this.$store.dispatch("setIsConnecting", false);
        })
        .catch(({response}) => {
          this.$Message.error("Invalid username or password");
          this.$store.dispatch("setConnectionError", `${response.status}:${response.data}`);
          console.log(response);
        });
    },
    initialSyncBoards() {
      const username = this.$store.state.cloud.username;
      this.$store.dispatch("setIsSyncing", true);
      initialSync(username, this.$store.state.boards.rawBoards, this.$store.state.cloud.token)
        .then(({data}) => {
          this.$Message.success("Synchronization success");
          this.$store.dispatch("syncBoardsDone", data);
          this.$store.dispatch("clearSyncError");
          console.log(data);
        })
        .catch((err) => {
          this.$Message.error("Synchronization error");
          if (err.response) {
            this.$store.dispatch("setSyncError", `[${err.response.config.url}] - ${err.response.status}:${err.response.data}`);
          } else {
            this.$store.dispatch("setSyncError", `[${cloudSettings.boardsUrl(username)}] - ${err}`);
          }

        })
        .finally(() => {
          this.$store.dispatch("setIsSyncing", false);
        });
    }
  }
};
