require('dotenv').config();

import express from "express";
import { MongoConnection } from "./database/MongoConnection";
import { URLController } from "./controller/URLController";


const api = express();
api.use(express.json());

const database = new MongoConnection;
database.connect();

const urlController = new URLController;

api.get("/:hash", urlController.redirect);
api.post("/shorten", urlController.shorten);

const port = process.env.PORT || process.env.LOCAL_PORT
api.listen(port, () => {
    console.log(`Listening at port ${port}`);
})