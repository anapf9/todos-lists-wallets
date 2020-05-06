import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const contadorModule = {
    namespaced: true,
    state: {
        contador: 0
    },
    getters: {
        contadorAtual: state => state.contador
    }
}

const tarefasModule = {
    namespaced: true,
    state: {
        tarefas: []
    },
    getters: {
        tarefasConcluidas: (state, getters, rootState, rootGetters) => {
            console.log('Getters: state', state, rootState)
            return state.tarefas.filter(t => t.concluido)  
        },
        tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),
        totalDeTarefasConcluidas: (state, getters) => getters.tarefasConcluidas.length,
        buscarTarefaPorId: state => id => state.tarefas.find(t => t.id === id),
        boasVindas: (stata, getters, rootState, rootGetters ) => {
            // state.tarefas */  a nivel global */ tarefas.tarefas
            // getters.tarefasAFazer */  a nivel global */ 'tarefas/tarefasAFazer'
            console.log('state global: ', rootState.usuario)
            console.log('Getter global: ', rootGetters.mensagemDeBoasVindas)
            return rootGetters.mensagemDeBoasVindas
        }
    },
    mutations: {
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
        listarTarefas: async ({ commit, dispatch, state, rootState, getters, rootGetters }, payload) => {
            console.log('Action: listarTarefas')
            // usando async await: awai retorna uma promise e quando usando o await estamos falando para ele aguardar a execução da promise. Quando ela for resolvida, o resultado (o array de tarefas) será atribuido à constante tarefas
            // usando async/awai é mais parecido com a função sincrona
            const tarefas = await dispatch('buscarTarefas')
            console.log('Mutation: listarTarefas')
            commit('listarTarefas', { tarefas: tarefas })
            console.log('Actions: state', state, rootState)

            // commit('logar', 'Ana e Lorena', { root: true })
            dispatch('logar', 'Ana e Lorena', { root: true})
            // dispatch('logar', null, { root: true }) // caso não tiver payload no nivel raiz 
        }
    }
}

const store = new Vuex.Store ({
    state: {
        usuario: 'Ana'
    },
    getters: {
        mensagemDeBoasVindas: state => `Olá ${state.usuario}`
    },
    actions: {
        logar: ( { commit }, usuario ) => {
            commit('logar', usuario)
        }
    },
    mutations: {
        logar: ( state, usuario ) => {
            state.usuario = usuario
        }
    },
    modules: {
        contador: contadorModule,
        tarefas: tarefasModule
    }
})

console.log('Store', store)

export default store