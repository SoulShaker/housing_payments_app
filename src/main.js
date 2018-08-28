// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === 'mat') {
    require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'

// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

// for ajax
import axios from 'axios'
Vue.prototype.$http = axios

import {store} from './common/store/store'

Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
        el: '#q-app',
        store,
        router,
        render: h => h(require('./App'))
    })
})

Vue.prototype.$http.interceptors.request.use(function (config) {
    let authToken = localStorage.getItem('auth_token')

    if (authToken) {
        config.headers['Authorization'] = authToken
    }
    else {
        let isExcludedUrl = config.url.match(/\/login$/i) === null || config.url.match(/\/logout$/i)
        console.log('is excluded url', isExcludedUrl)

        if (!isExcludedUrl) {
            router.push('/login')
        }
    }

    return config
})
