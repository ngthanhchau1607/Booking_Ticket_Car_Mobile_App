import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SeatHeaderProps {
    busName: string;
    departureTime: string;
    departureDate: string;
    activeStep: number;
    onBackPress: () => void;
}

const SeatHeader: React.FC<SeatHeaderProps> = ({
    busName,
    departureTime,
    departureDate,
    activeStep,
    onBackPress,
}) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.busName}>{busName}</Text>
                    <Text style={styles.timeText}>
                        {departureTime} - {departureDate}
                    </Text>
                </View>
            </View>

            {/* Steps */}
            <View style={styles.progressContainer}>
                {activeStep <= 3 && (
                    <>
                        <View style={styles.step}>
                            <Text
                                style={[
                                    styles.stepNumberSmall,
                                    activeStep === 1 && styles.activeStep,
                                ]}
                            >
                                1
                            </Text>
                            <Text
                                style={[
                                    styles.stepLabelSmall,
                                    activeStep === 1 && styles.activeLabel,
                                ]}
                            >
                                Chọn chỗ
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.step}>
                            <Text
                                style={[
                                    styles.stepNumberSmall,
                                    activeStep === 2 && styles.activeStep,
                                ]}
                            >
                                2
                            </Text>
                            <Text
                                style={[
                                    styles.stepLabelSmall,
                                    activeStep === 2 && styles.activeLabel,
                                ]}
                            >
                                Điểm đón
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.step}>
                            <Text
                                style={[
                                    styles.stepNumberSmall,
                                    activeStep === 3 && styles.activeStep,
                                ]}
                            >
                                3
                            </Text>
                            <Text
                                style={[
                                    styles.stepLabelSmall,
                                    activeStep === 3 && styles.activeLabel,
                                ]}
                            >
                                Điểm trả
                            </Text>
                        </View>
                    </>
                )}

                {activeStep >= 4 && (
                    <>
                        <View style={styles.step}>
                            <Text
                                style={[
                                    styles.stepNumberSmall,
                                    activeStep === 4 && styles.activeStep,
                                ]}
                            >
                                4
                            </Text>
                            <Text
                                style={[
                                    styles.stepLabelSmall,
                                    activeStep === 4 && styles.activeLabel,
                                ]}
                            >
                                Nhập Thông Tin
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.step}>
                            <Text
                                style={[
                                    styles.stepNumberSmall,
                                    activeStep === 5 && styles.activeStep,
                                ]}
                            >
                                5
                            </Text>
                            <Text
                                style={[
                                    styles.stepLabelSmall,
                                    activeStep === 5 && styles.activeLabel,
                                ]}
                            >
                                Thông Tin Vé
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.step}>
                            <Text
                                style={[
                                    styles.stepNumberSmall,
                                    activeStep === 6 && styles.activeStep,
                                ]}
                            >
                                6
                            </Text>
                            <Text
                                style={[
                                    styles.stepLabelSmall,
                                    activeStep === 6 && styles.activeLabel,
                                ]}
                            >
                                Thanh Toán
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
        paddingHorizontal: 20,
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    backButton: {
        marginRight: 12,
    },
    busName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1e88e5",
    },
    timeText: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    step: {
        alignItems: "center",
        flex: 1,
    },
    stepNumberSmall: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#999",
        textAlign: "center",
        lineHeight: 20,
        color: "#999",
        fontWeight: "bold",
        fontSize: 12,
        backgroundColor: "#f0f0f0",
    },
    activeStep: {
        borderColor: "#1e88e5",
        color: "white",
        backgroundColor: "#1e88e5",
    },
    stepLabelSmall: {
        fontSize: 11,
        marginTop: 4,
        color: "#888",
    },
    activeLabel: {
        color: "#1e88e5",
        fontWeight: "600",
    },
    line: {
        width: 20,
        height: 1,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
});

export default SeatHeader;
