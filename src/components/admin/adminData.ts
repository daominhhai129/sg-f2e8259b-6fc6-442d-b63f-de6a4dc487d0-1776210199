export type UserStatus = "active" | "invited" | "suspended";
export type UserRole = "admin" | "user";
export type UserPlan = "free" | "pro" | "enterprise";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  plan: UserPlan;
  cards: number;
  lastActive: string;
}

export interface BusinessCard {
  id: number;
  userId: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
}

export const usersMock: AdminUser[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "admin",
    status: "active",
    plan: "pro",
    cards: 5,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    role: "user",
    status: "active",
    plan: "free",
    cards: 1,
    lastActive: "Yesterday",
  },
  {
    id: 3,
    name: "David Kim",
    email: "david.kim@example.com",
    role: "user",
    status: "invited",
    plan: "free",
    cards: 0,
    lastActive: "Invitation sent",
  },
  {
    id: 4,
    name: "Sofia Rossi",
    email: "sofia.rossi@example.com",
    role: "user",
    status: "active",
    plan: "pro",
    cards: 3,
    lastActive: "3 days ago",
  },
  {
    id: 5,
    name: "Liam Chen",
    email: "liam.chen@example.com",
    role: "user",
    status: "suspended",
    plan: "enterprise",
    cards: 8,
    lastActive: "10 days ago",
  },
];

export const businessCardsMock: BusinessCard[] = [
  {
    id: 1,
    userId: 1,
    name: "Alex Johnson",
    title: "Founder & CEO",
    company: "Northwind Studio",
    bio: "Helps teams create memorable digital business card experiences.",
    website: "https://alexjohnson.me",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
  },
  {
    id: 2,
    userId: 2,
    name: "Maria Lopez",
    title: "Product Designer",
    company: "Pixelworks",
    bio: "Designing simple, human interfaces for complex products.",
    website: "https://marialopez.design",
    linkedin: "https://linkedin.com/in/marialopez",
    twitter: "",
  },
  {
    id: 3,
    userId: 4,
    name: "Sofia Rossi",
    title: "Account Executive",
    company: "Acme Corp",
    bio: "Connecting brands with the right digital identity.",
    website: "",
    linkedin: "https://linkedin.com/in/sofiarossi",
    twitter: "",
  },
];

export function getStatusClasses(status: UserStatus): string {
  switch (status) {
    case "active":
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    case "invited":
      return "border border-amber-200 bg-amber-50 text-amber-700";
    case "suspended":
      return "border border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border border-slate-200 bg-slate-50 text-slate-700";
  }
}

export function getPlanLabel(plan: UserPlan): string {
  switch (plan) {
    case "free":
      return "Free";
    case "pro":
      return "Pro";
    case "enterprise":
      return "Enterprise";
    default:
      return plan;
  }
}