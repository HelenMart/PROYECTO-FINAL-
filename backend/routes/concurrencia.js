const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

  try {

    const { usuario, accion } = req.body;

    await pool.query(`
      INSERT INTO conexiones_activas
      (usuario, accion)
      VALUES ($1,$2)
    `,
    [usuario, accion]);

    res.json({
      success: true,
      message: "Conexión registrada"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error registrando conexión"
    });
  }
});

router.get("/", async (req, res) => {

  try {

    const resultado = await pool.query(`
      SELECT *
      FROM conexiones_activas
      ORDER BY id DESC
      LIMIT 20
    `);

    res.json(resultado.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error obteniendo conexiones"
    });
  }
});

module.exports = router;