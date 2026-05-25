const pool = require("../db");

const obtenerConexiones = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM conexiones ORDER BY id ASC"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo conexiones"
        });
    }
};

const crearConexion = async (req, res) => {

    try {

        const {
            nombre,
            tipo_bd,
            host,
            puerto,
            nombre_bd,
            usuario_bd,
            estado
        } = req.body;

        const result = await pool.query(
            `INSERT INTO conexiones 
            (nombre, tipo_bd, host, puerto, nombre_bd, usuario_bd, estado)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                nombre,
                tipo_bd,
                host,
                puerto,
                nombre_bd,
                usuario_bd,
                estado
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error creando conexión"
        });
    }
};

module.exports = {
    obtenerConexiones,
    crearConexion
};