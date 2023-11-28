<template>
    <div class="submit-form">
        <h1>NAO TESTEI
            CONFIGURADO
            USAR DE TEMPLATE PRA OUTROS
        </h1>
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="editora.nome" class="form-control" id="inputNome">
        </div>
        <div class="form-group">
            <label for="inputCnpj">CNPJ:</label>
            <input type="text" v-model="editora.cnpj" class="form-control" id="inputCnpj">
        </div>
        <div class="form-group">
            <label for="selectLivro">Livros:</label>
            <select v-model="editora.livros" class="form-control" id="selectLivro" multiple>                                
                <option v-for="l in livros" :key ="l.codigo" v-bind:value="l">
                    {{ l.nome }}
                    </option>
            </select>
            
        </div>     
  
        <button @click="saveeditora" class="btn btn-success">Salvar</button>
        <router-link to="/editoras" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="neweditora">Novo</button>
        <router-link to="/editoras" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import EditoraDataService from '../../services/EditoraDataService'
    import LivroDataService from '../../services/LivroDataService';

    export default {
        name: "addeditora",
        data(){
            return {
                editora: {
                    indice: '', 
                    nome: '', 
                    cnpj:'',
                    livros: []
                    },
                submitted: false,
                livros: []
            }            
        },
        methods: {
            saveeditora(){
                var liv = jQuery.extend({}, this.editora);//clona o this.novo_editora e armazena na variavel editora. dessa forma alteracoes em this.novo_editoranao irao refletir em jogador.
                if (liv.nome.trim().length > 0) { //Testa se o nome do item é maior que 0
                    EditoraDataService.create(liv) // cria o item
                    .then(response => {
                        this.submitted = true;  // testa se foi cadastrado
                        console.log("item cadastrado");
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);
                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            neweditora(){
                this.submitted = false;
                this.editora= {};
            },
            listlivros(){
               LivroDataService.list().then(response =>{
                console.log("Retorno do seviçoLivroDataService.list", response.status);
                for(let j of response.data){
                    this.livros.push(j);
                }                  
                }).catch(response => {
                // error callback
                alert('Não conectou no serviçoLivroDataService.list');
                console.log(response);
                });               
            }},
        mounted() {                        
            this.listlivros();  
         }}
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>