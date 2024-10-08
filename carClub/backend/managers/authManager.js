"use strict";
const bcrypt = require("bcrypt");
const { httpsCodes } = require("../constants/httpsCodes");
const { language } = require("../constants/language");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../modules/jwt_token");
const { User } = require("../models/index");
class AuthManager {
    static async createUser(reqObj) {
        try {
            let result = {};
            const existingUserByEmail = await User.findOne({
                where: { email: reqObj.email },
            });
            if (existingUserByEmail) {
                return result = {
                    status: httpsCodes.CONFLICT,
                    message: language.USER_ALREADY_EXISTS,
                };
            }
            const user = await User.create({
                ...reqObj,
            });
            result = {
                status: httpsCodes.SUCCESS_CODE,
                message: language.ONE_RECORD_CREATE,
                result: {
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    },
                },
            };
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Login Manager
    static async login(reqObj) {
        try {
            const { password , email } = reqObj;
            let user = await User.findOne({ where: { email: email } });
            if (!user) {
                return {
                    status: httpsCodes.NOT_FOUND,
                    message: language.NOT_REGISTER,
                };
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    status: httpsCodes.UNAUTHORIZE_CODE,
                    errorCode: "WRONG_PASSWORD",
                    message: language.WRONG_PASSWORD,
                };
            }
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            return {
                status: httpsCodes.SUCCESS_CODE,
                message: language.RECORD_FOUND,
                result: {
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        picture: user.picture,
                    },
                    accessToken,
                    refreshToken,
                },
            };
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    // update user
    static async updateUser(id, reqBody) {
        try {
            if (reqBody.password && typeof reqBody.password === "string") {
                reqBody.password = await bcrypt.hash(reqBody.password, 10);
            }
            const [user] = await User.update(reqBody, {
                where: {
                    id: id,
                },
            });

            if (!user) {
                return {
                    status: httpsCodes.NOT_FOUND,
                    message: language.NOT_FOUND,
                };
            }
            return {
                status: httpsCodes.CREATED,
                message: language.ONE_RECORD_UPDATE,
                result: user,
            };
        } catch (error) {
            throw error;
        }
    }

    // get user by token
    static async getUser(id) {
        try {
            const user = await User.findOne({
                where: {
                    id: id,
                },
                raw: true,
            });
            if (!user) {
                return {
                    status: httpsCodes.NOT_FOUND,
                    message: language.NOT_FOUND,
                };
            }
            return {
                status: httpsCodes.SUCCESS_CODE,
                message: language.RECORD_FOUND,
                user: user

            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthManager;
