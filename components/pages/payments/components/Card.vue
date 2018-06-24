<template>
    <div class="card-wrapper full-width" v-bind:class="{checkedCard: isCheckedCard}" @click="cardChecked">
        <div class="card row column" >
            <div class="card-content row items-center" >
                <q-icon name="fa-cc-visa" class="big-icon card-icon" />
                <div class="card-number"><div class="card-number-header">номер карты</div>{{formatCardNumber(cardNumber)}}</div>
                <div class="card-val"><div class="card-val-header">срок действия</div>{{month}}/{{year}}</div>
                <div class="card-controls row no-wrap">
                    <div class="edit">
                        <q-btn @click="$refs.openEditCardModal.open()" flat icon="edit"></q-btn>
                    </div>
                    <div class="delete">
                        <q-btn @click="deleteCard()" flat icon="delete"></q-btn>
                    </div>
                </div>
                <div class="cardCheck"><i id="check_circle" class="material-icons">check_circle</i></div>
            </div>
        </div>
        <q-modal minimized v-model="openEditCardModal" class="cardModal editCardModal" ref="openEditCardModal">
            <div class="modal-body">
                <div class="card-block row column no-wrap">
                    <div class="card-header row items-center">
                        ИЗМЕНЕНИЕ ДАННЫХ КАРТЫ
                    </div>
                    <div class="card-info-block row column items-center no-wrap">
                        <div class="row card-info-row justify-start">
                            <q-input type="text" :attributes="{class:'credtCard'}" color="secondary" v-model="cardNumber" stack-label="Номер карты"/>
                        </div>
                        <div class="row card-info-row justify-start items-end">
                            <div class="label">Действует до</div>
                            <q-select color="secondary" stack-label="месяц" v-model="month" :options="months"/>
                            <span class="delim">/</span>
                            <!-- q-select color="secondary" stack-label="год" v-model="year" :options="years"/ -->
                            <q-input type="text" stack-label="год" v-model="year" style="width:40px;" />
                        </div>
                        <div class="row card-info-row justify-start items-end">
                            <q-input color="secondary" v-model="cardOwner" stack-label="Фамилия и имя"/>
                        </div>
                        <div class="row card-info-row justify-start items-end">
                            <q-input type="password" max-length="3" color="secondary" v-model="cvvCode" stack-label="CVV код"/>
                        </div>
                    </div>
                </div>
                <div class="modal-controls self-end row">
                    <q-btn flat @click="closeEditCardModal()" label="Отмена" >Отмена</q-btn>
                    <q-btn flat  @click="editCard()" label="Оплатить" >Сохранить</q-btn>
                </div>
            </div>
        </q-modal>
    </div>
</template>

<script>
    import {
        QField,
        QInput,
        QIcon,
        QBtn,
        QList,
        QItem,
        QSelect,
        QModal,
        QModalLayout
    } from 'quasar'

    import AppConfig from 'config'
    import * as Const from './../common/constants'
    import 'inputmask/dist/inputmask/inputmask.numeric.extensions'
import Inputmask from 'inputmask/dist/inputmask/inputmask'
export default {
        components: {
            QField,
            QInput,
            QIcon,
            QBtn,
            QList,
            QItem,
            QSelect,
            QModal,
            QModalLayout
        },

        data () {
            return {
                isCheckedCard: this.cardState,
                openEditCardModal: false,
                months: Const.MONTHS,
                years: Const.YEARS,
                cardNumber: this.number,
                month: this.mm,
                year: this.yy,
                cardOwner: this.firstName + ' ' + this.lastName,
                cvvCode: this.cvv
            }
        },
        props: ['number', 'id', 'state', 'firstName', 'lastName', 'cvv', 'mm', 'yy'],
        mounted () {
            var im = new Inputmask('9999 9999 9999 9999')
            var elems = document.getElementsByClassName('credtCard')
            for (let i = 0; i < elems.length; i++) {
                im.mask(elems[i])
            }
        },
        methods: {
            formatCardNumber: function (cardNumber) {
                var numbers = cardNumber.split(' ')
                var res = ''
                res = res + numbers[0][0] + Array(4).join('\u2022') + ' ' + Array(5).join('\u2022') + ' ' + Array(5).join('\u2022') + ' '
                res = res + numbers[3]
                return res
            },
            cardChecked: function (obj) {
                let target = obj.target

                while (target.getAttribute('class').indexOf('card ') !== 0) {
                    if ((target.getAttribute('class').indexOf('edit') !== -1) || (target.getAttribute('class').indexOf('delete') !== -1)) {
                        return
                    }
                    target = target.parentNode
                }
                this.isCheckedCard = !this.isCheckedCard
                this.$emit('checkedCardEvent', this.id)
            },
            closeModal () {
                this.$refs.openEditCardModal.close()
                this.$nextTick(() => {
                    this.$refs.openEditCardModal.toggleInProgress = false
                })
            },
            closeEditCardModal () {
                this.$refs.openEditCardModal.close()
                this.$nextTick(() => {
                    this.$refs.openEditCardModal.toggleInProgress = false
                })
            },
            editCard () {
                var card = {
                    cvv: this.cvvCode,
                    firstName: this.cardOwner.split(' ')[0],
                    lastName: this.cardOwner.split(' ')[1],
                    number: this.cardNumber,
                    userId: this.$store.state.user.id,
                    id: this.id,
                    month: this.month,
                    year: this.year
                }
                // console.log(JSON.stringify(card))
                this.$refs.openEditCardModal.close()
                this.$nextTick(() => {
                    this.$refs.openEditCardModal.toggleInProgress = false
                })
                this.$emit('editCardEvent', card)
            },
            deleteCard () {
                this.$emit('deleteCardEvent', this.id)
            }
        },
        watch: {
            state: function () {
                this.isCheckedCard = this.state
            }
        }
    }
</script>

<style lang="less">
            .card-wrapper{
                //border-top: 1px solid #e1e2e1;
                margin-top: 10px;
                background: #ffffff;
                &:last-child{
                    //border-bottom: 1px solid #e1e2e1;
                    margin-bottom: 10px;
                }
                padding: 10px 16px;
                .card{
                    width: 100%;
                    position: relative;
                    .card-content{
                        .card-icon{
                            margin-right: 1%;
                            .q-icon{
                                color: #982c2c;
                                font-size: 2.2em;
                            }
                        }
                        .card-number,.card-val{
                            color: #4c4c4c;
                            font-size: 20px;
                            font-family: 'Roboto';
                            font-weight: 300;
                            text-align: justify;
                            padding-left: 5px;
                            position: relative;
                            @media screen and (max-width: 398px){
                                font-size: 18px;
                            }
                            .card-number-header,.card-val-header{
                                position: absolute;
                                top: -15px;
                                color: #3f3f3f;
                                font-size: 12px;
                                font-family: 'Roboto';
                                font-weight: 300;
                            }

                        }
                        .card-val{
                            width: 90px;
                        }
                        .card-number{
                            width: 180px;
                            @media screen and (max-width: 398px){
                                width: 150px;
                            }
                        }
                    }
                    .card-controls{
                        button{
                            padding: 0;
                            i{
                                @media screen and (max-width: 398px){
                                    font-size: 20px;
                                }
                            }
                        }
                        .notify{
                            margin-right: 1.5em;
                        }
                        .notify .q-btn,.archive .q-btn{
                            font-weight: 300;
                            color: #005662;
                            min-height: auto;
                            padding: 0;
                        }
                    }
                    .cardCheck{
                        display: none;
                        right: 10%;
                        #check_circle{
                            padding: 0;
                            font-size: 36px;
                        }
                    }
                }
            }
            .card-wrapper.checkedCard{
                background-color: #efefef;
                .card-controls{
                    display: none;
                }
                .cardCheck{
                    display: block;
                }
            }
</style>