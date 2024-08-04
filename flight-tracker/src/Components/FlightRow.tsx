import React from 'react';
import moment from 'moment';
import { Flight } from '../types';
import '../Css/App.css';

interface FlightRowProps {
  flight: Flight;
  currentTime: string; // Format: HH:mm:ss
  rowNumber: number;
}

const FlightRow: React.FC<FlightRowProps> = ({ flight, currentTime , rowNumber}) => {
  const flightTime = moment(flight.time, 'HH:mm');
  const currentMoment = moment(currentTime, 'HH:mm:ss');
  
  // Calculate the time difference in minutes
  const timeDifference = flightTime.diff(currentMoment, 'minutes');

  let remark = '';

  if (flight.type === 'departure') {
    if (timeDifference >= 0) {
      if (timeDifference < 10) {
        remark = 'Gate Closed';
      } else if (timeDifference < 60) {
        remark = 'Boarding';
      }
    } else {
      remark = 'Departed';
    }
  
  }
  else {
    if (timeDifference < 0) {
      remark = 'Landed';
    } else if (timeDifference < 60) {
      remark = 'On Time';
    }
  }

    const getRemarkClass = (remark: string) => {
      switch (remark.toLowerCase()) {
        case "landed":
          return "remark-landed";
        case "on time":
          return "remark-ontime";
        case "departed":
          return "remark-departed";
        case "gate closed":
          return "remark-gateclosed";
        case "boarding":
          return "remark-boarding";
        default:
          return "";
      }
    };

  return (
    <tr>
      <td>{rowNumber}</td>
      <td>{flight.flightnumber}</td>
      <td>{flight.airline}</td>
      <td>{flight.destination}</td>
      <td>{flight.time}</td>
      <td className={getRemarkClass(remark)}>{remark}</td>
    </tr>
  );
};

export default FlightRow;
