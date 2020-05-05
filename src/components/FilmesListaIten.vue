<template>
    <li class="list-group-item">
        <span>{{ filme.titulo }} -- Ano: {{ filme.ano }}</span>
        <button @click="selecionar" class="btn btn-success float-right">Selecionar</button>
    </li>
</template>

<script>
import { eventBus } from './../main'

export default {
    props: {
        filme: {
        type: Object,
            required: true
        }
    },
    methods: {
        selecionar(event) {
            // this.$emit('selecionarFilme', this.filme)
            // eventBus.$emit('selecionarFilme', this.filme)
            console.log(event)
            eventBus.selecionarFilme(this.filme)
        }
    }
}

</script>

<style>

</style>