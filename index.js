const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

const omdbApiKey = "435fb551"; // Replace with your OMDB API key

app.get('/movieinfo', async (req, res) => {
  const movieTitle = req.query.title || '';

  if (!movieTitle) {
    return res.status(400).json({ error: 'Title parameter is required' });
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${omdbApiKey}`);
    if (response.data.Response === "False") {
      return res.status(404).json({ error: response.data.Error });
    }

    return res.json(response.data);
  } catch (err) {
    const errorMessage = err.response?.data.error.message || err.message || '';
    return res.status(500).json({
      error: 'An error occurred: ' + errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});