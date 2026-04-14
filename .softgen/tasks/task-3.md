---
title: "Add local persistence for admin data (frontend-only)"
status: "todo"
priority: "medium"
type: "feature"
tags: ["localStorage", "persistence"]
created_by: "agent"
created_at: "2026-04-14T16:05:59Z"
position: 3
---

## Notes

Since there is no backend, use localStorage to provide lightweight persistence of users and their digital business cards in the browser. This is per-browser and not a real database, but it makes the dashboard feel more realistic for demos.

## Checklist

- [ ] Define a simple schema for users and business cards in frontend types
- [ ] Implement load/save helpers that read/write data to localStorage
- [ ] Initialize the dashboard with mock seed data when there is no existing local data
- [ ] Wire create/update/delete actions in the UI to update localStorage