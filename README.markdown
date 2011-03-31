# LinkHay Reader (codename: Heathrow)

**Cái gì?** Site đọc tin nóng lấy nguồn từ LinkHay, loại đi những tính năng giá trị gia tăng (vote, bình luận, bạn bè, thông báo, kênh, vân vân) để tập trung vào cái quan trọng nhất là nội dung link. Nếu cần có thể mở tab mới đọc bình luận. 

**Ở đâu?** http://linkhay.heroku.com

**Như thế nào?** LinkHay Reader tự động load 100 link mới nhất từ trang chủ LinkHay, hiển thị nội dung từng link một sau khi đã lọc bỏ quảng cáo và những thứ linh tinh khác. Hoạt động tốt với hầu hết các trang tin. 

---

**Dành cho ai quan tâm:**

Site này tớ viết trong khoảng 4-5 tiếng bằng Ruby + Sinatra + template engine Haml. Hầu hết việc xử lý thông tin đều từ phía client bằng jQuery + Ajax. Có sử dụng thêm plugin jquery-hotkey để hỗ trợ 2 phím tắt phổ biến j - next và k - previous. Plugin jQuery History để xử lý permalink cho từng link được load từ LinkHay. Plugin này dùng ký tự hash (#) để xử lý, không hỗ trợ History API trong HTML5. 

LinkHay Reader tương tác trực tiếp với API chính thức của LinkHay. API này có nhiều điều củ chuối - một trong số đó là không hỗ trợ JSONP nên request được route qua Ruby script của tớ để bổ sung callback parameter. 

Nội dung các link được lọc bằng API của ViewText.org. Vì markup các báo nhà mình hầu hết đều vô tổ chức nên có nơi link lọc tốt, có nơi không - chỉ hiện phần tóm tắt/tiêu đề, không hiện hình ảnh và/hoặc nội dung chẳng hạn.

**Hướng phát triển tiếp:** 

Có 4 thứ tớ nghĩ có thể thêm vào site hiện tại:

- Xử lý nút Back/Forward của browser - hiện giờ đang hỏng vì cách tớ implement
- Caching - khi đang đọc link #x, tự động load tin #(x+1) để người dùng chuyển qua lại nhanh chóng
- Cho phép chọn nguồn link (ví dụ theo kênh)
- Gỡ bỏ hạn chế 100 link - load thêm các link cũ nếu người dùng đọc xong 100 tin mới nhất 

Nói chung, đây là dự án kiểu Write Once, Abandon Forever của tớ. Nếu bạn có hứng thú phát triển tiếp, tớ để mã nguồn mở tại GitHub:

https://github.com/quanganhdo/LinkHay-Reader