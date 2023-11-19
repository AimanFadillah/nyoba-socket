import {DataTypes} from "sequelize";
import db from "../database/database.js";

const Pesan = db.define("pesan",{
    nama:DataTypes.STRING,
    pesan:DataTypes.TEXT,
},{freezeTableName:true});

await Pesan.sync();
export default Pesan;