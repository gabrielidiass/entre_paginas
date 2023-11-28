
import http from "../http-common";

class EditoraDataService {

    async authenticate(data){

        console.log('EditoraDataService.authenticate: ', data);
        const response = await http.post(`/logineditora`, data);
        return response;
    }

    async get(nome){

        console.log('EditoraDataService.get: ', nome);
        return await http.get('/editora'+nome);
    }

    async list(){

        console.log('EditoraDataService.list: ');
        return await http.get(`/editora/list`);
    }

    async delete(nome){

        console.log('EditoraDataService.delete: ', nome);
        return await http.delete(`/editora/delete`+nome);
    }

    async update(data){

        console.log('EditoraDataService.update: ', data);
        return await http.post(`/editora/update`, data);
    }
    
    async create(data){

        console.log('EditoraDataService.create: ', data);
        return await http.post(`/editora/store`, data);

    }  

}
export default new EditoraDataService();
