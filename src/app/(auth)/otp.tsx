import React, { useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRegister } from "@/context/register.context";
import Toast from "react-native-root-toast"; // Import Toast
import { registerApi } from "@/utils/api";  // Import hàm gọi API đăng ký
import { router } from "expo-router";

const OtpPage = () => {
  // Khai báo kiểu dữ liệu cho mảng otp
  const [otp1, setOtp] = useState<string[]>(["", "", "", ""]);
  const { otp, userInfo } = useRegister();  // Lấy otp và thông tin người dùng từ context
  const inputs = useRef<(TextInput | null)[]>([]);
    console.log(otp);
  // Hàm để xử lý khi người dùng thay đổi OTP
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
  const handleConfirm = async () => {
    Keyboard.dismiss();  // Đóng bàn phím khi nhấn xác nhận

    // Ghép tất cả các giá trị trong otp thành một chuỗi duy nhất
    const otpValue = otp1.join("");  // Tạo chuỗi từ các ô nhập
    const otpNumber = parseInt(otpValue, 10);  // Chuyển OTP nhập vào thành số

    // Kiểm tra nếu OTP hợp lệ (gồm 4 ký tự)
    if (otpValue.length === 4) {
      // So sánh OTP nhập vào với OTP từ context 
      const { name, email, numberPhone, password } = userInfo;  
      console.log(name,email,numberPhone,password)
      if (otpNumber === otp) {
        Toast.show("OTP hợp lệ! Đăng ký thành công", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: "#4CAF50", // Màu xanh lá cho thông báo thành công
          opacity: 1,
        });

        const { name, email, numberPhone, password } = userInfo; 
        const response = await registerApi(name, email, numberPhone, password); 

        console.log(response) 

        router.push("/(auth)/login")


      } else {
        // Nếu OTP không khớp, thông báo lỗi
        Toast.show("OTP không khớp. Vui lòng thử lại.", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: "#f44336", // Màu đỏ cho thông báo lỗi
          opacity: 1,
        });
      }
    } else {
      // Nếu người dùng chưa nhập đủ 4 ký tự
      Toast.show("Vui lòng nhập đầy đủ 4 ký tự OTP.", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: "#f44336", // Màu đỏ cho thông báo lỗi
        opacity: 1,
      });
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
            ref={(el) => (inputs.current[index] = el)}  // Sử dụng ref để tham chiếu đến từng ô nhập
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

      {/* Hiển thị Toast thông báo */}
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
