/**
 * Steps
 */
export const CHECK_INVOICE_STEP = 'checkInvoice'
export const ENTER_PAYMENT_AMOUNT_STEP = 'enterPaymentAmount'
export const CHECK_CARD_STEP = 'checkCard'
export const PAYMENT_RESULT_STEP = 'paymentResult'
/**
 * Views
 */
export const INVOICES_VIEW = 'InvoicesView'
export const PAYMENTS_VIEW = 'PaymentsView'
export const CARDS_VIEW = 'CardsView'
export const PAYMENT_RESULT_VIEW = 'PaymentsResults'

/**
 * Events
 */

/**
 * Handler: fn ( currentStep, param )
 */
export const NEXT_STEP_CLK_EVENT = 'nextStepClick'

/**
 * Handler: fn (currentStep, param)
 */
export const PREV_STEP_CLK_EVENT = 'prevStepClick'

export const MONTHS = [{label: '01', value: 1}, {label: '02', value: 2}, {label: '03', value: 3},
    {label: '04', value: 4}, {label: '05', value: 5}, {label: '06', value: 6}, {label: '07', value: 7},
    {label: '08', value: 8}, {label: '09', value: 9}, {label: '10', value: 10},
    {label: '11', value: 11}, {label: '12', value: 12}]

export const YEARS = [{label: '2015', value: 2015}, {label: '2016', value: 2016}, {label: '2017', value: 2017}, {label: '2018', value: 2018}]

export const MONTHNAMES = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
export const DAYNAMES = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

export const SETTINGS = [{id: 0, header: 'E-mail', text: 'почта для уведомлений и чеков'},
    {id: 2, header: 'Номер телефона', text: 'номер мобильного телефона для уведомлений'},
    {id: 1, header: 'Имя пользователя', text: 'имя, которое будет отображаться в чате жильцов'},
    {id: 3, header: 'Адрес', text: 'адрес, который будет использоваться в данном ТСЖ'}]