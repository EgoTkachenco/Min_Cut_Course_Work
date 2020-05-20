<template>
  <div id="app">
    <app-navbar></app-navbar>

    <div class="flex-grow-1">
      <div class="container-fluid mt-2">
        <div class="row">
          <div class="col-12">
            <app-graph-input></app-graph-input>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-dark white">
      Footer
    </footer>
  </div>
</template>

<script>
  import Navbar from './components/app-navbar';
  import GraphInput from './components/app-graph-input';
  


  export default {
    data: () => ({}),
    components: {
      'app-navbar': Navbar,
      'app-graph-input': GraphInput
    },
  };
</script>

<style>
  @import url('../node_modules/bootstrap/dist/css/bootstrap.css');

  body {
    font-family: 'Montserrat', sans-serif;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
