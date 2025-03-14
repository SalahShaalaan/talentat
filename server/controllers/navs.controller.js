import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getNavs = (req, res) => {
  const navJsonPath = path.join(__dirname, '..', 'data', 'nav.json');

  if (fs.existsSync(navJsonPath)) {
    const data = JSON.parse(fs.readFileSync(navJsonPath, "utf-8"));
    return res.json(data);
  } else {
    return res.status(404).json({ error: "Navigation data not found" });
  }
};

export const updateNavs = (req, res) => {
  const items = req.body;
  const navJsonPath = path.join(__dirname, '..', 'data', 'nav.json');

  if (!(items instanceof Array)) return res.status(400).send("Bad Request");
  else {
    fs.writeFileSync(navJsonPath, JSON.stringify(items, null, 2));
    return res.status(204).send(null);
  }
};

export const trackNavsChange = (req, res) => {
  const { id, from = undefined, to = undefined } = req.body;
  if (!id || typeof from === "undefined" || typeof to === "undefined") return res.status(400).json({ error: "Bad Request" });
  else return res.status(204).send(null);
};