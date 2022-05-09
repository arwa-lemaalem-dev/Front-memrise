import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import store from './store';
import Vuex from 'vuex';
//Front
// import 'mdb-vue-ui-kit/css/mdb.min.css';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import Toaster from '@meforma/vue-toaster';



createApp(App).use(router).use(store).use(Vuex).use(BootstrapVue3).use(Toaster).mount('#app')
