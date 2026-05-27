const express = require("express");

const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {

    try {

        const resultado = await pool.query(`
            SELECT *
            FROM alertas
            ORDER BY id DESC
            LIMIT 10
        `);

        res.json(resultado.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "No se pudieron obtener alertas"
        });
    }
});

module.exports = router;