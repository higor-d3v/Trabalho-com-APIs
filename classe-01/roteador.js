const express = require("express");
const consultas = require("./controladores/consultas")
const roteador = express();

roteador.get("/empresas/:dominioEmpresa", consultas.consultarEmpresa);

module.exports = roteador;