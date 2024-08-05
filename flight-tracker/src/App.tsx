// src/App.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import FlightTable from "./Components/FlightTable";
import { Flight } from "./types";
import "../src/Css/App.css";

const App: React.FC = () => {
  const [arrivals, setArrivals] = useState<Flight[]>([]);
  const [departures, setDepartures] = useState<Flight[]>([]);
  const [currentTime, setCurrentTime] = useState<string>(
    moment().format("HH:mm:ss")
  );

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const fetchData = async () => {
      // console.log("url:", apiUrl);
      try {
        const response = await axios.get(`${apiUrl}api/flights`);
        const flights: Flight[] = response.data;

        // Debugging log
        // console.log('Fetched flights:', flights);

        setArrivals(flights.filter((flight) => flight.type === "arrival"));
        setDepartures(flights.filter((flight) => flight.type === "departure"));
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(moment().format("HH:mm:ss"));
    };

    const timeIntervalId = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(timeIntervalId);
  }, []);

  return (
    <div>
      <h1>Flight Tracker</h1>
      <p>Current Time: {moment(currentTime, "HH:mm:ss").format("HH:mm:ss")}</p>
      <FlightTable
        title="Arrivals"
        flights={arrivals}
        currentTime={currentTime}
      />
      <FlightTable
        title="Departures"
        flights={departures}
        currentTime={currentTime}
      />
    </div>
  );
};

export default App;
