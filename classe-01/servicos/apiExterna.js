const axios = require("axios");

const instanciaAxios = axios.create({
    baseURL: `https://companyenrichment.abstractapi.com`
});

module.exports = instanciaAxios;