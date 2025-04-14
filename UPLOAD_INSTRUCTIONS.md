# Hướng dẫn Upload FinGPT Việt Nam lên GitHub

Dưới đây là các bước để upload mã nguồn FinGPT Việt Nam lên GitHub:

## 1. Chuẩn bị

- Đảm bảo bạn đã có tài khoản GitHub
- Cài đặt Git trên máy tính của bạn (nếu chưa có)
- Tải xuống file `fingpt_vietnam_complete.zip` và giải nén

## 2. Tạo repository mới trên GitHub

1. Đăng nhập vào GitHub
2. Nhấp vào nút "+" ở góc trên bên phải và chọn "New repository"
3. Đặt tên repository (ví dụ: "FinGPT")
4. Thêm mô tả (tùy chọn): "FinGPT Việt Nam - Phân tích sentiment cổ phiếu Việt Nam"
5. Chọn "Public" hoặc "Private" tùy theo nhu cầu của bạn
6. Nhấp vào "Create repository"

## 3. Upload mã nguồn lên GitHub

### Cách 1: Sử dụng giao diện web GitHub

1. Trong repository mới tạo, nhấp vào "uploading an existing file"
2. Kéo và thả các file từ thư mục đã giải nén hoặc nhấp vào khu vực để chọn file
3. Nhấp vào "Commit changes"

### Cách 2: Sử dụng Git command line (khuyến nghị)

1. Mở terminal hoặc command prompt
2. Di chuyển đến thư mục đã giải nén:
   ```bash
   cd đường_dẫn_đến_thư_mục_fingpt_complete
   ```

3. Khởi tạo Git repository:
   ```bash
   git init
   ```

4. Thêm tất cả file vào staging area:
   ```bash
   git add .
   ```

5. Commit các thay đổi:
   ```bash
   git commit -m "Initial commit"
   ```

6. Liên kết với repository GitHub của bạn:
   ```bash
   git remote add origin https://github.com/username/FinGPT.git
   ```
   (Thay `username` bằng tên người dùng GitHub của bạn và `FinGPT` bằng tên repository bạn đã tạo)

7. Push code lên GitHub:
   ```bash
   git push -u origin master
   ```
   hoặc nếu bạn sử dụng branch main:
   ```bash
   git push -u origin main
   ```

## 4. Kiểm tra repository

1. Truy cập vào repository của bạn trên GitHub
2. Đảm bảo tất cả các file đã được upload thành công
3. Kiểm tra README.md đã hiển thị đúng trên trang chính của repository

## 5. Sử dụng lệnh tắt (nếu bạn đã có repository)

Nếu bạn đã tạo repository và muốn sử dụng lệnh tắt, hãy sử dụng các lệnh sau:

```bash
echo "# FinGPT" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/username/FinGPT.git
git push -u origin main
```

(Thay `username` bằng tên người dùng GitHub của bạn và `FinGPT` bằng tên repository bạn đã tạo)

## Lưu ý

- Đảm bảo bạn đã cấu hình Git với thông tin người dùng GitHub của bạn:
  ```bash
  git config --global user.name "Tên của bạn"
  git config --global user.email "email@example.com"
  ```

- Nếu bạn gặp lỗi xác thực, bạn có thể cần tạo Personal Access Token trên GitHub và sử dụng nó thay cho mật khẩu.

- Nếu repository đã có sẵn nội dung, bạn có thể cần pull trước khi push:
  ```bash
  git pull origin main --allow-unrelated-histories
  ```
