export default {
    namespaced: true,
    state: {
        contador: 0
    },
    getters: {
        contadorAtual: state => state.contador
    }
}