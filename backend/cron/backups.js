const cron = require("node-cron");
const fs = require("fs");

const iniciarBackups = () => {

    cron.schedule("*/2 * * * *", () => {
        
        const fecha = new Date()
            .toISOString()
            .replace(/:/g, "-");

        const ruta = "/app/backups/backup-" + fecha + ".sql";
        fs.writeFileSync(
            ruta,
            "RESPALDO AUTOMATICO DEL SISTEMA"
        );

        console.log("BACKUP GENERADO");
    });
};

module.exports = iniciarBackups;