<template>
    <div class="content invoices-content">
        <div class="need_to_pay">
            <invoice-widget
                    v-for="(item, index) in invoices"
                    v-bind:id="item.id"
                    v-bind:index="index"
                    v-bind:name="item.invoiceType.name"
                    v-bind:type_id="item.invoiceType.id"
                    v-bind:key="item.id"
                    v-bind:amount="item.amount"
                    v-bind:total_amount="item.debt + item.fine + item.amount "
                    v-bind:debt="item.debt"
                    v-bind:fine="item.fine"
                    v-bind:createdDatetime="item.createdDatetime"
                    v-bind:personAccount = "item.personAccount"
                    v-bind:edit="false"
                    @checkedPaymentEvent="onCheckedPayment"
            ></invoice-widget>
        </div>
        <q-toolbar v-bind:class="{hidden: PaymentControls}" class="footer-buttons" slot="footer">
            <div class="payment-record-controls">
                <q-btn @click="resetInvoices" class="cancel-action-button">ОТМЕНА</q-btn>
                <q-btn @click="onNextClick" class="next-action-button">ДАЛЕЕ</q-btn>
            </div>
        </q-toolbar>
    </div>
</template>

<script>
    import { Events, QToolbar, QToolbarTitle, QBtn } from 'quasar'
    
    import InvoiceWidget from '../components/Invoice.vue'
    import AppConfig from 'config'
    import * as Const from '../common/constants'

    export default {
        data () {
            return {
                invoices: [],
                checkedState: [],
                PaymentControls: true
            }
        },

        components: {
            InvoiceWidget,
            QToolbar,
            QToolbarTitle,
            QBtn
        },

        created () {
            Events.$on('onUserReloaded', () => {
                this.reloadInvoices()
            })
        },

        mounted () {
            this.reloadInvoices()
        },
        activated () {
            this.resetInvoices()
        },
        methods: {
            onCheckedPayment (value, index) {
                this.checkedState.splice(index, 1, value)
                for (let i = 0; i < this.checkedState.length; i++) {
                    if (this.checkedState[i] === true) {
                        this.PaymentControls = false
                        return
                    }
                }
                this.PaymentControls = true
            },
    
            resetInvoices () {
                Events.$emit('onResetPayments')
                this.PaymentControls = true
                for (let i = 0; i < this.checkedState.length; i++) {
                    this.checkedState[i] = false
                }
            },

            onNextClick () {
                let invoicesToPay = []
                for (let i = 0; i < this.invoices.length; i++) {
                    if (this.checkedState[i] === true) {
                        invoicesToPay.push(this.invoices[i])
                    }
                }
                this.$emit(Const.NEXT_STEP_CLK_EVENT, Const.CHECK_INVOICE_STEP, invoicesToPay)
            },
    
            reloadInvoices () {
                if (this.$store.state.user.id == null) {
                    console.log('user.id undefined')
                }
                else {
                    if (this.$store.state.user.userTsgMap && this.$store.state.user.userTsgMap.length > 0) {
                        this.$http.post(AppConfig.ACCOUNTS_URL, this.$store.state.user.userTsgMap[0].personAccounts)
                            .then(response => {
                                console.log(response)

                                this.invoices = response.data

                                for (let i = 0; i < this.invoices.length; i++) {
                                    this.checkedState.push(false)
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                    else {
                        console.log('user have no flats')
                    }
                }
            }
        }
    }
</script>


<style lang="less">
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
        background-image: url(~assets/electr.png);  
    }

    .image4
    {
        background-image: url(~assets/phone.png);  
    }

    .image5
    {
        background-image: url(~assets/gas.png);  
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

</style>