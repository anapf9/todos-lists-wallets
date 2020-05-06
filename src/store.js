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
        buscarTarefas: (context, payload ) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        { id: 1, titulo: 'Aprender Vue', concluido: true },
                        { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                        { id: 3, titulo: 'Aprender Vuex', concluido: false }
                    ])
                }, 2000)
            })
        },
        // dentro de uma action pode-se receber 2 parametros
        // o primeiro argumento recebe todas a propriedades e metodos que podemos acessar dentro de uma instancia do vuex.store
        // o segundo argumento (payload) que pode ser passado pra dentro da action
        // forma completa
        /* listarTarefas: (context, payload) => {
            context.commit('listarTarefas', payload)
        }*/ 
        // exemplo de chamada assincrona
        listarTarefas: async ({ commit, dispatch }, payload) => {
            console.log('Action: listarTarefas')
            // usando async await: awai retorna uma promise e quando usando o await estamos falando para ele aguardar a execução da promise. Quando ela for resolvida, o resultado (o array de tarefas) será atribuido à constante tarefas
            // usando async/awai é mais parecido com a função sincrona
            const tarefas = await dispatch('buscarTarefas')
            console.log('Mutation: listarTarefas')
            commit('listarTarefas', { tarefas: tarefas })
            /* // como a action buscarTarefas retorna uma promise podemos usar o then
            // no then, podemos passar um callback quando a promise for resolvida
            // recebemos a lista de tarefas, pois estamos resolvendo a promisse com um array de tarefas
                .then(tarefas => {
                }) */
        }
        //Ps: a ação listar tarefas esta chamando outra action que nos retorna uma promise, quando a promisse for resolvida, executamos o callback (recebemos a resposta) e então comitamos a mutation
    }
})