import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getCommentsByPassengerId } from '@/utils/api'; // Giả sử bạn có hàm API này

const PhuHuynhBusScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const passengerId = 5; // ID hành khách
  const [reviews, setReviews] = useState<any[]>([]); // Dữ liệu reviews

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsByPassengerId(passengerId.toString());
        console.log('Fetched comments:', response.data);

        // Giả sử API trả về dạng {data: [{ userComment, comment }] }
        const fetchedReviews = response.data.map((item: any) => ({
          name: item.userComment.name,
          comment: item.comment.content,
          rating: item.userComment.userRate ? item.userComment.userRate[0].numberRate : 0,
        }));

        setReviews(fetchedReviews); // Cập nhật danh sách đánh giá
      } catch (error) {
        console.log('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [passengerId]);

  const temporaryDescription = [
    { icon: 'bus', text: 'Nhà xe Phú Huỳnh chuyên tuyến miền Tây với chất lượng cao.' },
    { icon: 'people', text: 'Phục vụ tận tình, tài xế nhiều kinh nghiệm.' },
    { icon: 'time', text: 'Xe chạy đúng giờ, nhiều khung giờ để lựa chọn.' },
    { icon: 'location', text: 'Tuyến đường linh hoạt, đi khắp các tỉnh miền Tây.' },
    { icon: 'construct', text: 'Xe mới, nội thất hiện đại, có wifi và máy lạnh.' },
  ];

  const busRoutes = [
    'TP.HCM - Cà Mau',
    'TP.HCM - Bạc Liêu',
    'TP.HCM - Kiên Giang',
    'TP.HCM - Trà Vinh',
  ];

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nhà xe Phú Huỳnh</Text>
      </View>

      <Image
        source={require('@/assets/vehicles/phuhuynh.jpg')} // Thêm ảnh này vào thư mục assets
        style={styles.image}
        resizeMode="cover"
      />

      {/* Mô tả có icon */}
      <View style={styles.content}>
        <Text style={styles.title}>Mô tả nhà xe</Text>
        {temporaryDescription.map((item, index) => (
          <View key={index} style={styles.descriptionRow}>
            <Ionicons name={item.icon as any} size={18} color="#1976d2" />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* Tuyến xe */}
      <View style={styles.content}>
        <Text style={styles.title}>Các tuyến xe thường chạy</Text>
        <View style={styles.routesContainer}>
          {busRoutes.map((route, index) => (
            <Text key={index} style={styles.routeText}>- {route}</Text>
          ))}
        </View>
      </View>

      {/* Đánh giá */}
      <View style={styles.content}>
        <Text style={styles.title}>Đánh giá của khách hàng</Text>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <View key={index} style={styles.reviewBox}>
              <View style={styles.reviewHeader}>
                <Ionicons name="person-circle-outline" size={24} color="#1976d2" />
                <Text style={styles.reviewName}>{review.name}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <View style={styles.ratingRow}>
                {[...Array(review.rating)].map((_, i) => (
                  <Ionicons key={i} name="star" size={16} color="#ffc107" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Ionicons key={i} name="star-outline" size={16} color="#ccc" />
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.text}>Chưa có đánh giá nào.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: '#1976d2',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    lineHeight: 20,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  routesContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  routeText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    lineHeight: 20,
  },
  reviewBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  reviewComment: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
  },
});

export default PhuHuynhBusScreen;
