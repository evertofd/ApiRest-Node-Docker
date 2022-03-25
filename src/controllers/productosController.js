const Productos = require("../models/Productos");
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  },
};

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single("imagen");

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);
  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se agrego un nuevo producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerProducto = async (req, res) => {
  const producto = await Productos.findById(req.params.id);

  if (!producto) {
    res.json({ message: `El cliente con el id: ${req.params.id} no existe` });
    next();
  }

  res.json(producto);
};

exports.actualizarProducto = async (req, res, next) => {
  try {
    // construir un nuevo producto
    let nuevoProducto = req.body

    // verificar si hay imagen nueva
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      let productoAnterior = await Productos.findById(req.params.id);
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    const producto = await Productos.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.borrarProducto = async (req, res, next) => {
  try {
    const producto = await Productos.findOneAndDelete({ _id: req.params.id });
    res.json({ mensaje: "El producto ha sido eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
