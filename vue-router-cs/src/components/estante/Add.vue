<template>
    <div class="submit-form">
        <h1>NAO TESTEI
            CONFIGURADO
            USAR DE TEMPLATE PRA OUTROS
        </h1>
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="estante.nome" class="form-control" id="inputNome">
        </div>
        <div class="form-group">
            <label for="selectLivro">Livros:</label>
            <select v-model="estante.livros" class="form-control" id="selectLivro" multiple>                                
                <option v-for="l in livros" :key ="l.codigo" v-bind:value="l">
                    {{ l.nome }}
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
  
        <button @click="saveEstante" class="btn btn-success">Salvar</button>
        <router-link to="/estante" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newestante">Novo</button>
        <router-link to="/estante" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import EstanteDataService from '../../services/EstanteDataService'
    import LivroDataService from '../../services/LivroDataService';

    export default {
        name: "addestante",
        data(){
            return {
                estante: {
                    indice: '', 
                    nickname: '', 
                    livros: []
                },
                submitted: false,
                livros: []
            }            
        },
        methods: {
            saveEstante(){
                
                var est = jQuery.extend({}, this.estante);//clona o this.novo_estante e armazena na variavel estante. dessa forma alteracoes em this.novo_estantenao irao refletir em jogador.
                if (est.nome.trim().length > 0) { //Testa se o nome do item é maior que 0
                    EstanteDataService.create(est) // cria o item
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
            newEstante(){
                this.submitted = false;
                this.estante= {};
            },
            listLivros(){
               LivroDataService.list().then(response =>{
                console.log("Retorno do seviço LivroDataService.list", response.status);
                for(let j of response.data){
                    this.livros.push(j);
                }                  
                }).catch(response => {
                // error callback
                alert('Não conectou no serviço LivroDataService.list');
                console.log(response);
                });               
            }},
        mounted() {                        
            this.listLivros();  
         }}
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>