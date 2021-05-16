import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './modules/store'
import moment from 'moment'
Vue.config.productionTip = false
Vue.filter('formatTime', (value) => {
  let time = value.split('T')[0].split('-').join('');

  return moment(time).format('MMMM Do YYYY')
})
new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
