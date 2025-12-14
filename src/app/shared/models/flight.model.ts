export interface Flight {
  id: string;
  airline: string;
  fromPlace: string;
  toPlace: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
}
