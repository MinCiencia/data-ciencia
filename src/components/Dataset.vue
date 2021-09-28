<template>
  <v-app>
    <div >
      <div class="content">
        <v-overlay :value="loading">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
        <v-overlay :value="dialog_pandas"></v-overlay>
        <v-dialog
              v-model="dialog_pandas" width="300px">
              
              <div style="padding: 10px; background: #353535; color: white;"> 
                <v-row> 
                    <v-col></v-col>
                    <v-col></v-col> 
                    <v-col> 
                      <v-col style="color: white">  <v-icon v-on:click="dialog_pandas = false" style="color: white" color="green darken-2"> mdi-close</v-icon></v-col> 
                    </v-col>
                </v-row>
                <span style="color: #cf52ef">import </span> pandas <span style="color: #cf52ef">as</span> pd
                <br>
                <br>
                data = pd.read_csv("<span style="color: #fb8c00">{{last_dataset}}</span>")
                <br>
                <br>
                data.head()
                <br>
                <br>
                <!-- <div  v-on:click="dialog_pandas = false" > <v-icon style="color: white" color="green darken-2"> mdi-clipboard</v-icon>Copiar </div> -->
              </div>
        </v-dialog>

        <v-overlay :value="dialog_filter"></v-overlay>
        <v-dialog 
              v-model="dialog_filter" width="500px">
              
              <div style="padding: 10px; background: white; " > 
                <v-menu
                  bottom
                  left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    style="float: right; position: relative"
                      v-on:click="dialog_filter = false;"
                      icon
                      v-bind="attrs"
                      v-on="on">
                      <v-icon> mdi-close</v-icon>
                    </v-btn>
                  </template>
                </v-menu>
                <h2>Seleccionar filtros </h2>
                <v-switch style="padding-left: 40px; padding-right: 40px;"
                  v-model="switch_filter"
                  label="¿Rango parcial de fechas?"
                ></v-switch>
                <div v-if="switch_filter">
                  <v-row>
                    <v-col>
                    Desde
                    <date-picker v-model="datetime_start"></date-picker>
                    </v-col>
                    <v-col>
                    Hasta
                    <date-picker v-model="datetime_end"></date-picker>
                    </v-col>
                  </v-row>
                  <br>
                </div>
                
                <v-combobox
                    v-model="columnasaDescargar"
                    :items="dropdownDescargas"
                    label="Seleccionar columnas"
                    multiple
                    chips
                    style="margin-left: 40px; margin-right: 40px;"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                      >
                        <v-avatar
                          class="accent white--text"
                          left
                          v-text="data.item.slice(0, 1).toUpperCase()"
                        ></v-avatar>
                        {{ data.item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                <br>          
                <v-alert v-if="error" type="error">
                    Hubo un problema al obtener los datos.
                  </v-alert>
                 
                <v-btn
                  elevation="2"
                  plain
                  color="#000000"
                  v-on:click="descargarDataset">Descargar</v-btn>  
                <!-- <div  v-on:click="dialog_pandas = false" > <v-icon style="color: white" color="green darken-2"> mdi-clipboard</v-icon>Copiar </div> -->
              </div>
        </v-dialog>

        <v-overlay :value="dialog"></v-overlay>
        <v-dialog
              content-class="v-dialog--custom"
              v-model="dialog">
              <div>
                <v-card>
                <v-card-title style="background: #f9f9f9;">
                  <h3>Explorar</h3>
                <v-spacer></v-spacer>
              <v-menu
                  bottom
                  left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-on:click="dialog = false; graphtab = 0"
                      icon
                      v-bind="attrs"
                      v-on="on">
                      <v-icon> mdi-close</v-icon>
                    </v-btn>
                  </template>
                </v-menu>
              </v-card-title>
          
              <v-tabs v-model="graphtab">
                  <v-tab v-for="(element, index) in graphs" :key="index" :disabled="loading_graphs"> 
                    <v-icon left >
                    </v-icon>
                    <div class="list-text"> {{ index }} </div>
                  </v-tab> 
                  <v-tabs-items v-model="graphtab">
                      <v-tab-item >
                      </v-tab-item>
                  </v-tabs-items>
                </v-tabs> 
                <v-card flat  style="padding-left: 40px; text-align: left; padding-right: 40px; padding-top:10px; background: white">
                          <v-card-text>
                            <v-row v-if="loading_graphs">
                                <v-skeleton-loader style="width: 100%"
                                  v-bind="attrs"
                                  type="card-avatar, article, actions"
                                ></v-skeleton-loader>
                            </v-row>
                            <v-row v-else> 
                             <!-- <v-col > -->
                                  <div v-if="graphs[Object.keys(graphs)[graphtab]]" style="margin: auto;">
                                    <br>
                                    <h1>  Información general </h1>
                                    <br>

                                    <h3> <b> Datos no nulos </b> </h3>
                                    {{ graphs[Object.keys(graphs)[graphtab]].count }}
                                    <br>
                                    
                                    <h3> <b> Datos nulos </b> </h3>
                                    {{ graphs[Object.keys(graphs)[graphtab]].null }}
                                    <br>

                                    <h3> <b> Promedio </b> </h3>
                                    {{ graphs[Object.keys(graphs)[graphtab]].mean }}
                                    <br>  

                                    <h3> <b> Valor mínimo </b> </h3>
                                    {{ graphs[Object.keys(graphs)[graphtab]].min }}
                                    <br>
                                    <h3> <b> Valor máximo </b> </h3>
                                    {{ graphs[Object.keys(graphs)[graphtab]].max }}
                                    <br>
                                    <h3> <b>  Desviación estandar </b> </h3>
                                    {{ graphs[Object.keys(graphs)[graphtab]].std }}
                                    <br> 
                                    <br>
                                </div>
                              <!--</v-col>
                              <v-col >
                                <div >
                                 <h2>  Gráfico </h2>
                                  <br>
                                  <h3> <b> Distribución </b> </h3> 
                                 <LineChart v-if="dialog" :width="200" :height="200" :chartdata="getGraph(getGraphKey)" :key="getGraphKey"> </LineChart> 
                                </div>
                              </v-col> -->
                            </v-row>
                            
                          </v-card-text>
                        </v-card>
                </v-card>
                </div>
            </v-dialog>
          <div class="dataset-header" v-bind:style="{ backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.7), 
              rgba(0, 0, 0, 0.7)
            ), url('${ this.imagen }')` }"> 
          <p style="color: white; font-size: 25px;"> {{ nombre }}</p>
          </div>
          <div class="dataset-body"> 
            <v-tabs color="#5f9da0" v-model="tab" >
              <v-tab href="#tab-1">Descripción</v-tab>
              <v-tab href="#tab-2">Descarga</v-tab>
              <!-- <v-tab href="#tab-3">Historia</v-tab> -->
              <!-- <v-tab href="#tab-3">Comentarios</v-tab> -->
            </v-tabs>
            <v-divider></v-divider>
              <div class="main-content"> 
                    <v-row no-gutters>
                      <v-col
                        cols="12"
                        sm="8">
                        <v-tabs-items v-model="tab">
                          <v-tab-item :transition="false" :reverse-transition="false"
                            v-for="i in 3"
                            :key="i"
                            :value="'tab-' + i">
                            <div  v-if="i == 1"> 
                                <h2 style="text-align: left ">
                                   <v-icon  small > mdi-script-text </v-icon> Descripción
                                </h2>
                                <p style="text-align: left" v-html="descripcion"> </p>
                                <h2 style="text-align: left ">
                                   <v-icon  small > mdi-newspaper-variant </v-icon> Fuente
                                </h2>
                                <p style="text-align: left" v-html="fuente"> </p>
                                <br>
                                <!--
                                <p style="text-align: left"> <b>Datasets: </b> <i>(selecciona para visualizar)</i> </p>
                                <v-row> 
                                  <v-col v-for="(entry) in tablas" :key="entry.name" cols="12" sm="3">
                                    <v-card v-bind:class="entry.name  === selectElement ? 'select-element' : 'normal-element' "
                                        elevation="2" v-on:click="selectElement = entry.name" >
                                          <v-card-text>
                                            <div><b>{{entry.name}}</b></div>
                                          
                                            <p>{{entry.descripcion}}</p>
                                            <div class="text--primary">
                                              
                                            </div>
                                          </v-card-text>
                                      </v-card> 
                                  </v-col>
                                </v-row>
                                <br>
                                <br>
                                <v-row justify="center">
                                  <v-expansion-panels v-model="previsualizacion" accordion>
                                    <v-expansion-panel>
                                      <v-expansion-panel-header>Vista (10 primeras filas)</v-expansion-panel-header>
                                      <v-expansion-panel-content>
                                        <v-data-table
                                            :key="selectElement"
                                            :headers="preview.schema.fields"
                                            :items="preview.data"
                                            :items-per-page="10"
                                            class="elevation-1"
                                            dense
                                            hide-default-footer>
                                          </v-data-table>   
                                    </v-expansion-panel-content>
                                    </v-expansion-panel>
                                  </v-expansion-panels>
                                </v-row>
                                <v-divider></v-divider>
                                <br>
                                <v-btn
                                  elevation="2"
                                  plain
                                  outlined
                                  color="#000000"
                                  v-on:click="dialog = !dialog">  
                                    Explorar
                                 </v-btn>  
                                 -->
                              
                            </div>
                            <div class="time-panel" v-else-if="i == 2"> 
                               <!-- <h2 style="text-align: left "> Descarga </h2> -->
                                <!-- <v-row>
                                  <v-col>
                                    <p style="text-align: left"> Selecciona la fuente de datos que quieres descargar: </p>
                                  </v-col>  
                                  <v-col>
                                <v-select
                                  :items="dropdownColumnas"
                                  label="Seleccionar tabla"
                                  dense
                                  solo
                                  v-model="selectElement"
                                  style="margin: auto; width: 300px"
                                ></v-select>
                                  </v-col>
                                </v-row> -->
                                <h2> {{selectElement}}</h2>
                                <v-tabs color="#000000"
                                        show-arrows
                                        v-model="tab_filter">
                                  <v-tab 
                                    v-for="item in dropdownColumnas"
                                    :key="item"
                                    v-model="tab_filter">
                                    {{ item }}
                                  </v-tab>
                                </v-tabs>

                                <v-tabs-items >
                                  <v-tab-item
                                    v-for="item in dropdownColumnas"
                                    :key="item"
                                  >
                                    <v-card flat>
                                      <v-card-text>{{ item }}</v-card-text>
                                    </v-card>
                                  </v-tab-item>
                                </v-tabs-items>
                                <p style="text-align: left; margin-top: 10px"> {{ table_description }}</p>
                                <!-- <v-row> 
                                  <v-col>
                                  </v-col>
                                  <v-col>
                                    <div class="boton-descarga"  v-on:click="dialog_filter = !dialog_filter" style="width: 100%;"> Descargar </div> 
                                  </v-col>
                                  <v-col></v-col>
                                </v-row> -->
                                <div style="text-align: left">
                                  <v-row>
                                      <v-col> 
                                          <p style="margin: 0"> <v-icon  small> mdi-card-account-details </v-icon><b> Autor:</b> </p> 
                                          {{ autor }} 
                                      </v-col>
                                      
                                      <v-col> 
                                          <p style="margin: 0"> <v-icon  small> mdi-calendar-range </v-icon><b> Última actualización </b> </p> 
                                           {{ table_last_index }}
                                      </v-col>
                                  </v-row>
                                  <br>
                                  <!--  <p style="text-align: left"> Las columnas que tiene esa fuente de datos son: </p>

                                    <v-list>
                                      <v-list-group
                                          :value="true"
                                          no-action
                                          sub-group
                                        >
                                        <template v-slot:activator>
                                        <v-list-item-content>
                                          <v-list-item-title> <b> Columnas </b> </v-list-item-title>
                                        </v-list-item-content>
                                      </template>

                                        <v-list-item
                                          v-for="(item, i) in preview.schema.fields"
                                          :key="i"
                                        >
                                          <v-list-item-icon>
                                            <v-icon v-text="item.icon"></v-icon>
                                          </v-list-item-icon>
                                          <v-list-item-content>
                                            <v-list-item-title> <b> {{item.name}} </b></v-list-item-title>
                                            {{item.type}}
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list-group>
                                    </v-list> -->
                                    <!--
                                    <v-icon  small> mdi-table-large </v-icon><b> Previsualizacion:</b>
                                    <v-data-table
                                            :key="selectElement"
                                            :headers="preview.schema.fields"
                                            :items="preview.data"
                                            :items-per-page="10"
                                            class="elevation-1"
                                            dense
                                            hide-default-footer>
                                    </v-data-table>  
                                    <br> -->
                                           
                                </div>
                               <!-- <v-btn
                                  elevation="2"
                                  plain
                                  outlined
                                  color="#000000"
                                  v-on:click="dialog = true">
                                    Explorar tabla
                                </v-btn> -->
                                <v-btn
                                  elevation="2"
                                  plain
                                  outlined
                                  color="#000000"
                                  style="margin-left: 10px"
                                  v-on:click="descargarDataset">
                                    Descargar tabla
                                </v-btn> 
                            </div>
                            <div class="time-panel" v-else-if="i == 3"> 
                                <h2 style="text-align: left "> Historial de cambios </h2>
                                <br>
                                <div style="text-align: left "> Las últimas versiones de este dataset son: </div>
                                <br>
                                <v-timeline  align-top
                                dense>
                                  <v-timeline-item v-for="(entry) in selectedHistorial" :key="entry.date"
                                    small style="word-break: break-all; text-align: left">
                                        <strong>{{ new Date(1000 * entry.date).toLocaleDateString("es-LA")}}</strong>
                                        <br>
                                        <a style="color: #5f9da0" :href="entry.path"> {{entry.name}} </a>
                                        <br>
                                        <div v-if="entry.comments"> <i> {{ entry.comments }} </i></div> 
                                  </v-timeline-item>
                                </v-timeline>
                                <br>
                                <v-pagination
                                  color="#5f9ea0"
                                  v-model="paginaHistorial"
                                  :length="espaciosHistorial"
                                  :total-visible="6"
                                ></v-pagination>
                            </div>
                            <div style="min-height: 600px;" v-else-if="i == 4"> 
                                <h2 style="text-align: left "> Comentarios </h2>
                                <br>
                                <v-row>
                                  <v-col>
                                    <p style="text-align: left"> Aqui podrás ver los últimos comentarios de este dataset:</p>
                                  </v-col>
                                  <v-col cols="2" >
                                      <div class="boton-descarga" style="width: unset;"> + </div>
                                  </v-col>
                                </v-row>
                                <br>
                                  <v-divider></v-divider>
                                  <br>
                                  <div v-for="(element) in selectedComentarios" :key="element.date">
                                      <v-row>
                                        <v-col
                                          cols="4"
                                          sm="2"
                                          md="1">
                                          <v-avatar size="36px">
                                              <img
                                                alt="Avatar"
                                                src="https://avatars0.githubusercontent.com/u/9064064?v=4&s=460">
                                          </v-avatar>
                                        </v-col>
                                        <v-col
                                          class="hidden-xs-only"
                                          sm="5"
                                          md="4">
                                          <strong> {{ element.autor}}</strong>
                                          <br>
                                          {{ new Date(1000 * element.date).toLocaleDateString("es-LA") }}
                                          <span
                                            class="grey--text">
                                          </span>
                                        </v-col>
                                        <v-col style="text-align: left">
                                            {{ element.title}}
                                          </v-col>
                                      </v-row>
                                      <br>
                                      <v-divider></v-divider>
                                  </div>
                                <br>
                                <v-pagination
                                  color="#5f9ea0"
                                  v-model="paginaComentarios"
                                  :length="espaciosComentarios"
                                  :total-visible="6"
                                ></v-pagination>
                            </div>
                          </v-tab-item>
                        </v-tabs-items>
                      </v-col>
                      <v-col 
                        cols="12"
                        sm="4" >
                        <div class="right-panel">
                        
                        <!-- <div class="boton-descarga" v-on:click="dialog_pandas = true">  pandas </div> -->

                          <b>Autor</b>
                          <br>
                          <v-avatar size="48"> 
                                <img
                                  :src="autor_imagen"
                                  alt="Autor"
                                >
                          </v-avatar>
                          <br>
                          {{ autor }}
                          <br>
                          <br>
                          <!-- <b>Clasificación</b>
                          <v-rating
                            color="yellow"
                            hover
                            length="5"  
                            :value="3"
                            size="15"
                          ></v-rating>
                          <br> -->
                          <b>Licencia</b>
                          <br>
                          {{ licencia }}

                          <br>
                          <br>
                          <b>Última actualización</b>
                          <br>
                          {{ index_time }}
                          
                        </div>
                      </v-col>
                    </v-row>
                </div>
          </div>
        </div>
        
      </div>
    </v-app>
</template>

<script>
//import LineChart from './charts/BarB.js'
import DatePicker from 'vue2-datepicker';
//import 'vue2-datepicker/index.css';
import 'vue2-datepicker/index.css';

export default {
  name: 'Dataset',
  components: {
  //   LineChart
    DatePicker
  },
  created() {
      this.getData()
      //this.getTable()
      //this.getGraphs()
      //this.datetime_start = new Date();
      //this.datetime_end = new Date();

  },
  data () {
      return {
        nombre: undefined,
        items3: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        descripcion: undefined,
        fuente: undefined,
        autor: undefined,
        autor_imagen: undefined,
        licencia: undefined,
        imagen: undefined,
        index_time: undefined,
        last_dataset: undefined,
        history: [],
        headers: [],
        dataTable: [],
        preview: {
          data: [],
          schema: {
            fields: []
          }
        },
        graphs: [],
        comentarios: [{
          autor: "Ignacio",
          date: "1626148800",
          title: "Comentario acerca de formato tabla 1",
          descripcion: "Al revisar la columna correspondiente a la ciudad de Antofagasta"
        },
        {
          autor: "Ignacio",
          date: "1626148800",
          title: "Comentario acerca de formato tabla 2",
          descripcion: "Al revisar la columna correspondiente a la ciudad de Antofagasta"
        },
        {
          autor: "Ignacio",
          date: "1626148800",
          title: "Comentario acerca de formato tabla 3",
          descripcion: "Al revisar la columna correspondiente a la ciudad de Antofagasta"
        },
        {
          autor: "Ignacio",
          date: "1626148800",
          title: "Comentario acerca de formato tabla 4",
          descripcion: "Al revisar la columna correspondiente a la ciudad de Antofagasta"
        },
        {
          autor: "Ignacio",
          date: "1626148800",
          title: "Comentario acerca de formato tabla 5",
          descripcion: "Al revisar la columna correspondiente a la ciudad de Antofagasta"
        },
        {
          autor: "Ignacio",
          date: "1626148800",
          title: "Comentario acerca de formato tabla 6",
          descripcion: "Al revisar la columna correspondiente a la ciudad de Antofagasta"
        },
        {
          autor: "Ignacio",
          date: "1626148800",
          title: "Comentario acerca de formato tabla 7",
          descripcion: "Al revisar la columna correspondiente a la ciudad de Antofagasta"
        }],
        tab: null,
        datacollection: null,
        explorar: true,
        dialog: false,
        dialog_filter: false,
        dialog_pandas: false,
        switch_filter: false,
        previsualizacion: 0,
        tablas: [],
        selectElement: undefined,
        paginaHistorial: 1,
        paginaComentarios: 1,
        graphtab: 0,
        tab_filter: 0,
        loading_graphs: false,
        datetime_start: undefined,
        datetime_end: undefined,
        columnasaDescargar: undefined,
        error: false,
        loading: false,
        table_last_index: undefined,
        table_autor: undefined,
        table_description: undefined,
        table_licencia: undefined
      }
    },
    watch:{
      selectElement: async function(){
        this.table_url = this.tablas.filter(tabla => tabla.name == this.selectElement)[0].url
        this.table_description = this.tablas.filter(tabla => tabla.name == this.selectElement)[0].descripcion
        this.loading = true
        let commit;
        try {
          commit = (await this.axios.get("https://api.github.com/repos/MinCiencia/Datos-COVID19/commits?path="+ this.table_url.split("https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/")[this.table_url.split("https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/").length - 1] )).data
        } catch (error) {
          this.loading = false
          console.log(error)
          commit = {}
        } finally {
          this.table_last_index = commit[0].commit.committer.date
          this.loading = false
        }
      },
      dialog_filter: function(){
            this.columnasaDescargar = this.dropdownDescargas
      },
      tab_filter: function(){
        this.selectElement = this.tablas[this.tab_filter].name
      }
    },
    computed: {
      espaciosHistorial: function(){
        if (Math.floor(this.history.length / 6) == (this.history.length / 6) ){
          return this.history.length / 6
        }
        else {
          return Math.floor(this.history.length / 6) + 1
        }
      },
      selectedHistorial: function(){
         return this.history.slice(
                6 * (this.paginaHistorial - 1),
                6 * (this.paginaHistorial - 1) + 6
            );
      },
      espaciosComentarios: function(){
        if (Math.floor(this.comentarios.length / 6) == (this.comentarios.length / 6) ){
          return this.comentarios.length / 6
        }
        else {
          return Math.floor(this.comentarios.length / 6) + 1
        }
      },
      selectedComentarios: function(){
         return this.comentarios.slice(
                6 * (this.paginaComentarios - 1),
                6 * (this.paginaComentarios - 1) + 6
            );
      },
      dropdownDescargas: function(){
        return this.preview.schema.fields.map( x => x.name)
      },
      dropdownColumnas: function(){
        return this.tablas ? this.tablas.map( x => x.name) : []
      },
    },
    methods: {
      getData: async function () {
        this.loading = true
        let result;
        try {
          result = (await this.axios.get(process.env.VUE_APP_WEB_SERVER + "/dataset/" + this.$route.params.name )).data
        } catch (error) {
          result = {}
        } finally {
          this.autor = result.autor
          this.autor_imagen = process.env.VUE_APP_WEB_SERVER + "/dataset/image/" + result.autor_imagen
          this.descripcion = result.descripcion
          this.fuente = result.fuente
          this.history = result.history ? result.history : []
          this.imagen = result.imagen
          this.licencia = result.licencia
          this.nombre = result.nombre
          this.tablas = result.tablas

          this.selectElement = this.tablas ? this.tablas[0].name : undefined
          this.last_dataset = result.last_dataset
          this.index_time = result.index_time
          
      
          this.table_url = this.tablas.filter(tabla => tabla.name == this.selectElement)[0].url
          this.table_description = this.tablas.filter(tabla => tabla.name == this.selectElement)[0].descripcion
          let commit;
          try {
            commit = (await this.axios.get("https://api.github.com/repos/MinCiencia/Datos-COVID19/commits?path="+ this.table_url.split("https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/")[this.table_url.split("https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/").length - 1] )).data
          } catch (error) {
            this.loading = false
            commit = {}
          } finally {
            this.loading = false
            this.table_last_index = commit[0].commit.committer.date
            this.index_time = commit[0].commit.committer.date
            
           }
          }
      },
      getGraphs: async function () {
        this.loading_graphs = true
        let result;
        try {
          result = (await this.axios.get(process.env.VUE_APP_WEB_SERVER + "/graphs/" + this.$route.params.name )).data
        } catch (error) {
          result = {}
        } finally {
          this.loading_graphs = false
          this.graphs = result.graphs
        }
      },
      getGraph(grafico){
         console.log("Creando gráfico")
          if(this.selectedGraph[grafico]){
            return {
                labels: this.selectedGraph[grafico].index,
                datasets: [
                  {
                    label: grafico,
                    backgroundColor: '#f87979',
                    data: this.selectedGraph[grafico].data,
                  }
                ]
              }
            } return undefined

      },
      descargarDataset(){
        this.error = false
        this.loading = true
        console.log(this.table_url)
        this.axios.get(this.table_url , { params: {
              startDate:  this.datetime_start ? this.datetime_start.toDateString(): undefined,
              endDate: this.datetime_end ? this.datetime_end.toDateString() : undefined,
              columns: this.columnasaDescargar
            } 
        }).then( response => {
          console.log(response)
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', this.table_url.split("/")[this.table_url.split("/").length - 1]);
            document.body.appendChild(fileLink);
            fileLink.click();
        }).catch(error =>{
            console.log(error)  
            this.error = true
          }
        ).finally(() => {
          this.loading = false
        })
      },
      descargarConsolidado(){
        this.loading = true
        this.axios.get(process.env.VUE_APP_WEB_SERVER + "/dataset/download/" + this.$route.params.name, {responseType: 'blob'}
        ).then( response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', this.$route.params.name + ".zip");
            document.body.appendChild(fileLink);
            fileLink.click();
        }).catch(error =>{
            console.log(error)  
            this.error = true
          }
        ).finally(() => {
          this.loading = false
        })
      }
    }
}
</script>

<style>
.v-dialog__container {
    display: unset !important; 
}
.v-dialog--custom {
  width: 100% !important;
}

/* Desktop */
@media screen and (min-width: 768px) {
  .v-dialog--custom {
    width: 700px !important;
  }
}

@media screen and (max-width: 768px) {
  .list-text {
    display: none;
  }
}

.content {
  padding: 0px 200px 0px 200px;
  min-height: 400px;
    /*background: #d9d9d926;*/
    background: #d9d9d9bf;

}
.dataset-header {
  min-height: 300px;
  background: #E6E6E6;
  border-radius: 5px;
  background-size: cover;

  text-align: center;
  padding: 0 20px; 
  display: flex;
  justify-content: center;
  align-items: center;

}

.dataset-body {
  padding-left: 20px;
  padding-right: 20px;
  min-height: 200px;
  background: white;
}
.main-content {
  min-height: 300px;
  padding: 20px;
}
.right-panel {
  height: 100px;
  background: "#F2F2F2";
  padding: 20px;
  height: 100%;
}

.boton-descarga{
  background: cadetblue;
  color: white;
  width: 100px;
  margin: auto;
  border-radius: 10px;
  padding: 2px;
  cursor: pointer;
  margin-top: 3px
}

@media only screen and (max-width: 1024px) {
  .content {
    padding: 0px 0px 0px 0px;
  }
  .content-home {
    padding: 0px 30px 0px 30px;
  }
}
.explorar-header{
  margin: auto;
  text-align: left;
  border-radius: 10px;
  padding: 2px;
  cursor: pointer;
  margin-top: 3px;
}
.v-timeline--dense:before { 
  right: auto;
  left: 47px; 
}
.v-data-table-header-mobile {
  display: none !important;
}
.select-element {
  background: #e6e6e6 !important;
  cursor: pointer;
}
.normal-element {
  cursor: pointer;
}
body {
    overflow-x: hidden;
    width: 100%;
}
@media only screen and (min-width: 1024px) {
  .time-panel {
    min-height: 600px;
  }
}


</style>
