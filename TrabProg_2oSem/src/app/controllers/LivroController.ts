import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Livro from '../models/Livro';
import Autor from '../models/Autor';

class LivroController{

    async find(req: Request, res: Response){
        const repository = getRepository(Livro);

        const id = req.params.id;

        const j = await repository.createQueryBuilder('tb_livro').where({"id" : id}).leftJoinAndSelect("tb_livro.autor", "autor").getOne();

        if(j){     
            console.log(j);      
            return res.json(j);
        }else{
            return res.sendStatus(204);
        }
    }

    async list(req: Request, res: Response){
        const repository = getRepository(Livro);
        const lista = await repository.createQueryBuilder('tb_livro').leftJoinAndSelect("tb_livro.autor", "autor").getMany();
        return res.json(lista);
    }

    async delete(req: Request, res: Response){

        const repository = getRepository(Livro);//recupera o repositorio do Livro.
        
        const id = req.params.id;
        
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id da mensagem.

        if(idExists){
        
            await repository.remove(idExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        
        }else{
        
            return res.sendStatus(404);//se nao encontrar Livro para remover, retorna o codigo 404.
        }
    }

    async update(req: Request, res: Response){
    
        const repository = getRepository(Livro);//recupera o repositorio do Livro.
    
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
    
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id.
        
        if(!idExists){
            return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Livro
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
    }

    async store(req: Request, res: Response){
        const repository = getRepository(Livro);
        const {id} = req.body;
        const idExists = await repository.findOne({where : {id}});
        if(!idExists){ 
            const j = repository.create(req.body); 
            await repository.save(j);
            return res.json(j);
        }else{
            return res.sendStatus(409);
        }
    }



}

export default new LivroController();