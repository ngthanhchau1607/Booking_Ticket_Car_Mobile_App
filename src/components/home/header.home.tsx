import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Switch } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Dùng icon hệ thống

const HeaderHome = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>🚍 Vexere</Text>
            </View>

            {/* Cam kết */}
            <Text style={styles.commitment}>
                Cam kết hoàn 150% nếu nhà xe không cung cấp dịch vụ vận chuyển (*)
            </Text>


        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fa",
        paddingHorizontal: 16,
        paddingTop: 50,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1e88e5",
    },
    greeting: {
        fontSize: 16,
        color: "#666",
    },
    commitment: {
        fontSize: 14,
        color: "#444",
        marginVertical: 8,
    },
});

export default HeaderHome;
