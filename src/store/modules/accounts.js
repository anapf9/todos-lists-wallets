import accountService from './../../services/axios'

export default {
    namespaced: true,
    state: {
        accounts: [],
        accountSelected: undefined,
        error: undefined
    },
    mutations: {
        getAccounts: (state, { accounts }) => {
            state.accounts = accounts
        },
        selectAccount: (state, { account }) => {
            state.accountSelected = account
        },
        newAccount: (state, { account }) => {
            state.accounts.push(account)
        },
        setError: (state, { error }) => {
            state.error = error
        },
        editAccount: (state, { account }) => {
            let indice = state.accounts.findIndex(i => i.id === account.id)
            state.accounts.splice(indice, 1, account)
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
        },
        newAccount: async ({commit}, {account}) => {
            return accountService.postAccount(account)
                .then(response => commit('newAccount', { account: response.data}) ) 
                .catch( erro => commit('setError', { erro }))
        },
        editAccount: async ({commit}, {account}) => {
            let response = await accountService.putAccount(account)
            commit('editAccount', { account: response.data})
        }


    },
    getters: {
    }
}