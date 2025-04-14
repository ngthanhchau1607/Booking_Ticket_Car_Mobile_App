// RegisterContext.tsx
import React, { createContext, useContext, useState } from "react";

// Tạo context để lưu trữ thông tin đăng ký
const RegisterContext = createContext<any>(null);

export const RegisterProvider = ({ children }: any) => {
    // Khai báo các state để lưu trữ thông tin đăng ký
    const [otp, setOtp] = useState<number>(0); // Lưu trữ OTP
    const [userInfo, setUserInfo] = useState<{
        name: string;
        email: string;
        numberPhone: string;
        password: string;
    }>({
        name: "",
        email: "",
        numberPhone: "",
        password: "",
    });

    return (
        <RegisterContext.Provider
            value={{
                otp,
                setOtp,
                userInfo,
                setUserInfo
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};

// Hook sử dụng context
export const useRegister = () => useContext(RegisterContext);
