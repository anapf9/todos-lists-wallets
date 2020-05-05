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

  </div>
</template>

<script>
import FilmesLista from './components/FilmesLista.vue'
import Contador from '@/components/Contador.vue'

export default {
  components: {
    FilmesLista,
    Contador
  }
}
</script>
