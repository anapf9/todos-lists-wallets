import accountService from './../../services/axios'

export default {
    namespaced: true,
    state: {
        accounts: [],
        accountSelected: undefined
    },
    mutations: {
        getAccounts: (state, { accounts }) => {
            state.accounts = accounts
        },
        selectAccount: (state, { account }) => {
            state.accountSelected = account
        }
    },
    actions: {
        getAccounts: async ({ commit }) => {
            let response = await accountService.getAccounts()
            commit('getAccounts', { accounts: response.data })
        },
        selectAccount: ({ commit }, payload) => {
            commit('selectAccount', payload)
        },
        resetAccountSelected: ({commit}) => {
            commit('selectAccount', {account: undefined})
        }
    },
    getters: {
    }
}