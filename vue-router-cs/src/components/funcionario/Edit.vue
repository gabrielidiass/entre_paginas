<template>
    <div id="tab_aut">
     
       <div v-if="currentFuncionario" class="edit-form">
            <h3>Funcionario</h3>
            <form>
                <div class="form-group">
                    <label for="inputCpf">CPF:</label>
                    <input type="text" v-model="currentFuncionario.cpf" class="form-control" id="inputCpf">
                </div>
                <div class="form-group">
                    <label for="inputSenha">Senha:</label>
                    <input type="password" v-model="currentFuncionario.senha" class="form-control" id="inputSenha">
                </div>
                <div class="form-group">
                        <label for="inputNome">Nome:</label>
                        <input type="text" v-model="currentFuncionario.nome" class="form-control" id="inputNome" >
                </div>
                <div class="form-group">
                    <label for="inputCtps">CTPS:</label>
                    <input type="text" v-model="currentFuncionario.ctps" class="form-control" id="inputCtps" >
                </div>
                <div class="form-group">
                        <label for="inputSalario">Salário:</label>
                        <input type="number" v-model="currentFuncionario.salario" class="form-control" id="inputSalario">
                </div>
            </form>

            <button class="badge badge-success" @click="updateFuncionario">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteFuncionario">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Funcionario...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import FuncionarioDataService from '../../services/FuncionarioDataService'
 
     export default{
      name:'editFuncionarios',
      data() {
             return {                
                 currentFuncionario: null,
                 message: ''             }
         },
         methods: {

            getFuncionario(cpf){

                FuncionarioDataService.get(cpf)
                .then(response => {
                    console.log(response.data);
                    this.currentFuncionario = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateFuncionario(){

                FuncionarioDataService.update(this.currentFuncionario)
                .then(response => {
                    console.log('FuncionarioDataService.update');
                    this.message = 'Funcionario alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteFuncionario(){

                FuncionarioDataService.delete(this.currentTutorial.cpf)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "Funcionarioes-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "Funcionarios-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getFuncionarios(this.$route.params.cpf);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>