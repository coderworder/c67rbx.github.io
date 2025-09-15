// api/games.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.rolimons.com/games/v1/gamelist");
    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({ success: false, error: "Failed to fetch games" });
    }

    // Map games with stats
    const gamesArray = Object.entries(data.games).map(([gameId, gameData]) => {
      const [name, activePlayers, thumbnail, visits = 0, likes = 0, dislikes = 0, genre = "Unknown"] = [
        gameData[0],
        gameData[1],
        gameData[2],
        gameData[3],
        gameData[4],
        gameData[5],
        gameData[6]
      ];
      return { gameId, name, activePlayers, thumbnail, visits, likes, dislikes, genre };
    });

    // Sort by active players descending
    gamesArray.sort((a, b) => b.activePlayers - a.activePlayers);

    res.status(200).json({ success: true, games: gamesArray });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}
