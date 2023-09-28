import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import router from './router';
import '@/assets/css/main.css'
import '@/assets/css/util.css'
import '@/assets/css/style.css'
import '@/assets/fonts/font-awesome-4.7.0/css/font-awesome.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App);
app.use(router);

app.mount('#app');
