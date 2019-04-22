import cloudSettings from "./cloud";
import axios from "axios";

export default {
  methods: {
    login(username, password) {
      axios
        .post(cloudSettings.login, {
          username, password
        })
        .then(({data}) => {
          this.$Message.success("User successfully connected");
          this.$store.dispatch("setCloudToken", {token: data.token, username});
          this.$store.dispatch("clearConnectionError");
          this.syncBoards();
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
    syncBoards() {
      const username = this.$store.state.cloud.username;
      this.$store.dispatch("setIsSyncing", true);
      axios({
        method: "post",
        url: `${cloudSettings.boards}${username}`,
        data: {boards: this.$store.state.boards.rawBoards},
        headers: {"Authorization": `JWT ${this.$store.state.cloud.token}`}
      })
        .then(({data}) => {
          this.$Message.success("Synchronization success");
          this.$store.dispatch("syncBoardsDone", data);
          this.$store.dispatch("clearSyncError");
          console.log(data);
        })
        .catch((err) => {
          this.$Message.error("Synchronization error");
          if (err.response){
            this.$store.dispatch("setSyncError", `[${err.response.config.url}] - ${err.response.status}:${err.response.data}`);
          } else {
            this.$store.dispatch("setSyncError", `[${cloudSettings.boards}${username}] - ${err}`);
          }

        })
        .finally(() => {
          this.$store.dispatch("setIsSyncing", false);
        });
    }
  }
};
