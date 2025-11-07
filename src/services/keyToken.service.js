'use strict';

const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({userId, publicKey}) => {
        try {
            const publicKeyString = publicKey.toString();
            const token = await keyTokenModel.create({
                user: userId,
                publicKey: publicKeyString,
                refreshToken: [],
            });
            return token ? token.publicKey : null;
        } catch (error) {
            return {
                code: '10002',
                message: error.message,
            }
        }
    }
}

module.exports = KeyTokenService;