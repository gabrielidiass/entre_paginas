<template>
    <div id="tab_aut">
     
        <H1>NAO TESTEI</H1>

        <div class="col-md-6">
            <h4>Listagem de Autores</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Nacionalidade</th>   
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(a, indice) in autor" :key ="a.nome" :class="{ active: indice == currentIndex }">
                            <td>{{a.nome}}</td>
                            <td>{{a.nacionalidade}}</td>
                            <td><button v-on:click="setCurrentautor(a, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remautor(a, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentautor">
                    <h4>Autores</h4>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentautor.nome }}
                    </div>
                    <div>
                    <label><strong>Nacionalidade</strong></label> {{ currentautor.nacionalidade }}
                    </div>
                    <div>
                    </div>

                    <a class="badge badge-warning"
                    :href="'/autor/' + currentautor.nome"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a book...</p>
                <router-link to="/addautor" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import AutorDataService from '../../services/AutorDataService'     
 
     export default{
      name:'listautor',
      data() {
             return {
                 autor: [],
                 currentautor: null,
                 currentIndex: 0
             }
         },
         methods: {
            listarautor(){

                AutorDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateautor", response.status);

                   this.autor = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listautor');
                    console.log(response);
                });
            },
            setCurrentautor(autor, index){

                this.currentautor = autor;
                this.currentIndex = index;
            },
            remAutor(Autor, index){

AutorDataService.delete(Autor.id)
.then(response => {
    console.log(response.data);
    this.refreshList();
})
.catch(e => {
    console.log(e);
});

},
            refreshList() {
                this.listarautor();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarautor();
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