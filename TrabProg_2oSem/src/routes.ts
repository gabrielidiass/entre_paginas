import {Router} from 'express';
import AutorController from './app/controllers/AutorController';
import EditoraController from './app/controllers/EditoraController';
import LivroController from './app/controllers/LivroController';
import EstanteController from './app/controllers/EstanteController';
import FuncionarioController from './app/controllers/FuncionarioController';


const router = Router();

//http://localhost:3000//list

router.get('/livro/list', LivroController.list);
router.post('/livro/store', LivroController.store);
router.delete('/livro/delete/:id', LivroController.delete);
router.put('/livro/update', LivroController.update);


router.get('/editora/list', EditoraController.list);
router.post('/editora/store', EditoraController.store);
router.delete('/editora/delete/:id', EditoraController.delete);
router.put('/editora/update', EditoraController.update);

router.get('/autor/list', AutorController.list);
router.post('/autor/store', AutorController.store);
router.delete('/autor/delete/:id', AutorController.delete);
router.put('/autor/update', AutorController.update);

router.get('/estante/list', EstanteController.list);
router.post('/estante/store', EstanteController.store);
router.delete('/estante/delete/:id', EstanteController.delete);
router.put('/estante/update', EstanteController.update);


router.get('/funcionario/list', FuncionarioController.list);
router.post('/funcionario/store', FuncionarioController.store);
router.delete('/funcionario/delete/:id', FuncionarioController.delete);
router.put('/funcionario/update', FuncionarioController.update);
router.post('/loginfuncionario', FuncionarioController.login);


router.get('/editora/:id', EditoraController.find);
router.get('/autor/:id', AutorController.find);
router.get('/estante/:id', EstanteController.find);
router.get('/funcionario/:id', FuncionarioController.find);
router.get('/livro/:id', LivroController.find);


export default router;