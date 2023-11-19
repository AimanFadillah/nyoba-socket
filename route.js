import express from "express";
import PesanController from "./controllers/PesanController.js";

const Route = express.Router();

Route.get("/",PesanController.create);
Route.get("/pesanan",PesanController.index);

export default Route;

