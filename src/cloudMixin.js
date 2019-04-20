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
          this.syncBoards(username);
        })
        .finally(() => {
          this.$store.dispatch("setIsConnecting", false);
        })
        .catch((err) => {
          this.$Message.error("Invalid username or password");
          console.log(err);
        });
    },
    syncBoards(username) {
      this.$store.dispatch("setIsSyncing", true);
      axios({
        method: "post",
        url: `${cloudSettings.boards}${username}`,
        data: {boards: this.$store.state.boards.rawBoards},
        headers: {"Authorization": `JWT ${this.$store.state.cloud.token}`}
      })
        .then(({data}) => {
          this.$Message.success("Synchronization success");
          console.log(data);
        })
        .catch((err) => {
          this.$Message.error("Synchronization error");
          console.log(err);
        })
        .finally(() => {
          this.$store.dispatch("setIsSyncing", false);
        });
    }
  }
};
