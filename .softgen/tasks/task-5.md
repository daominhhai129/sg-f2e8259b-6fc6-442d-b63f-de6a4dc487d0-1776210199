---
title: "Add business card details page with mock edit form"
status: "done"
priority: "medium"
type: "feature"
tags: ["business-cards", "details", "mock-edit"]
created_by: "agent"
created_at: "2026-04-14T23:10:00Z"
position: 5
---

## Notes

Thêm một trang chi tiết cho từng business card, cho phép admin xem và chỉnh (mock) các field chính của card. Khi bấm "Edit card" ở trang danh sách business cards (grid), sẽ điều hướng sang trang chi tiết này. Tất cả vẫn chỉ là frontend-only với mock data, không lưu vào backend.

## Checklist

- [x] Chuyển cấu trúc `pages/business-cards` sang thư mục với `index.tsx` cho danh sách grid
- [x] Thay nút "Edit card" ở trang danh sách thành link dẫn tới `/business-cards/[id]`
- [x] Tạo trang `/business-cards/[id]` hiển thị chi tiết card + form edit mock (không lưu)
- [x] Đảm bảo layout trang chi tiết giữ nguyên sidebar và style admin dashboard