const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservaSchema = Schema({
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    livro: { type: String, ref: 'Livro', required: true },
    data: { type: Date, default: Date.now },
    dataDevolucao: { type: Date, required: true },
    status: { type: String, enum: ['pendente', 'concluida'], default: 'pendente' },
    observacao: { type: String, required: false },
});

module.exports = mongoose.model('Reserva', ReservaSchema);
