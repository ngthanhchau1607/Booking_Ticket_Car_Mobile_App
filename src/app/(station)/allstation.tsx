import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Thêm useNavigation
import { router } from "expo-router"; // Sử dụng router để điều hướng

// Dữ liệu các bến xe (có thể được lấy từ API hoặc danh sách static)
const stationsItems = [
    {
        id: "1",
        title: "Bến xe miền Đông mới",
        image: require("@/assets/station/miendong.jpg"),
        route: "/miendong",
    },
    {
        id: "2",
        title: "Bến xe miền Tây",
        image: require("@/assets/station/mientay.jpg"),
        route: "/mientay",
    },
    {
        id: "3",
        title: "Bến xe thành phố Đà Lạt",
        image: require("@/assets/station/dalat.jpg"),
        route: "/dalat",
    },
    {
        id: "4",
        title: "Bến xe Miền Đông cũ",
        image: require("@/assets/station/miendongcu.jpg"),
        route: "/dongcu",
    },
];

const AllStation = () => {
    // Điều hướng theo route của từng item
    const handlePress = (item: any) => {
        router.navigate(item.route); // Điều hướng dựa vào route được định sẵn
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tất cả Bến xe</Text>
            </View>

            {/* Danh sách Bến xe */}
            <FlatList
                data={stationsItems}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
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
    header: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 16,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    item: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        overflow: "hidden",
        marginBottom: 12,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        padding: 10,
        textAlign: "left",
    },
});

export default AllStation;
