import React, { useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Đảm bảo đã cài đặt thư viện icon
import { useCurrentApp } from "@/context/api.context";
import { useRouter } from "expo-router";

const OtpPage = () => {

   

    // Khai báo kiểu dữ liệu cho mảng otp
    const [otp1, setOtp] = useState<string[]>(["", "", "", ""]);
    const { otp } = useCurrentApp(); // Giả sử otp là mảng chứa OTP đúng từ context
    // Khai báo kiểu dữ liệu cho useRef là một mảng các TextInput
    const inputs = useRef<(TextInput | null)[]>([]);

    console.log("check otp", otp);
    
    const handleOtpChange = (value: string, index: number) => {
        if (/[^0-9]/.test(value)) return; // Chỉ cho phép nhập số
        const newOtp = [...otp1];
        newOtp[index] = value;
        setOtp(newOtp);

        // Tự động focus vào ô tiếp theo nếu người dùng nhập xong
        if (value && index < otp1.length - 1) {
            inputs.current[index + 1]?.focus(); // Kiểm tra giá trị không null trước khi focus
        }
    };

    // Hàm để xử lý khi người dùng nhấn nút "Xác nhận"
    const handleConfirm = () => {
        // Ghép tất cả các giá trị trong otp thành một chuỗi duy nhất
        const otpValue = otp1.join("");

        // Kiểm tra nếu OTP hợp lệ (gồm 4 ký tự)
        if (otpValue.length === 4) {
            // So sánh otpValue với giá trị otp từ context
            if (otpValue === otp.join("")) {
                // Nếu khớp, thông báo OTP hợp lệ
                Alert.alert("OTP hợp lệ", `OTP bạn đã nhập: ${otpValue}`);
            } else {
                // Nếu không khớp, thông báo lỗi
                Alert.alert("Lỗi", "OTP không khớp. Vui lòng thử lại.");
            }
        } else {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ 4 ký tự OTP.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Xác thực OTP</Text>
            </View>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
                {otp1.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => (inputs.current[index] = el)}  
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.otpInput}
                        autoFocus={index === 0}  
                    />
                ))}
            </View>

            {/* Xác nhận Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10, 
        marginBottom: 20,
        borderBottomWidth: 1, 
        borderBottomColor: "#ccc",
        paddingBottom: 10, 
    },
    backButton: {
        paddingRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 50,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
    confirmButton: {
        marginTop: 30,
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    confirmButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default OtpPage;
