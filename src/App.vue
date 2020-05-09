<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Lista de Filmes</h1>
        <p class="lead">Treinando comunicação entre Components no Vue</p>
      </div>
    </div>

    <div class="container">
      <FilmesLista/>
    </div>

    <div class="text-center">
      <contador />
    </div>

    <div class="container">
      <TarefasLista/>
    </div>

    <div class="container">
      <BankConfig/>
    </div>

  </div>
</template>

<script>
import BankConfig from './components/myTime/BankConfig.vue'
import TarefasLista from './components/TarefasLista.vue'
import FilmesLista from './components/FilmesLista.vue'
import Contador from '@/components/Contador.vue'

export default {
  components: {
    BankConfig,
    TarefasLista,
    FilmesLista,
    Contador
  }
}
</script>
