const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");



module.exports = () => {
  router.post("/clientes", clienteController.nuevoCliente);
  router.get("/clientes", clienteController.obtenerClientes);
  router.get("/clientes/:id", clienteController.obtenerCliente);
  router.put("/clientes/:id", clienteController.actualizarCliente);
  router.get("/", function (req, res) {
    res.send("hello world");
  });
  router.delete("/clientes/:id", clienteController.borrarCliente);

  // Productos
  router.post(
    "/productos",
    productosController.subirArchivo,
    productosController.nuevoProducto
  );
  router.get("/productos", productosController.obtenerProductos);
  router.get("/productos/:id", productosController.obtenerProducto);
  router.put(
    "/productos/:id",
    productosController.subirArchivo,
    productosController.actualizarProducto
  );
  router.delete("/productos/:id", productosController.borrarProducto);

  /*** PEDIDOS */
  // Agrega nuevos pedidos
  router.post("/pedidos", pedidosController.nuevoPedido);

  // mostrar todos los pedidos
  router.get("/pedidos", pedidosController.mostrarPedidos);

  // Mostrar un pedido por su ID
  router.get("/pedidos/:idPedido", pedidosController.mostrarPedido);

  // Actualizar pedidos
  router.put("/pedidos/:idPedido", pedidosController.actualizarPedido);

  // Elimina un pedido
  router.delete("/pedidos/:idPedido", pedidosController.eliminarPedido);
  return router;
};
