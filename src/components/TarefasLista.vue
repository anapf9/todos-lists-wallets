<template>
    <div>

        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right" 
                    @click="exibirFormularioCriarTarefa">
                        <i class="fa fa-plus mr-2"></i>
                        <span>Criar</span>
                </button>
            </div>
        </div>

        <h3 class="font-weight-light mt-4">A Fazer ({{ tarefasAFazer.length }})</h3>

        
        <ul class="list-group" v-if="tarefasAFazer.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasAFazer"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" />
        </ul>

        <p v-else>Nenhuma tarefa a fazer</p>
        
        <h3 class="font-weight-light mt-4">Concluidas ({{ totalDeTarefasConcluidas }})</h3>

        <ul class="list-group" v-if="tarefasConcluidas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" />
        </ul>

        <p v-else>Nenhuma tarefa foi concluida</p>

        <TarefaSalvar
            v-if="exibirFormulario"
            :tarefa="tarefaSelecionada" />

    </div>
</template>

<script>

import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            exibirFormulario: false,
            tarefaSelecionada: undefined,
        }
    },
    computed:{
        ...mapState(['tarefas']),
        ...mapGetters([
            'tarefasAFazer',
            'tarefasConcluidas', 
            'totalDeTarefasConcluidas']),
    },
    created() {
        /* this.$store.commit('listarTarefas', 
             // o primeiro argumento do metodo comit é o nome do metodo
             // o segundo argunento ẽ o payload
             // esse payload poderá ser recebido de um servidor ou de uma api, posso fazer uma função do axios q retorne o response.data
             // [
             //     { id: 1, titulo: 'Aprender Vue', concluido: true },
             //     { id: 2, titulo: 'Aprender Vue Router', concluido: true },
             //     { id: 3, titulo: 'Aprender Vuex', concluido: false }
             // ]
             // enviando como objeto temos a possibilidade de passar varias propriedades para dentro das mutations
             {
                 tarefas: [
                     { id: 1, titulo: 'Aprender Vue', concluido: true },
                     { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                     { id: 3, titulo: 'Aprender Vuex', concluido: false }
                 ]  
             }
        )*/
        //this.carregarTarefas({
        this.listarTarefas({
            tarefas: [
                { id: 1, titulo: 'Aprender Vue', concluido: true },
                { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                { id: 3, titulo: 'Aprender Vuex', concluido: false }
            ] 
        })
    },
    methods: {
        ...mapMutations(['listarTarefas']),
        /* ...mapMutations({
            carregarTarefas: 'listarTarefas',
            // a forma seguinte serve para caso se precise executar alguma logica antes de enviar o commit
            listarTarefas: (commit, payload, options) => {
                commit('listarTarefas', payload, options)
            }
        }),*/
        exibirFormularioCriarTarefa(event) {
            if (this.tarefaSelecionada) {
                this.tarefaSelecionada = undefined
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.exibirFormulario = true
            this.tarefaSelecionada = tarefa
        },
        resetar() {
            this.exibirFormulario = false
            this.tarefaSelecionada = undefined
        }
    }
}
</script>
