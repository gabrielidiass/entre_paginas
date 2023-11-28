
import http from "../http-common";

class AutorDataService {
    async get(nome){

        console.log('AutorDataService.get: ', nome);
        return await http.get('/autor/'+nome);
    }

    async list(){

        console.log('AutorDataService.list: ');
        return await http.get(`/autor/list`);
    }

    async delete(data){
        console.log('AutorDataService.delete: ', data);
        return await http.delete(`/autor/delete/` + data);
    }

    async update(data){

        console.log('AutorDataService.update: ', data);
        return await http.put(`/autor/update`, data);
    }
    
    async create(data){

        console.log('AutorDataService.create: ', data);
        return await http.post(`/autor/store`, data);

    }  

}
export default new AutorDataService();
