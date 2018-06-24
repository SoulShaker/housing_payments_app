<template>
  <div class="login-page">
    <!-- if you want automatic padding use "layout-padding" class -->
    <div class="layout-padding">
      <!-- <form id="frmLogin"> -->
        <!-- your content -->
        <q-input v-model="login" class="login-fld" placeholder="имя" />
        <q-input v-model="password" type="password" placeholder="пароль" />

        <q-btn loader @click="onLogin">
          Вход
        </q-btn>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
import { QInput, QBtn, Events } from 'quasar'
import AppConfig from '../config'


import router from '../router'

export default {
    components: {
        QInput,
        QBtn
    },
    data () {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        onLogin (event, done) {
            let data = {
                login: this.login.toLowerCase(),
                password: this.password
            }

            this.$http
                .post(AppConfig.USER_LOGIN_URL, data)
                .then(response => {
                    console.log('token: ', response.data)

                    if (response.data) {
                        console.log('response token: ', response.data)

                        localStorage.setItem('auth_token', response.data)
                        Events.$emit('onUserLogin')

                        router.push('/')
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            setTimeout(() => {
                done()
            }, 3000)
        }
    }
}
</script>

<style lang="less">
  .login-page {
    .login-fld input {
      text-transform: lowercase;
    }
  }

  .login-page .header-navigation .q-toolbar,
  .login-page .header-navigation .q-toolbar .q-tabs .q-tabs-head,
  .login-page .header-navigation .q-toolbar .q-btn-standard
  {
    background-color: #005662;
  }

  .login-page .layout-padding
  {
    box-shadow: 0 5px 15px rgba(0,0,0,0.25);
    padding: 30px 30px 30px 30px;
    margin: 35px 30px 0px 30px;
    background: #fff;
  }

  .login-page .layout-padding .q-if.row.no-wrap.items-center.relative-position.q-input.text-primary
  {
    margin-bottom: 30px;
    font-size: 18px;
  }

//  .login-page .row > .col
//   {
//     text-transform: lowercase;
//   }

  .login-page .q-if:after
  {
    color: #005662;
    width: 100%;
    height: 1px;
  }

  .login-page .q-btn-standard
  {
    width: 100%;
    background-color: #00838e;
    margin-top: 10px;
  }

  .login-page .q-btn-standard span
  {
    color: #fff;
    font-family: 'Roboto Light';
    min-height: 50px;
    text-align: center;
    font-size: 24px;

  }
</style>
