
import React, { useState, useEffect } from 'react';
import FlightRow from './FlightRow';
import { Flight } from '../types';

interface FlightTableProps {
  title: string;
  flights: Flight[];
  currentTime: string;
}

const FlightTable: React.FC<FlightTableProps> = ({ title, flights, currentTime }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => {
        if (prevPage >= Math.ceil(flights.length / flightsPerPage)) {
          return 1;
        } else {
          return prevPage + 1;
        }
      });
    }, 20 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [flights.length]);

  const flightsPerPage = 10;
  const startIndex = (currentPage - 1) * flightsPerPage;
  const endIndex = startIndex + flightsPerPage;
  const paginatedFlights = flights.slice(startIndex, endIndex);



  return (
    <div>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>{title === "Arrivals" ? "From" : "To" }</th>
            <th>Time</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFlights.map((flight, index) => (
            <FlightRow key={flight.id} flight={flight} currentTime={currentTime} rowNumber={startIndex + index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
