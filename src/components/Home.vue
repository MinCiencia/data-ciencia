<template>
<div>
  <div  class="home-header" style="width: 100%; height: 250px; background-size: cover; background-position:center; background-image: url('https://www.minciencia.gob.cl/uploads/filer_public_thumbnails/filer_public/23/27/23270f20-e863-495d-b376-a165566df2c0/whatsapp_image_2021-08-12_at_42325_pm_1.jpeg__1280x854_q85_subsampling-2.jpg')"> 
    <p style="color: white; font-weight: 500; font-size: 30px;">  Bienvenido a Data Ciencia </p>
  </div>
  <div class="content-home" >
    <v-overlay :value="loading">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
      <div class="banner"> 
        <h1 style="color: #000099">Destacado </h1>
        <br>
        <br>
        <v-row>
          <v-col></v-col>
          <v-col>
            <button type="button" class="botonera" style=" background: #000099; color: white; 
          "> Datos COVID </button>
          </v-col>
          <v-col>
            <button type="button" class="botonera" style=" color: #000099
          "> Datos Cambio Climatico </button>
          </v-col>
          <v-col></v-col>
      </v-row>
      <br>
        <h1 style="color: #000099">Datasets </h1>
        <br>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore fuga explicabo maxime illum! Tempora aspernatur tempore nisi iusto officiis dolorem aperiam ex saepe neque incidunt itaque consectetur, quisquam aliquam expedita?
        <br>
        <br>
        
           <v-text-field
            outlined
            label="Buscar dataset"
            prepend-inner-icon="mdi-magnify" style="background: white; color: #000099 "
            v-model="busqueda"
          ></v-text-field>
          <br>
          <v-row style="margin-left: 10px;">
            <v-chip
              class="ma-2"
            >
              Covid
            </v-chip>
            <v-chip
              class="ma-2"
            >
              Contaminación
            </v-chip>
            <v-chip
              class="ma-2"
            >
              Tecnología
            </v-chip>
            <v-chip
              class="ma-2"
            >
              Atmósfera
            </v-chip>
          </v-row>
          <v-row> 
            <v-col v-for="(card) in datasetsHome" :key="card"
              cols="12"
              sm="4">
            <v-card class="mx-auto" >
                <v-img @click="goDataset(card.name)" style="cursor: pointer; hover:white"
                  :src="card.imagen"
                  height="200px"> </v-img>
                <v-card-title @click="goDataset(card.name)" style="word-break: normal; cursor: pointer;">
                  {{ card.titulo }}
                </v-card-title>
                <v-card-subtitle>
                  {{ card.descripcion.substring(0, 140) + "..."}}
                </v-card-subtitle>
            </v-card>
            <v-spacer></v-spacer>
          </v-col>             
          </v-row>
          <v-pagination
            color="#1966c0"
            v-model="pagina"
            :length="espacios"
            :total-visible="6"
          ></v-pagination>
      </div>
     
    
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created() {
      this.getData()
  },
  methods: {
    goDataset: function(name){
      this.$router.push('dataset/' + name)
    },
    getData: async function () {
      this.loading = true
      let cards;
      try {
        cards = (await this.axios.get(process.env.VUE_APP_WEB_SERVER + "/dataset")).data
      } catch (error) {
        cards = []
      } finally {
        this.cards = cards
        this.loading = false
      }
    }
  },
  data () {
      return {
        busqueda: null,
        pagina: 1,
        loading: false,
        cards: [
          /*{
            titulo: "DP 34: Datos de calidad del aire por hora",
            descripcion: "Cada archivo entrega los datos de la emisión de un contaminante durante un año con frecuencia horaria junto con la información de las estaciones de medición. Existe un archivo para cada contaminante y para cada año",
            url: "https://www.hola.com/imagenes/estar-bien/20190301137851/contaminacion-causa-ojo-seco-gt/0-650-903/humo-fabrica-z.jpg"
          },
          {
            titulo: "No disponible: Fotografías satelitales territorio nacional",
            descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum corporis vero at! Quasi nobis dignissimos neque quas laboriosam sint ea nihil earum quis aliquam ad veritatis, obcaecati illum vero aspernatur.",
            url: "https://pbs.twimg.com/media/DUUhiKxW0AICECX.jpg"
          },
          {
            titulo: "No disponible: Temperaturas y mediciones antarticas",
            descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum corporis vero at! Quasi nobis dignissimos neque quas laboriosam sint ea nihil earum quis aliquam ad veritatis, obcaecati illum vero aspernatur.",
            url: "https://estaticos.muyinteresante.es/uploads/images/article/5b31f5b25cafe829c4eb6ef3/glaciar-antartida_0.jpg"
          },
          {
            titulo: "DP 34: Datos de calidad del aire por hora",
            descripcion: "Cada archivo entrega los datos de la emisión de un contaminante durante un año con frecuencia horaria junto con la información de las estaciones de medición. Existe un archivo para cada contaminante y para cada año",
            url: "https://www.hola.com/imagenes/estar-bien/20190301137851/contaminacion-causa-ojo-seco-gt/0-650-903/humo-fabrica-z.jpg"
          },
          {
            titulo: "No disponible: Fotografías satelitales territorio nacional",
            descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum corporis vero at! Quasi nobis dignissimos neque quas laboriosam sint ea nihil earum quis aliquam ad veritatis, obcaecati illum vero aspernatur.",
            url: "https://pbs.twimg.com/media/DUUhiKxW0AICECX.jpg"
          },
          {
            titulo: "No disponible: Temperaturas y mediciones antarticas",
            descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum corporis vero at! Quasi nobis dignissimos neque quas laboriosam sint ea nihil earum quis aliquam ad veritatis, obcaecati illum vero aspernatur.",
            url: "https://estaticos.muyinteresante.es/uploads/images/article/5b31f5b25cafe829c4eb6ef3/glaciar-antartida_0.jpg"
          },
          {
            titulo: "DP 34: Datos de calidad del aire por hora",
            descripcion: "Cada archivo entrega los datos de la emisión de un contaminante durante un año con frecuencia horaria junto con la información de las estaciones de medición. Existe un archivo para cada contaminante y para cada año",
            url: "https://www.hola.com/imagenes/estar-bien/20190301137851/contaminacion-causa-ojo-seco-gt/0-650-903/humo-fabrica-z.jpg"
          },
          {
            titulo: "No disponible: Fotografías satelitales territorio nacional",
            descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum corporis vero at! Quasi nobis dignissimos neque quas laboriosam sint ea nihil earum quis aliquam ad veritatis, obcaecati illum vero aspernatur.",
            url: "https://pbs.twimg.com/media/DUUhiKxW0AICECX.jpg"
          } */
        ]
      }
    },
    computed: {
      resultadoBusqueda: function(){
        if(this.busqueda == null){
          return this.cards
        }
        else {
          return this.cards.filter(card => card.titulo.toUpperCase().includes(this.busqueda.toUpperCase()) || (card.descripcion.toUpperCase().includes(this.busqueda.toUpperCase()) ))
        }
      },
      datasetsHome: function(){
         return this.resultadoBusqueda.slice(
                6 * (this.pagina - 1),
                6 * (this.pagina - 1) + 6
            );
      },
      espacios: function(){
        if (Math.floor(this.resultadoBusqueda.length / 6) == (this.resultadoBusqueda.length / 6) ){
          return this.resultadoBusqueda.length / 6
        }
        else {
          return Math.floor(this.resultadoBusqueda.length / 6) + 1
        }
      }

    }
}
</script>

<style>

.content {
  padding: 0px 200px 0px 200px;
  min-height: 400px;

}

.content-home {
  padding: 0px 200px 0px 200px;
  min-height: 400px;
    background: #d9d9d9bd;

}

@media only screen and (max-width: 600px) {
  .content {
    padding: 0px 30px 0px 30px;
  }
}

.banner {
  min-height: 300px;
  border-radius: 5px;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    background: white;
    padding: 50px;
    border: 10px;
    border-radius: 10px;
    border-color: #563636;


}

.dataset-body {
  padding-left: 20px;
  padding-right: 20px;
  min-height: 200px;
  background: white;
}


.right-panel {
  height: 100px;
  background: "#F2F2F2";
  padding: 20px;
}

.embed-container {position: relative; padding-bottom: 40%; height: 0; max-width: 100%;} .embed-container iframe, .embed-container object, .embed-container iframe{position: absolute; top: 0; left: 0; width: 100%; height: 100%;} small{position: absolute; z-index: 40; bottom: 0; margin-bottom: -15px;}

.botonera{
  background-color: #fff;
              border-radius: 10px;
              -webkit-box-shadow: 0 2px 4px 0 #bbbbbb;
              box-shadow: 0 2px 4px 0 #bbbbbb;
              display: inline-block;
              font-size: 1em;
              line-height: 1.25em;
              padding: 5px;
              position: relative;
              -webkit-transition: all .2s ease-in-out;
              transition: all .2s ease-in-out;
              width: 10px;
              width: 100%;
              height: 100px;
}

.home-header {
  min-height: 200px;
  background: #E6E6E6;
  border-radius: 5px;
  background-size: cover;

  text-align: center;
  padding: 0 20px; 
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
