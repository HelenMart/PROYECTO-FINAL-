const cron = require("node-cron");
const pool = require("../db");

const iniciarHealthCheck = () => {

    cron.schedule("* * * * *", async () => {

        try {

            const uso_cpu = (Math.random() * 100).toFixed(2);

            const uso_ram = (Math.random() * 100).toFixed(2);

            const conexiones_activas = Math.floor(Math.random() * 50);

            const tiempo_respuesta = (Math.random() * 500).toFixed(2);

            let estado = "SALUDABLE";

            if (uso_cpu > 80 || uso_ram > 80) {
                estado = "CRITICO";
            }

            await pool.query(
                `
                INSERT INTO metricas_bd
                (
                    uso_cpu,
                    uso_ram,
                    conexiones_activas,
                    tiempo_respuesta,
                    estado
                )
                VALUES ($1,$2,$3,$4,$5)
                `,
                [
                    uso_cpu,
                    uso_ram,
                    conexiones_activas,
                    tiempo_respuesta,
                    estado
                ]
            );

            console.log("Métrica registrada");

        } catch (error) {

            console.error("Error health check:", error);
        }
    });
};

module.exports = iniciarHealthCheck;