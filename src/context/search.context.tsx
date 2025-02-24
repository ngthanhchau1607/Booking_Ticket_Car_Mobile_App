// LocationContext.tsx
import React, { createContext, useContext, useState } from "react";

// Tạo context để lưu trữ departure, destination và date
const LocationContext = createContext<any>(null);

export const LocationProvider = ({ children }: any) => {
    const [departure, setDeparture] = useState<string>("Nơi xuất phát");
    const [destination, setDestination] = useState<string>("Nơi đến");
    const [date, setDate] = useState<string>("Ngày đi");

    return (
        <LocationContext.Provider value={{ departure, setDeparture, destination, setDestination, date, setDate }}>
            {children}
        </LocationContext.Provider>
    );
};

// Hook sử dụng context
export const useLocation = () => useContext(LocationContext);
