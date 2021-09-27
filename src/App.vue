<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
      <v-footer style="min-height: 150px;" padless  color="#000099"> 
          <v-col
            class="text-center"
            cols="12"
            style="color: white"
          >
            {{ new Date().getFullYear() }} — <strong>Observatorio de Cambio Climático</strong>
          </v-col>
    </v-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    goDataset: function(){
      console.log("holaa")
    }
  }
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif !important; */
  /*font-family: Roboto, sans-serif !important; */
  font-family: Montserrat,sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  padding: 0px 200px 0px 200px;
  min-height: 400px;

}

.dataset-body {
  padding-left: 20px;
  padding-right: 20px;
  min-height: 200px;
  background: white;
}

.v-text-field__details{
  display: none !important;
}
</style>
