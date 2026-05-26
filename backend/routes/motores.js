const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {

  try {

    const resultado = await pool.query(`
      SELECT *
      FROM motores
      ORDER BY id DESC
    `);

    res.json(resultado.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error obteniendo motores"
    });
  }
});

router.post("/", async (req, res) => {

  try {

    const { nombre, tipo, estado } = req.body;

    await pool.query(`
      INSERT INTO motores
      (nombre, tipo, estado)
      VALUES ($1,$2,$3)
    `,
    [nombre, tipo, estado]);

    res.json({
      success: true,
      message: "Motor registrado"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error registrando motor"
    });
  }
});

module.exports = router;