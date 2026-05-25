const express = require("express");
const router = express.Router();

const {
    obtenerConexiones,
    crearConexion
} = require("../controllers/conexiones.controller");

router.get("/", obtenerConexiones);

router.post("/", crearConexion);

module.exports = router;