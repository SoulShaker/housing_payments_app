<template>
    <div class="content">
        <div class="settings">
            <setting v-for="(item, index) in settings"
                  v-bind:header="item.header"
                  v-bind:text="item.text"
                     v-bind:id=item.id
                     v-bind:index=index
                  :key="item.header"></setting>
        </div>

    </div>
</template>

<script>
    import {
        Events,
        QLayout,
        QTabs,
        QRouteTab,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QSideLink,
        QToolbar,
        QToolbarTitle,
        QModal,
        QModalLayout,
        QInput
    } from 'quasar'
    import * as Const from './pages/payments/common/constants'
    import Setting from './pages/payments/components/Setting.vue'
    export default {
        components: {
            QLayout,
            QBtn,
            QTabs,
            QRouteTab,
            QIcon,
            QList,
            QListHeader,
            QItem,
            QItemSide,
            QItemMain,
            QSideLink,
            QToolbar,
            QToolbarTitle,
            QModal,
            QModalLayout,
            QInput,
            Setting
        },
        data () {
            return {
                settings: Const.SETTINGS,
            }
        },
    }
</script>

<style lang="less">

</style>