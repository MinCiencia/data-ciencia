<template>
  <nav> 
      <div class="container"> 
          <a href="/" class="navbar-logo" >
              <img src="../assets/logo.svg" alt="">
          </a>
        </div>  
  </nav>
</template>

<script>
export default {
  name: 'NavHeader',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container{
    margin: 0px 20px 0px 20px;
    max-width: 700px;
    display: flex;
}
</style>
