import {request, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Funcionario from '../models/Funcionario';

class FuncionarioController {
    async list(req: Request, res: Response){
        const repository = getRepository(Funcionario);
        const lista = await repository.find();
        return res.json(lista);
    }
    async store(req: Request, res: Response){
        const repository = getRepository(Funcionario);
        const end = repository.create(req.body)
        await repository.save(end)
        return res.json(end)
    }
    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Funcionario);
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

    async update(req: Request, res: Response){
    
        const repository = getRepository(Funcionario);//recupera o repositorio do Livro.
    
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
    
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id.
        
        if(!idExists){
            return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Livro
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
    }


    async login(req: Request, res: Response){
        const repository = getRepository(Funcionario);
        const {cpf, senha} = req.body;
        const j = await repository.findOne({where : {"cpf" : cpf , "senha" : senha}});
        if(j){
            return res.json(j)
        }else{
            return res.sendStatus(204);
        }
    }

    async find(req: Request, res: Response){
        const repository = getRepository(Funcionario);
        const id = req.params.id;
        const j = await repository.findOne({where : {"id" : id}});
        if(j){
            return res.json(j)
        }else{
            return res.sendStatus(204);
        }
    }
}

export default new FuncionarioController();