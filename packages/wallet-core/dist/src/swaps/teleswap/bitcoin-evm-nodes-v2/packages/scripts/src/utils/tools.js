"use strict";
const tslib_1 = require("tslib");
const util = require('util');
const axios = require('axios');
const sleep = util.promisify(setTimeout);
function runWithRetries(action, config = {
    maxTries: 2,
    retrySleep: 1000,
}) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const maxTries = config.maxTries || 2;
        const retrySleep = config.retrySleep || 1000;
        let lastError;
        for (let count = 0; count < maxTries; count += 1) {
            try {
                return yield action();
            }
            catch (error) {
                lastError = error;
            }
            yield sleep(retrySleep);
        }
        throw lastError || new Error('function failed after retries');
    });
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function getAxiosInstance({ baseUrl, timeout = 10000, headers = {}, auth }) {
    let host = baseUrl;
    let instance;
    instance = axios.create({
        baseURL: host,
        timeout,
        auth,
        headers: Object.assign({}, headers),
    });
    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response) {
            const serviceError = new Error(JSON.stringify(error.response.data));
            return Promise.reject(serviceError);
        }
        if (error.request) {
            console.log(error.message);
            const serviceError = new Error(error.message);
            return Promise.reject(serviceError);
        }
        return Promise.reject(error);
    });
    return instance;
}
module.exports = {
    sleep,
    runWithRetries,
    getRandomInteger,
    getAxiosInstance,
};
//# sourceMappingURL=tools.js.map