import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        contador: 0,
        tarefas: []
    },
    // getters servem para realizarmos funções rapidas que poderam ser reutilizadas por todaa a aplicação
    // funcionam como as compiuted propreties dos components, pois fazem um cache do resultadp retornado.
    // o getter sera reexecutado quando a propriedade tarefas for alterada, como as computed propreties
    getters: {
        // forma completa
        // tarefasConcluidas: (state) => {
        //     return state.tarefas.filter(t => t.concluido)
        // },
        tarefasConcluidas: state => state.tarefas.filter(t => t.concluido),
        tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),
        totalDeTarefasConcluidas: (state, getters) => getters.tarefasConcluidas.length,
        // uma função dentro de outra função é uma closure
        // forma completa
        // buscarTarefaPorId: (state, getters) => {
        //     return (id) => {
        //         return state.tarefas.find(t => t.id === id)
        //     }
        // }
        buscarTarefaPorId: state => id => state.tarefas.find(t => t.id === id)
    },
    mutations: {
        // forma mais completa
        // listarTarefas: (state, payload) => {
        //     state.tarefas = payload.tarefas
        // }
        // capturando as tarefas via desestruturação
        listarTarefas: (state, { tarefas }) => {
            state.tarefas = tarefas
        }
    },
    actions: {
        // dentro de uma action pode-se receber 2 parametros
        // o primeiro argumento recebe todas a propriedades e metodos que podemos acessar dentro de uma instancia do vuex.store
        // o segundo argumento (payload) que pode ser passado pra dentro da action
        // forma completa
        /* listarTarefas: (context, payload) => {
            context.commit('listarTarefas', payload)
        }*/ 
        // exemplo de chamada assincrona
        listarTarefas: ({ commit }, payload) => {
            setTimeout(() => {
                commit('listarTarefas', payload)
                // commit('setarErro', error)
            }, 2000)
        }
    }
})