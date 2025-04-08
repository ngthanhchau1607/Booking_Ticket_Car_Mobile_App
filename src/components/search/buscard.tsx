

import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

interface BusCardProps {
    departureTime: string;
    arrivalTime: string;
    departureLocation: string;
    arrivalLocation: string;
    vehicle: string;
    vehicleType:string,
    vehicleImage: any;
    availableSeats: number;
    rating: number;
    newPrice: number;
    onSelect: () => void;
}

const BusCard: React.FC<BusCardProps> = ({
    departureTime,
    arrivalTime,
    departureLocation,
    arrivalLocation,
    vehicle,
    vehicleType,
    vehicleImage,
    availableSeats,
    rating,
    newPrice,
    onSelect
}) => {
    return (
        <View style={styles.resultCard}>
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{departureTime}  •  {departureLocation}</Text>
                <Text style={styles.priceText}>
                    <Text style={styles.newPrice}>{newPrice.toLocaleString()}đ</Text>
                </Text>
            </View>
            <Text style={styles.timeText}>{arrivalTime}  •  {arrivalLocation}</Text>

            <View style={styles.divider} />

            <View style={styles.busInfo}>
            <Image source={vehicleImage} style={styles.vehicleImage} />
                <View style={styles.vehicleDetails}>
                    <Text style={styles.vehicleName}>{vehicle}</Text>
                    <Text style={styles.vehicleType}>{vehicleType}</Text>
                    <Text style={styles.rating}>
                        ⭐ {rating} 
                    </Text>
                    <Text style={styles.availableSeats}>🚍 {availableSeats} chỗ trống</Text>
                </View>
            </View>

            <View style={styles.actionRow}>
                <View style={styles.paymentInfo}>
                    <Text style={styles.paymentText}>✔ Không cần thanh toán trước</Text>
                    <Text style={styles.paymentText}>✔ Xác nhận chỗ ngay lập tức</Text>
                </View>
                <TouchableOpacity style={styles.selectButton} onPress={onSelect}>
                    <Text style={styles.selectButtonText}>Chọn chỗ</Text>
                </TouchableOpacity>
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

export default BusCard;
