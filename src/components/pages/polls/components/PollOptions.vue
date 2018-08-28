<template>
  <div>
    <q-option-group type="checkbox" color="secondary" v-model="group" :options="options" @change="onChange" />
  </div>
</template>

<script>
import {
    QOptionGroup
} from 'quasar'

export default {
    components: {
        QOptionGroup
    },
    data () {
        return {
            options: {},
            group: []
        }
    },

    props: ['answers'],

    created () {
        this.options = this.answers.map(a => {
            return { label: a.answerText, value: a.id }
        })
    },

    methods: {
        onChange () {
            this.$emit('onChange', this.group)
        }
    }
}
</script>

<style>
</style>
