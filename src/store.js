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
        listarTarefas: state => {
            state.tarefas = [
                { id: 1, titulo: 'Aprender Vue', concluido: true },
                { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                { id: 3, titulo: 'Aprender Vuex', concluido: false }
            ]
        }
    }
})