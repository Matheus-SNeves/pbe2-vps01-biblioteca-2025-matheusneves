const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

const Livro = require('./controllers/controllerlivro');
const Emprestimo = require('./controllers/controllerEmprestimo');
const Aluno = require('./controllers/controlleraluno');

routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:ra', Aluno.readOne);
routes.put('/alunos/:ra', Aluno.update);
routes.delete('/alunos/:ra', Aluno.remove);

routes.post('/livros', Livro.create);
routes.get('/livros', Livro.read);
routes.put('/livros/:id', Livro.update);
routes.delete('/livros/:id', Livro.remove);

routes.post('/emprestimos', Emprestimo.create);
routes.get('/emprestimos', Emprestimo.read);
routes.get('/emprestimos/:id', Emprestimo.readOne);
routes.put('/emprestimos/:id', Emprestimo.update);
routes.delete('/emprestimos/:id', Emprestimo.remove);

module.exports = routes;