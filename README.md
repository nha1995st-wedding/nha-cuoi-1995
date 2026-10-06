# Nhà Cưới – Nhà 1995 Studio

Website wedding studio + CMS mobile-first, dùng điện thoại để khách xem và máy tính để quản trị.

## Đã hoàn thiện
- Trang chủ phong cách luxury/editorial.
- Responsive mobile/tablet/desktop.
- Album công khai / nháp / riêng tư.
- Trang riêng cho từng album `/album/slug`.
- Gallery nhiều ảnh, mỗi URL một dòng.
- Link Google Drive + Google Photos.
- Admin đăng nhập bằng Supabase Auth.
- CRUD album, sắp xếp, trạng thái, ảnh bìa, gallery.
- Trang **Cài đặt website** để đổi tên studio, tagline, Facebook, Zalo, số điện thoại, địa chỉ.
- PostgreSQL + Row Level Security.
- Không dùng localStorage làm database.

## Cài đặt production
1. Tạo project Supabase.
2. Mở SQL Editor và chạy toàn bộ `schema.sql`.
3. Tạo 1 tài khoản quản trị trong Supabase Auth.
4. Tạo `.env.local` từ `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
5. Chạy `npm install` rồi `npm run dev` để kiểm tra.
6. Deploy project lên Vercel/Netlify/Cloudflare Pages và thêm cùng các biến môi trường.

## Ảnh
Phase hiện tại lưu URL ảnh để web nhẹ và dễ quản lý. Có thể dùng link ảnh CDN hoặc dịch vụ lưu ảnh. Google Drive/Photos được lưu dưới dạng link mở album. Nếu muốn upload ảnh trực tiếp từ CMS, có thể bật Supabase Storage ở bước tiếp theo.

## Quản trị
- `/admin/login`: đăng nhập
- `/admin`: dashboard
- `/admin/albums`: album
- `/admin/settings`: thông tin studio
