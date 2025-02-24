import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars"; // Import thư viện calendar

const SearchDate = () => {
    const navigation = useNavigation(); // Dùng navigation để xử lý goBack
    const [selectedDate, setSelectedDate] = useState(""); // Lưu ngày đã chọn

    // Hàm xử lý khi người dùng nhấn vào nút quay lại
    const handleGoBack = () => {
        navigation.goBack(); // Quay lại trang trước
    };

    // Hàm xử lý khi người dùng nhấn nút xác nhận
    const handleConfirmDate = () => {
        if (selectedDate) {
            console.log("Ngày đã chọn:", selectedDate);
            // Bạn có thể làm gì đó với ngày đã chọn, ví dụ như gọi API hoặc chuyển hướng màn hình
        } else {
            console.log("Vui lòng chọn một ngày");
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Nút GoBack */}
                <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                {/* Tiêu đề */}
                <Text style={styles.headerTitle}>Chọn ngày</Text>
            </View>

            {/* Lịch chọn ngày */}
            <View style={styles.calendarContainer}>
                <Calendar
                    // Cài đặt các thuộc tính của lịch
                    onDayPress={(day: any) => setSelectedDate(day.dateString)} // Cập nhật ngày khi chọn
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: "blue", // Màu khi ngày được chọn
                            selectedTextColor: "white",
                        },
                    }}
                    markingType={"simple"} // Cách đánh dấu ngày
                />
            </View>

            {/* Nút xác nhận */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDate}>
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20, // Thêm khoảng cách ở trên để header không bị chặn
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    goBackButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10, // Khoảng cách với nút quay lại
    },
    calendarContainer: {
        padding: 20,
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: "blue",
        paddingVertical: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        alignItems: "center",
    },
    confirmButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SearchDate;
