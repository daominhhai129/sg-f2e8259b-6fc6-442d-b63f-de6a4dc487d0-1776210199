---
title: "Create dedicated Users and Business Cards pages with mock tables"
status: "done"
priority: "medium"
type: "feature"
tags: ["users", "business-cards", "pages"]
created_by: "agent"
created_at: "2026-04-14T17:16:54Z"
position: 4
---

## Notes

Add separate dedicated pages for Users and Business Cards, each showing their own mock data tables. Keep everything frontend-only (no backend), reuse the existing admin design language, and ensure the tables are easy to scan for an admin reviewing accounts and cards.

## Checklist

- [x] Create a shared admin data module exporting mock users and business cards
- [x] Create `/users` page with a users table backed by mock data
- [x] Create `/business-cards` page with a cards table backed by mock data
- [x] Ensure both pages match the admin dashboard styling (container, cards, table styles)