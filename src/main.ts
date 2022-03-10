import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);
// app.use()でプラグインを注入する
app.use(router);
app.mount('#app');
