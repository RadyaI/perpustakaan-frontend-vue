import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import UploadForm from './components/BukuView.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

Vue.config.productionTip = false

// Vue.component('pagination', require('laravel-vue-pagination'));
// Vue.component('UploadForm',UploadForm);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
