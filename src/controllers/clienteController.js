const Clientes = require("../models/Clientes");

exports.nuevoCliente = async (req, res) => {
  const cliente = new Clientes(req.body);
  try {
    await cliente.save();
    res.json({ mensaje: "Se agrego un nuevo cliente" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerCliente = async (req, res) => {
  const cliente = await Clientes.findById(req.params.id);

  if (!cliente) {
    res.json({ message: `El cliente con el id: ${req.params.id} no existe` });
    next();
  }

  res.json(cliente);
};

exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.borrarCliente = async(req,res,next) => {
  try {
    const cliente = await Clientes.findOneAndDelete({_id: req.params.id})
    res.json({mensaje: "El cliente ha sido eliminado"})
  } catch (error) {
    console.log(error)
    next();
  }
}