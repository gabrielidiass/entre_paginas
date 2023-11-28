<template>
    <div id="tab_aut">
     
        <H1>NAO TESTEI</H1>

        <div class="col-md-6">
            <h4>Listagem de Estante</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Livros</th>   
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(e, indice) in estante" :key ="e.nome" :class="{ active: indice == currentIndex }">
                            <td>{{e.nome}}</td>
                            <td>{{e.livros.nome}}</td>
                            <td><button v-on:click="setCurrentestante(e, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remEstante(l, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentestante">
                    <h4>Estantes</h4>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentestante.nome }}
                    </div>
                    <div>
                    <label><strong>Livros</strong></label> {{ currentestante.livros.nome }}
                    </div>
                    <div>
                    </div>

                    <a class="badge badge-warning"
                    :href="'/estante/' + currentestante.nome"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a book...</p>
                <router-link to="/addestante" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import EstanteDataService from '../../services/EstanteDataService'     
 
     export default{
      name:'listestante',
      data() {
             return {
                 estante: [],
                 currentestante: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarEstante(){

                EstanteDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateestante", response.status);

                   this.estante = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listestante');
                    console.log(response);
                });
            },
            setCurrentestante(estante, index){

                this.currentestante = estante;
                this.currentIndex = index;
            },
            remEstante(estante, index){

                EstanteDataService.delete(estante.nickname)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarEstante();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarEstante();
         }
 
     }
 </script>
    
 <style scoped>

    .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    }

     
 </style>