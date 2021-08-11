const express = require("express");
const roteador = express();
const votos = require("./controladores/controladores")

roteador.post("/votacao/:pais/:ip", votos.votoPost);


module.exports = roteador;