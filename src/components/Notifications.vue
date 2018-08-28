<template>
    <div class=" notifications-content">
         <q-list>
             <div class="notifications">
                <q-item v-for="notification in notifications" :id="['notification-' + notification.id]" :key="notification.id">
                    <div class= "notification row column">
                        <div class="notification-header row justify-between">
                            <div class="notification-sender">{{notification.sender}}</div>
                            <div class="notification-date">{{new Date(notification.publicationDate).toLocaleDateString()}}</div> 
                        </div>
                        <div class="notification-content row justify-between">
                            <div v-if ="notification.priority == true" class = "notification-icon">
                                <q-icon name="error" />
                            </div>
                            <div v-else class = "notification-icon no-icon">
                                <q-icon name="error" />
                            </div>
                            <div class="notification-text col">{{notification.text}}</div>
                        </div>
                        <div class="notification-controls self-end row">
                            <div class="notify">
                                <q-btn @click="onNotify" flat>Напомнить</q-btn>
                            </div>
                            <div class="archive">
                                <q-btn  @click="onArchiveNotification(notification.id)" flat>Архивировать</q-btn>
                            </div>
                        </div>
                    </div>
                </q-item>
            </div>
        </q-list> 
    </div>
</template>

<script>
    import {
        QSearch,
        QField,
        QInput,
        QIcon,
        QList,
        QItem,
        QBtn
    } from 'quasar'

    import AppConfig from '../config'

    export default {
        components: {
            QSearch,
            QField,
            QInput,
            QIcon,
            QList,
            QItem,
            QBtn
        },
        data () {
            return {
                notifications: []
            }
        },
    
        mounted () {
            let currentUser = this.$store.state.user

            if (currentUser.userTsgMap && currentUser.userTsgMap.length > 0) {
                this.$http.get(AppConfig.NOTIFICATIONS_URL + '/' + currentUser.userTsgMap[0].tsgId + '/' + currentUser.id)
                    .then(response => {
                        this.notifications = response.data
                    })
            }
        },
        methods: {
            onArchiveNotification (value) {
                console.log(value)
                let currentUser = this.$store.state.user
                if (currentUser.userTsgMap[0].tsgId) {
                    document.getElementById('notification-' + value).style.display = 'none'
                    this.$http.post(AppConfig.NOTIFICATIONS_URL + '/archive/' + value + '/' + currentUser.id)
                }
            },
            onNotify(){
                this.$router.push('/in-progress')
            }
        }
    }
</script>

<style lang="less">
    .notifications-content{
        background-color: #ffffff;
        font-size: 100%;
        .q-list
        {
            padding: 0px;
        }
        .notifications{
            .q-item
                {
                    padding: 15px 15px;
                    min-height: 40px;
                    border-bottom: 1px solid #e1e2e1;
                }
            .notification{
                width: 100%;
                .notification-header{
                    margin-bottom: 0.5em;
                    .notification-sender,.notification-date{
                        color: #8d8d8d;
                        font-size: 1.2em;
                        font-family: 'Roboto';
                        font-weight: 300;
                    }
                }
                .notification-content{
                    margin-bottom: 0.5em;
                    .notification-icon{
                        width: 12%;
                        margin-right: 7%;
                        padding-top: 7px;
                        align-items: center;
                        display: flex;
                        height: auto;
                        .q-icon{
                            color: #982c2c;
                            font-size: 3em;
                        }
                    }
                    .notification-icon.no-icon{
                        display: none;
                    }
                    .notification-text{
                        color: #4c4c4c; 
                        font-size: 1.1em;
                        font-family: Roboto;
                        font-weight: 300;
                        line-height: 1.3;
                        text-align: justify;
                        padding-bottom: 10px;
                        padding-top: 10px;
                    }
                }
                .notification-controls{
                    .notify{
                        margin-right: 20px;
                    }
                    .notify .q-btn,.archive .q-btn{
                        font-weight: 400;
                        color: #005662;
                        min-height: auto;
                        padding: 0;
                        font-size: 1.1em;
                    }
                }

            }
        }
    }
</style>