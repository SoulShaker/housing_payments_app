<template>
    <div>
        <div class="question-info" link v-for="modal in types" :key="modal" @click="$refs[modal.ref].open()">
            <p class="question">{{poll.questionText}}</p>
            <i class="material-icons">info</i>
        </div>
        <q-field>
            <poll-options :answers="poll.answers" @onChange="onSelectedAnswerChanged" />
        </q-field>
        <div class="input-button">
            <q-input v-model="customAnswer" type="text" value="" stack-label="Ваш комментарий" />
            <q-btn @click="onClick">Отправить</q-btn>
        </div>

        <!-- <q-modal ref="basicModal" :content-css="{padding: '20px', maxWidth: '350px', maxHeight: '200px'}">
            <p id="info-question">Данный вопрос обсуждался ранеее на всех собраниях дома. Установка камер - залог нашей безопасности.</p>
            <p id="close-btn-question" @click="$refs.basicModal.close()">Закрыть</p>
        </q-modal> -->

    </div>
</template>


<script>

import {
    QBtn,
    QInput,
    QCheckbox,
    QField,
    QModal,
    QModalLayout
} from 'quasar'

import AppConfig from 'config'
import PollOptions from './PollOptions'

var qs = require('qs')

export default {
    components: {
        QBtn,
        QInput,
        QCheckbox,
        QField,
        QModal,
        QModalLayout,
        PollOptions
    },
    data () {
        return {
            types: [
                {
                    label: 'Basic',
                    ref: 'basicModal'
                }],

            selectedAnswerId: -1,
            customAnswer: ''

        }
    },
    props: ['poll'],

    methods: {
        onClick () {
            if (this.customAnswer !== '') {
                let url = AppConfig.POLL_COMPLETE_CUSTOM
                let payload = {
                    user_id: this.$store.state.user.id,
                    poll_id: this.poll.id,
                    answer_text: this.customAnswer
                }

                this.$http.post(url, qs.stringify(payload))
                    .then(response => {
                        this.$emit('onCompleted')
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            else {
                let url = AppConfig.POLL_COMPLETE_TEMPLATE
                let payload = {
                    user_id: this.$store.state.user.id,
                    poll_id: this.poll.id,
                    answer_id: this.selectedAnswerId
                }

                if (this.selectedAnswerId !== -1) {
                    this.$http.post(url, qs.stringify(payload))
                        .then(response => {
                            this.$emit('onCompleted')
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            }
        },
        onSelectedAnswerChanged (group) {
            this.selectedAnswerId = group[0]
        }
    }

}
</script>

<style>
</style>
