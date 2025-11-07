'use strict';

const jwt = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => { // Playload là object chứa thông tin của user
    try {
        // privateKey đã là PEM string từ crypto.generateKeyPairSync
        const accessToken = await jwt.sign(payload, privateKey, { expiresIn: '2 days', algorithm: 'RS256'}); // accessToken là token để xác thực user
        const refreshToken = await jwt.sign(payload, privateKey, {expiresIn: '7 days', algorithm: 'RS256'}); // refreshToken là token để lấy lại accessToken
        return {accessToken, refreshToken};
    } catch (error) {
        return {
            code: '10002',
            message: error.message,
        }
    }
}

module.exports = {createTokenPair};