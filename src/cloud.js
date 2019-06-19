export default {
  login: "http://localhost:3000/api/loginUser",
  boardsUrl(username) {
    return `http://localhost:3000/api/boards?username=${username}`;
  },
  boardsSyncGetUrl(username) {
    return `http://localhost:3000/api/boards/get?username=${username}`;
  },
  boardPatchUrl(boardId, username) {
    return `http://localhost:3000/api/boards/patch/${boardId}?username=${username}`;
  }
};
