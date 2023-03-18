import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router';
import store from './store/store';


import DatetimePicker from 'vuetify-datetime-picker'
//  import 'vuetify-datetime-picker/src/stylus/main.styl'
// import Router from "vue-router";

// import Vuex from 'vuex';

Vue.config.productionTip = false

import 'material-design-icons-iconfont/dist/material-design-icons.css'


// Vue.use(Vuex);
// Vue.use(Router);
Vue.use(DatetimePicker)

export const eventBus = new Vue({
  methods: {
    setAuthentication(isAuth) {
      this.$emit('isAuth', isAuth)
    }
  }
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
