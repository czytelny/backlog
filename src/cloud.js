export default {
  login: "http://localhost:3000/api/loginUser",
  boardsUrl(username, lastSync) {
    return `http://localhost:3000/api/boards?username=${username}&lastSync=${lastSync}`;
  },
  boardPatchUrl(username) {
    return `http://localhost:3000/api/boards/patch?username=${username}`;
  }
};
