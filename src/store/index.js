import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axiosClient from "@/axios";
import router from '@/router'

export default new Vuex.Store({
    state: {
        authenticated: false,
        user: null,
        token: null,
    },
    getters: {
        isLogged(state) {
            return state.authenticated
        },
        urlBackend() {
            return "http://localhost/backend_memrise/public/storage";
        }
    },
    plugins: [createPersistedState()],
    mutations: {
        setAuth(state, data) {
            state.authenticated = true;
            state.user = data['user'];
            state.token = data['token'];
        },
        logout() {
            //if session > 30 sessionStorage.clear();
            this.state.user = null;
            this.state.authenticated = false;
            this.state.token = null;
            router.push({ name: 'login' })
        },
        session() {
            if (this.state.authenticated) {
                let res = axiosClient.post("/valid-session", { 'id': this.state.user['id'] });
                const session_user = Promise.resolve(res);
                session_user.then((value_res) => {
                    if (value_res.data["status"] !== 200) {
                        this.commit('logout');
                    }
                });
            }
        }
    },
    //actions :: sont des fonctions utilisé pour changer l'etate(state) ou pour commiter(commit)des mutations
    actions: {},
    modules: {}
})