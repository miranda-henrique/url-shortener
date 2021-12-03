require('dotenv').config();

import express from "express";
import { MongoConnection } from "./database/MongoConnection";
import { URLController } from "./controller/URLController";


const api = express();
api.use(express.json());

const database = new MongoConnection;
database.connect();

const urlController = new URLController;

api.get("/", () => { console.log("Please enter a short url to be searched.")});
api.get("/:hash", urlController.redirect);
api.post("/shorten", urlController.shorten);

api.listen(process.env.PORT || 3000, () => {
    console.log("App online");
})