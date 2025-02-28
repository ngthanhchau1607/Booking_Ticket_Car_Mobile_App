import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

const searchResults = [
    {
        id: "1",
        departureTime: "20:25",
        arrivalTime: "06:35",
        departureLocation: "Big C Quy Nhơn",
        arrivalLocation: "Bến Xe Miền Tây",
        vehicle: "Tài Phát Limousine",
        vehicleImage: "https://via.placeholder.com/150",
        availableSeats: 10,
        rating: 5.0,
        totalReviews: 537,
        oldPrice: 620000,
        newPrice: 450000,
        discount: "-14%",
    },
    {
        id: "2",
        departureTime: "20:25",
        arrivalTime: "06:35",
        departureLocation: "Big C Quy Nhơn",
        arrivalLocation: "Bến Xe Miền Tây",
        vehicle: "Tài Phát Limousine",
        vehicleImage: "https://via.placeholder.com/150",
        availableSeats: 10,
        rating: 5.0,
        totalReviews: 537,
        oldPrice: 620000,
        newPrice: 450000,
        discount: "-14%",
    },
    {
        id: "3",
        departureTime: "20:25",
        arrivalTime: "06:35",
        departureLocation: "Big C Quy Nhơn",
        arrivalLocation: "Bến Xe Miền Tây",
        vehicle: "Tài Phát Limousine",
        vehicleImage: "https://via.placeholder.com/150",
        availableSeats: 10,
        rating: 5.0,
        totalReviews: 537,
        oldPrice: 620000,
        newPrice: 450000,
        discount: "-14%",
    },
    {
        id: "4",
        departureTime: "20:25",
        arrivalTime: "06:35",
        departureLocation: "Big C Quy Nhơn",
        arrivalLocation: "Bến Xe Miền Tây",
        vehicle: "Tài Phát Limousine",
        vehicleImage: "https://via.placeholder.com/150",
        availableSeats: 10,
        rating: 5.0,
        totalReviews: 537,
        oldPrice: 620000,
        newPrice: 450000,
        discount: "-14%",
    },
];

const ResultSearch = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Danh sách chuyến xe</Text>
            </View>

            {/* Nội dung */}
            <View style={styles.content}>
                <FlashList
                    data={searchResults}
                    renderItem={({ item }) => (
                        <View style={styles.resultCard}>
                            <View style={styles.timeRow}>
                                <Text style={styles.timeText}>{item.departureTime}  •  {item.departureLocation}</Text>
                                <Text style={styles.priceText}>
                                    <Text style={styles.newPrice}>{item.newPrice.toLocaleString()}đ</Text>
                                </Text>
                            </View>
                            <Text style={styles.timeText}>{item.arrivalTime}  •  {item.arrivalLocation}</Text>

                            {/* Gạch ngang */}
                            <View style={styles.divider} />

                            <View style={styles.busInfo}>
                                <Image source={{ uri: item.vehicleImage }} style={styles.vehicleImage} />
                                <View style={styles.vehicleDetails}>
                                    <Text style={styles.vehicleName}>{item.vehicle}</Text>
                                    <Text style={styles.vehicleType}>Limousine 24 Phòng Đôi</Text>
                                    <Text style={styles.rating}>
                                        ⭐ {item.rating} ({item.totalReviews} đánh giá)
                                    </Text>
                                    <Text style={styles.availableSeats}>🚍 {item.availableSeats} chỗ trống</Text>
                                </View>
                            </View>

                            <View style={styles.actionRow}>
                                <View style={styles.paymentInfo}>
                                    <Text style={styles.paymentText}>✔ Không cần thanh toán trước</Text>
                                    <Text style={styles.paymentText}>✔ Xác nhận chỗ ngay lập tức</Text>
                                </View>
                                <TouchableOpacity style={styles.selectButton}>
                                    <Text style={styles.selectButtonText}>Chọn chỗ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#1e88e5",
    },
    content: {
        flex: 1,
        padding: 16,
    },
    resultCard: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    timeText: {
        fontSize: 14,
        color: "#555",
    },
    priceText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    newPrice: {
        color: "#e53935",
        fontSize: 16,
        fontWeight: "bold",
    },
    busInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    vehicleImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    vehicleDetails: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    vehicleType: {
        fontSize: 14,
        color: "#555",
    },
    rating: {
        fontSize: 14,
        color: "#f4a261",
    },
    availableSeats: {
        fontSize: 14,
        color: "#2a9d8f",
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    paymentText: {
        fontSize: 12,
        color: "#555",
    },
    selectButton: {
        backgroundColor: "#1e88e5",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: "center",
    },
    selectButtonText: {
        color: "white",
        fontSize: 16,
    },
    paymentInfo: {
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 10,
    },
});

export default ResultSearch;
