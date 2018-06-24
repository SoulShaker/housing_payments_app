<template>
    <div v-bind:class="[isCheckedPayment ? 'checkedPayment' : '',isShowedDetails ? 'showedDetails':'' ]" 
        @click="checkPayment"
        class="payment">

        <div v-bind:class="['image' + type_id]">
            
            <div class="payment-check"><i class="material-icons" id="check_circle">check_circle</i></div>
            
            <!-- <div class="payment-details-toggle"><i class="material-icons more">more_horiz</i></div> -->
            <div class="payment-info-block">
                <div class="payment-info payment-name">{{name}}</div>
                <div class="payment-info payment-amount">{{totalAmount + ' RUB'}}</div>
            </div>
            
            <q-collapsible @open="showDetails" @close="hideDetails" class="payment_details" label="ДЕТАЛИ ПЛАТЕЖА">
                <hr>
                <div class="payment-extra-info">
                    <div class="payment-mounth">Счёт за {{invoiceMonth}}: {{amount + ' RUB'}}</div>
                    <div class="payment-debt">Задолженность за предыдущий период: {{debt + ' RUB'}}</div>
                    <div class="payment-fine">Пеня: {{fine + ' RUB'}}</div>
                    <div class="payment-info">Л.счет: {{personAccount}}</div>
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
        TouchHold,
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
                isShowedDetails: false,
                i: this.index,
                totalAmount: this.total_amount
            }
        },

        directives: {
            TouchHold
        },
    
        props: ['name', 'type_id', 'total_amount', 'amount', 'debt', 'fine', 'extra_info', 'id', 'index', 'createdDatetime', 'personAccount'],
    
        methods: {
    
            checkPayment: function (obj) {
                let target = obj.target

                while (target.getAttribute('class').indexOf('payment') !== 0) {
                    if (target.getAttribute('class').indexOf('payment_details') !== -1) {
                        return
                    }
                    target = target.parentNode
                }
                this.isCheckedPayment = !this.isCheckedPayment
                this.$emit('checkedPaymentEvent', this.isCheckedPayment, this.i)
            },

            showDetails: function (event) {
                this.isShowedDetails = true
            },

            hideDetails: function (event) {
                this.isShowedDetails = false
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
                    return moment(moment(this.createdDatetime, 'YYYY-MM-DD')).format('MMMM')
                }
            }
        }

    }
</script>

<style type="less">
    .payment {
        padding-left: 45px;
    }
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