import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    name: "Xe Limousine Đức Việt",
    description: "Chất lượng cao – ghế rộng rãi, tiện nghi chuẩn 5 sao",
    image: require("@/assets/vehicles/ducviet.jpg"),
    route: "/ducviet",
  },
  {
    id: "2",
    name: "Xe Limousine Đà Nẵng",
    description: "Kết nối trung tâm Đà Nẵng – Hội An – Huế – Quảng Nam",
    image: require("@/assets/vehicles/danang.jpg"),
    route: "/danang",
  },
  {
    id: "3",
    name: "Xe Limousine Đức Phú",
    description: "Chuyên tuyến miền Trung – dịch vụ uy tín , trung chuyển tận nơi",
    image: require("@/assets/vehicles/ducphu.jpg"),
    route: "/ducphu",
  },
  {
    id: "4",
    name: "Xe Limousine Phú Huỳnh",
    description: "Phục vụ tuyến Sài Gòn – Cần Thơ – Sóc Trăng",
    image: require("@/assets/vehicles/phuhuynh.jpg"),
    route: "/phuhuynh",
  },
  {
    id: "5",
    name: "Xe Limousine Phương Trang",
    description: "Thương hiệu lớn – tiện nghi cao cấp trên mọi tuyến",
    image: require("@/assets/vehicles/phuongtrang.png"),
    route: "/phuongtrang",
  },
];

const VehiclesCollection = () => {
  const handlePress = (route: any) => {
    router.navigate(route);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚐 Các nhà xe Limousine nổi bật</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.route)}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} resizeMode="cover" />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const CARD_WIDTH = width * 0.7;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 12,
    color: "#1976d2",
  },
  listContent: {
    paddingLeft: 12,
    paddingRight: 4,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  desc: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});

export default VehiclesCollection;
