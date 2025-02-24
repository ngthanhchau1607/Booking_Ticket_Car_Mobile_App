import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EndCollection = () => {
    return (
        <View style={styles.container}>
            {/* Tiêu đề phần nền tảng */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nền tảng kết nối người dùng và nhà xe</Text>
            </View>

            {/* Feature 1 */}
            <View style={styles.feature}>
                <Ionicons name="bus-outline" size={30} color="#1976d2" />
                <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>2000+ nhà xe chất lượng cao</Text>
                    <Text style={styles.featureDescription}>
                        5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.
                    </Text>
                </View>
            </View>

            {/* Feature 2 */}
            <View style={styles.feature}>
                <Ionicons name="card-outline" size={30} color="#fbc02d" />
                <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>Đặt vé dễ dàng</Text>
                    <Text style={styles.featureDescription}>
                        Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.
                    </Text>
                </View>
            </View>

            {/* Feature 3 */}
            <View style={styles.feature}>
                <Ionicons name="checkmark-circle-outline" size={30} color="#388e3c" />
                <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>Chắc chắn có chỗ</Text>
                    <Text style={styles.featureDescription}>
                        Hoàn ngay 150% nếu nhà xe không cung cấp dịch vụ vận chuyển.
                    </Text>
                </View>
            </View>

            {/* Feature 4 */}
            <View style={styles.feature}>
                <Ionicons name="gift-outline" size={30} color="#c2185b" />
                <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>Nhiều ưu đãi</Text>
                    <Text style={styles.featureDescription}>
                        Hàng ngàn ưu đãi cực chất độc quyền tại Vexere.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fa",
        padding: 16,
    },
    header: {
        marginBottom: 20, // Khoảng cách giữa tiêu đề và các mục
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1976d2", // Màu xanh cho tiêu đề
    },
    headerDescription: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    feature: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    featureText: {
        marginLeft: 10,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    featureDescription: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
});

export default EndCollection;
