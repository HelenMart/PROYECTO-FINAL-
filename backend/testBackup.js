const fs = require("fs");

const fecha = new Date()
    .toISOString()
    .replace(/:/g, "-");

fs.writeFileSync(
    `./backups/backup-${fecha}.sql`,
    "RESPALDO GENERADO"
);

console.log("ARCHIVO CREADO");