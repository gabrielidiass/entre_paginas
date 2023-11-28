import http from "../http-common";
class LivroDataService {
    async authenticate(data){
        console.log('LivroDataService.authenticate: ', data);
        const response = await http.post(`/loginlivro`, data);
        return response;
    }
    async get(nome){
        console.log('LivroDataService.get: ', nome);
        return await http.get('/livro/'+nome);
    }
    async list(){
        console.log('LivroDataService.list: ');
        return await http.get(`/livro/list`);
    }
    async delete(data){
        console.log('LivroDataService.delete: ', data);
        return await http.delete(`/livro/delete/`+data);
    }
    async update(data){
        console.log('LivroDataService.update: ', data);
        return await http.post(`/update/livro`, data);
    }
    async create(data){
        console.log('LivroDataService.create: ', data);
        return await http.post(`/livro/store`, data);
    }  
}
export default new LivroDataService();
