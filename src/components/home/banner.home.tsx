import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { useLocation } from "@/context/search.context";

const BannerHome = () => {
    const { departure, destination } = useLocation();
    const router = useRouter();

    useEffect(() => {
    }, [departure, destination]);


    const handleNavigateToSearch = (type: string) => {
        if (type === "departure") {
            router.push("/search");
        } else if (type === "destination") {
            router.push("/searchto");
        }
    };



    const handleNavigateToDate = () => {
        router.push("/(search)/date");
    };

    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.tabs}>
                    {/* Xe khách */}
                    <View style={styles.tabContainer}>
                        <Ionicons name="bus-outline" size={24} color="#1e88e5" />
                        <Text style={[styles.tab, styles.activeTab]}>Xe khách</Text>
                    </View>

                    {/* Máy bay */}
                    <View style={styles.tabContainer}>
                        <Ionicons name="airplane-outline" size={24} color="#777" />
                        <Text style={styles.tab}>Máy bay</Text>
                    </View>

                    {/* Tàu hỏa */}
                    <View style={styles.tabContainer}>
                        <Ionicons name="train-outline" size={24} color="#777" />
                        <Text style={styles.tab}>Tàu hỏa</Text>
                    </View>

                    {/* Thuê xe */}
                    <View style={styles.tabContainer}>
                        <Ionicons name="car-outline" size={24} color="#777" />
                        <Text style={styles.tab}>Thuê xe</Text>
                    </View>
                </View>

                {/* Nơi xuất phát */}
                <TouchableOpacity style={styles.inputRow} onPress={() => handleNavigateToSearch('departure')}>
                    <MaterialIcons name="my-location" size={24} color="#1e88e5" />
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>{departure}</Text>
                    </View>
                </TouchableOpacity>

                {/* Nơi đến */}
                <TouchableOpacity style={styles.inputRow} onPress={() => handleNavigateToSearch('destination')}>
                    <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={24}
                        color="red"
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>{destination}</Text>
                    </View>
                </TouchableOpacity>

                {/* Ngày đi */}
                <TouchableOpacity style={styles.inputRow} onPress={handleNavigateToDate}>
                    <Ionicons name="calendar-outline" size={24} color="#1e88e5" />
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Ngày đi</Text>
                    </View>
                </TouchableOpacity>

                {/* Nút tìm kiếm */}
                <Button mode="contained" style={styles.searchButton}>
                    <Text style={{ color: "black" }}>Tìm kiếm</Text>
                </Button>
            </Card.Content>
        </Card>
    );
};

// Styles
const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    tabContainer: {
        alignItems: "center",
    },
    tab: {
        fontSize: 14,
        color: "#777",
        padding: 8,
    },
    activeTab: {
        fontWeight: "bold",
        color: "#1e88e5",
        borderBottomWidth: 2,
        borderBottomColor: "#1e88e5",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#1e88e5", // Màu sắc của đường viền
        borderRadius: 8, // Làm tròn các góc
        padding: 8, // Khoảng cách giữa text và đường viền
        marginLeft: 10, // Khoảng cách với biểu tượng
        flex: 1, // Đảm bảo ô input chiếm hết chiều rộng
        minHeight: 40, // Đảm bảo độ cao tối thiểu cho ô input
        justifyContent: "center", // Căn giữa nội dung trong ô
    },
    inputText: {
        fontSize: 16,
        color: "#333", // Màu chữ
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    searchButton: {
        backgroundColor: "#fdd835",
        marginTop: 15,
        borderRadius: 10,
    },
});

export default BannerHome;
