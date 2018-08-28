<template>
    <div v-bind:class="[isCheckedPayment ? 'checkedPayment' : '', isShowedDetails ? 'showedDetails':'' ]" 
        class="payment">

        <div v-bind:class="['image' + type_id]">
            
            <div class="payment-check"><i class="material-icons" id="check_circle">check_circle</i></div>
            
            <!-- <div class="payment-details-toggle"><i class="material-icons more">more_horiz</i></div> -->
            <div class="payment-info-block">
                <div class="payment-info payment-name">{{name}}</div>
                <q-input class="amount-input" :value="total_amount" @focus="displayTotal(false)" @blur="displayTotal(true)" @change="onUpdateAmount" suffix="RUB"/>
            </div>
            
            <q-collapsible @open="showDetails" @close="hideDetails" class="payment_details" label="ДЕТАЛИ ПЛАТЕЖА">
                <hr>
                <div class="payment-extra-info">
                    <div class="payment-mounth">Счёт за {{invoiceMonth}}: {{amount + ' RUB'}}</div>
                    <div class="payment-debt">Задолженность за предыдущий период: {{debt + ' RUB'}}</div>
                    <div class="payment-fine">Пеня: {{fine + ' RUB'}}</div>
                </div>
            </q-collapsible>

        </div>

    </div>
</template>

<script>
    import {QIcon, QListHeader, QList,
        QItem,
        QItemMain,
        QItemSide,
        QItemTile,
        QSideLink,
        QCollapsible,
        QInput,
        QToggle,
        QField,
        Events} from 'quasar'

    import moment from 'moment-with-locales-es6'

    export default{
        components: {
            QIcon,
            QListHeader,
            QSideLink,
            QList,
            QItem,
            QItemMain,
            QItemSide,
            QItemTile,
            QCollapsible,
            QInput,
            QToggle,
            QField
        },

        data: function () {
            return {
                isCheckedPayment: false,
                isShowedDetails: false
            }
        },
    
        props: ['name', 'type_id', 'total_amount', 'amount', 'debt', 'fine', 'extra_info', 'invoice_id', 'index', 'createdDatetime'],
    
        methods: {
            checkPayment: function (obj) {
                let target = obj.evt.target

                while (target.getAttribute('class').indexOf('payment') !== 0) {
                    if (target.getAttribute('class').indexOf('payment_details') !== -1) {
                        return
                    }
                    target = target.parentNode
                }
                this.isCheckedPayment = !this.isCheckedPayment
                this.$emit('checkedPaymentEvent', this.isCheckedPayment, this.index)
            },
            showDetails: function (event) {
                this.isShowedDetails = true
            },
            hideDetails: function (event) {
                this.isShowedDetails = false
            },
            onUpdateAmount: function (value) {
                var formattedValue = value.trim()
                this.$emit('amountChanged', Number(formattedValue), this.invoice_id)
            },
            displayTotal: function (value) {
                this.$emit('onPaymentFocusEvent', value)
            }
        },
        created () {
            moment.locale('ru')
            Events.$on('onResetPayments', () => {
                this.isCheckedPayment = false
            })
        },
        computed: {
            invoiceMonth: {
                get: function () {
                    return moment(moment(this.createdDatetime, 'MM-DD-YYYY')).format('MMMM')
                }
            }
        }

    }
</script>

<style>
    .q-item-link:hover 
    {
        background-color: rgba(189, 189, 189, 0);
    }

    .q-ripple-container
    {
        background-color: rgba(189, 189, 189, 0);
        display: none;
    }

    .checkedPayment ~ .payment-info-block
    {
        padding: 15px 10px 0px 60px;
    }

    .q-collapsible-sub-item {
    padding: 0px;
    }

    #check_circle
    {
        font-size: 60px;
        color: #aeaeae;
        padding: 15px 0px 10px 0px;
    }
</style>