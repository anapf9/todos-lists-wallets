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
                @editar="selecionarTarefaParaEdicao" 
                @concluir="concluirTarefa({tarefa: $event})" 
                @deletar="confirmarRemocaoDaTarefa" 
                />
        </ul>

        <p v-else>Nenhuma tarefa a fazer</p>
        
        <h3 class="font-weight-light mt-4">Concluidas ({{ totalDeTarefasConcluidas }})</h3>

        <ul class="list-group" v-if="tarefasConcluidas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" 
                @concluir="concluirTarefa({tarefa: $event})" 
                @deletar="confirmarRemocaoDaTarefa" 
                />
        </ul>

        <p v-else>Nenhuma tarefa foi concluida</p>

        <TarefaSalvar
            v-if="exibirFormulario" 
            @salvar="salvarTarefa"
        />
        <div class="alert alert-danger" v-if="erro"> {{ erro.message }} </div>

    </div>
</template>

<script>
import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions, mapState } = createNamespacedHelpers('tarefas')

export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            exibirFormulario: false,
        }
    },
    computed:{
        ...mapState(['erro', 'tarefaSelecionada']),
        ...mapGetters([
            'tarefasAFazer',
            'tarefasConcluidas', 
            'totalDeTarefasConcluidas',
            'boasVindas'
            ]),
    },
    created() {
        // register(this.$store)
        this.listarTarefas()
    },
    methods: {
        ...mapActions([
            'concluirTarefa', // this.concluirTarefa( tarefa: {})
            'criarTarefa',
            'editarTarefa',
            'listarTarefas',
            'deletarTarefa',
            'selecionarTarefa',
            'resetarTarefaSelecionada'
        ]),
        confirmarRemocaoDaTarefa (tarefa) {
            const confirmar = window.confirm(`Deseja deletar a tarefa "${tarefa.titulo}"?`)
            if (confirmar) {
                this.deletarTarefa({ tarefa })
            }
        },
        exibirFormularioCriarTarefa(event) {
            if (this.tarefaSelecionada) {
                this.resetarTarefaSelecionada()
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.exibirFormulario = true
            this.selecionarTarefa({ tarefa })
        },
        resetar() {
            this.exibirFormulario = false
            this.resetarTarefaSelecionada()
        },
        async salvarTarefa (event) {
            switch (event.operacao) {
                case 'criar':
                    await this.criarTarefa({ tarefa: event.tarefa })
                    break;""
                case 'editar':
                    await this.editarTarefa({ tarefa: event.tarefa })
            }
            this.resetar()
        }
    }
}
</script>
