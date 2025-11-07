'use strict';

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const keyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");

const RoleShop = {
    SHOP: 'shop',
    WRITER: 'writer',
    EDITOR: 'editor',
    ADMIN: 'admin',
}

class AccessService {
    signUp = async ({email, password, name, roles}) => {
        try {
            const hodelShop = await shopModel.findOne({email}).lean(); // lean() là phương thức để lấy dữ liệu từ database mà không lấy các phương thức của mongoose
            if (hodelShop) {
                return {
                    code: '10001',
                    message: 'Shop already exists',
                }
            }

            // Bước 1: Tạo password hash
            const hashedPassword = await bcrypt.hash(password, 10);
            const shop = await shopModel.create({email, password: hashedPassword, name, roles});
            if (shop) {
                // Tạo private key và public key
                const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    },
                });

                // Bước 2: Tạo key token
                const publicKeyString = await keyTokenService.createKeyToken({userId: shop._id, publicKey});

                if (!publicKeyString) {
                    return {
                        code: '10004',
                        message: 'Create key token failed',
                    }
                }

                const publicKeyObject = crypto.createPublicKey(publicKey); // Chuyển đổi public key sang định dạng PEM để ký JWT

                // Bước 3: Tạo token pair
                const tokens = await createTokenPair({userId: shop._id, email}, publicKeyObject, privateKey);

                return {
                    code: '20001',
                    metadata: {
                        shop: shop,
                        tokens: tokens,
                    }
                }
            }
            return {
                code: '10003',
                message: 'Sign up failed',
            }
        } catch (error) {
            return {
                code: '10002',
                message: error.message,
            }
        }
    }
}

module.exports = new AccessService();