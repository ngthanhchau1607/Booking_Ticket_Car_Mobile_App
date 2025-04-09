import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper"; // Import RadioButton từ react-native-paper

interface TimeModalProps {
    visible: boolean;
    onClose: () => void;
    selectedTime: number;
    onApply: (time: number, timeOption: string) => void;
    onClear: () => void;
}

const TimeModal: React.FC<TimeModalProps> = ({ visible, onClose, selectedTime, onApply, onClear }) => {
    const [timeOption, setTimeOption] = useState<string>("default"); // default, earliest, latest

    const handleRadioChange = (value: string) => {
        setTimeOption(value);
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
                    <Text style={styles.modalTitle}>Giờ đi</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#555" />
                    </TouchableOpacity>
                </View>

                {/* Ngăn cách giữa header và radio lọc */}
                <View style={styles.separator} />

                {/* Radio buttons để chọn lọc theo giờ */}
                <View style={styles.radioGroup}>
                    <Text style={styles.radioLabel}>Lọc theo:</Text>
                    <RadioButton.Group onValueChange={handleRadioChange} value={timeOption}>
                        <View style={styles.radioOption}>
                            <RadioButton value="default" color="#1e88e5" />
                            <Text style={styles.radioText}>Mặc định</Text>
                        </View>
                        <View style={styles.radioOption}>
    <RadioButton value="time_asc" color="#1e88e5" />
    <Text style={styles.radioText}>Giờ đi sớm nhất</Text>
  </View>
  <View style={styles.radioOption}>
    <RadioButton value="time_desc" color="#1e88e5" />
    <Text style={styles.radioText}>Giờ đi muộn nhất</Text>
  </View>
                    </RadioButton.Group>
                </View>

                {/* Lọc theo lựa chọn */}
                <View style={styles.footer}>
                <TouchableOpacity
    style={styles.clearButton}
    onPress={() => {
      setTimeOption("default"); // reset radio
      onClear();                // báo về cha (nếu cần lọc lại dữ liệu)
    }}
  >
    <Text style={styles.clearButtonText}>Xóa lọc</Text>
  </TouchableOpacity>
                    <TouchableOpacity style={styles.applyButton} onPress={() => onApply(selectedTime, timeOption)}>
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
        marginVertical: 10 
    },
});

export default TimeModal;
