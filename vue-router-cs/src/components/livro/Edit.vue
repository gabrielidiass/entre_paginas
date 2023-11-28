<template>
    <div id="tab_aut">
       <div v-if="currentLivro" class="edit-form">
        <H1>NAO TESTEI PC RUIM</H1>
            <h3>Livro</h3>
            <form>
                <div class="form-group">
                    <label for="inputNome">nome:</label>
                    <input type="text" v-model="currentLivro.nome" class="form-control" id="inputNome">
                </div>
                <div class="form-group">
                    <label for="selectAutor">autores:</label>
                    <select v-model="currentLivro.autores" class="form-control" id="selectAutor" multiple>                                
                        <option v-for="a in autores" :key ="a.codigo" v-bind:value="a">
                            {{ a.nome }}
                            </option>
                    </select>
                    
                </div>                        
            </form>
            <button class="badge badge-success" @click="updateLivro">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteLivro">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Livro...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import LivroDataService from '../../services/LivroDataService'
     import AutorDataService from '../../services/AutorDataService'
 
     export default{
      name:'editLivros',
      data() {
             return {                
                 currentLivro: null,
                 message: '',
                 autor: []
             }
         },
         methods: {
            getLivro(nome){
                LivroDataService.get(nome)
                .then(response => {
                    console.log(response.data);
                    this.currentLivro = response.data;
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            listAutores(){
                AutorDataService.list().then(response =>{
                    console.log("Retorno do seviço AutorDataService.list", response.status);
                    this.autor = response.data;                                  
                }).catch(response => {
                // error callback
                alert('Não conectou no serviço AutorDataService.list');
                console.log(response);
                });               
            },
            updateLivro(){
                LivroDataService.update(this.currentLivro)
                .then(response => {
                    console.log('LivroDataService.update');
                    this.message = 'Livro alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteLivro(){
                LivroDataService.delete(this.currentTutorial.nome)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "livros-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "livros-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.listAutores();
            this.getLivro(this.$route.params.nome);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>