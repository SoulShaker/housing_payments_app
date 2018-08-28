let baseUrl = 'http://localhost:9090'

let UserServiceUrl = ''
let PollsNotificationsServiceUrl = ''
let ECommerceServiceUrl = ''
let AccountsServiceUrl = ''

if (DEV) {
    let envType = 'localhost'

    switch (envType) {
    case 'localhost':
        UserServiceUrl = 'http://localhost:9090/rs'
        PollsNotificationsServiceUrl = 'http://localhost:9091/rs'
        ECommerceServiceUrl = 'http://localhost:9093/rs'
        AccountsServiceUrl = 'http://localhost:9094/rs'
        break

    case 'remote_with_port':
        UserServiceUrl = baseUrl + ':9090' + '/rs'
        AccountsServiceUrl = baseUrl + ':9094' + '/rs'
        ECommerceServiceUrl = baseUrl + ':9093/rs'
        break

    case 'remote':
        UserServiceUrl = baseUrl + '/rs/user'
        PollsNotificationsServiceUrl = baseUrl + '/rs/pn'
        ECommerceServiceUrl = baseUrl + '/rs/ec'
        AccountsServiceUrl = baseUrl + '/rs/accounts'
        break

    default:
    }
}

if (PROD) {
    UserServiceUrl = baseUrl + '/rs/user'
    PollsNotificationsServiceUrl = baseUrl + '/rs/pn'
    ECommerceServiceUrl = baseUrl + '/rs/ec'
    AccountsServiceUrl = baseUrl + '/rs/accounts'
}

var AppConfig = {
    // user management
    USER_URL: UserServiceUrl + '/user',
    USER_LOGIN_URL: UserServiceUrl + '/login',
    USER_LOGOUT_URL: UserServiceUrl + '/logout',
    USER_SAVE_EMAIL_URL: UserServiceUrl + '/user/email',
    USER_SAVE_PHONENUMBER_URL: UserServiceUrl + '/user/phone_number',
    USER_SAVE_NAME_URL: UserServiceUrl + '/user/name',
    USER_SAVE_ADDRESS_URL: UserServiceUrl + '/user/address',

    // params: 0: {user_id}
    USER_PAYCARD_URL: UserServiceUrl + '/user/pcards',
    USER_ADD_PAYCARD_URL: UserServiceUrl + '/user/pcards/save',
    USER_REMOVE_PAYCARD_URL: UserServiceUrl + '/user/pcards/remove',

    // polls and notifications
    NOTIFICATIONS_URL: PollsNotificationsServiceUrl + '/notifications',

    // Polls
    POLLS_URL: PollsNotificationsServiceUrl + '/polls/{tsg_id}/{user_id}',
    POLL_COMPLETE_TEMPLATE: PollsNotificationsServiceUrl + '/polls/complete/template',
    POLL_COMPLETE_CUSTOM: PollsNotificationsServiceUrl + '/polls/complete/custom',

    // E-commerce
    OFFERS_URL: ECommerceServiceUrl + '/offers',

    // Accounts
    ACCOUNTS_URL: AccountsServiceUrl + '/invoices'
}

export default AppConfig
