import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

// Dữ liệu các tin tức (có thể được lấy từ API hoặc danh sách static)
const newsItems = [
    {
        id: "1",
        title: "Hướng dẫn tạo yêu cầu bồi thường bảo hiểm",
        image: require("@/assets/news/bhxe.jpeg"), // Đường dẫn ảnh import
        route: "/baohiem", // Đường dẫn riêng cho mỗi bài viết
    },
    {
        id: "2",
        title: "Vexere kỷ niệm 11 năm đồng hành cùng hàng triệu khán giả",
        image: require("@/assets/news/11nam.jpeg"),
        route: "/kiniem",
    },
    {
        id: "3",
        title: "Bí kíp săn deal xe khách giá hời khi đặt tại Vexere",
        image: require("@/assets/news/sandeal.jpeg"),
        route: "/sandeal",
    },
    {
        id: "4",
        title: "Chương trình tích điểm đổi quà tại Vexere",
        image: require("@/assets/news/snxe.jpeg"),
        route: "/tichdiem",
    },
];

const NewsCollection = () => {

    // Điều hướng theo route của từng item
    const handlePress = (item: any) => {
        router.navigate(item.route); // Điều hướng dựa vào route được định sẵn
    };

    return (
        <View style={styles.container}>
            {/* Tiêu đề Tin tức */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tin tức</Text>
                <TouchableOpacity >
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

export default NewsCollection;
