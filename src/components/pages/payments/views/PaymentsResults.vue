<template>
    <div class="content payments-results-content">
        <q-list>
            <q-item v-for="paymentResult in paymentResults"
                    v-bind:key="paymentResult.invoice.invoiceType.name"
                    class="payment-result-wrapper shadow-3 row column" v-bind:class="paymentStatusClass(paymentResult)">
                <div class="payment-history-record__date text-left full-width">{{today}}</div>
                <div class="payment-result row no-wrap full-width">
                    <div class="payment-status-icon row ">
                        <q-icon v-if="paymentResult.paymentStatus === 'success'" name="done" class="done"/>
                        <q-icon  name="close" class="close" v-else/>
                        <q-icon name="panorama fish eye" class="circle"/>
                    </div>
                    <div class="payment-info row column justify-start">
                        <div class="payment-info-block row justify-between">
                            <div class="payment-name">Оплата услуг {{paymentResult['invoice']['invoiceType']['name']}}</div>
                            <div class="payment-amount">{{paymentResult['amountToPay']}} RUB</div>
                        </div>
                        <div class="payment-info-block row justify-between">
                            <div class="status" v-if="paymentResult.paymentStatus === 'success'">завершено успешно</div>
                            <div class="status" v-else>недостаточно средств</div>
                            <div class="flat-button print">
                                <q-btn flat>ПЕРЕЙТИ К ЧЕКУ</q-btn>
                            </div>
                        </div>
                    </div>
                </div>



            </q-item>
        </q-list>
        <q-toolbar class="footer-buttons" slot="footer">
            <div class="payment-record-controls">
                <q-btn @click="onBackClick" class="cancel-action-button">ИСТОРИЯ ПЛАТЕЖЕЙ</q-btn>
                <q-btn @click="onNextClick" class="next-action-button">ВЕРНУТЬСЯ К ПЛАТЕЖАМ</q-btn>
            </div>
        </q-toolbar>
    </div>
</template>

<script>
    import {
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QDatetime,
        QField,
        QToolbar,
        QToolbarTitle
    } from 'quasar'
    import moment from 'moment/moment';
    import * as Const from '../common/constants';
    export default {
        components: {
            QBtn,
            QIcon,
            QList,
            QListHeader,
            QItem,
            QItemSide,
            QItemMain,
            QDatetime,
            QField,
            QToolbar,
            QToolbarTitle
        },
        data() {
            return {
                paymentResults: this.paymentOrder.paymentItems
            }
        },
        created(){
            this.today = moment().format("MM.DD.YYYY HH:mm");
        },
        methods:{
            paymentStatusClass(paymentResult){
                if(paymentResult.paymentStatus === 'success'){
                    return  'success';
                }
                else{
                    return  'error';
                }
            },
            onBackClick () {
                this.$emit(Const.PREV_STEP_CLK_EVENT, Const.PAYMENT_RESULT_STEP)
            },
            onNextClick () {
                this.$emit(Const.NEXT_STEP_CLK_EVENT, Const.PAYMENT_RESULT_STEP)
            }
        },
        props: ['paymentOrder'],
    }
</script>

<style lang="less">
    .payments-results-content{
        padding: 7px;
        .q-list{
            padding: 0;
            .payment-result-wrapper{
                padding: 10px;
                color: #3f3f3f;
                font-family: 'Roboto';
                font-weight: 300;
                font-size: 12px;
                background-color: #ffffff;
                margin-bottom: 7px;
                .payment-history-record__date{
                    margin-bottom: 10px;
                }
                .payment-result{
                    .payment-status-icon{
                        position: relative;
                        height: 48px;
                        margin-right: 10px;
                        .done{
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            font-size: 32px;
                            color: #005662;
                            font-weight: 600;
                        }
                        .close{
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            font-size: 28px;
                            color: #8e0030;
                            font-weight: 600;
                        }
                        .circle{
                            color: #005662;
                            font-size: 48px;
                        }
                    }
                    .payment-info{
                        flex-grow: 2;
                        .payment-info-block{
                            font-size: 16px;
                            &:first-child{
                                margin-bottom: 10px;
                            }
                        }
                        .status{
                            color: #005662;
                        }
                    }
                }
            }
            .payment-result-wrapper.error{
                background-color: #ffeeee;
                .payment-result {
                    .payment-status-icon {

                        .circle {
                            color: #8e0030;
                        }
                    }
                }
                .payment-info{
                    .status, .print span {
                        color: #620027;
                    }
                }
            }
        }
        .footer-buttons.q-toolbar{
            padding-bottom: 7px;
            .payment-record-controls{
                .q-btn{
                    color: #ffffff;
                    font-size: 12px;
                }
                .cancel-action-button{
                    background-color: #00838e;
                }
            }
        }
    }



</style>