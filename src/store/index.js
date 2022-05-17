import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axiosClient from "@/axios";
import router from "@/router";

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
    token: null,
    events: []
  },
  getters: {
    isLogged: state =>state.authenticated,
    urlBackend() {
      return "http://localhost/back-end-memrise/storage/app/public/";
    },
    Events: state => state.events
  },
  plugins: [createPersistedState()],
  mutations: {
    setAuth(state, data) {
      state.authenticated = true;
      state.user = data["user"];
      state.token = data["token"];
    },
    logout() {
      //if session > 30 sessionStorage.clear();
      this.state.user = null;
      this.state.authenticated = false;
      this.state.token = null;
      router.push({ name: "login" });
    },
    session() {
      if (this.state.authenticated) {
        const res = axiosClient.post("/user/valid-session", {
          id: this.state.user["id"],
        });
        const session_user = Promise.resolve(res);
        session_user.then((value_res) => {
          if (value_res.data["status"] !== 200) {
            this.commit("logout");
          }
        });
      }
    },
    ADD_EVENT:(state,event)=>{
      state.events.push(event)
    },
    UPDATE_EVENT:(state,{id,title,start,end})=>{
      let index=state.events.findIndex(event=>event.id===id);
      state.events[index].title=title;
      state.events[index].start=start;
      state.events[index].end=end;
    }
  },
  //actions :: sont des fonctions utilisé pour changer l'etate(state) ou pour commiter(commit)des mutations
  actions: {},
  modules: {},
});
