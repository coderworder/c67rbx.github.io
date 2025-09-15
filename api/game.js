// api/games.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.rolimons.com/games/v1/gamelist");
    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({ success: false, error: "Failed to fetch games" });
    }

    // Only send top 12 games sorted by active players
    const gamesArray = Object.entries(data.games)
      .sort((a, b) => b[1][1] - a[1][1])
      .slice(0, 12)
      .map(([gameId, gameData]) => {
        const [name, activePlayers, thumbnail] = gameData;
        return { gameId, name, activePlayers, thumbnail };
      });

    res.status(200).json({ success: true, games: gamesArray });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}
