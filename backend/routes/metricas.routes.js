const express = require("express");
const router = express.Router();

const pool = require("../db");
const redisClient = require("../redis");

router.get("/", async (req, res) => {

    try {

        const cache = await redisClient.get("metricas");

        if (cache) {

            console.log("CACHE HIT");

            return res.json({
                source: "redis",
                data: JSON.parse(cache)
            });
        }

        console.log("CACHE MISS");

        const result = await pool.query(
            `
            SELECT * FROM metricas_bd
            ORDER BY id DESC
            LIMIT 10
            `
        );

        await redisClient.setEx(
            "metricas",
            60,
            JSON.stringify(result.rows)
        );

        res.json({
            source: "postgres",
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo métricas"
        });
    }
});

module.exports = router;