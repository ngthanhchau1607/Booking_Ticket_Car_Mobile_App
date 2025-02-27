import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Để sử dụng biểu tượng
import { useNavigation } from "@react-navigation/native"; // Để sử dụng navigation
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Để xử lý safe area

const ResultSearch = () => {
    const insets = useSafeAreaInsets(); // Lấy giá trị safe area insets
    const navigation = useNavigation(); // Hook điều hướng

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                {/* Nút Back */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>

                {/* Tiêu đề (cắt chữ khi dài quá) */}
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    Kết quả tìm kiếm
                </Text>
            </View>

            {/* Nội dung */}
            <View style={styles.content}>
                <Text style={styles.greetingText}>Xin chào!</Text>
                <Text style={styles.paragraph}>Đây là kết quả tìm kiếm của bạn.</Text>
            </View>
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
        flex: 1, // Tiêu đề chiếm toàn bộ phần còn lại của header
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        textAlign: "left",
        marginHorizontal: 10, // Khoảng cách giữa nút back và tiêu đề
    },
    content: {
        padding: 16,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 14,
        color: "#555",
        marginBottom: 12,
        lineHeight: 22,
    },
});

export default ResultSearch;
