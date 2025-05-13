const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivroSchema = Schema({
    id: { type: String, required: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    categoria: { type: String, required: true },
    status: { type: String, required: true, default: 'disponível' },
});

module.exports = mongoose.model('Livro', LivroSchema);
