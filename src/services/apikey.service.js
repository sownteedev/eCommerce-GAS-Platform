'use strict';

const apiKeyModel = require("../models/apikey.model");

class ApiKeyService {
    static findByKeys = async (key) => {
        const objKey = await apiKeyModel.findOne({key, status: true}).lean();
        return objKey;
    }
}

module.exports = ApiKeyService;