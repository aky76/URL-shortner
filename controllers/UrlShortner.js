 import { Url } from "../models/UrlSchema.js";
import { nanoid } from "nanoid";

export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = nanoid();

  const shortUrl = `http://localhost:1000/${shortCode}`;

  // save to database
  const newUrl = new Url({ shortCode, longUrl });
  await newUrl.save();

  console.log("short saved = ", newUrl);

  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  // find on database
  const originalUrl = await Url.findOne({ shortCode });

  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  } else {
    res.json({ message: "Invalid shortcode" });
  }
};