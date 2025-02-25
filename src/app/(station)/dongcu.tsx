import React from "react";
import NewsDetail from "@/components/news/news.collection"; // Import NewsDetail component

const DongCu = () => {
    return (
        <NewsDetail
            title="Bến xe Miền Đông Cũ"
            image={require("@/assets/station/miendongcu.jpg")} // Đảm bảo đường dẫn đúng tới ảnh
            content={`
                📍 **Vị trí**: Bến xe Miền Đông cũ đã từng là một trong những trung tâm vận tải lớn nhất tại TP.HCM, nằm ở quận Bình Thạnh, cách trung tâm thành phố chỉ vài km.

                ✅ **Dịch vụ tiện ích**:
                - Bến xe có không gian rộng rãi với nhiều quầy vé, phòng chờ có điều hòa 🛋️.
                - Mặc dù bến xe đã ngừng hoạt động nhưng các khu vực ăn uống và dịch vụ gần bến vẫn thu hút khách du lịch và người dân.

                🚍 **Hệ thống giao thông**: Trước khi chuyển sang vị trí mới, Bến xe Miền Đông cũ là nơi trung chuyển chính của các tuyến xe khách nối TP.HCM với các tỉnh miền Đông Nam Bộ.

                🏙️ **Khu vực xung quanh**: Nằm gần nhiều khu vực trung tâm, bến xe cũ từng có sự kết nối thuận tiện với các khu vực khác trong thành phố.

                🔄 **Sự chuyển đổi**: Dù bến xe cũ không còn hoạt động nữa, khu vực này vẫn đang được tái phát triển với các dự án mới, góp phần làm thay đổi diện mạo thành phố.

                🧑‍🏫 **Nhân viên và dịch vụ hỗ trợ**: Mặc dù không còn phục vụ hành khách như trước, nhưng đội ngũ nhân viên tại khu vực này vẫn luôn sẵn sàng cung cấp thông tin cho khách tham quan.
            `}
        />
    );
};

export default DongCu;
