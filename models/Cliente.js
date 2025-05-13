const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = Schema({
    id: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    endereço: { type: String, required: false },
});

module.exports = mongoose.model('Cliente', ClienteSchema);
