import Pesan from "../models/Pesan.js";

class PesanController {

    static async index (req,res) {
        return res.render("pesanan",{
            "dataPesan" : await Pesan.findAll({order:[["createdAt","ASC"]]})
        });
    }

    static async create (req,res) {
        return res.render("pesan")
    }

}

export default PesanController;