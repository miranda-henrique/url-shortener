import { URLModel } from "../database/model/URL";
import { Request, Response } from "express";
import shortId from "shortid";
import { config } from "../config/Constants";

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL, alternativeURL } = req.body;

    if (!originURL) {
      res.json({ error: "Please enter an url to be shortened."});
      return;
    }

    const url = await URLModel.findOne({ originURL });

    if (url) {
      res.json(url);
      return;
    }

    if (alternativeURL) {
      const altURL = await URLModel.findOne({ alternativeURL });
      if (altURL) {
        res.json("The provided alternative url is already in use. Please choose another one.");
        return;
      }
    }
    const hash = alternativeURL ? alternativeURL : shortId.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    const newURL = await URLModel.create({ hash, shortURL, originURL, alternativeURL });

    res.json(newURL);
  }  

  public async redirect(req: Request, res: Response): Promise<void> {
      const { hash } = req.params;
      const url = await URLModel.findOne({ hash });

      if (url) {
        res.redirect(url.originURL);
        return;
      }

      res.status(400).json({ erro: "URL not found" });
  }
}