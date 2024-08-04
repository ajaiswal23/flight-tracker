// src/types.ts
export interface Flight {
    id: string;
    flightnumber: string;
    airline: string;
    destination: string;
    time: string;
    type: 'arrival' | 'departure';
  }
  