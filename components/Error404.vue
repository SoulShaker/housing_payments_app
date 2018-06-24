<template>
  <div class="error-page window-height window-width bg-light column items-center no-wrap justify-center">
    <!--<div class="error-code bg-primary flex items-center justify-center">
      404
    </div>-->
    <div>
      <div class="error-card shadow-4 bg-white column items-center justify-center no-wrap">
        <q-icon name="error_outline" color="grey-5" />
        <p class="caption text-center">{{message}}</p>
        <p class="text-center group full-width">
          <q-btn
            v-if="canGoBack"
            color="primary"
            push
            @click="goBack"
          >
            Вернуться
          </q-btn>
          <q-btn
            color="primary"
            push
            @click="$router.replace('/')"
          >
            К оплатам
          </q-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { QBtn, QIcon } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon
  },
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
    props: ['message'],
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="less">
.error-page{
  .error-code {
    height: 50vh;
    width: 100%;
    padding-top: 15vh;
    font-size: 30vmax;
    color: rgba(255, 255, 255, .2);
    overflow: hidden;
  }
  .error-card {
    border-radius: 2px;
      margin-top: -50px;
    width: 80vw;
    max-width: 600px;
    padding: 25px 0 0 0;
    > i{
      font-size: 5rem;
    }
      .q-btn{
        padding: 0 10px;
        margin: 0;
        border-radius: 0;
        min-height: 50px;
        width: 40%;
        font-size: 16px;
        font-family: Roboto;
        font-weight: 300;
        border-bottom: 0;
        .on-left{
          margin-right: 2px;
        }
        .on-right{
          margin-left: 2px;
        }
      }

  }
  }
</style>
