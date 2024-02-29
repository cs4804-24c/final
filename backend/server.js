const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001;

app.get("/shotchart/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
  // Example: Fetch shot chart data using Axios and the NBA API endpoint
  // Note: You'll need to find the appropriate NBA API endpoint or use a package that wraps the NBA API.
  const response = await axios.get(`Your_NBA_API_URL/${teamId}`);
  res.json(response.data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
