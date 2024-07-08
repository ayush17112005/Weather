import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Endpoint to handle POST request from the frontend
app.post('/weather', async (req, res) => {
  const { city } = req.body; // Extract city name from request body
  const apiKey = process.env.API_KEY;

  try {
    // Fetch weather data from OpenWeatherMap API
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    console.log(result.data); // Log the API response data
    res.send(result.data); // Send the response data back to the frontend
  } catch (err) {
    console.log(err); // Log any error if occurs
    res.status(500).send('Error fetching weather data'); // Send error response
  }
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
