<template>
    <div class="special_offers-content">
    <q-search class="offers_search shadow-1" v-model="search" placeholder="Введите, что Вы ищете" :after="[{icon: 'mic',content: true,handler(){}}
  ]" />
      <q-list class="row offers">
        <q-item class="offer-block row column content-between items-center"
          link
          v-for="(offer,index) in offers"
          :key="offer.title"
          @click="changeModalState(index)"
          v-ripple.mat
        >
        <div class="offer-image-banner row justify-center items-center">
            <img :src="offer.image"/>
        </div>
        <div class="offer-description row">
            <div class="offer-description_text col-10">
                {{offer.title}}
            </div>
            <div class="offer-description_icon text-right col-2">
                <q-icon style="color: #c4c4c4" size="1.8em" name="info" />
            </div>
        </div>
            <q-modal v-model="modalState[index]">
                <div class="offer-details-top">
                    <div class="image"><img :src="offer.image"/></div>
                    <p class="title">{{offer.title}}</p>
                </div>
                <div class="offer-details-descr">
                    <p>{{offer.description}}</p>
                </div>
                <div class="offer-details-bottom">
                    <q-btn color="primary" @click="changeModalState(index)">Назад</q-btn>
                </div>
            </q-modal>
        </q-item>
      </q-list>
    </div>
</template>

<script>
import {
    Toast,
    Ripple,
    QBtn,
    QIcon,
    QModal,
    QModalLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QList,
    QItem,
    QItemSide,
    QItemMain
} from 'quasar'

import AppConfig from '../config'

export default {
    components: {
        QBtn,
        QIcon,
        QModal,
        QModalLayout,
        QToolbar,
        QToolbarTitle,
        QSearch,
        QList,
        QItem,
        QItemSide,
        QItemMain
    },
    directives: {
        Ripple
    },
    data () {
        return {
            search: '',
            offers: [],
            modalState: []
        }
    },
    methods: {
        changeModalState (index) {
            let tmp = !this.modalState[index]
            this.modalState.splice(index, 1, tmp)
        }
    },
    mounted () {
        this.$http.get(AppConfig.OFFERS_URL + '/' + this.$store.state.user.userTsgMap[0].tsgId)
            .then(response => {
                this.offers = response.data
                // console.log(this.offers);
            })
    }
}
</script>

<style lang="less">
    .special_offers-content{
        padding: 10px;
        font-size: 100%;
        background-color: #e1e2e1;
        .offers_search{
            background-color: #fafafa;
            margin-bottom: 10px;
            margin-top: 0;
            padding: 1.2em;
        }
        .offers{
            padding-left: 0px;
            .offer-block{
                width: 48%;
                background-color: #ffffff;
                margin-bottom: 10px;
                padding: 0px;
                @media (max-width: 360px){
                    width: 48%;
                }
                &:nth-child(odd){
                    margin-right: 4%;
                    @media (max-width: 360px){
                        margin-right: 10px;
                    }
                }
                .offer-image-banner{
                    width: 200px;
                    max-width: 200px;
                    height: 200px;
                    max-height: 200px;
                    flex-shrink: 0;
                    img{
                        max-width: 60%;
                        height: auto;
                    }
                }
                .offer-description{
                    background-color: #7f7f7f;
                    padding: 10px;
                    width: 100%;
                    min-height: 58px;
                    .offer-description_text{
                        color: #ffffff;
                        text-transform: uppercase;
                        font-size: 18px;
                        font-family: 'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    }
                    .q-btn{
                        background: #027be300 !important;
                        padding: 0px !important;
                        margin-top: 0px;
                        box-shadow: none;
                    }
                    .q-icon{
                        font-size: 2.0em;
                    }
                }
            }
        }
    }

    .offer-details-top
        {
            .image{
                width: 50%;
                margin-left: 25%;
                margin-top: 15px;
                    img{
                        width: 100%;
                    }
        }

            .title{
                width: 100%;
                padding-top: 5px;
                text-align: center;
                font-weight: 600;
                font-size: 26px;
            }
        }

        .offer-details-bottom{
            .q-btn{
                width: 50%;
                background-color: #00838e !important;
                border-radius: 0;
                min-height: 50px;
                font-size: 22px;
                margin: 5px 20px 10px 10px;
                float: right;
            }
        }

        .offer-details-descr
        {
            p{
                text-align: justify;
                font-size: 20px;
                padding: 5px 20px 0px 20px;
            }
        }

</style>