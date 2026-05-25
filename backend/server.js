const express = require("express");
const iniciarHealthCheck = require("./cron/healthCheck");
const conexionesRoutes = require("./routes/conexiones.routes");
const iniciarSlowQueries = require("./cron/slowQueries");
const pool = require("./db");

const app = express();

app.use(express.json());
app.use("/conexiones", conexionesRoutes);
iniciarHealthCheck();
iniciarSlowQueries();
app.get("/", (req, res) => {
    res.json({
        message: "DataOps Control Center API funcionando"
    });
});

app.get("/test-db", async (req, res) => {

    try {

        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            serverTime: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});