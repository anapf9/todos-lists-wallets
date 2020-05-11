import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getTarefas () {
        return apiClient.get('/tarefas')
    },
    getTarefa (id) {
        return apiClient.get(`/tarefas/${id}`)
    },
    postTarefa (tarefa) {
        return apiClient.post('/tarefas', tarefa)
    },
    putTarefa (tarefa) {
        return apiClient.put(`/tarefas/${tarefa.id}`, tarefa)
    },
    deleteTarefa (id) {
        return apiClient.delete(`/tarefas/${id}`)
    },
    // My time 
    getAccounts () {
        return apiClient.get('/accounts')
    },
    getAccount (id) {
        return apiClient.get(`/accounts/${id}`)
    },
    postAccount (account) {
        return apiClient.post('/accounts', account)
    },
    putAccount (account) {
        return apiClient.put(`/accounts/${account.id}`, account)
    },
    deleteAccount (id) {
        return apiClient.delete(`/accounts/${id}`)
    }
}