import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
    // '@' is aliased to src/components
    return () => import(`@/${component}.vue`)
}

export default new VueRouter({
    /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

    routes: [
        { path: '/', component: load('pages/payments/PaymentsPage') },
        { path: '/login', component: load('Login') },
        { path: '/special_offers', component: load('SpecialOffers') },
        { path: '/notifications', component: load('Notifications') },
        { path: '/start_screen', component: load('StartScreen') },
        { path: '/polls', component: load('pages/polls/Polls') },
        { path: '/payments_history', component: load('PaymentsHistory') },
        { path: '/settings', component: load('Settings') },
        { path: '/in-progress', component: load('Error404'), props: { message: 'Функция находится в разработке.' } },
        // Always leave this last one
        { path: '*', component: load('Error404'), props: { message: 'Раздел находится в разработке.' } } // Not found
    ]
})
