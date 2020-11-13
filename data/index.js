const rentingInfoData = require('./rentingInfo');
const usersData = require("./users");
const validateData = require("./validate");
const carsData = require('./cars');

module.exports = {
    rentingInfo: rentingInfoData,
    users: usersData,
    cars: carsData,
    validate: validateData
};