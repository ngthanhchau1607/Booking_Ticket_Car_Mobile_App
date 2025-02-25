import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

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

const AllNew = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
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
                <Text style={styles.title}>Tất Cả Tin Tức</Text>
            </View>

            {/* Danh sách Tin tức */}
            <FlatList
                data={newsItems}
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
        marginHorizontal: 10,
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
    titleItem: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        padding: 10,
        textAlign: "left",
    },
});

export default AllNew;
