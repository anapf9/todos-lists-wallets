<template>
  <div>
      <h2 class="font-weight-light"> Contador: {{ contador }} </h2>
      <h3>Contador Multiplicado: {{ contadorMultiplicado }}</h3>
      <button class="btn btn-lg btn-danger mr-1" @click="decrementar"> - </button>
      <button class="btn btn-lg btn-success mr-1" @click="incrementar"> + </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data () {
        return {
            contadorLocal: 2
        }
    },
    computed: {
        ...mapState('contador',{
        contador: state => state.contador, // após a arrow function pode se utilizar qualquer lógica, porém retornaremos apenas o estado contador
        contadorAlias: state => state.contador, // forma como um alias, serve para darmos nome diferente
        contadorMultiplicado (state) {
            return state.contador * this.contadorLocal
        }
    })
    }, 
    methods: {
        incrementar() {
            this.$store.state.contador.contador++
        },
        decrementar() {
            this.$store.state.contador.contador--
        }
    }
}
</script>

<style>

</style>