export class PaymentInfo {
    constructor (invoice, amountToPay) {
        this.invoice = invoice
        this.amountToPay = amountToPay
    }
}

export class PaymentOrder {
    constructor () {
        // array of PaymentInfo objects
        this.paymentItems = []
        this.creditCardId = -1
    }
}
