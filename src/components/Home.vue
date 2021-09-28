<template>
<div>
    <v-overlay :value="dialog_visualizacion"></v-overlay>
     <v-dialog 
      v-model="dialog_visualizacion" >
      <div style="padding: 10px; background: white; " > 
        <v-menu
          bottom
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            style="float: right; position: relative"
              v-on:click="dialog_visualizacion = false;"
              icon
              v-bind="attrs"
              v-on="on">
              <v-icon> mdi-close</v-icon>
            </v-btn>
          </template>
        </v-menu>
        <br>
        <div> 
          <v-row>
            <v-col>
              <div class="flourish-embed" data-src="story/995952" :key="dialog_map"></div>
            </v-col>
            <v-col>
              <br>
              <h2> Titulo visualizacion </h2>
              <br>
              <b> Descripcion: </b>
              <br>
              Aquí puedes buscar distintas fuentes de datos. Selecciona una para empezar a explorar.
              <br>
              <br>
              <b>Fuente:</b> 
              <br>
              Producto 43
              <br>
              <br>
              <b>Última actualización:</b> 
              <br>
              Producto 43
            </v-col>
          </v-row>
        </div>
        <br>
        
      </div>
    </v-dialog>

  <div class="home-header" style="width: 100%; height: 300px; background-size: cover; background-image: url('https://www.minciencia.gob.cl/uploads/filer_public_thumbnails/filer_public/23/27/23270f20-e863-495d-b376-a165566df2c0/whatsapp_image_2021-08-12_at_42325_pm_1.jpeg__1280x854_q85_subsampling-2.jpg')"> 
    <div>
    <p>  Bienvenido a <br><span style="font-size: 25px">Datos <b>Ciencia</b></span></p>
    <br>
     <v-row >  
      
      <v-col>
        <v-btn v-on:click="dialog_visualizacion= true;"  >
          Visualizaciones
        </v-btn>
      </v-col>
    </v-row>
    </div>
  </div>
  <div class="content-home" >
    <v-overlay :value="loading">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
      <v-row> 
        <v-col class="panel-izq" cols="2" style="background: white;">
          <div >
           <v-navigation-drawer 
            permanent >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Categorias
          </v-list-item-title>
          <v-list-item-subtitle>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

              <v-list
                dense
                nav
              >
                <v-list-item
                  v-for="item in items"
                  :key="item.title"
                  link
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
            </div>
        
        </v-col>
        <v-col cols="10" class="panel-der" style="background: white">
      <div class="banner"> 

        <h1>Datasets </h1>
        <br>
        Aquí puedes buscar distintas fuentes de datos. Selecciona una para empezar a explorar.        <br>
        <br>
           <v-text-field
            outlined
            label="Buscar dataset"
            prepend-inner-icon="mdi-magnify" style="background: white"
            v-model="busqueda"
          ></v-text-field>
          <br>
          <v-row style="margin-left: 10px;">
           
          </v-row>
          <v-row> 
            <v-col v-for="(card) in datasetsHome" :key="card"
              cols="12"
              sm="3">
            <v-card class="mx-auto" >
                <v-img @click="goDataset(card.name)" style="cursor: pointer; hover:white"
                  :src="card.imagen"
                  height="100px"> </v-img>
                <v-card-title @click="goDataset(card.name)" style="word-break: normal; cursor: pointer; font-size: medium">
                  {{ card.titulo }}
                </v-card-title>
                <v-card-subtitle v-html="card.descripcion.substring(0, 140)" >
                 
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

      <br>
      <br>
    </v-col>
      </v-row>
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
        ],
        items: [
        { text: 'Inicio', icon: 'mdi-home' }
      ],
        section: 0,
        dialog_visualizacion: false
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
  padding: 0px 00px 0px 0px;
  min-height: 400px;
    background: #d9d9d9bd;

}

@media only screen and (max-width: 600px) {
  .content {
    padding: 0px 30px 0px 30px;
  }
  .panel-izq{
    display: none;
  }
  .panel-der{
    max-width: unset;
    min-width: 100%;
  }
}

.banner {
  min-height: 315px;
  border-radius: 5px;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    background: white;
    padding: 20px;
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


.home-header{

  text-align: center;
  padding: 0 20px; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
