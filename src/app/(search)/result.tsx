import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BusCompanyModal from "@/components/modal/bus.modal";

const busCompanies = [
    { name: "Tài Phát", rating: 4.8 },
    { name: "VIP Express", rating: 4.5 },
    { name: "Queen Bus", rating: 4.2 },
    { name: "Royal Limousine", rating: 4.9 }
];

const ResultSearch: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [busModalVisible, setBusModalVisible] = useState(false);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Kết quả tìm kiếm</Text>
            </View>

            {/* Bộ lọc */}
            <View style={styles.filterBar}>
                <TouchableOpacity style={styles.filterItem} onPress={() => setBusModalVisible(true)}>
                    <Ionicons name="bus-outline" size={18} color="#555" style={styles.filterIcon} />
                    <Text style={styles.filterText}>Nhà xe</Text>
                    <Ionicons name="chevron-down" size={16} color="#555" />
                </TouchableOpacity>
            </View>

            {/* Gọi Modal Nhà Xe */}
            <BusCompanyModal
                visible={busModalVisible}
                onClose={() => setBusModalVisible(false)}
                companies={busCompanies}
                selectedCompanies={selectedCompanies}
                onApply={(selected) => {
                    setSelectedCompanies(selected);
                    setBusModalVisible(false);
                }}
                onClear={() => setSelectedCompanies([])}
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
        borderBottomWidth: 1.5,
        borderBottomColor: "#ccc",
    },
    backButton: { marginRight: 10 },
    title: { fontSize: 18, fontWeight: "bold", color: "#1e88e5" },
    filterBar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        elevation: 2,
    },
    filterItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
    },
    filterIcon: { marginRight: 5 },
    filterText: { fontSize: 14, color: "#333", marginRight: 5 },
});

export default ResultSearch;
