import NewsDetail from "@/components/news/news.collection";
import React from "react";

const BaoHiem = () => {
    return (
        <NewsDetail
            title="Hướng dẫn tạo yêu cầu bồi thường bảo hiểm khi xảy ra sự cố chuyến đi"
            image={require("@/assets/news/bhxe.jpeg")}
            content={`Bảo hiểm chuyến đi và Bảo hiểm trễ/hủy chuyến bay là sản phẩm bảo hiểm du lịch của Tổng Công ty Bảo hiểm Bảo Việt do Saladin và Vexere phân phối.

Đây là một sản phẩm bảo hiểm tai nạn con người được thiết kế dành riêng cho các khách hàng đặt dịch vụ xe qua hệ thống Vexere. Giúp mang lại sự an tâm cho hành khách và bù đắp thiệt hại tài chính do rủi ro có thể xảy ra trong suốt hành trình với các đối tác vận tải hành khách có liên kết với Vexere.

### Quyền lợi bảo hiểm:
1️⃣ **Bảo hiểm chuyến đi**: Hỗ trợ tài chính trong trường hợp xảy ra tai nạn hoặc sự cố ảnh hưởng đến hành trình của bạn.  
2️⃣ **Bảo hiểm trễ/hủy chuyến bay**: Được hoàn tiền hoặc hỗ trợ đặt lại vé nếu chuyến bay của bạn bị hủy hoặc trễ giờ.

🔹 Để đăng ký bảo hiểm, bạn cần truy cập vào trang **Cổng tạo Yêu cầu bồi thường** của Vexere.

💡 **Lưu ý:** Chính sách bảo hiểm có thể thay đổi tùy theo điều kiện và điều khoản của đối tác cung cấp dịch vụ.

Bạn có thể xem chi tiết quyền lợi và điều kiện tham gia bảo hiểm dưới đây:
✅ [Bảo hiểm chuyến đi](https://www.vexere.com)  
✅ [Bảo hiểm trễ/hủy chuyến bay](https://www.vexere.com)

Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của Vexere! 🚍✨`}
        />
    );
};

export default BaoHiem;
