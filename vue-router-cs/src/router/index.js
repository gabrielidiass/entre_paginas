import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'

import listFuncionarios from  '@/components/funcionario/List'
import editFuncionario   from  '@/components/funcionario/Edit'
import novoFuncionario   from  '@/components/funcionario/Add'

import listEditora from  '@/components/editora/List'
import editEditora   from  '@/components/editora/Edit'
import novoEditora   from  '@/components/editora/Add'

import listLivro from  '@/components/livro/List'
import editLivro   from  '@/components/livro/Edit'
import novoLivro   from  '@/components/livro/Add'

import listAutor from  '@/components/autor/List'
import editAutor   from  '@/components/autor/Edit'
import novoAutor   from  '@/components/autor/Add'

import listEstante from  '@/components/estante/List'
import editEstante   from  '@/components/estante/Edit'
import novoEstante   from  '@/components/estante/Add'



Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    //LOGIN
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    //FUNCIONARIO
    {
      path: '/funcionario',
      name: 'funcionarios-list',
      component: listFuncionarios    
    },
    {
      path: '/funcionario/:nome',
      name: "funcionario-edit",
      component: editFuncionario
    },
    {
      path: '/addfuncionario',
      name: "funcionario-add",
      component: novoFuncionario
    },
    //EDITORA
    {
      path: '/editora',
      name: 'editoras-list',
      component: listEditora    
    },
    {
      path: '/editora/:nome',
      name: "editora-edit",
      component: editEditora
    },
    {
      path: '/addeditora',
      name: "editora-add",
      component: novoEditora
    },
    //LIVRO
    {
      path: '/livro',
      name: 'livros-list',
      component: listLivro    
    },
    {
      path: '/livro/:nome',
      name: "livro-edit",
      component: listLivro
    },  
    {
      path: '/livro/delete/',
      name: "livro-rem",
      component: listLivro
    },
    {
      path: '/addlivro',
      name: "livro-add",
      component: novoLivro
    },
    //AUTOR
    {
      path: '/autor',
      name: 'autores-list',
      component: listAutor    
    },
    {
      path: '/autor/update/',
      name: "autor-edit",
      component: editAutor
    },
    {
      path: '/addautor',
      name: "autor-add",
      component: novoAutor
    },
    {
      path: '/autor/delete/:id',
      name: "autor-delete",
      component: novoAutor
    },
    //ESTANTE
    {
      path: '/estante',
      name: 'estantes-list',
      component: listEstante    
    },
    {
      path: '/Estante/:nome',
      name: "Estante-edit",
      component: editEstante
    },
    {
      path: '/addestante',
      name: "estante-add",
      component: novoEstante
    }

  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;