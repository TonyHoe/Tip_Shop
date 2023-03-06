'use strict';
const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // B1: check email
            const hoderShop = await shopModel.findOne({ email }).lean();
            if(hoderShop) {
                return {
                    code: 'xxx',
                    message: 'Shop is already created'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, password:passwordHash, roles: [RoleShop.SHOP]
            });

            if(newShop) {
                // created privateKey, publicKey
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                // lưu vào collection Keys
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if(!keyStore) {
                    return {
                        code: 'xxxx',
                        message: 'keyStore error'
                    }
                }
                
                // tạo access token & refresh token
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({fields: ['id', 'name', 'email'],object: newShop}),
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }

    }
}

module.exports = AccessService