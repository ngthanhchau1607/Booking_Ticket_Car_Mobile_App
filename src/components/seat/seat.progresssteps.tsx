import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressStepsProps {
    activeStep: number;  // Bước hiện tại
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ activeStep }) => {
    return (
        <View style={styles.progressContainer}>
            <View style={styles.step}>
                <Text style={[styles.stepNumberSmall, activeStep === 1 && styles.activeStep]}>1</Text>
                <Text style={[styles.stepLabelSmall, activeStep === 1 && styles.activeLabel]}>Chọn chỗ</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.step}>
                <Text style={[styles.stepNumberSmall, activeStep === 2 && styles.activeStep]}>2</Text>
                <Text style={[styles.stepLabelSmall, activeStep === 2 && styles.activeLabel]}>Điểm đón</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.step}>
                <Text style={[styles.stepNumberSmall, activeStep === 3 && styles.activeStep]}>3</Text>
                <Text style={[styles.stepLabelSmall, activeStep === 3 && styles.activeLabel]}>Điểm trả</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    step: {
        alignItems: 'center',
        flex: 1,
    },
    stepNumberSmall: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#999',
        textAlign: 'center',
        lineHeight: 20,
        color: '#999',
        fontWeight: 'bold',
        fontSize: 12,
        backgroundColor: '#f0f0f0',
    },
    activeStep: {
        borderColor: '#1e88e5',
        color: 'white',
        backgroundColor: '#1e88e5',
    },
    stepLabelSmall: {
        fontSize: 11,
        marginTop: 4,
        color: '#888',
    },
    activeLabel: {
        color: '#1e88e5',
        fontWeight: '600',
    },
    line: {
        width: 20,
        height: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
});

export default ProgressSteps;
