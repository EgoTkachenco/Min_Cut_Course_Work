<template>
  <div id="app">
    <app-navbar></app-navbar>

    <div class="container-fluid flex-grow-1">
      <div class="row" style="min-height: calc(100vh - 90px);">
        <div class="col-12 col-md-5 px-0 panel-card"> 
          <app-graph-input></app-graph-input>
          <app-solution v-if="solution"></app-solution>
        </div>
        <div class="col px-0">
          <app-visualize></app-visualize>
        </div>
      </div>
    </div>
    <footer>
      <div>Tkachenko Yehor Course Work</div>
      <div class="ml-auto">
        <a href="https://github.com/EgoTkachenco/Min_Cut_Course_Work">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#fff"
            viewBox="0 0 291.32 291.32">
            <g>
              <path
                d="M145.66,0C65.219,0,0,65.219,0,145.66c0,80.45,65.219,145.66,145.66,145.66   s145.66-65.21,145.66-145.66C291.319,65.219,226.1,0,145.66,0z M186.462,256.625c-0.838-11.398-1.775-25.518-1.83-31.235   c-0.364-4.388-0.838-15.549-11.434-22.677c42.068-3.523,62.087-26.774,63.526-57.499c1.202-17.497-5.754-32.883-18.107-45.3   c0.628-13.282-0.401-29.023-1.256-35.941c-9.486-2.731-31.608,8.949-37.79,13.947c-13.037-5.062-44.945-6.837-64.336,0   c-13.747-9.668-29.396-15.64-37.926-13.974c-7.875,17.452-2.813,33.948-1.275,35.914c-10.142,9.268-24.289,20.675-20.447,44.572   c6.163,35.04,30.816,53.94,70.508,58.564c-8.466,1.73-9.896,8.048-10.606,10.788c-26.656,10.997-34.275-6.791-37.644-11.425   c-11.188-13.847-21.23-9.832-21.849-9.614c-0.601,0.218-1.056,1.092-0.992,1.511c0.564,2.986,6.655,6.018,6.955,6.263   c8.257,6.154,11.316,17.27,13.2,20.438c11.844,19.473,39.374,11.398,39.638,11.562c0.018,1.702-0.191,16.032-0.355,27.184   C64.245,245.992,27.311,200.2,27.311,145.66c0-65.365,52.984-118.348,118.348-118.348S264.008,80.295,264.008,145.66   C264.008,196.668,231.69,239.992,186.462,256.625z"
              />
            </g>
          </svg>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
  import Navbar from './components/app-navbar';
  import GraphInput from './components/app-graph-input';
  import Solution from './components/app-solution';
  import Visualize from './components/app-graph-visualization';
  export default {
    data: () => ({
    }),
    computed: {
      activeCmp() {
        return this.$store.state.activeCmp;
      },
      solution() {
        return this.$store.state.solution;
      },
    },
    components: {
      'app-navbar': Navbar,
      'app-graph-input': GraphInput,
      'app-solution': Solution,
      'app-visualize': Visualize,
    },
  };
</script>

<style>
  @import url('../node_modules/bootstrap/dist/css/bootstrap.css');

  body {
    font-family: 'Montserrat', sans-serif;
  }
  .panel-card {
    overflow: auto;
    border: 1px solid #fff;
    border-left: 0;
    border-right: 0;
    background: #3f3f44; 
    max-height: calc(100vh - 90px);
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #3f3f44; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

  }
  footer {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 25px;
    background: #3f3f44;
    color: #fff;
    height: 30px;
  }
  .toolbar-btn {
    padding: 5px 25px;
    border: none;
    background: none;
    color: #fff;
    font-size: 18px;
    transition: all 300ms;
    background: #3f3f44;
		outline: none;
  }
  .toolbar-btn:focus{
    outline-style: none;
  }
  .toolbar-btn:hover {
    background: #616168f8;
  }
  .toolbar-btn:active {
		background: #4062bb;
  }
	.toolbar-btn.active-view, .toolbar-btn.active  {
		background: #4062bb;
	}
  .toolbar-btn.optimal {
		background: #cceabb;
	}
</style>
