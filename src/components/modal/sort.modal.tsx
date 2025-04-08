import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

interface SortModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (sortOption: string) => void;
    selectedOption: string; // ✅ Thêm prop này
}

const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onApply, selectedOption }) => {
    const [sortOption, setSortOption] = useState<string>(selectedOption);

    // ✅ Đồng bộ khi selectedOption từ ngoài thay đổi
    useEffect(() => {
        setSortOption(selectedOption);
    }, [selectedOption]);

    const handleRadioChange = (value: string) => {
        setSortOption(value);
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
                <View style={styles.header}>
                    <Text style={styles.modalTitle}>Sắp xếp</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#555" />
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <View style={styles.radioGroup}>
                    <Text style={styles.radioLabel}>Lọc theo:</Text>
                    <RadioButton.Group onValueChange={handleRadioChange} value={sortOption}>
                        <View style={styles.radioOption}>
                            <RadioButton value="default" color="#1e88e5" />
                            <Text style={styles.radioText}>Mặc định</Text>
                        </View>
                        <View style={styles.radioOption}>
                            <RadioButton value="earliest" color="#1e88e5" />
                            <Text style={styles.radioText}>Giờ đi sớm nhất</Text>
                        </View>
                        <View style={styles.radioOption}>
                            <RadioButton value="latest" color="#1e88e5" />
                            <Text style={styles.radioText}>Giờ đi muộn nhất</Text>
                        </View>
                        <View style={styles.radioOption}>
                            <RadioButton value="highest_rating" color="#1e88e5" />
                            <Text style={styles.radioText}>Đánh giá cao nhất</Text>
                        </View>
                        <View style={styles.radioOption}>
                            <RadioButton value="price_desc" color="#1e88e5" />
                            <Text style={styles.radioText}>Giá giảm dần</Text>
                        </View>
                        <View style={styles.radioOption}>
                            <RadioButton value="price_asc" color="#1e88e5" />
                            <Text style={styles.radioText}>Giá tăng dần</Text>
                        </View>
                    </RadioButton.Group>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.clearButton} onPress={() => {
    setSortOption("default");      // reset về mặc định trong modal
    // onApply("default");            // báo cho cha biết reset luôn
    // onClose();
    
  }}>
                        <Text style={styles.clearButtonText}>Xóa lọc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.applyButton} onPress={() => onApply(sortOption)}>
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
    radioGroup: { marginBottom: 20 },
    radioLabel: { fontSize: 16, marginBottom: 10 },
    radioOption: { flexDirection: "row", alignItems: "center", marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 10 },
    radioText: { fontSize: 16, marginLeft: 10 },
    footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    clearButton: { padding: 10, borderRadius: 6, backgroundColor: "#ddd", flex: 1, alignItems: "center", marginRight: 5 },
    clearButtonText: { fontSize: 16, color: "#555" },
    applyButton: { padding: 10, borderRadius: 6, backgroundColor: "#1e88e5", flex: 1, alignItems: "center" },
    applyButtonText: { fontSize: 16, color: "white" },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 10,
    },
});

export default SortModal;
