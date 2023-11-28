<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Funcionarios</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">CTPS</th>
                    <th scope="col">Salário</th> 
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(f, indice) in funcionarios" :key ="f.nome" :class="{ active: indice == currentIndex }">
                            <td>{{f.nome}}</td>
                            <td>{{f.cpf}}</td>
                            <td>{{f.ctps}}</td>
                            <td>{{f.salario}}</td>
                            <td><button v-on:click="setCurrentfuncionario(f, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remfuncionario(f, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentfuncionario">
                    <h4>Funcionario</h4>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentfuncionario.nome }}
                    </div>
                    <div>
                    <label><strong>CPF:</strong></label> {{ currentfuncionario.cpf }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/funcionario/' + currentfuncionario.nome"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Func...</p>
                <router-link to="/addfuncionario" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import FuncionarioDataService from '../../services/FuncionarioDataService'     
 
     export default{
      name:'listfuncionarios',
      data() {
             return {
                 funcionarios: [],
                 currentfuncionario: null,
                 currentIndex: 0
             }
         },
         methods: {
            listarfuncionarios(){

                FuncionarioDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticatefuncionario", response.status);

                   this.funcionarios = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listfuncionario');
                    console.log(response);
                });
            },
            setCurrentfuncionario(funcionario, index){

                this.currentfuncionario = funcionario;
                this.currentIndex = index;
            },
            remfuncionario(funcionario, index){

                FuncionarioDataService.delete(funcionario.nome)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarfuncionarios();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarfuncionarios();
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