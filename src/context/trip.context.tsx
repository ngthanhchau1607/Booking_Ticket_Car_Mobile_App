// TripContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Khai báo kiểu cho dữ liệu chuyến đi
interface Trip {
  id: number; // ID duy nhất của chuyến đi
  fromStation: number; // Mã ga xuất phát
  toStation: number; // Mã ga đến
  startTime: string; // Thời gian bắt đầu chuyến đi (dạng ISO string)
  createdAt: string; // Thời gian tạo
  updatedAt: string; // Thời gian cập nhật
  fromSta: string; // Tên ga xuất phát
  toSta: string; // Tên ga đến
}

// Khai báo kiểu cho context
interface TripContextType {
  trips: Trip[];
  setTripData: (tripData: Trip[]) => void;
}

// Tạo context cho chuyến đi với kiểu dữ liệu mặc định là undefined
const TripContext = createContext<TripContextType | undefined>(undefined);

// Hook để sử dụng context
export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};

// Component Provider để cung cấp context cho các component con
export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>([]); // Dữ liệu chuyến đi sẽ được lưu trữ ở đây

  // Hàm lưu kết quả chuyến đi vào context
  const setTripData = (tripData: Trip[]) => {
    setTrips(tripData); // Cập nhật state với dữ liệu chuyến đi mới
  };

  return (
    <TripContext.Provider value={{ trips, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};
