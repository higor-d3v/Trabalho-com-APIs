const instanciaAxios = require("../servicos/apiExterna");
const fs = require("fs/promises")

const consultarEmpresa = async (req, res) => {
    const dominioEmpresa = req.params.dominioEmpresa
    const bancoDados = JSON.parse(await fs.readFile("empresas.json", "utf-8"))
    console.log(bancoDados)
    const empresasArmazenadas = bancoDados.find(empresa => empresa.domain === dominioEmpresa);
    if (empresasArmazenadas) {
        return res.json(empresasArmazenadas);
    }
    try {
        const consulta = await instanciaAxios.get(`/v1`, {
            params: {
                api_key: `34a8499969c4401daf6a685935323c1d`,
                domain: dominioEmpresa
            }

        })

        if (consulta.data.name) {
            bancoDados.push(consulta.data)
            await fs.writeFile("empresas.json", JSON.stringify(bancoDados, null, 2))
            return res.json(consulta.data);
        }
        return res.json(consulta.data);
    } catch (error) {
        return res.json({ erro: "ocorreu um erro:", error })
    }


}

module.exports = { consultarEmpresa };