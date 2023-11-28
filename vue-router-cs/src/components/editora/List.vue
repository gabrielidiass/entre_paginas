<template>
    <div id="tab_aut">
     
        <H1>NAO TESTEI</H1>

        <div class="col-md-6">
            <h4>Listagem de Editoras</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Cnpj</th>   
                    <th scope="col">Livros</th>   
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(e, indice) in editora" :key ="e.nome" :class="{ active: indice == currentIndex }">
                            <td>{{e.nome}}</td>
                            <td>{{e.cnpj}}</td>
                            <td>{{e.livros.nome}}</td>
                            <td><button v-on:click="setCurrenteditora(e, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remeditora(e, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currenteditora">
                    <h4>Editoras</h4>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currenteditora.nome }}
                    </div>
                    <div>
                    <label><strong>CNPJ</strong></label> {{ currenteditora.cnpj }}
                    </div>
                    <div>
                    <label><strong>Livros</strong></label> {{ currenteditora.livro.nome }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/editora/' + currenteditora.nome"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a editora...</p>
                <router-link to="/addeditora" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import EditoraDataService from '../../services/EditoraDataService'     
 
     export default{
      name:'listeditora',
      data() {
             return {
                 editora: [],
                 currenteditora: null,
                 currentIndex: 0
             }
         },
         methods: {
            listareditora(){

                EditoraDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateeditora", response.status);

                   this.editora = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listeditora');
                    console.log(response);
                });
            },
            setCurrenteditora(editora, index){

                this.currenteditora = editora;
                this.currentIndex = index;
            },
            remeditora(editora, index){

                EditoraDataService.delete(editora.nickname)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listareditora();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listareditora();
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