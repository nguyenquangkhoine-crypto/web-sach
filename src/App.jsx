import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function BookShelfLandingPage() {
  const [category, setCategory] = useState("lichsu");
  const [selectedBook, setSelectedBook] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfWidth, setPdfWidth] = useState(900);
  const readerRef = useRef(null);

  const bookCategories = {
    lichsu: [
      {
        title: "Đại Việt sử ký toàn thư",
        author: "Ngô Sĩ Liên và các sử thần triều Hậu Lê",
        description:
          "Bộ chính sử đồ sộ và có giá trị đặc biệt trong kho tàng sử học Việt Nam, phản ánh tiến trình lịch sử dân tộc qua nhiều triều đại.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/Daivietsukytoanthu.pdf",
        pdfLink: "/pdf/Daivietsukytoanthu.pdf",
      },
      {
        title: "Việt Nam sử lược",
        author: "Trần Trọng Kim",
        description:
          "Tác phẩm kinh điển tóm lược lịch sử Việt Nam bằng lối viết rõ ràng, mạch lạc và gần gũi với người đọc.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/vietnamsuluoc.pdf",
        pdfLink: "/pdf/vietnamsuluoc.pdf",
      },
      {
        title: "Khâm định Việt sử thông giám cương mục",
        author: "Quốc sử quán triều Nguyễn",
        description:
          "Bộ sử lớn do triều Nguyễn biên soạn, góp phần hệ thống hóa nhiều tư liệu lịch sử quan trọng của dân tộc.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/KhamdinhVietsuthonggiamcuongmuc.pdf",
        pdfLink: "/pdf/KhamdinhVietsuthonggiamcuongmuc.pdf",
      },
      {
        title: "Phủ biên tạp lục",
        author: "Lê Quý Đôn",
        description:
          "Tác phẩm quý ghi chép về địa lý, kinh tế, xã hội và tình hình vùng Thuận Hóa – Quảng Nam thế kỷ XVIII.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/PHU-BIEN-TAP-LUC.pdf",
        pdfLink: "/pdf/PHU-BIEN-TAP-LUC.pdf",
      },
      {
        title: "Hoàng Lê nhất thống chí",
        author: "Ngô gia văn phái",
        description:
          "Tác phẩm văn xuôi lịch sử đặc sắc, phản ánh chân thực biến động xã hội cuối thế kỷ XVIII đầu XIX.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/hoang-le-nhat-thong-chi.pdf",
        pdfLink: "/pdf/hoang-le-nhat-thong-chi.pdf",
      },
      {
        title: "Vương quốc Champa: Lịch sử và văn hóa",
        author: "Lương Ninh",
        description:
          "Cuốn sách giúp người đọc hiểu sâu hơn về lịch sử hình thành, phát triển và giá trị văn hóa của vương quốc Champa.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/vuong_quoc_champa_lich_su.pdf",
        pdfLink: "/pdf/vuong_quoc_champa_lich_su.pdf",
      },
      {
        title: "Công an nhân dân Việt Nam. Lịch sử biên niên (1945-1954)",
        author: "Công an nhân dân, 1994",
        description:
          "Tư liệu biên niên quý về quá trình hình thành, chiến đấu và trưởng thành của lực lượng Công an nhân dân Việt Nam giai đoạn đầu.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/LS_CAND.pdf",
        pdfLink: "/pdf/LS_CAND.pdf",
      },
      {
        title: "Lam Sơn thực lục",
        author: "Nguyễn Trãi",
        description:
          "Tác phẩm ghi chép về cuộc khởi nghĩa Lam Sơn và công cuộc dựng nước, giữ nước đầy hào hùng của dân tộc.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/lamsonthucluc.pdf",
        pdfLink: "/pdf/lamsonthucluc.pdf",
      },
      {
        title: "An Nam chí lược",
        author: "Lê Tắc",
        description:
          "Tác phẩm sử học cổ phản ánh nhiều khía cạnh quan trọng của lịch sử Đại Việt thời trung đại.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/annam-chiluoc.pdf",
        pdfLink: "/pdf/annam-chiluoc.pdf",
      },
      {
        title: "Quốc triều hình luật (Luật Hồng Đức)",
        author: "Triều Hậu Lê",
        description:
          "Bộ luật tiêu biểu của nhà nước phong kiến Việt Nam, thể hiện tư duy quản trị và pháp lý tiến bộ của thời đại.",
        cover:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/QUOC-TRIEU-HINH-LUAT.pdf",
        pdfLink: "/pdf/QUOC-TRIEU-HINH-LUAT.pdf",
      },
      {
        title: "Lược khảo - Hoàng Việt luật lệ",
        author: "Nguyễn Q. Thắng",
        description:
          "Tài liệu tham khảo hữu ích về bộ luật thời Nguyễn, giúp người đọc tiếp cận lịch sử pháp luật Việt Nam rõ hơn.",
        cover:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/luockhaohoangvietluatle.pdf",
        pdfLink: "/pdf/luockhaohoangvietluatle.pdf",
      },
      {
        title: "Lịch triều hiến chương loại chí",
        author: "Phan Huy Chú",
        description:
          "Bộ bách khoa thư lớn của Việt Nam thời phong kiến, ghi chép phong phú về thể chế, văn hóa, lịch sử và xã hội.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/LICH-TRIEU-HIEN-CHUONG-LOAI-CHI.pdf",
        pdfLink: "/pdf/LICH-TRIEU-HIEN-CHUONG-LOAI-CHI.pdf",
      },
    ],

    khoahoc: [
      {
        title: "Việt Nam phong tục",
        author: "Phan Kế Bính",
        description:
          "Tác phẩm nghiên cứu phong tục, tập quán và nếp sống truyền thống của người Việt, mang giá trị lớn về văn hóa và xã hội.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/1.pdf",
        pdfLink: "/pdf/1.pdf",
      },
      {
        title: "Cơ sở văn hóa Việt Nam",
        author: "Trần Ngọc Thêm",
        description:
          "Cuốn sách nền tảng giúp người đọc hiểu rõ cấu trúc, đặc trưng và chiều sâu bản sắc văn hóa Việt Nam.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/co-so-van-hoa-viet-nam-tran-ngoc-them.pdf",
        pdfLink: "/pdf/co-so-van-hoa-viet-nam-tran-ngoc-them.pdf",
      },
      {
        title: "Nếp cũ",
        author: "Toan Ánh",
        description:
          "Tác phẩm tái hiện đời sống, phong tục và nếp sinh hoạt của người Việt xưa bằng lối viết gần gũi, sinh động.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/nep-cu-con-nguoi-viet-nam-pdf-dantocking.com.pdf",
        pdfLink: "/pdf/nep-cu-con-nguoi-viet-nam-pdf-dantocking.com.pdf",
      },
      {
        title: "Tìm tòi trong bản sắc văn hóa Việt Nam",
        author: "Trần Quốc Vượng",
        description:
          "Những khảo cứu giàu chiều sâu về cội nguồn, bản sắc và giá trị văn hóa Việt Nam qua góc nhìn học thuật.",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/timhieuvn.pdf",
        pdfLink: "/pdf/timhieuvn.pdf",
      },
      {
        title: "Trí Tuệ Nhân tạo cho Mọi người",
        author: "Prof Happy + AI, 2025",
        description:
          "Cuốn sách nhập môn giúp người đọc tiếp cận trí tuệ nhân tạo theo cách đơn giản, hiện đại và dễ hiểu.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/AI-for-everyone-ebook.pdf",
        pdfLink: "/pdf/AI-for-everyone-ebook.pdf",
      },

      {
        title: "Siêu trí tuệ: Con đường, Hiểm họa, Chiến lược",
        author: "Nick Bostrom",
        description:
          "Cuốn sách nổi tiếng bàn về tiềm năng, rủi ro và những chiến lược mà nhân loại cần chuẩn bị trước siêu trí tuệ.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/stt.pdf",
        pdfLink: "/pdf/stt.pdf",
      },
      {
        title: "Deep Learning (Học sâu)",
        author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
        description:
          "Tài liệu nền tảng và quan trọng bậc nhất về học sâu, phù hợp cho người muốn tìm hiểu chuyên sâu về AI hiện đại.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/Sach-Deep-Learning-co-ban-v2.pdf",
        pdfLink: "/pdf/Sach-Deep-Learning-co-ban-v2.pdf",
      },
      {
        title: "Thuật toán chủ chốt (The Master Algorithm)",
        author: "Pedro Domingos",
        description:
          "Cuốn sách lý giải những thuật toán quan trọng nhất đang định hình thế giới học máy và trí tuệ nhân tạo.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/SACHTHUATTOANCHUCHOT.pdf",
        pdfLink: "/pdf/SACHTHUATTOANCHUCHOT.pdf",
      },
      {
        title: "Trí tuệ nhân tạo: Một cách tiếp cận hiện đại",
        author: "Stuart Russell & Peter Norvig",
        description:
          "Giáo trình kinh điển về trí tuệ nhân tạo, bao quát từ lý thuyết nền tảng đến các ứng dụng hiện đại.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/GT-tri-tue-nhan-tao-1.pdf",
        pdfLink: "/pdf/GT-tri-tue-nhan-tao-1.pdf",
      },
      {
        title: "Giải thuật và Lập trình",
        author: "Lê Minh Hoàng",
        description:
          "Tài liệu quen thuộc với học sinh, sinh viên yêu thích lập trình và muốn rèn tư duy thuật toán vững chắc.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/book_LeMinhHoang.pdf",
        pdfLink: "/pdf/book_LeMinhHoang.pdf",
      },
      {
        title: "Toán học cho Học máy (Mathematics for Machine Learning)",
        author: "Marc Peter Deisenroth",
        description:
          "Cuốn sách cung cấp nền tảng toán học quan trọng cho việc học máy và trí tuệ nhân tạo hiện đại.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/mml-book.pdf",
        pdfLink: "/pdf/mml-book.pdf",
      },
      {
        title: "Kiến trúc máy tính: Một cách tiếp cận định lượng",
        author: "John L. Hennessy & David A. Patterson",
        description:
          "Tài liệu quan trọng về kiến trúc máy tính, giúp người đọc hiểu sâu về nền tảng phần cứng và hiệu năng hệ thống.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/slide_ktmt.pdf",
        pdfLink: "/pdf/slide_ktmt.pdf",
      },
      {
        title: "Dữ liệu lớn (Big Data)",
        author: "Viktor Mayer-Schönberger & Kenneth Cukier",
        description:
          "Cuốn sách lý giải sức mạnh của dữ liệu lớn và ảnh hưởng sâu rộng của nó tới kinh tế, xã hội và công nghệ.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/Bigdata.pdf",
        pdfLink: "/pdf/Bigdata.pdf",
      },
      {
        title: "Những kẻ đổi mới (The Innovators)",
        author: "Walter Isaacson",
        description:
          "Câu chuyện về những con người tiên phong đã tạo nên cuộc cách mạng số và thay đổi thế giới hiện đại.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/NhungNguoiTienPhong.pdf",
        pdfLink: "/pdf/NhungNguoiTienPhong.pdf",
      },
      {
        title: "Cuộc cách mạng Công nghiệp lần thứ tư",
        author: "Klaus Schwab",
        description:
          "Tác phẩm giúp người đọc hình dung rõ hơn về sự chuyển mình mạnh mẽ của thế giới trong kỷ nguyên 4.0.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/cmcn4.pdf",
        pdfLink: "/pdf/cmcn4.pdf",
      },
      {
        title: "Cỗ máy nền tảng (Platform Revolution)",
        author: "Geoffrey G. Parker",
        description:
          "Cuốn sách phân tích mô hình kinh doanh nền tảng và lý do chúng đang định hình lại nền kinh tế số.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/Platfrom_revolution.pdf",
        pdfLink: "/pdf/Platfrom_revolution.pdf",
      },
      {
        title: "21 Bài học cho thế kỷ 21",
        author: "Yuval Noah Harari",
        description:
          "Tác phẩm gợi mở những vấn đề lớn của nhân loại trong thời đại biến động nhanh về công nghệ, xã hội và tư duy.",
        cover:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/21baihoc.pdf",
        pdfLink: "/pdf/21baihoc.pdf",
      },
    ],

    kynang: [
      {
        title: "Đắc nhân tâm",
        author: "Dale Carnegie",
        description:
          "Những bài học sâu sắc về giao tiếp, ứng xử và thấu hiểu con người – cuốn sách giúp mỗi người hoàn thiện bản thân và xây dựng các mối quan hệ tốt đẹp hơn.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink:
          "https://drive.google.com/file/d/1PO4-8ykqK8wI0bgRYcSSPU6FXCHGPcxp/view?usp=sharing",
        pdfLink:
          "https://raw.githubusercontent.com/nguyenquangkhoine-crypto/dacnhantam/main/dacnhantam.pdf",
      },
      {
        title: "Tuổi trẻ đáng giá bao nhiêu",
        author: "Rosie Nguyễn",
        description:
          "Cuốn sách truyền cảm hứng cho người trẻ về học tập, trải nghiệm, trưởng thành và sống một tuổi trẻ có ý nghĩa.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/tuoitre.pdf",
        pdfLink: "/pdf/tuoitre.pdf",
      },
      {
        title: "Hiểu về trái tim",
        author: "Minh Niệm",
        description:
          "Tác phẩm nhẹ nhàng giúp người đọc nhận diện cảm xúc, chữa lành nội tâm và sống sâu sắc hơn với chính mình.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/hieu-ve-trai-tim.pdf",
        pdfLink: "/pdf/hieu-ve-trai-tim.pdf",
      },
      {
        title: "Tôi tự học",
        author: "Thu Giang Nguyễn Duy Cần",
        description:
          "Tác phẩm nổi tiếng về tinh thần tự học, phương pháp học tập và con đường hoàn thiện bản thân bằng tri thức.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink:
          "/pdf/thuvienquangngai.vn-toi-tu-hoc-thu-giang-nguyen-duy-can.pdf",
        pdfLink:
          "/pdf/thuvienquangngai.vn-toi-tu-hoc-thu-giang-nguyen-duy-can.pdf",
      },
      {
        title: "Óc sáng suốt",
        author: "Thu Giang Nguyễn Duy Cần",
        description:
          "Cuốn sách giúp rèn luyện tư duy tỉnh táo, khả năng phán đoán và cách nhìn nhận sự việc một cách sâu sắc hơn.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/oc_sang_suotndc.pdf",
        pdfLink: "/pdf/oc_sang_suotndc.pdf",
      },
      {
        title: "Nghệ thuật sống",
        author: "Thu Giang Nguyễn Duy Cần",
        description:
          "Tác phẩm gợi mở về cách sống đẹp, sống đúng và xây dựng đời sống tinh thần phong phú, sâu sắc.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/nghe-thuat-song-w-heart-s-n-goenka.pdf",
        pdfLink: "/pdf/nghe-thuat-song-w-heart-s-n-goenka.pdf",
      },
      {
        title: "Trên đường băng",
        author: "Tony Buổi Sáng",
        description:
          "Cuốn sách truyền động lực cho người trẻ trước ngưỡng cửa trưởng thành, lập nghiệp và hội nhập với thế giới.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/trenduongbang.pdf",
        pdfLink: "/pdf/trenduongbang.pdf",
      },
      {
        title: "Cà phê cùng Tony",
        author: "Tony Buổi Sáng",
        description:
          "Tập hợp những câu chuyện gần gũi, hài hước nhưng giàu bài học về tư duy sống, học tập và làm việc cho giới trẻ.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/cafe-cung-tony-buoi-sang.pdf",
        pdfLink: "/pdf/cafe-cung-tony-buoi-sang.pdf",
      },
      {
        title: "Nếu biết trăm năm là hữu hạn",
        author: "Phạm Lữ Ân",
        description:
          "Những trang viết nhẹ nhàng, sâu lắng về tuổi trẻ, tình yêu, gia đình và cách sống ý nghĩa trong cuộc đời hữu hạn.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/neu-biet-tram-nam-la-huu-han.pdf",
        pdfLink: "/pdf/neu-biet-tram-nam-la-huu-han.pdf",
      },
      {
        title: "Bức xúc không làm ta vô can",
        author: "Đặng Hoàng Giang",
        description:
          "Cuốn sách khơi dậy trách nhiệm công dân, tinh thần phản biện và sự dấn thân trước những vấn đề của xã hội hiện đại.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink:
          "/pdf/5742-buc-xuc-khong-lam-ta-vo-can-pdf-khoahoctamlinh.vn.pdf",
        pdfLink:
          "/pdf/5742-buc-xuc-khong-lam-ta-vo-can-pdf-khoahoctamlinh.vn.pdf",
      },
      {
        title: "Thiện, Ác và Smartphone",
        author: "Đặng Hoàng Giang",
        description:
          "Tác phẩm bàn về cách con người ứng xử, suy nghĩ và chịu ảnh hưởng trong thời đại số đầy biến động.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/1410-thien-ac-va-smartphone-thuviensach.vn.pdf",
        pdfLink: "/pdf/1410-thien-ac-va-smartphone-thuviensach.vn.pdf",
      },
      {
        title: "Muôn kiếp nhân sinh",
        author: "Nguyên Phong",
        description:
          "Cuốn sách khơi gợi suy ngẫm về nhân sinh, luật nhân quả và hành trình trưởng thành của con người trong cuộc sống.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/Muon-kiep-nhan-sinh.pdf",
        pdfLink: "/pdf/Muon-kiep-nhan-sinh.pdf",
      },
      {
        title: "Hành trình về phương Đông",
        author: "Nguyên Phong (phóng tác)",
        description:
          "Tác phẩm nổi tiếng về hành trình khám phá tri thức phương Đông, đời sống tinh thần và chiều sâu nội tâm.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/hanh-trinh-ve-phuong-dong.pdf",
        pdfLink: "/pdf/hanh-trinh-ve-phuong-dong.pdf",
      },
      {
        title: "Phép lạ của sự tỉnh thức",
        author: "Thích Nhất Hạnh",
        description:
          "Cuốn sách dẫn dắt người đọc trở về với hơi thở, chánh niệm và sự bình an giữa nhịp sống bận rộn thường ngày.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/phep-la-cua-su-tinh-thuc.pdf",
        pdfLink: "/pdf/phep-la-cua-su-tinh-thuc.pdf",
      },
      {
        title: "Đường xưa mây trắng",
        author: "Thích Nhất Hạnh",
        description:
          "Tác phẩm kể lại cuộc đời Đức Phật bằng giọng văn nhẹ nhàng, sâu lắng và giàu giá trị nhân văn.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/duong-xua-may-trang.pdf",
        pdfLink: "/pdf/duong-xua-may-trang.pdf",
      },
      {
        title: "Cảm xúc là kẻ thù số một của thành công",
        author: "TS. Lê Thẩm Dương",
        description:
          "Cuốn sách giúp người đọc hiểu và quản trị cảm xúc để sống tích cực, bản lĩnh và hiệu quả hơn trong công việc lẫn cuộc sống.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/camxuclakethucuathanhcong.pdf",
        pdfLink: "/pdf/camxuclakethucuathanhcong.pdf",
      },
      {
        title: "Điểm đến của cuộc đời",
        author: "Đặng Hoàng Giang",
        description:
          "Tác phẩm sâu sắc về sự sống, cái chết và hành trình con người tìm kiếm ý nghĩa trong những thời khắc mong manh nhất.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/3b491-diem-den-cua-cuoc-doi-dang-hoang-giang.pdf",
        pdfLink: "/pdf/3b491-diem-den-cua-cuoc-doi-dang-hoang-giang.pdf",
      },
      {
        title: "Cái dũng của thánh nhân",
        author: "Thu Giang Nguyễn Duy Cần",
        description:
          "Cuốn sách gợi mở về bản lĩnh sống, sức mạnh nội tâm và khí phách của con người trước những thử thách cuộc đời.",
        cover:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
        readLink: "/pdf/5654-cai-dung-cua-thanh-nhan-pdf-khoahoctamlinh.vn.pdf",
        pdfLink: "/pdf/5654-cai-dung-cua-thanh-nhan-pdf-khoahoctamlinh.vn.pdf",
      },
    ],
  };

  const heroBackground =
    "https://drive.google.com/thumbnail?id=1QXh5jiSQvidwvceYBWagYfjQA-HmvLYw&sz=w1600";

  useEffect(() => {
    const currentBooks = bookCategories[category];
    if (currentBooks.length > 0) {
      setSelectedBook(currentBooks[0]);
      setPageNumber(1);
    } else {
      setSelectedBook(null);
      setPageNumber(1);
      setNumPages(0);
    }
  }, [category]);

  useEffect(() => {
    const updateWidth = () => {
      const width = readerRef.current?.clientWidth || 900;
      setPdfWidth(Math.min(Math.max(width - 32, 280), 1000));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [selectedBook]);

  const handleReadBook = (book) => {
    setSelectedBook(book);
    setPageNumber(1);
    readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const toggleFullScreen = async () => {
    const panel = document.getElementById("pdf-reader-panel");
    if (!panel) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (panel.requestFullscreen) {
        await panel.requestFullscreen();
      } else if (panel.webkitRequestFullscreen) {
        panel.webkitRequestFullscreen();
      } else if (panel.msRequestFullscreen) {
        panel.msRequestFullscreen();
      }
    } catch (e) {
      console.error("Fullscreen error", e);
    }
  };

  const currentBooks = bookCategories[category];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 text-slate-800">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-slate-900/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-orange-900/35" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white shadow backdrop-blur-sm">
              Trường THPT Số 1 Phù Cát • Lớp H3-K58
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white drop-shadow md:text-6xl">
              Trang sách mở lối – Ước mơ vươn xa
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/90 md:text-xl">
              Giữa những trang sách lặng thầm là cả một thế giới rộng lớn đang
              chờ được khám phá. Chạm vào một cuốn sách, mở ra một hành trình
              tri thức.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#reader"
                className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Bắt đầu đọc ngay
              </a>
              <a
                href="#books"
                className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:scale-[1.02]"
              >
                Danh mục sách
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="text-3xl">📚</div>
            <h2 className="mt-3 text-xl font-bold">Lan tỏa văn hóa đọc</h2>
            <p className="mt-2 text-slate-600">
              Kệ sách kết nối mọi người với tri thức.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="text-3xl">✨</div>
            <h2 className="mt-3 text-xl font-bold">Trải nghiệm hiện đại</h2>
            <p className="mt-2 text-slate-600">
              Đọc trực tuyến mượt mà, hỗ trợ phóng to.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="text-3xl">🌱</div>
            <h2 className="mt-3 text-xl font-bold">Nuôi dưỡng tương lai</h2>
            <p className="mt-2 text-slate-600">
              Bồi đắp lòng nhân ái và khát vọng vươn lên.
            </p>
          </div>
        </div>
      </section>

      <section
        id="reader"
        ref={readerRef}
        className="mx-auto max-w-6xl px-6 py-10 md:px-10"
      >
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Trình đọc sách trực tuyến
          </p>
          <h2 className="mt-2 text-3xl font-bold">Màn hình hiển thị sách</h2>
        </div>

        <div
          id="pdf-reader-panel"
          className="overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-red-500"></span>
              <span className="flex h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="flex h-3 w-3 rounded-full bg-green-500"></span>
              <h2 className="ml-4 text-lg font-medium italic text-slate-300">
                {selectedBook
                  ? `Đang đọc: ${selectedBook.title}`
                  : "Vui lòng chọn sách bên dưới"}
              </h2>
            </div>

            {selectedBook && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                  disabled={pageNumber <= 1}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Trang trước
                </button>
                <button
                  onClick={() =>
                    setPageNumber((p) => Math.min(p + 1, numPages || 1))
                  }
                  disabled={numPages === 0 || pageNumber >= numPages}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Trang sau
                </button>
                <button
                  onClick={toggleFullScreen}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                  type="button"
                >
                  Toàn màn hình
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900 p-2 md:p-4">
            {selectedBook ? (
              <div className="rounded-[1.25rem] bg-slate-800 p-3 md:p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>
                    Trang {pageNumber} / {numPages || "..."}
                  </span>
                  <span>Chế độ đọc trực tiếp bằng PDF.js</span>
                </div>
                <div className="overflow-auto rounded-[1rem] bg-slate-700 p-2">
                  <Document
                    file={selectedBook.pdfLink}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <div className="flex h-[60vh] items-center justify-center text-white">
                        Đang tải sách...
                      </div>
                    }
                    error={
                      <div className="flex h-[60vh] items-center justify-center px-6 text-center text-white">
                        Không tải được PDF. Hãy kiểm tra lại link pdfLink.
                      </div>
                    }
                    onLoadError={(error) =>
                      console.error("Lỗi tải PDF:", error)
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={pdfWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      loading={
                        <div className="flex h-[60vh] items-center justify-center text-white">
                          Đang hiển thị trang...
                        </div>
                      }
                    />
                  </Document>
                </div>
              </div>
            ) : (
              <div className="flex h-[50vh] flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-white/10 bg-slate-900 px-6 text-center">
                <div className="mb-4 text-5xl">📖</div>
                <p className="max-w-xs text-slate-400">
                  Hãy chọn một danh mục và một cuốn sách ở phía dưới để bắt đầu
                  hành trình tri thức.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="books" className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Tủ sách lớp H3-K58
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Chọn cuốn sách bạn yêu thích
          </h2>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setCategory("lichsu")}
            className={`rounded-2xl px-5 py-3 font-semibold transition ${
              category === "lichsu"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-700 shadow hover:bg-slate-50"
            }`}
          >
            📜 Lịch sử & Pháp luật
          </button>
          <button
            onClick={() => setCategory("khoahoc")}
            className={`rounded-2xl px-5 py-3 font-semibold transition ${
              category === "khoahoc"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-slate-700 shadow hover:bg-slate-50"
            }`}
          >
            🔬 Khoa học tự nhiên & xã hội
          </button>
          <button
            onClick={() => setCategory("kynang")}
            className={`rounded-2xl px-5 py-3 font-semibold transition ${
              category === "kynang"
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-slate-700 shadow hover:bg-slate-50"
            }`}
          >
            🌱 Kỹ năng sống
          </button>
        </div>

        {currentBooks.length > 0 ? (
          <div className="grid gap-8">
            {currentBooks.map((book) => (
              <div
                key={book.title}
                className="group grid overflow-hidden rounded-[2rem] bg-white shadow-lg transition-all hover:shadow-2xl md:grid-cols-[280px_1fr]"
              >
                <div className="overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-full min-h-[300px] w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <p className="text-sm font-medium uppercase tracking-wide text-orange-500">
                    {book.author}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {book.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-600">
                    {book.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      onClick={() => handleReadBook(book)}
                      className="rounded-2xl bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:scale-105"
                    >
                      Đọc ngay trên trang
                    </button>
                    <a
                      href={book.readLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-slate-200 px-8 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Mở file gốc
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-lg">
            <div className="text-5xl">📘</div>
            <h3 className="mt-4 text-2xl font-bold text-slate-800">
              Danh mục đang được cập nhật
            </h3>
            <p className="mt-3 text-slate-600">
              Mục này hiện chưa có sách. Bạn gửi thêm tên sách và link sách mềm,
              mình sẽ thêm tiếp cho bạn.
            </p>
          </div>
        )}
      </section>

      <footer className="border-t border-orange-100 px-6 py-12 text-center text-slate-400">
        <p className="text-sm">
          © 2024 H3-K58 Phù Cát 1 • Dự án văn hóa đọc số
        </p>
      </footer>
    </div>
  );
}
