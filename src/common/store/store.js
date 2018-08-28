import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export class Tsg {
    constructor (data) {
        if (data) {
            this.id = data.id
            this.name = data.name
            this.address = data.address
        }
    }
}

export class PersonAccount {
    constructor (data) {
        if (data) {
            this.account = data.account
            this.invoiceType = data.invoiceType
        }
    }
}

export class UserTsg {
    constructor (data) {
        if (data) {
            this.id = data.id
            this.tsgId = data.tsgId
            this.name = data.name
            this.address = data.address
            this.flatNumber = data.flatNumber

            if (data.personAccounts) {
                this.personAccounts = data.personAccounts.map(pa => new PersonAccount(pa))
            }
        }
    }
}

export class User {
    constructor (data) {
        if (data) {
            this.id = data.id
            this.login = data.login
            this.firstName = data.firstName
            this.lastName = data.lastName
            this.role = data.role
            this.phoneNumber = data.phoneNumber
            this.email = data.email
            this.userTsgMap = []
            if (data.userTsgMap && data.userTsgMap.length > 0) {
                data.userTsgMap.forEach(utm => {
                    this.userTsgMap.push(new UserTsg(utm))
                })
            }
        }
    }

    get fullName () {
        return this.firstName && this.lastName ? `${this.firstName} ${this.lastName}` : 'Гость'
    }
}

export const store = new Vuex.Store({
    state: {
        user: new User()
    },
    mutations: {
        setUser (state, u) {
            state.user = new User(u)
        },
        setUserEmail (state, email) {
            state.user.email = email
        },
        setUserPhoneNumber (state, phone) {
            state.user.phoneNumber = phone
        },
        setUserFirstName (state, firstName) {
            state.user.firstName = firstName
        },
        setUserLastName (state, lastName) {
            state.user.lastName = lastName
        },
        resetUser (state) {
            state.user = new User()
        }
    }
})
