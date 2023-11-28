<template>
    <div class="submit-form">
      <div v-if="!submitted">       
        <div class="form-group">
            <label for="inputCpf">CPF:</label>
            <input type="text" v-model="funcionario.cpf" class="form-control" id="inputCpf">
        </div>
        <div class="form-group">
            <label for="inputSenha">Senha:</label>
            <input type="password" v-model="funcionario.senha" class="form-control" id="inputSenha">
        </div>            
        <div class="form-group">
                <label for="inputNome">Nome: </label>
                <input type="number" v-model="funcionario.nome" class="form-control" id="inputNome">
        </div>
        <div class="form-group">
            <label for="inputCtps">CTPS: </label>
            <input type="number" v-model="funcionario.ctps" class="form-control" id="inputCtps">
        </div>
        <div class="form-group">
            <label for="inputsalario">Salário:</label>
            <input type="text" v-model="funcionario.salario" class="form-control" id="inputsalario">
        </div>
       
  
        <button @click="saveFuncionario" class="btn btn-success">Salvar</button>
        <router-link to="/funcionario" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newFuncionario">Novo</button>
        <router-link to="/funcionario" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import FuncionarioDataService from '../../services/FuncionarioDataService'

    export default {
        name: "addfuncionario",
        data(){
            return {
                funcionario: {indice: '', 
                                    cpf: '', 
                                    senha: '',
                                    nome: '', 
                                    ctps: '',                                                                        
                                    salario: ''
                                },
                submitted: false,
            }            
        },
        methods: {

            saveFuncionario(){

                var func = jQuery.extend({}, this.funcionario);//clona o this.novo_funcionario e armazena na variavel funcionario. dessa forma alteracoes em this.novo_funcionario nao irao refletir em funcionario.

                if (func.cpf.trim().length > 0 && func.senha.trim().length > 0 && 
                        func.nome > 0 && func.ctps > 0 && 
                        func.salario > 0 ) {
                
                    FuncionarioDataService.create(func)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newFuncionario(){

                this.submitted = false;
                this.funcionario = {};
            }
           
        }
    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>