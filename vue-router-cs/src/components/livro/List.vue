<template>
    <div id="tab_aut">
     
        <H1>NAO TESTEI</H1>

        <div class="col-md-6">
            <h4>Listagem de livro</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Autor</th>   
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(l, indice) in livro" :key ="l.nome" :class="{ active: indice == currentIndex }">
                            <td>{{l.nome}}</td>
                            <td>{{l.autor}}</td>
                            <td><button v-on:click="setCurrentlivro(l, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remLivro(l, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentlivro">
                    <h4>Livros</h4>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentlivro.nome }}
                    </div>
                    <div>
                    <label><strong>Autor</strong></label> {{ currentlivro.autor.nome }}
                    </div>
                    <div>
                    </div>

                    <a class="badge badge-warning"
                    :href="'/livro/' + currentlivro.nome"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a book...</p>
                <router-link to="/addlivro" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import LivroDataService from '../../services/LivroDataService'     
 
     export default{
      name:'listLivro',
      data() {
             return {
                 livro: [],
                 currentlivro: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarlivro(){

                LivroDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticatelivro", response.status);

                   this.livro = response.data;
                   console.log(this.livro.autor);

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listLivro');
                    console.log(response);
                });
            },
            setCurrentlivro(livro, index){

                this.currentlivro = livro;
                this.currentIndex = index;
            },
            remLivro(livro){

LivroDataService.delete(livro.id)
.then(response => {
    console.log(response.data);
    this.refreshList();
})
.catch(e => {
    console.log(e);
});

},
            refreshList() {
                this.listarlivro();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarlivro();
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
 