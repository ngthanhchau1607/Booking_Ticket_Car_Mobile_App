import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper"; // Cần cài đặt `react-native-paper` để dùng Checkbox

interface BusCompany {
    name: string;
    rating: number;
}

interface BusCompanyModalProps {
    visible: boolean;
    onClose: () => void;
    companies: BusCompany[];
    selectedCompanies: string[];
    onApply: (selected: string[]) => void;
    onClear: () => void;
    onSelect: (selected: string[]) => void;  // Thêm prop onSelect
}

const BusCompanyModal: React.FC<BusCompanyModalProps> = ({ visible, onClose, companies, selectedCompanies, onApply, onClear, onSelect }) => {
    const [selected, setSelected] = useState<string[]>(selectedCompanies);

    // Lắng nghe khi selected thay đổi và gọi onSelect
    useEffect(() => {
        onSelect(selected);
    }, [selected, onSelect]);

    const toggleSelect = (company: string) => {
        setSelected((prevSelected) =>
            prevSelected.includes(company) ? prevSelected.filter((c) => c !== company) : [...prevSelected, company]
        );
    };

    return (
        <Modal
            isVisible={visible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={onClose}
            useNativeDriver
            useNativeDriverForBackdrop
            hideModalContentWhileAnimating
            style={styles.modal}
        >
            <View style={styles.modalContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.modalTitle}>Nhà xe</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#555" />
                    </TouchableOpacity>
                </View>

                {/* Danh sách nhà xe */}
                <FlatList
                    data={companies}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => toggleSelect(item.name)}>
                            <Checkbox.Android
                                status={selected.includes(item.name) ? "checked" : "unchecked"}
                                onPress={() => toggleSelect(item.name)}
                                color="#1e88e5"
                            />
                            <Text style={styles.companyName}>{item.name}</Text>
                            <Text style={styles.rating}>⭐ {item.rating}</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Nút Xóa Lọc & Áp Dụng */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.clearButton} onPress={onClear}>
                        <Text style={styles.clearButtonText}>Xóa lọc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.applyButton} onPress={() => onApply(selected)}>
                        <Text style={styles.applyButtonText}>Áp dụng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: { justifyContent: "flex-end", margin: 0 },
    modalContainer: { backgroundColor: "#fff", padding: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, maxHeight: "70%" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    modalTitle: { fontSize: 18, fontWeight: "bold" },
    item: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
    companyName: { flex: 1, fontSize: 16 },
    rating: { fontSize: 14, color: "#f4a261" },
    footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    clearButton: { padding: 10, borderRadius: 6, backgroundColor: "#ddd", flex: 1, alignItems: "center", marginRight: 5 },
    clearButtonText: { fontSize: 16, color: "#555" },
    applyButton: { padding: 10, borderRadius: 6, backgroundColor: "#1e88e5", flex: 1, alignItems: "center" },
    applyButtonText: { fontSize: 16, color: "white" },
});

export default BusCompanyModal;
