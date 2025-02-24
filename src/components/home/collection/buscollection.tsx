import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Thêm useNavigation
import { router } from "expo-router";

// Dữ liệu các tin tức (có thể được lấy từ API hoặc danh sách static)
const stationsItems = [
    {
        id: "1",
        title: "Bến xe miền đông mới",
        image: require("@/assets/station/miendong.jpg"),
        route: "/miendong", 
    },
    {
        id: "2",
        title: "Bến xe miền tây",
        image: require("@/assets/station/mientay.jpg"),
        route: "/mientay", 
    },
    {
        id: "3",
        title: "Bến xe thành phố đà lạt",
        image: require("@/assets/station/dalat.jpg"),
        route: "/dalat",
    },
    {
        id: "4",
        title: "Bến xe miền đông cũ ",
        image: require("@/assets/station/miendongcu.jpg"),
        route: "/dongcu",
    },
   
];

const EndowCollection = () => {
   

     // Điều hướng theo route của từng item
        const handlePress = (item: any) => {
            router.navigate(item.route); // Điều hướng dựa vào route được định sẵn
        };

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
                data={stationsItems}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
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
        textAlign: "left",
        width: "100%",
    },
});

export default EndowCollection;
