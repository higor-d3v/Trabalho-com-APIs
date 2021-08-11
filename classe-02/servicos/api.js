const axios = require("axios");

const instanciaAxios = axios.create({
    baseURL: "https://ipgeolocation.abstractapi.com"
})

module.exports = instanciaAxios;