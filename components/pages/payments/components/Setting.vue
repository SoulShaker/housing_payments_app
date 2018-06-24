<template>
    <div class="setting-wrapper" @click="$refs.layoutModal.open()">
        <div class="setting row column items-start">
            <div v-if="id==0" class="settings-section-header">Личные данные</div>
            <div class="setting-header">{{header}}</div>
            <div class="setting-text">{{text}}</div>
        </div>
        <q-modal ref="layoutModal" @open="openedEditSettingModal">
            <q-modal-layout
                    content-class="editSetting-content"
                    footer-class="bg-primary some-class"
            >
                <q-toolbar slot="header" class="editSettingModal">
                    <q-btn icon="arrow_back" class="backButton" @click="closeModal()"></q-btn>
                    <div class="setting-header">{{header}}</div>
                    <q-btn icon="check" v-if="id!=3" class="okButton" style="margin-left: auto;" @click="saveSetting()"></q-btn>
                </q-toolbar>
                <q-input v-if="id==0" color="secondary" v-model="editSetting" type="email"/>
                <q-input v-else-if="id==1" color="secondary" v-model="editSetting" type="tel"/>
                <q-input v-else-if="id==3" color="secondary" v-model="editSetting" readonly/>
                <q-input v-else color="secondary" v-model="editSetting"/>
            </q-modal-layout>
        </q-modal>
    </div>
</template>

<script>
    import {
        QField,
        QInput,
        QIcon,
        QBtn,
        QList,
        QItem,
        QSelect,
        QModal,
        QToolbar,
        QToolbarTitle,
        QModalLayout
    } from 'quasar'

    import AppConfig from '../../../../config'
    import 'inputmask/dist/inputmask/inputmask.numeric.extensions'
    import Inputmask from 'inputmask/dist/inputmask/inputmask'
    export default {
        components: {
            QField,
            QInput,
            QIcon,
            QBtn,
            QList,
            QItem,
            QSelect,
            QToolbar,
            QToolbarTitle,
            QModal,
            QModalLayout
        },

        data () {
            return {
                editSetting: ''
            }
        },
        props: ['header', 'text', 'index', 'id'],
        methods: {
            closeModal () {
                this.$refs.layoutModal.close()
                this.$nextTick(() => {
                    this.$refs.layoutModal.toggleInProgress = false
                })
            },
            saveSetting () {
                switch (this.id) {
                    case 0: {
                        this.$store.commit('setUserEmail', this.editSetting)

                        let data = {
                            email: this.$store.state.user.email
                        }

                        this.$http
                            .post(AppConfig.USER_SAVE_EMAIL_URL + '/' + this.$store.state.user.id, data)
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        break
                    }
                    case 1: {
                        var name = this.editSetting.split(' ');
                        if(name.length==1){
                            this.$store.commit('setUserEmail', this.editSetting.split(' ')[0])
                        }else{
                            this.$store.commit('setUserFirstName', this.editSetting.split(' ')[0])
                            this.$store.commit('setUserLastName', this.editSetting.split(' ')[1])
                        }

                        let data = {
                            firstName: this.$store.state.user.firstName,
                            lastName: this.$store.state.user.lastName
                        }

                        this.$http
                            .post(AppConfig.USER_SAVE_NAME_URL + '/' + this.$store.state.user.id, data)
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        break
                    }
                    case 2: {
                        this.$store.commit('setUserPhoneNumber', this.editSetting)

                        let data = {
                            phoneNumber: this.$store.state.user.phoneNumber
                        }

                        this.$http
                            .post(AppConfig.USER_SAVE_PHONENUMBER_URL + '/' + this.$store.state.user.id, data)
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        break
                    }
                    case 3: {
                        this.$store.state.user.userTsgMap[0].address = this.editSetting
                        break
                    }
                }
                this.closeModal()
            },
            openedEditSettingModal(){
                switch(this.id){
                    case 0:{
                        this.editSetting = this.$store.state.user.email;
                        break;
                    }
                    case 1:{
                        this.editSetting = this.$store.state.user.fullName;
                        break;
                    }
                    case 2:{
                        this.editSetting = this.$store.state.user.phoneNumber;
                        break;
                    }
                    case 3:{
                        this.editSetting = this.$store.state.user.userTsgMap[0].address;
                        break;
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    .setting-wrapper{
        border-top: 1px solid #e1e2e1;
        background: #ffffff;
        &:last-child{
            border-bottom: 1px solid #e1e2e1;
        }
        padding: 15px 40px;
        .setting{
            width: 100%;
            position: relative;
            .settings-section-header{
                color: #005662;
                font-size: 12px;
                font-family: 'Roboto';
                font-weight: 500;
                margin-bottom: 10px;
            }
            .setting-header{
                color: #3f3f3f;
                font-size: 16px;
                font-family: 'Roboto';
                font-weight: 300;
            }
            .setting-text{
                color: #3f3f3f;
                font-size: 14px;
                font-family: 'Roboto';
                font-weight: 300;
            }
        }
    }
    .editSettingModal{
        .q-btn{
            box-shadow: none;
        }

    }
    .editSetting-content{
        .q-input{
            width: 90%;
            padding-bottom: 4px;
            margin: 0 auto;
            .q-if-inner{
                padding-top: 22px;
                .q-if-label{
                    font-size: 20px;
                    color: #484848;
                    overflow: visible;
                }
                input[type="password"]{
                    font-size: 28px;
                    color: #b4b4b4;
                }
            }

        }
    }


</style>