"use strict";
const { httpsCodes } = require("../constants/httpsCodes");
const { language } = require("../constants/language");
const { Car } = require("../models/index");
class CarManager {
    static async createCar(reqObj) {
        try {
            let result = {};
            const car = await Car.create(reqObj);
            result = {
                status: httpsCodes.SUCCESS_CODE,
                message: language.ONE_RECORD_CREATE,
                result: car,
            };
            return result;
        } catch (error) {
            throw error;
        }
    }


    // update user
    static async updateCar(id, reqBody) {
        try {

            const [car] = await Car.update(reqBody, {
                where: {
                    id: id,
                },
            });

            if (!car) {
                return {
                    status: httpsCodes.NOT_FOUND,
                    message: language.NOT_FOUND,
                };
            }
            return {
                status: httpsCodes.CREATED,
                message: language.ONE_RECORD_UPDATE,
                result: car,
            };
        } catch (error) {
            throw error;
        }
    }

    // get user by token
    static async getCar(id) {
        try {
            const car = await Car.findOne({
                where: {
                    userId: id,
                },
                raw: true,
            });
            if (!car) {
                return {
                    status: httpsCodes.NOT_FOUND,
                    message: language.NOT_FOUND,
                };
            }
            return {
                status: httpsCodes.SUCCESS_CODE,
                message: language.RECORD_FOUND,
                car: car

            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarManager;
