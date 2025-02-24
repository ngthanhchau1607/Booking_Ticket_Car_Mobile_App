import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { useLocation } from "@/context/search.context"; // Import useLocation để sử dụng context

const SearchDate = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState("");
    const { setDate } = useLocation(); // Lấy setDate từ context

    const handleGoBack = () => {
        navigation.goBack();
    };

    // const handleConfirmDate = () => {
    //     if (selectedDate) {
    //         // Cập nhật ngày đã chọn vào context
    //         setDate(selectedDate);
    //         console.log("Ngày đã chọn:", selectedDate);
    //         navigation.goBack(); // Quay lại trang trước sau khi xác nhận
    //     } else {
    //         console.log("Vui lòng chọn một ngày");
    //     }
    // };

    const handleConfirmDate = () => {
        if (selectedDate) {
            // Chuyển đổi ngày theo định dạng ngày/tháng/năm
            const dateObj = new Date(selectedDate);
            const day = String(dateObj.getDate()).padStart(2, '0'); // Lấy ngày và đảm bảo 2 chữ số
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Lấy tháng (cộng thêm 1 vì getMonth bắt đầu từ 0)
            const year = dateObj.getFullYear(); // Lấy năm
    
            // Định dạng ngày theo kiểu ngày/tháng/năm
            const formattedDate = `${day}/${month}/${year}`;
    
            // Cập nhật ngày đã chọn vào context
            setDate(formattedDate);
            console.log("Ngày đã chọn:", formattedDate); // Hiển thị ngày theo định dạng
            navigation.goBack(); // Quay lại trang trước sau khi xác nhận
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
