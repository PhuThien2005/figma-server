**Ảnh thì làm được 100% cực kỳ mượt mà, còn Video thì làm được nhưng có điều kiện ràng buộc từ chính sách của Figma.**

Dưới đây là cơ chế và cách thức triển khai cho từng loại:

---

### 1. Với Ảnh (Images) — Hoàn toàn khả thi và rất dễ

Figma Plugin API hỗ trợ nạp ảnh nhị phân qua hàm `figma.createImage(bytes)`.

* **Cách hoạt động:**
1. `agy` chọn một URL ảnh (ví dụ: link ảnh Unsplash, placeholder, hoặc đường dẫn file cục bộ trong máy).
2. Gửi URL đó qua Server trung gian hoặc để `ui.html` của Plugin dùng `fetch()` tải ảnh về dưới dạng `ArrayBuffer` (mảng bytes `Uint8Array`).
3. Sandbox của Figma nhận mảng bytes, tạo ra mã băm (`imageHash`) và gán nó vào thuộc tính `fills` của Frame hoặc Rectangle.


* **Ví dụ payload `agy` gửi xuống:**
```json
{
  "action": "INSERT_IMAGE",
  "params": {
    "targetNodeName": "Avatar",
    "imageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
  }
}

```


* **Xử lý trong Plugin (`code.js`):**
```javascript
// Nhận mảng bytes gửi từ ui.html
const image = figma.createImage(new Uint8Array(msg.imageBytes));
targetNode.fills = [
  {
    type: 'IMAGE',
    scaleMode: 'FILL', // hoặc 'FIT', 'CROP'
    imageHash: image.hash
  }
];

```



---

### 2. Với Video — Khả thi nhưng có 3 điều kiện ràng buộc

Figma có hỗ trợ Video trên Canvas và trong Prototyping qua hàm `figma.createVideoAsync(bytes)`, nhưng bạn cần lưu ý:

* **Bắt buộc phải dùng tài khoản trả phí (Figma Pro / Organization / Enterprise):**
* File thiết kế phải nằm trong workspace của một Project thuộc gói Pro trở lên.
* Nếu file nằm ở tài khoản miễn phí (Starter Plan) hoặc nằm trong mục **Drafts** cá nhân, API sẽ báo lỗi bản quyền tính năng và không cho chèn video vào canvas.


* **Giới hạn kỹ thuật:**
* Chỉ nhận định dạng `.mp4` hoặc `.mov`.
* Dung lượng tối đa mỗi file thường là 30MB.


* **Khả năng tương tác trong Prototype:**
* Video chèn vào có thể chạy trực tiếp khi bấm `Shift + Space` hoặc Present.
* Plugin có thể thiết lập các tùy chọn chạy: `autoplay` (tự phát khi vào màn), `loop` (lặp lại), hoặc hover để phát.



---

### 3. Quy trình thực tế để `agy` tự làm từ A đến Z

Khi bạn yêu cầu: *"Tạo một màn hình danh sách sản phẩm, mỗi card có 1 ảnh giày thể thao lấy từ web"*:

1. **`agy` tự tìm/sinh link ảnh:** Agent sinh ra danh sách URL ảnh tương ứng với nội dung.
2. **Local Bridge Server tải ảnh:** Server Node.js trên máy bạn fetch ảnh về thành buffer nhị phân (giúp tránh lỗi chặn CORS nếu fetch trực tiếp từ trình duyệt).
3. **Bắn dữ liệu sang Figma:** WebSocket chuyển mảng bytes sang Plugin.
4. **Figma tự fill ảnh:** Các khung hình chữ nhật xám (placeholder) lập tức biến thành ảnh bìa hoặc avatar hoàn chỉnh mà bạn không cần tải ảnh về máy rồi kéo thả thủ công.