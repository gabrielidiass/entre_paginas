import {request, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Pessoa from '../models/Pessoa';

class PessoaController {

    async list(req: Request, res: Response){
        const repository = getRepository(Pessoa);
        const lista = await repository.find();
        return res.json(lista);
    }
    async store(req: Request, res: Response){
        const repository = getRepository(Pessoa);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }
    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Pessoa);
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
        const repository = getRepository(Pessoa);//recupera o repositorio do jogador.
        const {id, nome} = req.body;//extrai os atributos nickname e endereco do corpo da mensagem.
    
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname da mensagem.
        const nomeExists = await repository.findOne({where :{nome}});
        
        if(!nomeExists || !idExists || !idExists){
                return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Jogador
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
    }

    async login(req: Request, res: Response){
    
        const repository = getRepository(Pessoa);
        const {cpf, senha} = req.body;

        const j = await repository.findOne({where : {"cpf" : cpf , "senha" : senha}});

        if(j){
           // res.sendStatus(201);
            return res.json(j)
        }else{
            return res.sendStatus(204);
        }
    }

    async find(req: Request, res: Response){
    
        const repository = getRepository(Pessoa);
        const id = req.params.id;

        const j = await repository.findOne({where : {"id" : id}});

        if(j){
            return res.json(j)
        }else{
            return res.sendStatus(204);
        }
    }
}

export default new PessoaController();