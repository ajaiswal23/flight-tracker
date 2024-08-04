// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const moment = require("moment");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Supabase client setup
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/api/flights", async (req, res) => {
  try {
    const currentTime = moment().subtract(30, "minutes").format("HH:mm:ss");
    const futureTime = moment().add(4, "hours").format("HH:mm:ss");

    // Get all the flights that are departing in the next 4 hours
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .gte("time", currentTime)
      .lte("time", futureTime);


    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
