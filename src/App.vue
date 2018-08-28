<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout
            ref="layout"
            view="hHh Lpr fFf"
            :left-class="{'sidebarLeft': true}"
            :header-class="{'header-navigation': true}"
            :footer-class="{'footer-buttons': true}"
    >
      <q-toolbar slot="header">
        <q-btn
                flat
                @click="$refs.layout.toggleLeft()"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-tabs slot="navigation" style="overflow:hidden;">
          <q-route-tab slot="title"  to="/" replace label="Оплата" />
          <q-route-tab slot="title"  to="/special_offers" replace label="Спецпредложения" />
          <q-route-tab slot="title"  to="/polls" replace label="Опросы" />
          <q-route-tab slot="title"  to="/notifications" replace label="Уведомления"/>
        </q-tabs>
      </q-toolbar>

      <div slot="left">
        <!--
          Use <q-side-link> component
          instead of <q-item> for
          internal vue-router navigation
        -->

        <q-list no-border link>
          <q-list-header class="sidebar_header">
            <q-side-link item to="/">
              <q-item-side icon="person" />
              <q-item-main :label="currentUser.fullName" />
            </q-side-link>
          </q-list-header>
          <q-side-link item to="/payments_history">
            <span class="icon-ci-history"></span>
            <q-item-main label="История платежей"/>
          </q-side-link>
          <q-side-link item to="/notifications">
            <span class="icon-ci-notify"></span>
            <q-item-main label="Уведомления"/>
          </q-side-link>
          <q-side-link item to="/polls">
            <span class="icon-ci-question"></span>
            <q-item-main label="Опросы"/>
          </q-side-link>
          <q-side-link item to="/housing_chat">
            <span class="icon-ci-chat"></span>
            <q-item-main label="Домовой чат"/>
          </q-side-link>
          <q-side-link item to="/settings">
            <span class="icon-ci-config"></span>
            <q-item-main label="Настройки"/>
          </q-side-link>
          <q-side-link item to="/special_offers">
            <span class="icon-ci-action"></span>
            <q-item-main label="Спецпредложения рядом"/>
          </q-side-link>
          <q-side-link item to="/login" v-if="!currentUser.id">
            <span class="icon-ci-enter"></span>
            <q-item-main label="Вход" />
          </q-side-link>
          <q-side-link item to="/" v-if="currentUser.id">
            <!-- <q-item-side icon="panorama_fish_eye" /> -->
            <span class="icon-ci-exit"></span>
            <q-item-main @click="logout" label="Выход" />
          </q-side-link>
        </q-list>
      </div>
        <router-view v-touch-swipe.horizontal="onSwipe"/>

    </q-layout>

  </div>
</template>

<script>
    import {
        Events,
        QLayout,
        QTabs,
        QRouteTab,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QSideLink,
        QToolbar,
        QToolbarTitle,
        TouchSwipe
    } from 'quasar'

    import router from './router'

    var qs = require('qs')

    import AppConfig from './config'
    // import User from './user.store'

    export default {
        components: {
            QLayout,
            QBtn,
            QTabs,
            QRouteTab,
            QIcon,
            QList,
            QListHeader,
            QItem,
            QItemSide,
            QItemMain,
            QSideLink,
            QToolbar,
            QToolbarTitle
        },
        directives: {
            TouchSwipe
        },
        data () {
            return {
                footerVisible: true,
                currentUser: null,
                // userName: ""
                routeList: ['/', '/special_offers', '/polls', '/notifications']
            }
        },
        methods: {

            reloadUser () {
                let token = localStorage.getItem('auth_token')

                if (token) {
                    console.log('check user token:', token)
    
                    this.$http.post(AppConfig.USER_URL, qs.stringify({ token: token }))
                        .then(response => {
                            if (!response.data) {
                                router.push('/login')
                            }
                            else {
                                console.log('load user from backend: ', response.data)

                                this.$store.commit('setUser', response.data)
                                this.currentUser = this.$store.state.user
    
                                Events.$emit('onUserReloaded')

                                console.log('reload user...', this.currentUser)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
                else {
                    router.push('/login')
                }
            },
            logout () {
                let token = localStorage.getItem('auth_token')

                if (token) {
                    this.$http.get(AppConfig.USER_LOGOUT_URL + '/' + token)
                    localStorage.removeItem('auth_token')
                }

                this.$store.commit('resetUser')
                this.currentUser = this.$store.state.user

                router.push('/')
            },
            onSwipe (obj) {
                var pos = this.routeList.indexOf(router.currentRoute.fullPath)
                var new_pos = 0
    
                if (Math.abs(obj.distance.x) < 0.4 * screen.width) {
                    return
                }

                switch (obj.direction) {
                case 'left':
                    if (pos == (this.routeList.length - 1)) {
                        new_pos = 0
                    }
                    else {
                        new_pos = pos + 1
                    }
                    break
                case 'right':
                    if (pos == 0) {
                        new_pos = this.routeList.length - 1
                    }
                    else {
                        new_pos = pos - 1
                    }
                    break
                default:
                    return
                }
                router.push(this.routeList[new_pos])
            }
        },
        created () {
            Events.$on('onUserLogin', () => {
                this.reloadUser()
            })
            this.currentUser = this.$store.state.user
        },
        mounted () {
            this.reloadUser()
        }

    }
</script>

<style lang="less">
    body{
      background: #e1e2e1;
    }
    .footer-buttons.q-toolbar{
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      padding: 0;
      transition: all 0.3s;
      box-shadow: none;
      .payment-record-controls{
        width: 100%;
      }

      .q-btn {
        margin: 0;
        border-radius: 0;
        min-height: 50px;
        font-size: 18px;
        font-family: Roboto;
        font-weight: 300;
      }
      .next-action-button {
        width: 55%;
        margin-left: 2%;
        background-color: #00838e;
      }
      .next-action-button.disabled {
        opacity: 0.4 !important;
      }
      .cancel-action-button {
        width: 38%;
        margin-left: 2%;
        margin-right: 0%;
        background-color: #fff;
        color: #3f3f3f;
      }
    }
    .logo-container {
      width: 255px;
      height: 242px;
      perspective: 800px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .logo {
      position: absolute;
      transform-style: preserve-3d;
    }
    .header-navigation {
      .q-toolbar {
        padding: 0;
        min-height: auto;
        max-height: 50px;
        background-color: #005662;
        .q-tabs {
          .q-tabs-head {
            font-size: 17px;
            font-family: "Roboto";
            font-weight: 500;
            background-color: #005662;
          }
          .q-tabs-bar {
            border: 2px solid currentColor;
            border-width: 2px;
            position: absolute;
            height: 0;
            left: 0;
            right: 0;
            bottom: 0px;
          }
          .q-tabs-left-scroll {
            left: 0;
            background: #fff0;
          }

        }
        
        .q-btn-standard .q-icon {
          font-size: 32px;
          padding: 0px 5px 0px 5px;
        }
      }
    }
    .sidebarLeft {
      background-color: #00838e;
      font-size: 100%;

      .q-list {
        padding: 0;

        .q-item {
          font-size: 17px;
          border-bottom: 2px solid #015f67;
          padding: 14px 16px;

          span{
            font-size: 50px;
            color: #ffffff;
            padding-right: 10px;
          }

          .q-icon {
            font-size: 48px;
          }
        }
      }
    }
    .sidebar_header {
      background-color: #ffffff;
      padding: 0;
      .q-item-label {
        color: #000000;
        font-size: 1.1em;
      }
    }
    .user_icon {
      .q-icon {
        font-size: 36px;
      }
    }
    .q-item-label {
      color: #fff;
      font-size: 1.3em;
      font-family: 'Roboto';
      font-weight: 300;
    }




  .flat-button .q-btn{
    font-weight: 300;
    color: #005662;
    min-height: auto;
    padding: 0;
  }
  .regular-button{
    font-weight: 300;
    font-family: 'Roboto';
  }
    .content{
      padding: 0px;
      font-size: 100%;
      .last-payment{
        width: 100%;
        background-color: #eeeeee;
        padding: 5px;
        border-radius: 5px;
        margin: 0px 0;
        .last-payment-header{
          text-align: center;
        }
        .last-payments-block{
          display: flex;
          align-items: center;
          flex-direction: column;
          .last-payments-row{
            display: flex;
            justify-content: space-between;
            width: 100%;
            .cell{
              flex-basis: 30%;
              color: #29b6f6;
              font-size: 1.1em;
            }
            .cell:first-child{
              text-align: left;
            }
            .cell:nth-child(2){
              text-align: center;
            }
            .cell:last-child{
              text-align: right;
            }
          }
        }
      }
      .payment_delimiter{
        font-size: 1.4em;
        text-align: center;
        color: #000000;
        padding: 5px;
      }
      .need_to_pay{
        width: 100%;
        .payment{
          background-color: #ffffff;
          border-radius: 0px;
          margin-bottom: 2px;
          position: relative;
          justify-content: center;
          font-family: 'Roboto';
          font-weight: 300;
          .payment-info-block{
            display: flex;
            flex-direction: column;
            align-items: left;
            justify-content: center;
            width: 100%;
            padding: 15px 10px 0px 20px;
            .payment-info{
              font-size: 28px;
              text-align: center;
              color: #3f3f3f;
              padding-left: 5px;
              div{
                width: 100%;
              }
            }
            .amount-input{
              margin-left: 5px;
              padding-bottom: 2px;
              input,.q-if-addon{
                font-size: 28px;
                color: #3f3f3f;
              }
              input{
                height: 22px;
                width: 135px;
              }
            }
            .payment-amount
            {
              font-size: 26px;
            }

          }
          .q-item-link:hover ~ .q-item-label
          {
            background-color: #000000;
          }
          .icon-ci-question:before {
             content: "\e900";
          }
          .icon-ci-notify:before {
            content: "\e901";
          }
          .icon-ci-history:before {
            content: "\e902";
          }
          .icon-ci-exit:before {
            content: "\e903";
          }
          .icon-ci-enter:before {
            content: "\e904";
          }
          .icon-ci-config:before {
            content: "\e905";
          }
          .icon-ci-chat:before {
            content: "\e906";
          }
          .icon-ci-action:before {
            content: "\e907";
          }
          .q-item-label
          {
            color: #3f3f3f;
            font-size: 16px;
            padding-left: 10px;
          }
          .q-item-main
          {
            flex: none;
          }
          .payment-details-toggle{
            position: absolute;
            right: 5px;
            .more{
              color: #ffffff;
              font-size: 1.5em;
            }
          }
          .payment-check{
            position: absolute;
            left: 5px;
            display: none;
            .check{
              color: #ffffff;
              font-size: 3em;
              font-weight: 600;
            }
          }
        }
      }

      .payment.checkedPayment{
        background-color: #efefef;
        padding-left: 45px;
        .payment-check{
          display: block;
        }
      }

      .payment.showedDetails
      {
        background-color: #f6f6f6;
      }
      .payment.tsg_payment{
        background-color: #f44336;
      }
      .payment.tsg_payment.checkedPayment{
        background-color: #ba000d;
        .payment-check{
          display: block;
        }
      }
    }
</style>