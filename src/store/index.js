import Vue from 'vue'
import Vuex from 'vuex'

import contador from './modules/contador'
import tarefas from './modules/tarefas'

Vue.use(Vuex)

export default new Vuex.Store ({
    // strict: process.env.Node_ENV !== 'production',
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
        contador,
        tarefas
    }
})
