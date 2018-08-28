<template>
    <div class="payments-history-content content">
        <q-list class="need_to_pay" separator>
            <q-list-header class="block text-center text-primary full-width" >Отобразить платежи за период</q-list-header>
            <q-item class="payments-history-dates payment row justify-between items-center">
                <q-datetime class="payments-history-date"
                        :default-selection="defaultSelection"
                        type="date"
                        v-model="date1"
                        color="primary"
                        float-label="С"
                        placeholder="10.09.2017"
                            :month-names="month_names"
                            :day-names="day_names"
                            ok-label="Выбрать"
                            cancel-label="Отменить"
                            :no-clear="true"
                        :after="[{icon: 'expand_more',content: true,handler () {}}]"
                />
                <span class="delim text-center">-</span>
                <q-datetime class="payments-history-date"
                        :default-selection="defaultSelection"
                        type="date"
                        v-model="date2"
                        color="primary"
                        float-label="ПО"
                        placeholder="15.09.2017"
                            :month-names="month_names"
                            :day-names="day_names"
                            ok-label="Выбрать"
                            cancel-label="Отменить"
                            :no-clear="true"
                        :after="[{icon: 'expand_more',content: true,handler () {}}]"
                />
                <span class="delim"></span>
                <q-btn class="regular-button" color="secondary">ПОКАЗАТЬ</q-btn>
            </q-item>
            <q-item
                    v-for="(item, index) in paymentRecords"
                    v-bind:key="item.name"
                    class="payment-history-record row column payment"
                    @click="checkPaymentRecord(index)"
                    v-bind:class="isCheckedPaymentRecord[index] ? 'checkedPaymentRecord': ''"
            >
                <div class="payment-history-record__date text-left full-width">11.09.2017 14:10</div>
                <div class="payment-info-block">
                    <div class="payment-info payment-name">{{item.name}}</div>
                    <div class="payment-info payment-amount">{{item.total_amount}} RUB</div>
                </div>
                <div class="payment-mounth text-left full-width">Счёт за октябрь: {{item.amount}} RUB</div>
                <div class="payment-debt text-left full-width">Задолженность за предыдущий период: {{item.debt}} RUB</div>
                <div class="payment-fine text-left full-width">Пеня: {{item.fine}} RUB</div>
                <div class="flat-button">
                    <q-btn flat>ПЕРЕЙТИ К ЧЕКУ</q-btn>
                </div>
            </q-item>
        </q-list>
        <q-toolbar v-bind:class="{hidden: PaymentRecordControls}" class="footer-buttons" slot="footer">
            <div class="payment-record-controls">
                <q-btn class="cancel-action-button">ОТМЕНА</q-btn>
                <q-btn class="next-action-button">ОТПРАВИТЬ НА E-MAIL</q-btn>
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
        QToolbarTitle,
        date
    } from 'quasar'
    import * as Const from './pages/payments/common/constants'
    const today = new Date()
    const { startOfDate, addToDate, subtractFromDate } = date

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
        data () {
            return {
                date1: null,
                date2: null,
                today,
                defaultSelection: startOfDate(today, 'year'),
                isCheckedPaymentRecord: [false,false,false,false],
                isCheckedPayment: false,
                PaymentRecordControls: true,
                month_names: Const.MONTHNAMES,
                day_names: Const.DAYNAMES,
                paymentRecords: [
                    {name: 'ТСЖ', total_amount: '2500', amount: '2100', debt: '300', fine: '100', id:'1'},
                    {name: 'Вода', total_amount: '500', amount:'300', debt: '100', fine: '100', id:'2'},
                    {name: 'ТСЖ', total_amount: '2500', amount: '2100', debt: '300', fine: '100', id:'3'},
                    {name: 'Вода', total_amount: '500', amount:'300', debt: '100', fine: '100', id:'4'}
                ]
            }
        },
        methods:{
            checkPaymentRecord: function(index){
                let tmp = !this.isCheckedPaymentRecord[index];
                this.isCheckedPaymentRecord.splice(index, 1, tmp);
                for(let i = 0; i<this.isCheckedPaymentRecord.length;i++){
                    if(this.isCheckedPaymentRecord[i]==true){
                        this.PaymentRecordControls = false;
                        return
                    }
                }
                this.PaymentRecordControls = true;
            }
        }

    }

</script>

<style lang="less">
    .payments-history-content{
        background-color: white;
        .need_to_pay{
            .q-list-header{
                font-weight: 300;
                line-height: 28px;
                font-size: 18px;
            }
            .payments-history-dates{
                .payments-history-date {
                    width: 30%;
                    padding-bottom: 0;
                    margin: 0;
                    margin-bottom: 4px;
                    &:before {
                        color: #005662;
                    }
                    .q-if-label{
                        color: #005662;
                    }
                    i[slot='after'] {
                        display: none;
                    }
                    .q-if-control {
                        font-size: 20px;
                        padding-top: 15px;
                    }
                }
                .delim {
                    padding: 0 2%;
                }
            }
            .payment-history-record.payment{
                padding: 10px;
                margin-bottom: 0;
                .payment-info-block{
                    padding: 20px 0 0 0;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    .payment-info{
                        font-size: 20px;
                        padding-left: 0;

                    }
                }
                .flat-button{
                    margin-left: auto;
                }
            }
            .payment-history-record.payment.checkedPaymentRecord{
                background-color: #efefef;
                -webkit-box-shadow: inset 0px 0px 6px 0px rgba(0,0,0,0.14);
                -moz-box-shadow: inset 0px 0px 6px 0px rgba(0,0,0,0.14);
                box-shadow: inset 0px 0px 6px 0px rgba(0,0,0,0.14);
            }
        }
    }

</style>