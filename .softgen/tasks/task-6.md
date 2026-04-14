---
title: "Add public-style preview page for business cards"
status: "done"
priority: "medium"
type: "feature"
tags: ["business-cards", "preview"]
created_by: "agent"
created_at: "2026-04-14T23:35:37Z"
position: 6
---

## Notes

Create a dedicated preview page to view the digital business card UI outside of the admin edit screen. From the business cards grid, there should be both an "Edit card" button (admin edit route) and a "Preview card" button (public-style view route). The preview should reuse the tall single-column card design (cover image, avatar, name/title/company, primary buttons, and a vertical list of contact/social/media rows with colored icons) and support all three languages (VI/EN/ZH).

## Checklist

- [x] Create `/cards/[id]` page that loads card + owner data from the existing mock dataset
- [x] Implement tall single-column card UI similar to the edit preview, without admin sidebar or edit form
- [x] Support language switching (VI/EN/ZH) within the preview page
- [x] Add a "Preview card" button next to "Edit card" in the business cards grid, linking to `/cards/[id]`
- [x] Run error checks and mark the task as done