<template>
    <div class="">
        <keep-alive>
            <component @changeViewEvent="changeView" 
                @nextStepClick="onNextStepClick" 
                @prevStepClick="onPrevStepClick" 
                :paymentOrder="this.paymentOrder" 
                :is="this.currentView">
            </component>
        </keep-alive>
    </div>
</template>


<script>
    import InvoicesView from './views/InvoicesView.vue'
    import PaymentsView from './views/PaymentsView.vue'
    import CardsView from './views/CardsView.vue'
    import PaymentsResults from './views/PaymentsResults.vue'

    import { PaymentOrder, PaymentInfo } from './common/payments'
    import * as Const from './common/constants'

    export default{
        data () {
            return {
                currentView: Const.INVOICES_VIEW,
                paymentOrder: new PaymentOrder()
            }
        },
        methods: {
            onNextStepClick (currentStep, param) {
                if (currentStep === Const.CHECK_INVOICE_STEP) {
                    let invoicesToPayment = param

                    if (this.paymentOrder.paymentItems.length > 0) {
                        // remove unchecked invoices
                        let toRemove = this.paymentOrder.paymentItems.filter(pi => !invoicesToPayment.find(inv => inv.id === pi.invoice.id))
                        toRemove.forEach(inv => {
                            this.paymentOrder.paymentItems.splice(this.paymentOrder.paymentItems.indexOf(inv), 1)
                        })

                        // add new
                        let newInvoices = invoicesToPayment.filter(inv => !this.paymentOrder.paymentItems.find(pi => pi.invoice.id === inv.id))
                        newInvoices.forEach(inv => {
                            this.paymentOrder.paymentItems.push(new PaymentInfo(inv, inv.amount))
                        })
                    }
                    else {
                        this.paymentOrder.paymentItems = invoicesToPayment.map(inv => new PaymentInfo(inv, inv.amount))
                    }
    
                    this.changeView(Const.PAYMENTS_VIEW)
                }
                else if (currentStep === Const.ENTER_PAYMENT_AMOUNT_STEP) {
                    let paymentDataItems = param
                    let totalToPay = 0;
                    Object.keys(paymentDataItems).forEach(key => {
                        let pi = this.paymentOrder.paymentItems.find(pi => pi.invoice.id.toString() === key)

                        if (pi) {
                            pi.amountToPay = paymentDataItems[key];
                            totalToPay = totalToPay + paymentDataItems[key];
                        }

                    })
                    this.$set(this.paymentOrder, 'totalToPay', totalToPay)
                    this.changeView(Const.CARDS_VIEW)
                }else if(currentStep === Const.CHECK_CARD_STEP){
                    for (let i = 0; i < this.paymentOrder.paymentItems.length; i++) {
                        var val = Math.random();
                        console.log(val);
                        if(val > .7){
                            this.paymentOrder.paymentItems[i].paymentStatus = 'success';
                        }else{
                            this.paymentOrder.paymentItems[i].paymentStatus = 'error';
                        }
                        console.log(this.paymentOrder.paymentItems[i].paymentStatus);
                    }
                    this.changeView(Const.PAYMENT_RESULT_VIEW)
                }else if(currentStep === Const.PAYMENT_RESULT_STEP){
                    this.changeView(Const.INVOICES_VIEW)
                }
            },

            onPrevStepClick (currentStep, param) {
                if (currentStep === Const.CHECK_INVOICE_STEP) {
                }
                else if (currentStep === Const.ENTER_PAYMENT_AMOUNT_STEP) {
                    this.changeView(Const.INVOICES_VIEW)
                }
                else if (currentStep === Const.CHECK_CARD_STEP) {
                    this.changeView(Const.PAYMENTS_VIEW)
                }
                else if (currentStep === Const.PAYMENT_RESULT_STEP) {
                    this.$router.push('payments_history');
                }
            },
    
            changeView (value) {
                this.currentView = value
            }
        },
        components: {
            InvoicesView,
            PaymentsView,
            CardsView,
            PaymentsResults
        }
    }
</script>