import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

// Dữ liệu các ưu đãi (có thể được lấy từ API hoặc danh sách static)
const endowItems = [
    {
        id: "1",
        title: "Giảm 15% cho khách hàng đặt xe Toàn Thắng - Vũng Tàu tại Vexere",
        image: require("@/assets/endow/xetoanthang.jpeg"), // Đường dẫn ảnh import
        route: "/xetoanthang", // Đường dẫn riêng cho mỗi ưu đãi
    },
    {
        id: "2",
        title: "Giảm ngay 15% khi thuê xe 7 chỗ tại Vexere",
        image: require("@/assets/endow/thue7.jpeg"),
        route: "/thue7cho", // Đường dẫn riêng cho mỗi ưu đãi
    },
    {
        id: "3",
        title: "Giới thiệu bạn mới - Nhận quà khủng từ Vexere",
        image: require("@/assets/endow/banmoi.jpeg"),
        route: "/banmoi", // Đường dẫn riêng cho mỗi ưu đãi
    },
    {
        id: "4",
        title: "Ưu đãi bất ngờ khi đặt Vexere",
        image: require("@/assets/endow/dealhot.png"),
        route: "/dealhot", // Đường dẫn riêng cho mỗi ưu đãi
    }
];

const EndowCollection = () => {

    // Điều hướng theo route của từng item
    const handlePress = (item: any) => {
        router.navigate(item.route); // Điều hướng dựa vào route được định sẵn
    };

    return (
        <View style={styles.container}>
            {/* Tiêu đề Ưu đãi */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Ưu đãi</Text>
                <TouchableOpacity >
                    <Text style={styles.seeAll}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            {/* Danh sách Ưu đãi */}
            <FlatList
                data={endowItems}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item)}>
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
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
        textAlign: "left", // Đưa chữ về bên trái khi xuống dòng
        width: "100%", // Đảm bảo tiêu đề chiếm hết chiều rộng
    },
});

export default EndowCollection;
