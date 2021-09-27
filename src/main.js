import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = process.env.VUE_APP_REPORTING_API_URL

Vue.config.productionTip = false
 

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount('#app')
