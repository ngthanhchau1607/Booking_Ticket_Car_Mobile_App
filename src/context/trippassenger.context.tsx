
// Định nghĩa kiểu dữ liệu cho Passenger, Vehicle, Trip, TripPassenger, Seat và Station

type Passenger = {
    id: number;
    name: string;
    description: string;
    imageIntro: string;
    confirmType: string;
    price: number;
    passengerRate: any[];
  };
  
  type Seat = {
    id: number;
    name: string;
    status: string;  // Ghế đã đặt hay còn trống
    floor: number;   // Tầng ghế
    type: string;    // Loại ghế (seat, bed,...)
    price: number;   // Giá vé
    vehicleId: number;
    createdAt: string;
    updatedAt: string;
  };
  
  type Vehicle = {
    id: number;
    name: string;
    description: string;
    type: string;  // Normal, Limousine, etc.
    numberFloors: number;
    passengerCarId: number;
    createdAt: string;
    updatedAt: string;
    seatVehicle: Seat[];  // Danh sách ghế
  };
  
  type Station = {
    id: number;
    name: string;
    address: string;
    province: string;
    createdAt: string;
    updatedAt: string;
  };
  
  type Trip = {
    id: number;
    fromStation: number;  // ID của trạm đi
    toStation: number;    // ID của trạm đến
    startTime: string;    // Thời gian khởi hành
    createdAt: string;
    updatedAt: string;
    from: Station;  // Thông tin trạm đi
    to: Station;    // Thông tin trạm đến
  };
  
  type TripPassenger = {
    id: number;
    tripId: number;
    passengerId: number;
    startTime: string;
    endTime: string;
    status: string;  // Trạng thái chuyến đi (depart, completed, etc.)
    vehicleId: number;
    createdAt: string;
    updatedAt: string;
    passenger: Passenger;  // Thông tin hành khách
    trip: Trip;            // Thông tin chuyến đi
    vehicle: Vehicle;      // Thông tin phương tiện
  };
  

// context/tripPassenger.context.tsx

import React, { createContext, useState, useContext } from "react";

// Định nghĩa kiểu dữ liệu cho context
type TripContextType = {
  tripPassengers: TripPassenger[] | null;
  setTripPassengers: (data: TripPassenger[] | null) => void;
  trips: Trip[] | null;
  setTrips: (data: Trip[] | null) => void;
  vehicles: Vehicle[] | null;
  setVehicles: (data: Vehicle[] | null) => void;
};

// Tạo context
const TripPassengerContext = createContext<TripContextType | undefined>(undefined);

// TripPassengerProvider chứa logic để cung cấp dữ liệu
export const TripPassengerProvider = ({ children }: { children: React.ReactNode }) => {
  const [tripPassengers, setTripPassengers] = useState<TripPassenger[] | null>(null);
  const [trips, setTrips] = useState<Trip[] | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);

  return (
    <TripPassengerContext.Provider value={{ tripPassengers, setTripPassengers, trips, setTrips, vehicles, setVehicles }}>
      {children}
    </TripPassengerContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng context này
export const useTripPassenger = (): TripContextType => {
  const context = useContext(TripPassengerContext);
  if (!context) {
    throw new Error("useTripPassenger must be used within a TripPassengerProvider");
  }
  return context;
};
