export interface Passenger {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  seatNumber: string;
}

export type TripType = 'ONE_WAY' | 'ROUND_TRIP';
