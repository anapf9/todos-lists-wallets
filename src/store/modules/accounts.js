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
        }
    },
    actions: {
        getAccounts: async ({ commit }) => {
            let response = await accountService.getAccounts()
            commit('getAccounts', { accounts: response.data })
        }
    },
    getters: {
    }
}