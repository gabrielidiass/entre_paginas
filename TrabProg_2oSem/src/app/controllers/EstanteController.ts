import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Estante from '../models/Estante';

class EstanteController {
    async list(req: Request, res: Response){
        const repository = getRepository(Estante);
        const lista = await repository.createQueryBuilder('tb_estante').leftJoinAndSelect("tb_estante.livros", "livros").getMany();

        return res.json(lista);
    }

    
    //metodos para adicao, alteração, remoção
    async store(req: Request, res: Response){
        const repository = getRepository(Estante);
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

    async update(req: Request, res: Response){
    
        const repository = getRepository(Estante);//recupera o repositorio do Livro.
    
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
    
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id.
        
        if(!idExists){
            return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Livro
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
    }

    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Estante);
            const {id} = req.body;
            const end = await repository.findOne({where : {"id" : id }});
            if(end){
                await repository.remove(end);
                return res.sendStatus(204);
            }else{
                return res.sendStatus(404);
            }
        }catch(e:unknown){
        
            console.log(e);
            return res.sendStatus(500);
        }

        }

        async find(req: Request, res: Response){
            const repository = getRepository(Estante);
    
            const id = req.params.id;
    
            const j = await repository.createQueryBuilder('tb_estante').where({"id" : id}).leftJoinAndSelect("tb_estante.livros", "livros").getOne();
    
            if(j){     
                console.log(j);      
                return res.json(j);
            }else{
                return res.sendStatus(204);
            }
      }
    
}

export default new EstanteController();