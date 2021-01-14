import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import router from '@/router'
import App from '@/App.vue'
import '@/assets/style.scss'

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
