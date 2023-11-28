
import http from "../http-common";

class FuncionarioDataService {

    async authenticate(data){

        console.log('FuncionarioDataService.authenticate: ', data);
        const response = await http.post(`/loginfuncionario`, data);
        return response;
    }

    async get(nome){

        console.log('FuncionarioDataService.get: ', nome);
        return await http.get('/funcionario'+nome);
    }

    async list(){

        console.log('FuncionarioDataService.list: ');
        return await http.get(`/funcionario/list`);
    }

    async delete(nome){

        console.log('FuncionarioDataService.delete: ', nome);
        return await http.delete(`/funcionario/delete`+nome);
    }

    async update(data){

        console.log('FuncionarioDataService.update: ', data);
        return await http.post(`/funcionario/update`, data);
    }
    
    async create(data){

        console.log('FuncionarioDataService.create: ', data);
        return await http.post(`/funcionario/store`, data);

    }  

}
export default new FuncionarioDataService();
