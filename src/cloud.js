export default {
  login: "http://localhost:3000/api/loginUser",
  boardsUrl(username) {
    return `http://localhost:3000/api/boards?username=${username}`;
  },
  boardPatchUrl(username) {
    return `http://localhost:3000/api/boards/patch?username=${username}`;
  }
};
