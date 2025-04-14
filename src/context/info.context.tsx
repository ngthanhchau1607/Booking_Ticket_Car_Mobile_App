// InfoContext.tsx
import React, { createContext, useContext, useState } from "react";

// Tạo context để lưu trữ thông tin cần thiết
const InfoContext = createContext<any>(null);

export const InfoProvider = ({ children }: any) => {
    // Khai báo các state để lưu trữ giá trị
    const [busCompany, setBusCompany] = useState<string>("Tên nhà xe");
    const [departureTime, setDepartureTime] = useState<string>("Giờ đi");
    const [departureDate, setDepartureDate] = useState<string>("Ngày đi");
    const [selectedSeats, setSelectedSeats] = useState<number>(0); // Lưu số ghế đã chọn
    const [totalAmount, setTotalAmount] = useState<number>(0); // Lưu tổng tiền
    const [pickupPoint, setPickupPoint] = useState<{
        time: string;
        name: string;
        address: string;
      } | null>(null);
    
      const [dropoffPoint, setDropoffPoint] = useState<{
        time: string;
        name: string;
        address: string;
    } | null>(null); // Thay đổi từ string thành object

    // Khai báo các state để lưu trữ thông tin liên hệ dưới dạng một object
    const [contactInfo, setContactInfo] = useState<{
        fullName: string;
        email: string;
        phoneNumber: string;
    }>({
        fullName: "Họ tên",
        email: "Email",
        phoneNumber: "Số điện thoại",
    });

    // Thêm IdTripPassenger
    
    const [idTripPassenger, setIdTripPassenger] = useState<string>("ID chuyến đi");

    // Mảng chứa danh sách ghế đã chọn (có thể là mảng ID ghế hoặc mảng các đối tượng ghế)
    const [selectedSeatList, setSelectedSeatList] = useState<string[]>([]); // Mảng chứa danh sách ghế đã chọn
    
    // Tổng tiền dựa trên ghế đã chọn
    const [totalPrice, setTotalPrice] = useState<number>(0); // Tổng tiền dựa trên giá ghế đã chọn

    return (
        <InfoContext.Provider
            value={{
                busCompany,
                setBusCompany,
                departureTime,
                setDepartureTime,
                departureDate,
                setDepartureDate,
                selectedSeats,
                setSelectedSeats,
                totalAmount,
                setTotalAmount,
                pickupPoint,
                setPickupPoint,
                dropoffPoint,
                setDropoffPoint,
                contactInfo,
                setContactInfo,
                idTripPassenger,
                setIdTripPassenger, 
                selectedSeatList,
                setSelectedSeatList, 
                totalPrice, 
                setTotalPrice
            }}
        >
            {children}
        </InfoContext.Provider>
    );
};

// Hook sử dụng context
export const useInfo = () => useContext(InfoContext);
