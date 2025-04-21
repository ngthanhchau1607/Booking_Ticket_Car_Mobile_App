export interface Rate {
    userId: number;
    passengerId: number;
    numberRate: number;
    createdAt: string; // Hoặc Date, nếu bạn cần ngày/thời gian chính xác hơn
  }
  
  export interface Comment {
    id: number;
    content: string;
    createdAt: string; // Thời gian tạo comment
    passengerId: number;
    userId: number;
    userComment: {
      name: string;
      avatar: string;
      email: string;
      numberPhone: string;
      userRate: Rate[]; // Danh sách đánh giá từ người dùng
    };
  }
  
  export interface RateComment {
    comment: Comment;
    rate: Rate;
    createdAt: string; // Ngày tạo comment
  }