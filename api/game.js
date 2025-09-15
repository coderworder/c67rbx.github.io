// api/games.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.rolimons.com/games/v1/gamelist');
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Rolimons API' });
  }
}
