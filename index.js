const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bqsn:xAiux5o2kGLnYweg@cluster0.anxptkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const Livro = require('./models/Livro');
const Cliente = require('./models/Cliente');
const Reserva = require('./models/Reserva');
const { render } = require('ejs');

app.get('/', function(req, res){
    res.render('index');
});

// Rota para cadastrar um cliente

app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.find({});
    const status = req.query.s;
    res.render('cliente/relatorio', {status, clientes});
});

app.post("/clientes", async function(req, res){
    const {id, nome, email, telefone, endereço} = req.body;
     await Cliente.create({
        id,
        nome,
        email,
        telefone,
        endereço
    });
    res.redirect("/clientes?s=1");
});

app.get('/clientes/cadastrar', async function (req, res){
    const clientes = await Cliente.find({});
    const status = req.query.s;
    res.render('cliente/cadastrar');
});

app.get('/clientes/:nome', async (req, res) => {
    const nome = req.params.nome;
    const cliente = await Cliente.findOne({nome:nome});
    if (cliente) {
        res.render('cliente/detalhar', {cliente});
    } else {
        res.render('404', [404]);
        res.status(404).send('Cliente não encontrado');
    }
});

// Rota para cadastrar um livro

app.get('/livros', async (req, res) => {
    const livros = await Livro.find({});
    const status = req.query.s;
    res.render('livro/relatorio', {status, livros});
});

app.post("/livros", async function(req, res){
    const {titulo, autor, isbn, categoria, status} = req.body;
     await Livro.create({
        titulo,
        autor,
        isbn,
        categoria,
        status
    });
    res.redirect("/livros?s=1");
});

app.get('/livros/cadastrar', async function (req, res){
    const livros = await Livro.find({});
    const status = req.query.s;
    res.render('livro/cadastrar');
});

app.get('/livros/:titulo', async (req, res) => {
    const titulo = req.params.titulo;
    const livro = await Livro.findOne({titulo:titulo});
    if (livro) {
        res.render('livro/detalhar', {livro});
    } else {
        res.render('404', [404]);
        res.status(404).send('Livro não encontrado');
    }
});

// Rota para cadastrar uma reserva

app.get('/reservas/cadastrar', async function (req, res){
    const clientes = await Cliente.find({});
    const livros = await Livro.find({});
    const status = req.query.s;
    res.render('reserva/cadastrar', {clientes, livros});
});

app.get('/reservas', async (req, res) => {
    const reservas = await Reserva.find({}).populate('livro').populate('cliente');
    const status = req.query.s;
    res.render('reserva/relatorio', {status, reservas});
});

app.post("/reservas", async function(req, res){
    const {cliente, livro, dataDevolucao, status, observacao} = req.body;
     await Reserva.create({
        cliente,
        livro,
        dataDevolucao,
        status,
        observacao
    });
    res.redirect("/reservas?s=1");
});

app.get('/reservas/:livro', async (req, res) => {
    const livro = req.params.livro;
    const reserva = await Reserva.findOne({livro:livro});
    if (reserva) {
        res.render('reserva/detalhar', {reserva});
    } else {
        res.render('404', [404]);
        res.status(404).send('Reserva não encontrada');
    }
});
  

app.use(function(req, res) {
    res.status(404).render("404");
    });

app.listen('888', function(){
    console.log('Rodando...');
});

