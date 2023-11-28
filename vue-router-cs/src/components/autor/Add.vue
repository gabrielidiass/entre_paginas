<template>
    <div class="submit-form">
        <h1>FUNCIONANDO</h1>
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="autor.nome" class="form-control" id="inputNome">
        </div>
        <div class="form-group">
            <label for="inputNacionalidade">Nacionalidade:</label>
            <input type="text" v-model="autor.nacionalidade" class="form-control" id="inputNacionalidade">
        </div>

        <button @click="saveAutor" class="btn btn-success">Salvar</button>
        <router-link to="/autores" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newAutor">Novo</button>
        <router-link to="/autores" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

import AutorDataService from '../../services/AutorDataService'

export default {
    name: "addAutor",
    data(){
        return {
            autor: {
                indice: '', 
                nome: '', 
                nacionalidade:''
                },
            submitted: false,
        }            
    },
    methods: {
        saveAutor(){
            var liv = jQuery.extend({}, this.autor);//clona o this.novo_Autor e armazena na variavel Autor. dessa forma alteracoes em this.novo_Autornao irao refletir em jogador.
           console.log(liv.nome);
           console.log("chegou");
            if (liv.nome.trim().length > 0) { //Testa se o nome do item é maior que 0
                AutorDataService.create(liv) // cria o item
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
        newAutor(){
            this.submitted = false;
            this.autor= {indice: '',
        nome: '',
        nacionalidade: ''};
        },
        listAutores(){
           AutorDataService.list().then(response =>{
            console.log("Retorno do seviçoAutorDataService.list", response.status);
            for(let j of response.data){
                this.autor.push(j);
            }                  
            }).catch(response => {
            // error callback
            alert('Não conectou no serviçoAutorDataService.list');
            console.log(response);
            });               
        }}
    }
</script>
<style>
.submit-form {
max-width: 300px;
margin: auto;
}
</style>