import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView

const FavoritePage = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Thêm SafeAreaView vào header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </SafeAreaView>

      {/* Nội dung trang yêu thích */}
      <View style={styles.content}>
        <Text style={styles.text}>Không có thông báo nào</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
    // Chắc chắn header sẽ không bị che khuất
    paddingTop: 10, // Optional: you can adjust padding top for better appearance
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  text: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});

export default FavoritePage;
