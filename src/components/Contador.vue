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
    // computed: mapState(['contador']),
    data () {
        return {
            contadorLocal: 2
        }
    },
    computed: {
        ...mapState({
        contador: state => state.contador.contador, // após a arrow function pode se utilizar qualquer lógica, porém retornaremos apenas o estado contador
        // contador: 'contador', // atraves da string indicamos qual propriedade do state queremos pegar
        contadorAlias: state => state.contador.contador, // forma como um alias, serve para darmos nome diferente
        contadorMultiplicado (state) {
            return state.contador.contador * this.contadorLocal
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