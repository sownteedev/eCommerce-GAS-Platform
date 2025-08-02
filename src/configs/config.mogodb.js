'use strict';

const pro = {
    db: {
        host: process.env.PRO_DB_HOST,
        port: process.env.PRO_DB_PORT,
        name: process.env.PRO_DB_NAME,
    },
    app: {
        port: process.env.PRO_APP_PORT,
    }
}

const dev = {
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME,
    },
    app: {
        port: process.env.DEV_APP_PORT,
    }
}

const config = { pro, dev };

const env = process.env.NODE_ENV || "dev";

module.exports = config[env];