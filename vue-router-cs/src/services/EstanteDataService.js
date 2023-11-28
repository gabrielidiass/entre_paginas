
import http from "../http-common";

class EstanteDataService {

    async authenticate(data){

        console.log('EstanteDataService.authenticate: ', data);
        const response = await http.post(`/loginestante`, data);
        return response;
    }

    async get(nome){

        console.log('EstanteDataService.get: ', nome);
        return await http.get('/estante'+nome);
    }

    async list(){

        console.log('EstanteDataService.list: ');
        return await http.get(`/estante/list`);
    }

    async delete(nome){

        console.log('EstanteDataService.delete: ', nome);
        return await http.delete(`/estante/delete`+nome);
    }

    async update(data){

        console.log('EstanteDataService.update: ', data);
        return await http.post(`/estante/update`, data);
    }
    
    async create(data){

        console.log('EstanteDataService.create: ', data);
        return await http.post(`/estante/store`, data);

    }  

}
export default new EstanteDataService();
