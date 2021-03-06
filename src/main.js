import Vue from 'vue'
import Vuex from 'vuex'
import Mint from 'mint-ui'
import IScrollView from 'vue-iscroll-view'
import IScrollzoom from 'iscroll/build/iscroll-zoom.js'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'

import store from './store/index'

Vue.use(Mint, Vuex)
Vue.use(IScrollView, IScrollzoom)

Vue.config.productionTip = false
document.body.addEventListener('touchstart', function () {})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const token = store.getters.getToken
  console.log(token)
  if (to.matched.some(record => record.meta.LoginRequire)) {
    if (!token) {
      next({
        path: '/welcome'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
