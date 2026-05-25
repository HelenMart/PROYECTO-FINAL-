const cron = require("node-cron");
const pool = require("../db");

const iniciarAlertas = () => {

    cron.schedule("* * * * *", async () => {

        try {

            const metrica = await pool.query(
                `
                SELECT *
                FROM metricas_bd
                ORDER BY id DESC
                LIMIT 1
                `
            );

            const dato = metrica.rows[0];

            if (!dato) return;

            if (
                dato.uso_cpu > 80 ||
                dato.uso_ram > 80
            ) {

                await pool.query(
                    `
                    INSERT INTO alertas
                    (
                        tipo_alerta,
                        mensaje,
                        severidad
                    )
                    VALUES ($1,$2,$3)
                    `,
                    [
                        "RENDIMIENTO",
                        "Uso elevado de CPU o RAM detectado",
                        "CRITICA"
                    ]
                );

                console.log("ALERTA CRITICA REGISTRADA");
            }

        } catch (error) {

            console.error(error);
        }
    });
};

module.exports = iniciarAlertas;