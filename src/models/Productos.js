const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productosSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    trim: true,
  },
  imagen: {
    type: String,
  },
});

module.exports = mongoose.model("Productos", productosSchema);
