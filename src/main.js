import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import Clipboard from 'v-clipboard'
import Notifications from 'vue-notification'


Vue.use(Notifications)
Vue.use(Clipboard)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
