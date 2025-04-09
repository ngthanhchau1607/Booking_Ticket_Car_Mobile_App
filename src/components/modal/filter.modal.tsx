import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useTripPassenger } from "@/context/trippassenger.context";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: { pickup: string; dropoff: string; busType: string }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => { 

  const { tripPassengers } = useTripPassenger();  

    const [pickup, setPickup] = useState<string>("");
    const [dropoff, setDropoff] = useState<string>("");
    const [busType, setBusType] = useState<string>("");
    const [isPickupModalVisible, setIsPickupModalVisible] = useState<boolean>(false);
    const [isDropoffModalVisible, setIsDropoffModalVisible] = useState<boolean>(false);


    const [pickupOptions, setPickupOptions] = useState<string[]>([]);
const [dropoffOptions, setDropoffOptions] = useState<string[]>([]);


useEffect(() => {
    if (visible && tripPassengers && tripPassengers.length > 0) {
      const pickups = tripPassengers.map((item) => item.trip.from.address);
      const dropoffs = tripPassengers.map((item) => item.trip.to.address);
  
      setPickupOptions(Array.from(new Set(pickups)));
      setDropoffOptions(Array.from(new Set(dropoffs)));
    }
  }, [visible, tripPassengers]);

    // Hàm để hiển thị danh sách lựa chọn
    const renderOptionList = (options: string[], selected: string, onSelect: (item: string) => void) => (
        <FlatList
            data={options}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionItem} onPress={() => onSelect(item)}>
                    <Text style={selected === item ? styles.selectedOptionText : styles.optionText}>
                        {item}
                    </Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
        />
    );

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
                    <Text style={styles.modalTitle}>Lọc</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#555" />
                    </TouchableOpacity>
                </View>

                {/* Điểm đón */}
                <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>Điểm đón</Text>
                    <TouchableOpacity
                        style={styles.filterItem}
                        onPress={() => setIsPickupModalVisible(!isPickupModalVisible)}
                    >
                        <Text style={pickup ? styles.selectedItemText : styles.placeholderText}>
                            {pickup || "Chọn điểm đón"}
                        </Text>
                        <Ionicons name="chevron-down" size={18} color="#555" />
                    </TouchableOpacity>
                    {isPickupModalVisible && renderOptionList(pickupOptions, pickup, setPickup)}
                </View>

                {/* Điểm trả */}
                <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>Điểm trả</Text>
                    <TouchableOpacity
                        style={styles.filterItem}
                        onPress={() => setIsDropoffModalVisible(!isDropoffModalVisible)}
                    >
                        <Text style={dropoff ? styles.selectedItemText : styles.placeholderText}>
                            {dropoff || "Chọn điểm trả"}
                        </Text>
                        <Ionicons name="chevron-down" size={18} color="#555" />
                    </TouchableOpacity>
                    {isDropoffModalVisible && renderOptionList(dropoffOptions, dropoff, setDropoff)}
                </View>

                {/* Footer with apply and clear buttons */}
                <View style={styles.footer}>
                    <TouchableOpacity
  style={styles.clearButton}
  onPress={() => {
    setPickup("");
    setDropoff("");
    setBusType("");
    setIsPickupModalVisible(false);
    setIsDropoffModalVisible(false);
    // onApply({ pickup: "", dropoff: "", busType: "" }); // Trả về filter rỗng

  }}
>
  <Text style={styles.clearButtonText}>Xóa lọc</Text>
</TouchableOpacity>
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => onApply({ pickup, dropoff, busType })}
                    >
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
    filterSection: { marginBottom: 20 },
    filterLabel: { fontSize: 16, marginBottom: 10 },
    filterItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
    placeholderText: { fontSize: 16, color: "#999" },
    selectedItemText: { fontSize: 16, color: "#333" },
    footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    clearButton: { padding: 10, borderRadius: 6, backgroundColor: "#ddd", flex: 1, alignItems: "center", marginRight: 5 },
    clearButtonText: { fontSize: 16, color: "#555" },
    applyButton: { padding: 10, borderRadius: 6, backgroundColor: "#1e88e5", flex: 1, alignItems: "center" },
    applyButtonText: { fontSize: 16, color: "white" },
    optionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
    optionText: { fontSize: 16, color: "#555" },
    selectedOptionText: { fontSize: 16, color: "#1e88e5" },
});

export default FilterModal;
