<template>
    <div class="polls-content">
        <!-- <div class="poll">
            <div class="question-info" link v-for="modal in types" :key="modal" @click="$refs[modal.ref].open()">
                <p class="question">Нужна ли установка камер перед подъездом?</p>
                <i class="material-icons">info</i>
            </div>
            <q-field>
                <q-option-group type="checkbox" color="secondary" v-model="group" :options="[
              { label: 'Да, конечно', value: 'ofcourse'},
              { label: 'Нет', value: 'no'},
              { label: 'Лучше в самом подъезде', value: 'better'}
            ]" />
            </q-field>
            <div class="input-button">
                <q-input value="" stack-label="Ваш комментарий" />
                <q-btn>Отправить</q-btn>
            </div>
            <q-modal ref="basicModal" :content-css="{padding: '20px', maxWidth: '350px', maxHeight: '200px'}">
                <p id="text">Данный вопрос обсуждался ранеее на всех собраниях дома. Установка камер - залог нашей безопасности.</p>
                <p id="close-btn" @click="$refs.basicModal.close()">Закрыть</p>
            </q-modal>
        </div> -->
        <div class="poll" v-for="poll in polls" :key="poll.id">
            <div v-if="poll.completed">
                <completed-poll :poll="poll" />
            </div>
            <div v-else>
                <poll :poll="poll" @onCompleted="reload" />
            </div>
        </div>
    </div>
</template>


<script>
import {
    QBtn,
    Ripple,
    QInput,
    QCheckbox,
    QChip,
    QField,
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile
    // QOptionGroup,
    // QModal,
    // QModalLayout
} from 'quasar'

import AppConfig from '../../../config'

import Poll from './components/Poll'
import CompletedPoll from './components/CompletedPoll'

export default {
    components: {
        QBtn,
        QInput,
        Ripple,
        QCheckbox,
        QChip,
        QField,
        QList,
        QItem,
        QItemSide,
        QItemMain,
        QItemTile,
        // QOptionGroup,
        // QModal,
        // QModalLayout,
        Poll,
        CompletedPoll
    },
    data () {
        return {
            // group: ['upload'],
            // types: [
            //     {
            //         label: 'Basic',
            //         ref: 'basicModal'
            //     }],
            polls: []
        }
    },
    mounted () {
        this.reload()
    },
    methods: {
        reload () {
            let currentUser = this.$store.state.user
            console.log(currentUser)
            let url = AppConfig.POLLS_URL
                .replace('{tsg_id}', currentUser.userTsgMap[0].tsgId)
                .replace('{user_id}', currentUser.id)

            this.$http.get(url)
                .then(response => {
                    this.polls = response.data
                    console.log(this.polls)
                })
        }
    }

}
</script>

<style lang="less">
  .polls-content 
    .poll
      {
        background: #fff;
        margin: 10px;
        padding: 15px;
      }
      .question-info
      {
        display: flex;
      }
      .question-info .material-icons
      {
        margin-top: 5px;
        font-size: 40px;
        width: 10%;
        color: #adadad;
      }
        .question
        {
          text-transform: uppercase;
          font-size: 19px;
          font-family: Roboto;
          margin-top: 7px;
          font-weight: 400;
          width: 88%;
        }

        .poll .q-option-label
        {
          font-size: 20px;
          font-family: Roboto;
          font-weight: 300;
          width: 325px;
        }

        .poll .q-checkbox-unchecked
        {
          font-size: 28px;
          margin-right: 10px;
        }

        .poll .q-checkbox-checked
        {
          font-size: 28px;
          background: rgba(255, 255, 255, 0.5) !important;
        }

        .poll .q-field
        {
          margin-top: -5px;
        }

        .polls-content .q-btn
        {
          color: #fff;
          background: #00838e;
          height: 40px;
          width: 40%;
          font-size: 18px;
          font-family: Roboto Light;
          margin-top: 15px;
        }

        .input-button
        {
          display: flex;
        }

        .input-button .q-input
        {
          width: 70%;
          margin-right: 15px;
        }

        .input-button .q-if-label
        {
          text-transform: uppercase;
          color: #00838e;
        }

        .input-button .q-if:before
        {
          color: #00838e;
        }

        .poll .absolute-full, .fullscreen
        {
          background: rgba(0, 0, 0, 0.5);
        }

        #info-question
        {
          font-size: 23px;
          font-family: Roboto Light;
          text-align: justify;
        }

        #close-btn-question
        {
          text-transform: uppercase;
          color: #00838e;
          text-align: right;
          font-family: Roboto Light;
          font-size: 22px;
        }

</style>