'use strict';

const mongoose = require("mongoose");
// const { checkConnect, checkOverload } = require("../helpers/checkConnect");

const connectString = (process.env.MONGODB_URI || "mongodb+srv://sownteedev:4002@cluster0.t5ib7q9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

class MongoDb {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(connectString)
            .then(() => {
                console.log("Connected to MongoDB");
                // checkConnect();
                // checkOverload();
            })
            .catch((err) => console.log(err));
    }

    static getInstance() {
        if (!MongoDb.instance) {
            MongoDb.instance = new MongoDb();
        }
        return MongoDb.instance;
    }
}

const instanceMongoDb = MongoDb.getInstance();

module.exports = instanceMongoDb;