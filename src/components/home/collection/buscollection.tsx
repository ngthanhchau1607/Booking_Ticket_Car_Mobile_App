import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

// Dữ liệu các tin tức (có thể được lấy từ API hoặc danh sách static)
const newsItems = [
    {
        id: "1",
        title: "Hướng dẫn tạo yêu cầu bồi thường bảo hiểm",
        image: require("@/assets/demo.jpg"), // Đường dẫn ảnh import
    },
    {
        id: "2",
        title: "Hướng dẫn mua vé xe trực tuyến",
        image: require("@/assets/demo.jpg"),
    },
    {
        id: "3",
        title: "Vexere ký kết hợp tác với các hãng xe lớn",
        image: require("@/assets/demo.jpg"),
    },
    {
        id: "4",
        title: "Vexere triển khai dịch vụ đặt vé qua app",
        image: require("@/assets/demo.jpg"),
    },
    {
        id: "5",
        title: "Tin tức và thông báo từ Vexere",
        image: require("@/assets/demo.jpg"),
    },
];

const EndowCollection = () => {
    return (
        <View style={styles.container}>
            {/* Tiêu đề Tin tức */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bến xe</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            {/* Danh sách Tin tức */}
            <FlatList
                data={newsItems}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f7fa",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    seeAll: {
        fontSize: 14,
        color: "#1976d2", // Màu xanh cho nút "Xem tất cả"
    },
    item: {
        width: 250, // Chiều rộng của mỗi item
        marginRight: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        padding: 10,
        alignItems: "center", // Canh giữa ảnh và title
    },
    image: {
        width: "100%", // Ảnh chiếm hết chiều rộng của item
        height: 120,
        borderRadius: 10,
    },
    title: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
    },
});

export default EndowCollection;
