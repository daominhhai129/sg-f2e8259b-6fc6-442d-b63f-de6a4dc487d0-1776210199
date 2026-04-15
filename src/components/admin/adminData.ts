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

export interface BusinessCardLanguageContent {
  name: string;
  title: string;
  company: string;
  bio: string;
  email: string;
  phone: string;
  phone2: string;
  website: string;
  website2: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  tiktok: string;
  shopee: string;
  youtubeUrl: string;
  youtubeChannel: string;
  wechatId: string;
  wechatQr: string;
  kakaoId: string;
  kakaoQr: string;
  zaloNumber: string;
  zaloQr: string;
  taxInfo: string;
  address1: string;
  address2: string;
  profileImageUrl: string;
  coverImageUrl: string;
  aboutMedia1: string;
  aboutMedia2: string;
  aboutMedia3: string;
}

export interface BusinessCard {
  id: number;
  ownerId: number;
  defaultLanguage: SupportedLanguage;
  languages: Record<SupportedLanguage, BusinessCardLanguageContent>;
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
    ownerId: 1,
    defaultLanguage: "en",
    languages: {
      vi: {
        name: "Alex Johnson",
        title: "Người sáng lập & CEO",
        company: "Northwind Studio",
        bio: "Hỗ trợ các đội nhóm tạo trải nghiệm danh thiếp số ấn tượng.",
        email: "alex.johnson@example.com",
        phone: "+84 90 000 0001",
        phone2: "",
        website: "https://alexjohnson.me",
        website2: "",
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=300&q=80",
        aboutMedia2: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=300&q=80",
        aboutMedia3: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=300&q=80",
      },
      en: {
        name: "Alex Johnson",
        title: "Founder & CEO",
        company: "Northwind Studio",
        bio: "Helps teams create memorable digital business card experiences.",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 000-0001",
        phone2: "",
        website: "https://alexjohnson.me",
        website2: "",
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=300&q=80",
        aboutMedia2: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=300&q=80",
        aboutMedia3: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=300&q=80",
      },
      zh: {
        name: "Alex Johnson",
        title: "创始人 & 首席执行官",
        company: "Northwind Studio",
        bio: "帮助团队创建令人难忘的数字名片体验。",
        email: "alex.johnson@example.com",
        phone: "+86 138 0000 0001",
        phone2: "",
        website: "https://alexjohnson.me",
        website2: "",
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=300&q=80",
        aboutMedia2: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=300&q=80",
        aboutMedia3: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=300&q=80",
      },
    },
  },
  {
    id: 2,
    ownerId: 2,
    defaultLanguage: "vi",
    languages: {
      vi: {
        name: "Sarah Chen",
        title: "Quản lý dự án senior",
        company: "TechCorp Inc.",
        bio: "Chuyên gia phân phối phần mềm tinh gọn, tập trung vào trải nghiệm khách hàng.",
        email: "sarah.chen@techcorp.io",
        phone: "+84 90 000 0002",
        phone2: "",
        website: "https://techcorp.io",
        website2: "",
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "",
        aboutMedia2: "",
        aboutMedia3: "",
      },
      en: {
        name: "Sarah Chen",
        title: "Senior Project Manager",
        company: "TechCorp Inc.",
        bio: "Lean software delivery expert focusing on customer experience.",
        email: "sarah.chen@techcorp.io",
        phone: "+1 (555) 000-0002",
        phone2: "",
        website: "https://techcorp.io",
        website2: "",
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "",
        aboutMedia2: "",
        aboutMedia3: "",
      },
      zh: {
        name: "Sarah Chen",
        title: "高级项目经理",
        company: "TechCorp Inc.",
        bio: "专注于客户体验的精益软件交付专家。",
        email: "sarah.chen@techcorp.io",
        phone: "+86 138 0000 0002",
        phone2: "",
        website: "https://techcorp.io",
        website2: "",
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "",
        aboutMedia2: "",
        aboutMedia3: "",
      },
    },
  },
  {
    id: 3,
    ownerId: 4,
    defaultLanguage: "zh",
    languages: {
      vi: {
        name: "Michael Rodriguez",
        title: "Nhà thiết kế UI/UX",
        company: "Creative Labs",
        bio: "Đam mê tạo ra sản phẩm số đẹp mắt và thân thiện với người dùng.",
        email: "michael.r@creativelabs.design",
        phone: "+84 90 000 0003",
        phone2: "",
        website: "https://michaelrodriguez.design",
        website2: "",
        linkedin: "",
        twitter: "https://twitter.com/mrodriguez_ux",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "",
        aboutMedia2: "",
        aboutMedia3: "",
      },
      en: {
        name: "Michael Rodriguez",
        title: "UI/UX Designer",
        company: "Creative Labs",
        bio: "Passionate about creating beautiful and user-friendly digital products.",
        email: "michael.r@creativelabs.design",
        phone: "+1 (555) 000-0003",
        phone2: "",
        website: "https://michaelrodriguez.design",
        website2: "",
        linkedin: "",
        twitter: "https://twitter.com/mrodriguez_ux",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "",
        aboutMedia2: "",
        aboutMedia3: "",
      },
      zh: {
        name: "Michael Rodriguez",
        title: "UI/UX 设计师",
        company: "Creative Labs",
        bio: "热衷于创造美观且用户友好的数字产品。",
        email: "michael.r@creativelabs.design",
        phone: "+86 138 0000 0003",
        phone2: "",
        website: "https://michaelrodriguez.design",
        website2: "",
        linkedin: "",
        twitter: "https://twitter.com/mrodriguez_ux",
        facebook: "",
        tiktok: "",
        shopee: "",
        youtubeUrl: "",
        youtubeChannel: "",
        wechatId: "",
        wechatQr: "",
        kakaoId: "",
        kakaoQr: "",
        zaloNumber: "",
        zaloQr: "",
        taxInfo: "",
        address1: "",
        address2: "",
        profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        aboutMedia1: "",
        aboutMedia2: "",
        aboutMedia3: "",
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