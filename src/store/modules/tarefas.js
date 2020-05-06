import TarefasService from './../../services/axios'

export default {
    namespaced: true,
    state: {
        tarefas: []
    },
    getters: {
        tarefasConcluidas: (state) => state.tarefas.filter(t => t.concluido),
        tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),
        totalDeTarefasConcluidas: (state, getters) => getters.tarefasConcluidas.length,
        buscarTarefaPorId: state => id => state.tarefas.find(t => t.id === id),
        boasVindas: (state, getters, rootState, rootGetters ) => rootGetters.mensagemDeBoasVindas
    },
    mutations: {
        listarTarefas: (state, { tarefas }) => {
            state.tarefas = tarefas
        },
        criarTarefa: ( state, { tarefa } ) => {
            state.tarefas.push(tarefa)
        },
        editarTarefa: ( state, { tarefa }) => {
            const indice = state.tarefas.findIndex(t => t.id === tarefa.id)
            state.tarefas.splice( indice, 1, tarefa )
        },
        deletarTarefa: ( state, { tarefa }) => {
            const indice = state.tarefas.findIndex(t => t.id === tarefa.id)
            state.tarefas.splice( indice, 1)
        },
    },
    actions: {
       /*  buscarTarefas: (context, payload ) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        { id: 1, titulo: 'Aprender Vue', concluido: true },
                        { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                        { id: 3, titulo: 'Aprender Vuex', concluido: false }
                    ])
                }, 2000)
            })
        }, */
        //  payload vai ser buscado na api por meio do serviço
        listarTarefas: async ({ commit }) => {
            const response = await TarefasService.getTarefas()
            commit('listarTarefas', { tarefas: response.data })
        },
        criarTarefa: ({ commit }, { tarefa }) => {
            return TarefasService.postTarefa(tarefa)
                .then(response => {
                    commit('criasTarefa', { tarefa: response.data })
                })
        },
        editarTarefa: async ({ commit }, { tarefa }) => {
            const response = await TarefasService.putTarefa(tarefa)
            commit('editarTarefa'), { tarefas: response.data }
        },
        deletarTarefa: async ({ commit }, { tarefa }) => {
            const response = await TarefasService.deleteTarefa(tarefa.id)
            commit('deletarTarefa', { tarefa })
        }
    } 
}