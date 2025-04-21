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
import { getCommentsByPassengerId, getRateByPassengerId } from '@/utils/api';
import { Comment, RateComment } from '@/utils/rate.comment';

const DucVietScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const passengerId = 1; // Giả sử bạn lấy ID hành khách là 1
  const [rateVsComment, setRateVsComment] = useState<RateComment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsRes = await getCommentsByPassengerId(passengerId.toString());
        console.log('COMMENTS:', commentsRes.data);

        const allComments: Comment[] = commentsRes.data;
        const matchedRateComments: RateComment[] = [];

        allComments.forEach(comment => {
          const { userId, passengerId, userComment } = comment;

          if (userComment && Array.isArray(userComment.userRate)) {
            userComment.userRate.forEach(rate => {
              if (rate.userId === userId && rate.passengerId === passengerId) {
                matchedRateComments.push({
                  comment,
                  rate,
                  createdAt: comment.createdAt,
                });
              }
            });
          }
        });

        setRateVsComment(matchedRateComments);
        console.log('RateVsComment:', matchedRateComments);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const temporaryDescription = [
    { icon: 'bus', text: 'Nhà xe Đức Việt nổi bật với đội xe chất lượng cao.' },
    { icon: 'people', text: 'Dịch vụ phục vụ tận tâm, nhân viên thân thiện.' },
    { icon: 'time', text: 'Lịch trình chạy linh động, phù hợp với nhu cầu của khách hàng.' },
    { icon: 'location', text: 'Chạy các tuyến từ TP.HCM đến các tỉnh miền Tây.' },
    { icon: 'construct', text: 'Xe được bảo dưỡng định kỳ, đảm bảo an toàn.' },
  ];

  const busRoutes = [
    'Hồ Chí Minh - Cần Thơ',
    'Hồ Chí Minh - Sóc Trăng',
    'Hồ Chí Minh - Bến Tre',
    'Hồ Chí Minh - Vĩnh Long',
  ];

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nhà xe Đức Việt</Text>
      </View>

      <Image
        source={require('@/assets/vehicles/ducviet.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Mô tả nhà xe */}
      <View style={styles.content}>
        <Text style={styles.title}>Mô tả nhà xe</Text>
        {/* Hiển thị các mô tả với icon */}
        {temporaryDescription.map((item, index) => (
          <View key={index} style={styles.descriptionItem}>
            <Ionicons name={item.icon} size={20} color="#1976d2" />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}

        {/* Hiển thị các tuyến xe */}
        <Text style={styles.title}>Các tuyến xe</Text>
        {busRoutes.map((route, index) => (
          <Text key={index} style={styles.text}>- {route}</Text>
        ))}
      </View>

      {/* Đánh giá khách hàng */}
      <View style={styles.content}>
        <Text style={styles.title}>Đánh giá của khách hàng</Text>
        {rateVsComment.map((rateComment, index) => {
          const { comment, rate } = rateComment;

          return (
            <View key={index} style={styles.reviewBox}>
              <View style={styles.reviewHeader}>
                {/* Giả sử thông tin người dùng là từ userComment */}
                <Ionicons name="person-circle-outline" size={24} color="#1976d2" />
                <Text style={styles.reviewName}>{comment.userComment.name}</Text>
              </View>
              <Text style={styles.reviewComment}>{comment.content}</Text>
              <View style={styles.ratingRow}>
                {/* Hiển thị số sao theo đánh giá */}
                {[...Array(rate.numberRate)].map((_, i) => (
                  <Ionicons key={i} name="star" size={16} color="#ffc107" />
                ))}
                {[...Array(5 - rate.numberRate)].map((_, i) => (
                  <Ionicons key={i} name="star-outline" size={16} color="#ccc" />
                ))}
              </View>
            </View>
          );
        })}
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
  descriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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

export default DucVietScreen;
