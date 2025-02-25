import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

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

const AllEndow = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets(); // Lấy giá trị safe area insets

    // Điều hướng theo route của từng item
    const handlePress = (item: any) => {
        router.navigate(item.route); // Điều hướng dựa vào route được định sẵn
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                {/* Nút Back */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>

                {/* Tiêu đề */}
                <Text style={styles.title}>Tất Cả Ưu Đãi</Text>
            </View>

            {/* Danh sách Ưu đãi */}
            <FlatList
                data={endowItems}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item)}>
                        <View style={styles.item}>
                            {/* Ảnh chiếm toàn bộ chiều rộng */}
                            <Image source={item.image} style={styles.image} />
                            {/* Tiêu đề dưới ảnh */}
                            <Text style={styles.titleItem}>{item.title}</Text>
                        </View>
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
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        textAlign: "left",
        marginHorizontal: 10, // Khoảng cách giữa nút back và tiêu đề
    },
    item: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        overflow: "hidden",
        marginBottom: 12,
    },
    image: {
        width: "100%", // Chiếm toàn bộ chiều rộng của item
        height: 200,   // Chiều cao của ảnh
        borderRadius: 8,
    },
    titleItem: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        padding: 10,
        textAlign: "left", // Căn trái tiêu đề
    },
});

export default AllEndow;
