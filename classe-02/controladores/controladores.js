const instanciaAxios = require("../servicos/api");
const fs = require("fs/promises");


const votoPost = async (req, res) => {
    const ip = req.params.ip;
    const pais = req.params.pais;
    const votos = JSON.parse(await fs.readFile("votos.json"))
    try {
        const getLocation = await instanciaAxios.get("/v1", {
            params: {
                api_key: "58cafbe4558f425d8e8c731e3b26fbe0",
                ip_address: ip
            }
        });

        const buscarVoto = votos.find(voto => voto.ip === getLocation.data.ip_address)
        if (buscarVoto) {
            res.status(400)
            return res.json({
                "erro": "seu voto já foi computado",
                dados: buscarVoto
            })

        }
        if (getLocation.data.country === pais) {
            votos.push({
                ip: getLocation.data.ip_address,
                voto: req.body.voto
            })
            await fs.writeFile("votos.json", JSON.stringify(votos, null, 2))
            return res.json(votos[votos.length - 1])

        } else {
            return res.json({ "erro": "o país informado está incorreto" })
        }

    } catch (error) {
        res.status(400)
        res.json({
            "errooooou": "informe um ip válido"
        })
    }


}

module.exports = { votoPost };