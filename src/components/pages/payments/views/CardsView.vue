<template>
    <div class="cards-content">
        <div class="card-payment-type-choose">Выберите способ оплаты</div>
        <div class="cards row items-center">
            <card v-for="(item, index) in cards"
                  v-bind:number="item.number"
                  v-bind:id="item.id"
                  v-bind:state="item.state"
                  v-bind:firstName="item.firstName"
                  v-bind:lastName="item.lastName"
                  v-bind:mm="item.month"
                  v-bind:yy="item.year"
                  v-bind:cvv="item.cvv"
                  @checkedCardEvent="onCheckedCard"
                  @deleteCardEvent="onDeleteCard"
                  @editCardEvent="onEditCard"
                  :key="item.id"></card>
        </div>
        <div class="cards-controls">
            <q-btn @click="$refs.cardAddModal.open()" flat class="card-add row"><q-icon name="fa-plus-circle" class="add-card-icon" /> Добавить новую карту</q-btn>
        </div>
        <q-toolbar class="footer-buttons" slot="footer">
            <div class="payment-record-controls">
                <q-btn @click="onBackClick" class="cancel-action-button">НАЗАД</q-btn>
                <q-btn v-bind:class="checkedCardId == -1 ? 'disabled': ''" v-bind:disabled="checkedCardId == -1 ? true: false" @click="$refs.messageModal.open()" class="next-action-button">ДАЛЕЕ</q-btn>
            </div>
        </q-toolbar>
        <q-modal minimized v-model="openPaymentModal" ref="messageModal">
            <div class="modal-body">
                <div class="modal-text">
                    <div>Сумма к оплате: <span>{{paymentOrder.totalToPay}} RUB.</span> Карта **** {{getCardDigits()}}.<br></div>
                        <ul>
                            <li v-for="payment in payments"><span>{{payment['invoice']['invoiceType']['name']}}</span><span>{{payment['amountToPay']}}RUB</span></li>
                        </ul>
                    Подтвердить оплату?
                </div>
                <div class="modal-controls self-end row">
                    <q-btn flat @click="closeModal('messageModal')" label="Отмена" >Отмена</q-btn>
                    <q-btn flat  @click="onNextClick" label="Оплатить" >Оплатить</q-btn>
                </div>
            </div>

        </q-modal>
        <q-modal minimized v-model="openDeleteCardModal" ref="deleteCardModal">
            <div class="modal-body">
                <div class="modal-text">
                    Вы уверенны, что хотите удалить, выбранную карту?
                </div>
                <div class="modal-controls self-end row">
                    <q-btn flat @click="closeModal('deleteCardModal')" label="Отмена" >НЕТ</q-btn>
                    <q-btn flat  @click="deleteCard()" label="Оплатить" >ДА</q-btn>
                </div>
            </div>

        </q-modal>
        <q-modal maximized v-model="openAddCardModal" class="cardModal addCardModal" ref="cardAddModal">
            <div class="modal-body">
                <div class="card-block row column no-wrap">
                    <div class="card-header row items-center">
                        <div class="chip"><img src="statics/chip1.png" alt=""></div>
                        <div class="remote"><img src="statics/chip2.png" alt=""></div>
                        <div class="card-logo">
                            <q-icon name="lens"/>
                            <q-icon name="lens"/>
                        </div>
                    </div>
                    <div class="card-info-block row column items-center no-wrap">
                        <div class="row card-info-row justify-start">
                            <q-input type="text" :attributes="{id:'credtCard'}" color="secondary" v-model="newCardInfo.cardNumber" stack-label="Номер карты"/>
                            <!--<input type="text" v-mask="'#### #### #### ####'" v-model="newCardInfo.cardNumber" id="credtCard2" class="col q-input-target text-left">-->
                        </div>
                        <div class="row card-info-row justify-start items-end">
                            <div class="label">Действует до</div>
                            <q-select color="secondary" stack-label="месяц" v-model="newCardInfo.month" :options="months"/>
                            <span class="delim">/</span>
                            <!-- <q-select color="secondary" stack-label="год" v-model="newCardInfo.year" :options="years"/> -->

                            <q-input type="text" stack-label="год" v-model="newCardInfo.year" style="width:40px;" />

                        </div>
                        <div class="row card-info-row justify-start">
                            <q-input color="secondary" v-model="newCardInfo.owner" stack-label="Фамилия и имя"/>
                        </div>
                    </div>
                </div>
                <div class="card-block side row column">
                    <div class="card-header">
                        <div class="card-string"></div>
                    </div>
                    <div class="card-info-block row">
                        <div class="row card-info-row justify-start items-end">
                            <div class="signature"><img src="statics/card-credit.jpg" alt=""></div>
                            <q-input type="password" max-length="3" color="secondary" v-model="newCardInfo.cvv" stack-label="CVV код"/>
                        </div>
                    </div>
                </div>
                <div class="modal-controls self-end row">
                    <q-btn flat @click="closeModal('cardAddModal')" label="Отмена" >Отмена</q-btn>
                    <q-btn flat  @click="addCard()" label="Оплатить" >Сохранить</q-btn>
                </div>
            </div>
        </q-modal>
    </div>
</template>


<script>
    import {
        QSearch,
        QField,
        QInput,
        QIcon,
        QList,
        QItem,
        QSelect,
        QBtn,
        QModal,
        QModalLayout,
        QToolbar,
        QToolbarTitle
    } from 'quasar'

    import 'inputmask/dist/inputmask/inputmask.numeric.extensions'
import Inputmask from 'inputmask/dist/inputmask/inputmask'
import Card from '../components/Card.vue'
    import AppConfig from 'config'
    import * as Const from './../common/constants'
    export default {
        components: {
            QSearch,
            QField,
            QInput,
            QSelect,
            QIcon,
            QList,
            QItem,
            QBtn,
            Card,
            QModal,
            QModalLayout,
            QToolbar,
            QToolbarTitle
        },

        data () {
            return {
                cards: [],
                checkedCardId: -1,
                cardIdtoDelete: -1,
                openPaymentModal: false,
                openAddCardModal: false,
                openDeleteCardModal: false,
                newCardInfo: {cardNumber: '', month: '', year: '', owner: '', cvv: ''},
                payments: this.paymentOrder.paymentItems,
                months: Const.MONTHS,
                years: Const.YEARS
            }
        },
        props: ['paymentOrder'],
        mounted () {
            this.getUserCards()
            var im = new Inputmask('9999 9999 9999 9999')
            im.mask(document.getElementById('credtCard'))
        },
        activated () {
            this.checkedCardId = -1
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i]['state'] = false
            }
        },
        methods: {
            onCheckedCard (id) {
                console.log(id)
                for (let i = 0; i < this.cards.length; i++) {
                    if (this.cards[i]['id'] == this.checkedCardId) {
                        this.cards[i]['state'] = false
                    }
                }
                if (id == this.checkedCardId) {
                    this.checkedCardId = -1
                }
                else {
                    this.checkedCardId = id
                    for (let i = 0; i < this.cards.length; i++) {
                        if (this.cards[i]['id'] == this.checkedCardId) {
                            this.cards[i]['state'] = true
                        }
                    }
                }
            },
            onDeleteCard (id) {
                this.$refs.deleteCardModal.open()
                this.cardIdtoDelete = id
            },
            onEditCard (card) {
                console.log(JSON.stringify(card))
                this.$http
                    .post(AppConfig.USER_ADD_PAYCARD_URL, card)
                    .then(response => {
                        console.log(response)
                        this.getUserCards()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            deleteCard () {
                console.log(this.cardIdtoDelete)
                this.$http
                    .delete(AppConfig.USER_REMOVE_PAYCARD_URL + '/' + this.cardIdtoDelete)
                    .then(response => {
                        console.log(response)
                        this.getUserCards()
                    })
                    .catch(error => {
                        console.log(error)
                    })
    
                this.closeModal('deleteCardModal')
            },
            getCardDigits () {
                if (this.checkedCardId != -1) {
                    var id = this.checkedCardId
                    let card = this.cards.filter(obj => {
                        return obj.id === id
                    })
                    // let number = this.cards[this.checkedCardId - 1].number
                    return card[0]['number'].substring(card[0]['number'].length - 4)
                }
                else {
                    return '****'
                }
            },
            onBackClick () {
                this.$emit(Const.PREV_STEP_CLK_EVENT, Const.CHECK_CARD_STEP)
            },
            onNextClick () {
                this.closeModal('messageModal')
                this.$emit(Const.NEXT_STEP_CLK_EVENT, Const.CHECK_CARD_STEP)
            },
            closeModal (ref) {
                this.$refs[ref].close()
                this.$nextTick(() => {
                    this.$refs[ref].toggleInProgress = false
                })
            },
            addCard () {
                var names = this.newCardInfo.owner.split(' ')
                var card = {
                    cvv: this.newCardInfo.cvv,
                    firstName: names[0],
                    lastName: names[1],
                    number: this.newCardInfo.cardNumber,
                    state: false,
                    userId: this.$store.state.user.id,
                    // id: this.cards.length + 1,
                    month: this.newCardInfo.month,
                    year: this.newCardInfo.year
                }
                this.$http
                    .post(AppConfig.USER_ADD_PAYCARD_URL, card)
                    .then(response => {
                        console.log(response)
                        this.getUserCards()
                    })
                    .catch(error => {
                        console.log(error)
                    })

                console.log(JSON.stringify(card))
                this.closeModal('cardAddModal')
            },
            getUserCards () {
                this.$http.get(AppConfig.USER_PAYCARD_URL + '/' + this.$store.state.user.id)
                    .then(response => {
                        this.cards = response.data
                        this.cards.sort(function (a, b) {
                            return a.id - b.id
                        })
                        for (let i = 0; i < this.cards.length; i++) {
                            this.$set(this.cards[i], 'state', false)
                            // this.$set(this.cards[i], 'month', 12)
                            // this.$set(this.cards[i], 'year', 2017)
                        }
                        console.log(this.cards)
                    })
            }
        }
    }
</script>

<style lang="less">
    .cards-content{
        background-color: #ffffff;
        font-size: 100%;
        .card-payment-type-choose{
            color: #3f3f3f;
            font-size: 18px;
            font-family: 'Roboto';
            font-weight: 600;
            padding: 12px;
            line-height: 1;
            text-align: center;
        }
        .cards{
            padding: 0;
            border: none;
            background: #e1e2e1;
        }
        .cards-controls{
            padding: 18px 16px;
            .card-add{
                text-align: right;
                font-weight: 300;
                color: #005662;
                min-height: auto;
                padding: 0;
            }
            .add-card-icon{
                margin-right: 12px;
            }
        }

    }
    .modal-body{
        font-family: 'Roboto';
        font-weight: 300;
        font-size: 20px;
        line-height: 1.5;
        color: #4c4c4c;
        padding: 15px;
        .modal-text{
            text-align: justify;
            margin-bottom: 15px;
            ul{
                list-style: none;
                padding: 0;
                width: 100%;
                li{
                    border-bottom: 2px dotted #ccc;
                    line-height: 12px;
                    text-align: right;
                    clear: both;
                    margin: 0.5em 0 0 0;
                    span{
                        display: inline-block;
                        border: 2px solid #fff;
                        padding: 0;
                        margin: 0 0 -2px 0;
                        &:first-child{
                            float: left;
                            color: #4c4c4c;
                        }
                    }
                }

            }
            span{
                color: #00838e;
            }
        }

        .modal-controls{
            width: 100%;
            justify-content: flex-end;
            .q-btn{
                font-weight: 300;
                color: #005662;
                min-height: auto;
                padding: 0;
                &:first-child{
                    margin-right: 20px;
                }
                span{
                    font-size: 22px;
                }
            }
        }
    }
    .cardModal{

        .modal-body{
            background-color: #e1e2e1;

            .card-block{
                border-radius: 30px;
                background-color: #ffffff;
                padding: 20px;
                height: 281px;
                margin-bottom: 20px;
                .q-if:before{
                    color: #005662;
                }
                .card-header{
                    .chip{
                        margin-right: 15px;
                        width: 45px;
                        img{
                            max-width: 100%;
                            height: auto;
                        }
                    }
                    .remote{
                        width: 25px;
                        img{
                            max-width: 100%;
                            height: auto;
                        }
                    }

                    .card-logo{
                        margin-left: auto;
                        .q-icon:first-child{
                            color: #888888;
                            margin-left: 0;
                        }
                        .q-icon{
                            color: #6a6a6a;
                            font-size: 48px;
                            margin-left: -30px;
                        }
                    }
                    .card-string{
                        background-color: #6a6a6a;
                        height: 60px;
                        margin: 0 -20px;
                    }
                }
                .card-info-block{
                    .card-info-row{
                        width: 260px;
                        margin-bottom: 20px;
                        .q-input{
                            width: 90%;
                            padding-bottom: 4px;
                            margin: 0;
                            .q-if-inner{
                                padding-top: 22px;
                                .q-if-label{
                                    font-size: 20px;
                                    color: #484848;
                                    overflow: visible;
                                }
                                input[type="password"]{
                                    font-size: 28px;
                                    color: #b4b4b4;
                                }
                            }

                        }
                        .label{
                            font-size: 16px;
                            margin-right: 10px;
                        }
                        .delim{
                            margin: 0 8px;
                        }
                        .q-select{
                            width: 60px;
                            margin: 0;
                            padding-bottom: 4px;
                            .q-if-control{
                                position: absolute;
                                right: 0;
                                bottom: 0;
                            }
                            .q-if-label{
                                top: 20px;
                                color: #005662;
                            }
                            .q-input-target{
                                padding-top: 4px;
                            }
                        }

                    }
                    .signature{
                        width: 70%;
                        height: 32px;
                        margin-right: 10px;
                        img{
                            max-width: 100%;
                            height: 32px;
                        }
                    }
                }
            }
            .card-block.side{
                .card-header{
                    margin: 50px 0 40px 0;
                }
                .card-info-block{
                    .card-info-row{
                        width: 100%;
                        .q-input{
                            width: 20%;
                            .q-if-inner{
                                position: relative;

                            }
                            .q-if-control{
                                font-size: 18px;
                                position: absolute;
                                right: 0;
                                top: 50%;
                            }
                        }
                    }
                }
            }
        }

    }
    .cardModal.editCardModal{
        .modal-body{
            padding: 0;
            background-color: #ffffff;
            .card-block{
                border-radius: 0;
                height: auto;
                margin-bottom: 0;
                padding-bottom: 0;
                .card-header{
                    font-size: 18px;
                    color: #00838e;
                    margin-bottom: 20px;
                }
            }
            .modal-controls{
                padding: 20px;
                .q-btn{
                    span{
                        font-size: 18px;
                    }
                }
            }
        }
    }
    .q-popover{
        .q-item-label{
            color: #000000;
        }

    }
</style>