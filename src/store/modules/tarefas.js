import TarefasService from './../../services/axios'

export default {
    namespaced: true,
    state: {
        tarefas: [],
        tarefaSelecionada: undefined,
        erro: undefined
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
        selecionarTarefa: ( state, { tarefa }) => {
            state.tarefaSelecionada = tarefa
        },
        setarErro: (state, { erro }) => {
            state.erro = erro
        }
    },
    actions: {
        // usamos o dispatch para a action disparar outra action
        concluirTarefa: async ({ dispatch }, payload ) => {
            // Usamos o object.assing para criar uma nova referencia de memoria pois a tarefa recebida no payload tem como referencia o state do modulo de tarefas
            // para fazer a alteraçãp necessária precisaremos de uma nova referencia
            const tarefa = Object.assign({}, payload.tarefa)
            // essa forma para se fazer alterações sem causar mutações no state fora das mutations
            tarefa.concluido = !tarefa.concluido
            dispatch('editarTarefa', { tarefa })
            console.log('tarefa', tarefa)
        },
        criarTarefa: ({ commit }, { tarefa }) => {
            return TarefasService.postTarefa(tarefa)
                .then(response => commit('criarTarefa', { tarefa: response.data }))
                .catch(erro => commit('setarErro', { erro }))
        },
        editarTarefa: async ({ commit }, { tarefa }) => {
            const response = await TarefasService.putTarefa(tarefa)
            console.log('response', response)
            commit('editarTarefa'), { tarefa: response.data }
        },
        deletarTarefa: async ({ commit }, { tarefa }) => {
            const response = await TarefasService.deleteTarefa(tarefa.id)
            commit('deletarTarefa', { tarefa })
        },
        //  payload vai ser buscado na api por meio do serviço
        listarTarefas: async ({ commit }) => {
            try {
                const response = await TarefasService.getTarefas()
                commit('listarTarefas', { tarefas: response.data })
            } catch(erro) {
                commit('setarErro', { erro })
            }
        },
        selecionarTarefa: ( { commit }, payload ) => {
            commit('selecionarTarefa', payload)
        },
        resetarTarefaSelecionada: ({ commit }) => {
            commit('selecionarTarefa', { tarefa: undefined})
        }
    } 
}