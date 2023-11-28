<template>
    <div class="submit-form">
        <h1>NAO TESTEI
            CONFIGURADO
            USAR DE TEMPLATE PRA OUTROS
        </h1>
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="livro.nome" class="form-control" id="inputNome">
        </div>
        <div class="form-group">
            <label for="selectAutor">Autores:</label>
            <select v-model="livro.autores" class="form-control" id="selectAutor" multiple>                                
                <option v-for="a in autores" :key ="a.codigo" v-bind:value="a">
                    {{ a.nome }}
                    </option>
            </select>
            
        </div>     

        <!-- <div class="form-group">
            <label for="selectPatente">Patentes:</label>
            <select v-model="jogador.patentes" class="form-control" id="selectPatente" multiple>                                
                <option v-for="p in patentes" :key ="p.codigo" v-bind:value="p">
                    {{ p.nome }}
                    </option>
            </select>
            
        </div> -->
  
        <button @click="saveLivro" class="btn btn-success">Salvar</button>
        <router-link to="/livro" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newLivro">Novo</button>
        <router-link to="/livro" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import LivroDataService from '../../services/LivroDataService'
    import AutorDataService from '../../services/AutorDataService';

    export default {
        name: "addLivro",
        data(){
            return {
                livro: {
                    indice: '', 
                    nickname: '', 
                    autores: []
                },
                submitted: false,
                autores: []
            }            
        },
        methods: {
            saveLivro(){
                
                var liv = jQuery.extend({}, this.livro);//clona o this.novo_livro e armazena na variavel livro. dessa forma alteracoes em this.novo_livronao irao refletir em jogador.
                if (liv.nome.trim().length > 0) { //Testa se o nome do item é maior que 0
                    LivroDataService.create(liv) // cria o item
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
            newLivro(){
                this.submitted = false;
                this.livro= {};
            },
            listAutores(){
               AutorDataService.list().then(response =>{
                console.log("Retorno do seviço AutorDataService.list", response.status);
                for(let j of response.data){
                    this.autores.push(j);
                }                  
                }).catch(response => {
                // error callback
                alert('Não conectou no serviço AutorDataService.list');
                console.log(response);
                });               
            }},
        mounted() {                        
            this.listAutores();  
         }}
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>