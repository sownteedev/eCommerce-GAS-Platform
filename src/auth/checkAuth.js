'use strict';

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}
const ApiKeyService = require("../services/apikey.service");

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                code: '10001',
                message: 'Missing API Key',
            });
        }
        // check objKey
        const objKey = await ApiKeyService.findByKeys(key);
        if (!objKey) {
            return res.status(403).json({
                code: '10001',
                message: 'Invalid API Key',
            });
        }
        req.objKey = objKey;
        return next();
    } catch (error) {
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (req.objKey.permissions.includes(permission)) {
            return next();
        }
    }
    return res.status(403).json({
        code: '10001',
        message: 'Permission denied',
    });
}

module.exports = {
    apiKey,
    permission,
};