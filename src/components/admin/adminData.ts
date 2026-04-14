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

export type SupportedLanguage = "vi" | "en" | "zh";

export interface BusinessCardLanguageData {
  name: string;
  title: string;
  company: string;
  bio: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  youtubeUrl?: string;
}

export interface BusinessCard {
  id: number;
  userId: number;
  defaultLanguage: SupportedLanguage;
  languages: Record<SupportedLanguage, BusinessCardLanguageData>;
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
    defaultLanguage: "en",
    languages: {
      vi: {
        name: "Alex Johnson",
        title: "Người sáng lập & CEO",
        company: "Northwind Studio",
        bio: "Hỗ trợ các đội nhóm tạo trải nghiệm danh thiếp số ấn tượng.",
        email: "alex.johnson@example.com",
        phone: "+84 90 000 0001",
        website: "https://alexjohnson.me",
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
        coverImageUrl:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      en: {
        name: "Alex Johnson",
        title: "Founder & CEO",
        company: "Northwind Studio",
        bio: "Helps teams create memorable digital business card experiences.",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 000-0001",
        website: "https://alexjohnson.me",
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
        coverImageUrl:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      zh: {
        name: "Alex Johnson",
        title: "创始人兼首席执行官",
        company: "Northwind Studio",
        bio: "帮助团队打造令人难忘的数字名片体验。",
        email: "alex.johnson@example.com",
        phone: "+86 10 0000 0001",
        website: "https://alexjohnson.me",
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
        coverImageUrl:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    },
  },
  {
    id: 2,
    userId: 2,
    defaultLanguage: "vi",
    languages: {
      vi: {
        name: "Maria Lopez",
        title: "Nhà thiết kế sản phẩm",
        company: "Pixelworks",
        bio: "Thiết kế giao diện đơn giản, thân thiện cho sản phẩm phức tạp.",
        email: "maria.lopez@example.com",
        phone: "+84 90 000 0002",
        website: "https://marialopez.design",
        linkedin: "https://linkedin.com/in/marialopez",
        twitter: "",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        coverImageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        youtubeUrl: "",
      },
      en: {
        name: "Maria Lopez",
        title: "Product Designer",
        company: "Pixelworks",
        bio: "Designing simple, human interfaces for complex products.",
        email: "maria.lopez@example.com",
        phone: "+1 (555) 000-0002",
        website: "https://marialopez.design",
        linkedin: "https://linkedin.com/in/marialopez",
        twitter: "",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        coverImageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        youtubeUrl: "",
      },
      zh: {
        name: "Maria Lopez",
        title: "产品设计师",
        company: "Pixelworks",
        bio: "为复杂产品设计简洁且以人为本的界面。",
        email: "maria.lopez@example.com",
        phone: "+86 10 0000 0002",
        website: "https://marialopez.design",
        linkedin: "https://linkedin.com/in/marialopez",
        twitter: "",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        coverImageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        youtubeUrl: "",
      },
    },
  },
  {
    id: 3,
    userId: 4,
    defaultLanguage: "zh",
    languages: {
      vi: {
        name: "Sofia Rossi",
        title: "Chuyên viên kinh doanh",
        company: "Acme Corp",
        bio: "Kết nối thương hiệu với bản sắc số phù hợp.",
        email: "sofia.rossi@example.com",
        phone: "+84 90 000 0003",
        website: "",
        linkedin: "https://linkedin.com/in/sofiarossi",
        twitter: "",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544723795-432537dcfb11",
        coverImageUrl:
          "https://images.unsplash.com/photo-1515165562835-c4c9e0737eaa",
        youtubeUrl: "",
      },
      en: {
        name: "Sofia Rossi",
        title: "Account Executive",
        company: "Acme Corp",
        bio: "Connecting brands with the right digital identity.",
        email: "sofia.rossi@example.com",
        phone: "+1 (555) 000-0003",
        website: "",
        linkedin: "https://linkedin.com/in/sofiarossi",
        twitter: "",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544723795-432537dcfb11",
        coverImageUrl:
          "https://images.unsplash.com/photo-1515165562835-c4c9e0737eaa",
        youtubeUrl: "",
      },
      zh: {
        name: "Sofia Rossi",
        title: "客户经理",
        company: "Acme Corp",
        bio: "为品牌匹配合适的数字身份。",
        email: "sofia.rossi@example.com",
        phone: "+86 10 0000 0003",
        website: "",
        linkedin: "https://linkedin.com/in/sofiarossi",
        twitter: "",
        profileImageUrl:
          "https://images.unsplash.com/photo-1544723795-432537dcfb11",
        coverImageUrl:
          "https://images.unsplash.com/photo-1515165562835-c4c9e0737eaa",
        youtubeUrl: "",
      },
    },
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