import Vue from 'vue'
import store from '@/store/index'
import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue({
  methods: {
    selecionarFilme(filmeSelecionado) {
      this.$emit('selecionarFilme', filmeSelecionado)
    },
    atualizarFilme(filmeAtualizado) {
      this.$emit('atualizarFilme', filmeAtualizado) 
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
