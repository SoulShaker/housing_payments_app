<template>
    <div class="content payments-content">
        <div class="need_to_pay">
            <payment-widget
                    v-for="(item, index) in payments"
                    v-bind:invoice_id="item.invoice.id"
                    v-bind:index="index"
                    v-bind:name="item.invoice.invoiceType.name"
                    v-bind:type_id="item.invoice.invoiceType.id"
                    v-bind:key="item.invoice.id"
                    v-bind:amount="item.invoice.amount"
                    v-bind:total_amount="paymentDataItems[item.invoice.id]"
                    v-bind:debt="item.invoice.debt"
                    v-bind:fine="item.invoice.fine"
                    v-bind:createdDatetime="item.invoice.createdDatetime"
                    @amountChanged="onPaymentAmountChanged"
                    @onPaymentFocusEvent="displayTotal"
            ></payment-widget>
        </div>
        <div class="fixed info-block total-info-block" v-bind:class="{hidden: !isTotalDisplayed}">
            <div class="total">
                <div class="total-text">ИТОГО К ОПЛАТЕ <span>{{totalForPay}} RUB</span></div>
            </div>
        </div>
        <q-toolbar class="footer-buttons" slot="footer">
            <div class="payment-record-controls">
                <q-btn @click="onBackClick" class="cancel-action-button">НАЗАД</q-btn>
                <q-btn @click="onNextClick" class="next-action-button">ДАЛЕЕ</q-btn>
            </div>
        </q-toolbar>
    </div>
</template>

<script>
    import { QToolbar, QToolbarTitle, QBtn } from 'quasar'

    import PaymentWidget from '../components/Payment.vue'
    import * as Const from '../common/constants'

    export default {
    
        props: ['paymentOrder'],
    
        data () {
            return {
                payments: this.paymentOrder.paymentItems,
                paymentDataItems: {},
                isTotalDisplayed: true
            }
        },
        components: {
            PaymentWidget,
            QToolbar,
            QToolbarTitle,
            QBtn
        },
        methods: {
            onPaymentAmountChanged (value, invoiceId) {
                this.$set(this.paymentDataItems, invoiceId.toString(), value)
            },
            onBackClick () {
                this.$emit(Const.PREV_STEP_CLK_EVENT, Const.ENTER_PAYMENT_AMOUNT_STEP)
            },
            onNextClick () {
                this.$emit(Const.NEXT_STEP_CLK_EVENT, Const.ENTER_PAYMENT_AMOUNT_STEP, this.paymentDataItems)
            },
            displayTotal(value){
                this.isTotalDisplayed = value;
            }
        },
        computed: {
            totalForPay: function () {
                let total = 0
                Object.keys(this.paymentDataItems).forEach(key => {
                    total += this.paymentDataItems[key]
                })
                return total
            }
        },

        activated () {
            let cleanedData = {}

            this.payments.forEach(p => {
                cleanedData[p.invoice.id] = p.invoice.amount + p.invoice.fine + p.invoice.debt
            })

            Object.keys(this.paymentDataItems).forEach(key => {
                if (this.payments.find(p => p.invoice.id.toString() === key)) {
                    cleanedData[key] = this.paymentDataItems[key]
                }
            })
            this.paymentDataItems = cleanedData
        }
    }
</script>


<style lang="less">
    .payments-content .need_to_pay {
        padding-bottom: 250px;
        overflow-y: auto;
    }

    .image1
    {
        background-image: url(~assets/tsz.png);
    }

    .image2
    {
        background-image: url(~assets/water.png);
    }

    .image3
    {
        background-image: url(~assets/gas.png);
    }

    .image4
    {
        background-image: url(~assets/electr.png);
    }

    .image5
    {
        background-image: url(~assets/phone.png);
    }

    .image1,
    .image2,
    .image3,
    .image4,
    .image5
    {
        background-repeat: no-repeat;
        background-size: contain;
        width: 100%;
        background-position-x: 100%;
    }

    .q-collapsible .payment-extra-info
    {
        font-size: 20px;
        text-align: left;
        line-height: 1.35;
        color: #3f3f3f;
        padding-left: 25px;
    }
    .total-info-block{
        bottom: 60px;
        width: 100%;
        .total{
            width: 96%;
            margin: 0 auto;
            background-color: #ffffff;
            -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);
            -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);
            .total-text{
                padding: 36px 0;
                width: 320px;
                margin: 0 auto;
                font-family: "Roboto";
                font-weight: 300;
                font-size: 32px;
                color: #5a5a5a;
                text-align: center;
                span{
                    font-weight: 500;
                    color: #00838e;
                }
            }
        }
    }

</style>