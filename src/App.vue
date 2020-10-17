<template>
  <div id="app">
    <top-bar></top-bar>
    <div v-if="authenticated === true">
      <MainPage></MainPage>
      <global-keybindings></global-keybindings>
    </div>
    <div v-else>
      <div class="parent">
        <form class="login" inline>
          <Input
            on-enter="submit"
            type="password"
            v-model="Password"
            placeholder="Please Enter Your Password"
            style="width: 300px"
            @keyup.native.enter="submit"
          />
          <Button type="primary" @click="submit" class="ml-10">Unlock</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MainPage from "./components/MainPage";
import TopBar from "./components/TopBar";
import "./theme/default-theme.less";
import GlobalKeybindings from "./components/GlobalKeyBindings";
import cloudMixin from "./cloudMixin";

export default {
  name: "backlog",
  components: { GlobalKeybindings, TopBar, MainPage },
  mixins: [cloudMixin],
  data() {
    return {
      Password: "",
    };
  },
  computed: {
    authenticated() {
      return this.$store.state.settings.authenticated;
    },
  },
  watch: {
    authenticated(val) {
      if (!val) {
        this.Password = "";
      }
    },
  },
  methods: {
    submit() {
      if (this.Password == "0000") {
        this.$store.commit("SET_AUTHENTICATED", true);
      } else {
        this.$Message.error("wrong password");
        this.Password = "";
      }
    },
  },
  created() {
    this.$store.dispatch("setupKeyBindings");
    this.$store.dispatch("fetchRawBoards");
  },
};
</script>

<style>
@import url("~animate.css");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
}

body {
  overflow: hidden;
}

.invisible {
  opacity: 0;
  transition: opacity 0.3s;
}

.visible {
  opacity: 1;
}

a {
  color: #58bb73;
}

a:hover {
  color: #338a62;
}

.sync-animate {
  animation: spin 1.5s cubic-bezier(0.4, 0, 1, 1) infinite;
  height: 1px;
  width: 1px;
  transform-origin: 50% 53%;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.uppercase {
  text-transform: uppercase;
}
.parent {
  text-align: center;
}
.login {
  /* width: 200px; */
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.ml-10 {
  margin-left: 10px;
}
</style>
