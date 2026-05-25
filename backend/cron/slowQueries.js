const cron = require("node-cron");
const pool = require("../db");

const iniciarSlowQueries = () => {

    cron.schedule("*/2 * * * *", async () => {

        try {

            const consultas = [
                "SELECT * FROM conexiones",
                "SELECT * FROM metricas_bd",
                "UPDATE conexiones SET estado='ACTIVO'",
                "DELETE FROM conexiones WHERE id=5",
                "SELECT COUNT(*) FROM metricas_bd"
            ];

            const consulta =
                consultas[Math.floor(Math.random() * consultas.length)];

            const tiempo_ejecucion =
                (Math.random() * 1000).toFixed(2);

            let severidad = "RAPIDA";

            if (tiempo_ejecucion > 300) {
                severidad = "MEDIA";
            }

            if (tiempo_ejecucion > 600) {
                severidad = "LENTA";
            }

            if (tiempo_ejecucion > 850) {
                severidad = "CRITICA";
            }

            await pool.query(
                `
                INSERT INTO consultas_lentas
                (
                    consulta,
                    tiempo_ejecucion,
                    severidad
                )
                VALUES ($1,$2,$3)
                `,
                [
                    consulta,
                    tiempo_ejecucion,
                    severidad
                ]
            );

            console.log("Consulta analizada");

        } catch (error) {

            console.error(error);
        }
    });
};

module.exports = iniciarSlowQueries;