<template>
    <div id="tab_aut">
       <div v-if="currentEditora" class="edit-form">
        <H1>NAO TESTEI PC RUIM</H1>
            <h3>Editora</h3>
            <form>
                <div class="form-group">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="currentEditora.nome" class="form-control" id="inputNome">
                </div>
                <div class="form-group">
                    <label for="inputCnpj">CNPJ:</label>
                    <input type="text" v-model="currentEditora.cpnj" class="form-control" id="inputCnpj">
                </div>
                <div class="form-group">
                    <label for="selectAutor">Livros:</label>
                    <select v-model="currentEditora.livros" class="form-control" id="selectLivro" multiple>                                
                        <option v-for="l in livros" :key ="l.codigo" v-bind:value="l">
                            {{ l.nome }}
                            </option>
                    </select>
                    
                </div>                                  
            </form>
            <button class="badge badge-success" @click="updateEditora">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteEditora">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Editora...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import EditoraDataService from '../../services/EditoraDataService'
    //  import LivroDataService from '../../services/LivroDataService'
 
     export default{
      name:'editEditora',
      data() {
             return {                
                 currentEditora: null,
                 message: '',
                 autor: []
             }
         },
         methods: {
            getEditora(nome){
                EditoraDataService.get(nome)
                .then(response => {
                    console.log(response.data);
                    this.currentEditora = response.data;
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            listLivros(){
                AutorDataService.list().then(response =>{
                    console.log("Retorno do seviço AutorDataService.list", response.status);
                    this.autor = response.data;                                  
                }).catch(response => {
                // error callback
                alert('Não conectou no serviço AutorDataService.list');
                console.log(response);
                });               
            },
            updateEditora(){
                EditoraDataService.update(this.currentEditora)
                .then(response => {
                    console.log('EditoraDataService.update');
                    this.message = 'Editora alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteEditora(){
                EditoraDataService.delete(this.currentTutorial.nome)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "editoras-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "editoras-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.listLivros();
            this.getEditoras(this.$route.params.nome);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>