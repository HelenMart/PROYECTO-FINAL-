const redis = require("redis");

const client = redis.createClient({
    url: "redis://redis:6379"
});

client.connect();

client.on("error", (err) => {
    console.error("Redis Error:", err);
});

module.exports = client;