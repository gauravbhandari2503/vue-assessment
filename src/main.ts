
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css'
import VueElementLoading from 'vue-element-loading';
import store from './store/index'; 


const app = createApp(App)
app.component('VueElementLoading', VueElementLoading);
app.use(router)
app.use(store)
app.mount('#app')
