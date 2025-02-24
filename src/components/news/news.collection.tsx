import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Định nghĩa Props
interface NewsDetailProps {
    title: string;
    image: any; // Đường dẫn ảnh (require)
    content: string;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ title, image, content }) => {
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
                    {title}
                </Text>
            </View>

            {/* Nội dung */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hình ảnh bài viết */}
                <Image source={image} style={styles.image} />

                {/* Nội dung bài viết */}
                <View style={styles.content}>
                    <Text style={styles.articleTitle}>{title}</Text>
                    <Text style={styles.paragraph}>{content}</Text>
                </View>
            </ScrollView>
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
        textAlign: "center",
        marginHorizontal: 10, // Khoảng cách giữa nút back và tiêu đề
    },
    image: {
        width: "100%",
        height: 220,
        resizeMode: "cover",
    },
    content: {
        padding: 16,
    },
    articleTitle: {
        fontSize: 18,
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

export default NewsDetail;
