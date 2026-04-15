import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { Phone, Mail, Globe, Linkedin, Twitter, Youtube, Facebook, ShoppingBag, MapPin, FileText } from "lucide-react";
import { SEO } from "@/components/SEO";
import {
  businessCardsMock,
  usersMock,
  getPlanLabel,
  getStatusClasses,
  type BusinessCard,
  type AdminUser,
  type SupportedLanguage,
} from "@/components/admin/adminData";

type CardSection = "home" | "about" | "video" | "shop";

interface CardDetailsPageProps {
  card: BusinessCard | null;
  owner: AdminUser | null;
}

interface BusinessCardForm {
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
  profileImageUrl: string;
  coverImageUrl: string;
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
}

interface ContactItem {
  key: string;
  show: boolean;
  value: string;
  iconBg: string;
  icon: JSX.Element;
}

const languages: SupportedLanguage[] = ["vi", "en", "zh"];
const sections: { id: CardSection; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "Giới thiệu" },
  { id: "video", label: "Video" },
  { id: "shop", label: "Shop" },
];

const emptyForm: BusinessCardForm = {
  name: "",
  title: "",
  company: "",
  bio: "",
  email: "",
  phone: "",
  phone2: "",
  website: "",
  website2: "",
  linkedin: "",
  twitter: "",
  facebook: "",
  tiktok: "",
  shopee: "",
  profileImageUrl: "",
  coverImageUrl: "",
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
};

function createInitialForms(card: BusinessCard | null): Record<SupportedLanguage, BusinessCardForm> {
  if (!card) {
    return {
      vi: { ...emptyForm },
      en: { ...emptyForm },
      zh: { ...emptyForm },
    };
  }

  const mapLanguage = (language: SupportedLanguage): BusinessCardForm => {
    const data = card.languages[language];

    return {
      name: data.name ?? "",
      title: data.title ?? "",
      company: data.company ?? "",
      bio: data.bio ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      phone2: data.phone2 ?? "",
      website: data.website ?? "",
      website2: data.website2 ?? "",
      linkedin: data.linkedin ?? "",
      twitter: data.twitter ?? "",
      facebook: data.facebook ?? "",
      tiktok: data.tiktok ?? "",
      shopee: data.shopee ?? "",
      profileImageUrl: data.profileImageUrl ?? "",
      coverImageUrl: data.coverImageUrl ?? "",
      youtubeUrl: data.youtubeUrl ?? "",
      youtubeChannel: data.youtubeChannel ?? "",
      wechatId: data.wechatId ?? "",
      wechatQr: data.wechatQr ?? "",
      kakaoId: data.kakaoId ?? "",
      kakaoQr: data.kakaoQr ?? "",
      zaloNumber: data.zaloNumber ?? "",
      zaloQr: data.zaloQr ?? "",
      taxInfo: data.taxInfo ?? "",
      address1: data.address1 ?? "",
      address2: data.address2 ?? "",
    };
  };

  return {
    vi: mapLanguage("vi"),
    en: mapLanguage("en"),
    zh: mapLanguage("zh"),
  };
}

const BusinessCardDetailsPage: NextPage<CardDetailsPageProps> = ({ card, owner }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    card?.defaultLanguage ?? "vi"
  );
  const [activeSection, setActiveSection] = useState<CardSection>("home");

  const [forms, setForms] = useState<Record<SupportedLanguage, BusinessCardForm>>(
    () => createInitialForms(card)
  );

  const activeForm: BusinessCardForm = forms[selectedLanguage];

  const linksCount: number = [
    activeForm.website,
    activeForm.website2,
    activeForm.linkedin,
    activeForm.twitter,
    activeForm.facebook,
    activeForm.tiktok,
    activeForm.shopee,
    activeForm.youtubeUrl,
    activeForm.youtubeChannel,
  ].filter((value) => !!value && value.trim() !== "").length;

  const linksLabelParts: string[] = [];
  if (activeForm.website) linksLabelParts.push("Website");
  if (activeForm.website2) linksLabelParts.push("Website 2");
  if (activeForm.linkedin) linksLabelParts.push("LinkedIn");
  if (activeForm.twitter) linksLabelParts.push("X / Twitter");
  if (activeForm.facebook) linksLabelParts.push("Facebook");
  if (activeForm.tiktok) linksLabelParts.push("TikTok");
  if (activeForm.shopee) linksLabelParts.push("Shopee");
  if (activeForm.youtubeUrl) linksLabelParts.push("YouTube");
  if (activeForm.youtubeChannel) linksLabelParts.push("YouTube Channel");

  const contactItems: ContactItem[] = [
    {
      key: "phone",
      show: activeForm.phone.trim() !== "",
      value: activeForm.phone,
      iconBg: "bg-emerald-500",
      icon: <Phone className="h-3.5 w-3.5" />,
    },
    {
      key: "phone2",
      show: activeForm.phone2.trim() !== "",
      value: activeForm.phone2,
      iconBg: "bg-emerald-600",
      icon: <Phone className="h-3.5 w-3.5" />,
    },
    {
      key: "email",
      show: activeForm.email.trim() !== "",
      value: activeForm.email,
      iconBg: "bg-sky-500",
      icon: <Mail className="h-3.5 w-3.5" />,
    },
    {
      key: "website",
      show: activeForm.website.trim() !== "",
      value: activeForm.website,
      iconBg: "bg-indigo-500",
      icon: <Globe className="h-3.5 w-3.5" />,
    },
    {
      key: "website2",
      show: activeForm.website2.trim() !== "",
      value: activeForm.website2,
      iconBg: "bg-indigo-600",
      icon: <Globe className="h-3.5 w-3.5" />,
    },
    {
      key: "linkedin",
      show: activeForm.linkedin.trim() !== "",
      value: activeForm.linkedin,
      iconBg: "bg-blue-700",
      icon: <Linkedin className="h-3.5 w-3.5" />,
    },
    {
      key: "twitter",
      show: activeForm.twitter.trim() !== "",
      value: activeForm.twitter,
      iconBg: "bg-slate-800",
      icon: <Twitter className="h-3.5 w-3.5" />,
    },
    {
      key: "facebook",
      show: activeForm.facebook.trim() !== "",
      value: activeForm.facebook,
      iconBg: "bg-blue-600",
      icon: <Facebook className="h-3.5 w-3.5" />,
    },
    {
      key: "tiktok",
      show: activeForm.tiktok.trim() !== "",
      value: activeForm.tiktok,
      iconBg: "bg-slate-900",
      icon: <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>,
    },
    {
      key: "shopee",
      show: activeForm.shopee.trim() !== "",
      value: activeForm.shopee,
      iconBg: "bg-orange-500",
      icon: <ShoppingBag className="h-3.5 w-3.5" />,
    },
    {
      key: "youtube",
      show: activeForm.youtubeUrl.trim() !== "",
      value: activeForm.youtubeUrl,
      iconBg: "bg-red-600",
      icon: <Youtube className="h-3.5 w-3.5" />,
    },
    {
      key: "youtubeChannel",
      show: activeForm.youtubeChannel.trim() !== "",
      value: activeForm.youtubeChannel,
      iconBg: "bg-red-700",
      icon: <Youtube className="h-3.5 w-3.5" />,
    },
    {
      key: "address1",
      show: activeForm.address1.trim() !== "",
      value: activeForm.address1,
      iconBg: "bg-violet-500",
      icon: <MapPin className="h-3.5 w-3.5" />,
    },
    {
      key: "address2",
      show: activeForm.address2.trim() !== "",
      value: activeForm.address2,
      iconBg: "bg-violet-600",
      icon: <MapPin className="h-3.5 w-3.5" />,
    },
    {
      key: "taxInfo",
      show: activeForm.taxInfo.trim() !== "",
      value: activeForm.taxInfo,
      iconBg: "bg-amber-600",
      icon: <FileText className="h-3.5 w-3.5" />,
    },
  ];

  const handleFieldChange = (field: keyof BusinessCardForm, value: string): void => {
    setForms((current) => ({
      ...current,
      [selectedLanguage]: {
        ...current[selectedLanguage],
        [field]: value,
      },
    }));
  };

  if (!card || !owner) {
    return (
      <>
        <SEO
          title="Business card not found – Admin Dashboard"
          description="The requested business card could not be found in the mock dataset."
        />
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-sm text-muted-foreground">
          <p>This card ID does not exist in the current mock dataset.</p>
          <Link
            href="/business-cards"
            className="mt-4 inline-flex items-center rounded-full border bg-card px-4 py-1.5 text-[11px] text-muted-foreground hover:bg-muted md:text-xs"
          >
            Back to business cards
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Edit card – ${card.languages[card.defaultLanguage].name}`}
        description="Edit a multilingual digital business card for one of your users (mock data only, no persistence)."
      />
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen">
          <aside className="hidden w-56 border-r bg-muted/30 md:block">
            <div className="sticky top-0 space-y-6 px-4 py-6">
              <div>
                <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Overview
                </div>
                <Link
                  href="/"
                  className="flex items-center rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
                >
                  Dashboard
                </Link>
              </div>

              <div>
                <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Management
                </div>
                <Link
                  href="/users"
                  className="flex items-center rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
                >
                  Users
                </Link>
                <Link
                  href="/business-cards"
                  className="flex items-center rounded-lg bg-background px-2 py-1.5 text-sm font-medium text-foreground shadow-sm"
                >
                  <span>Business cards</span>
                  <span className="ml-auto inline-flex h-5 items-center rounded-full bg-primary px-2 text-[10px] font-semibold text-primary-foreground">
                    Now
                  </span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
                >
                  Settings
                </Link>
              </div>
            </div>
          </aside>

          <main className="flex flex-1 flex-col">
            <header className="border-b bg-background px-4 py-3 md:px-6 md:py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold md:text-xl">Edit business card</h1>
                  <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                    Card ID: <span className="font-mono">{card.id}</span> · Owner:{" "}
                    <span className="font-medium">{owner.name}</span>
                  </p>
                </div>
                <Link
                  href="/business-cards"
                  className="inline-flex items-center rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  Back to cards
                </Link>
              </div>
            </header>

            <section className="flex-1 space-y-6 px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
              <div className="grid gap-4 lg:grid-cols-5">
                <div className="rounded-xl border bg-card p-4 shadow-sm lg:col-span-2">
                  <div className="flex items-start justify-between gap-2 border-b pb-3">
                    <div>
                      <div className="text-sm font-semibold">Card preview</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">
                        Live preview for the currently selected language dataset.
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-muted px-1 py-0.5 text-[10px] font-medium">
                      {languages.map((language) => (
                        <button
                          key={language}
                          type="button"
                          onClick={() => setSelectedLanguage(language)}
                          className={`rounded-full px-2 py-0.5 ${
                            language === selectedLanguage
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {language.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-center">
                    <div className="w-full max-w-sm overflow-hidden rounded-2xl border bg-background shadow-md">
                      <div className="border-b bg-background/95 px-4 pt-3 pb-2">
                        <div className="flex justify-center">
                          <div className="inline-flex gap-4 rounded-full bg-muted px-4 py-1.5 text-[11px] font-medium shadow-sm">
                            {sections.map((section) => (
                              <button
                                key={section.id}
                                type="button"
                                onClick={() => setActiveSection(section.id)}
                                className={
                                  section.id === activeSection
                                    ? "border-b-2 border-primary pb-0.5 text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }
                              >
                                {section.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {activeSection === "home" && (
                        <>
                          <div className="relative">
                            {activeForm.coverImageUrl ? (
                              <div
                                className="h-32 w-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${activeForm.coverImageUrl})` }}
                              />
                            ) : (
                              <div className="h-32 w-full bg-muted" />
                            )}
                          </div>

                          <div className="px-4 pb-4 pt-10">
                            <div className="flex justify-center">
                              {activeForm.profileImageUrl ? (
                                <div className="relative -mt-14 h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md">
                                  <img
                                    src={activeForm.profileImageUrl}
                                    alt={activeForm.name || "Profile"}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="relative -mt-14 h-24 w-24 rounded-full border-4 border-background bg-muted shadow-md" />
                              )}
                            </div>

                            <div className="mt-3 text-center">
                              <div className="text-base font-semibold uppercase tracking-wide">
                                {activeForm.name || card.languages[selectedLanguage].name}
                              </div>
                              <div className="mt-1 text-xs font-medium text-muted-foreground">
                                {activeForm.title || "Giám đốc"}
                              </div>
                              <div className="mt-0.5 text-[11px] text-muted-foreground">
                                {activeForm.company ||
                                  card.languages[selectedLanguage].company}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className={activeSection === "home" ? "px-4 pb-4" : "px-4 pb-4 pt-4"}>
                        <div className="mt-3 text-[11px] text-muted-foreground">
                          {activeSection === "home" && (
                            <p>
                              Đây là bản xem trước màn hình liên hệ chính. Sử dụng form
                              bên phải để điều chỉnh thông tin cho ngôn ngữ{" "}
                              <span className="font-medium text-foreground">
                                {selectedLanguage.toUpperCase()}
                              </span>
                              .
                            </p>
                          )}
                          {activeSection === "about" && (
                            <>
                              <p>
                                {activeForm.bio && activeForm.bio.trim() !== ""
                                  ? activeForm.bio
                                  : "Một đoạn giới thiệu ngắn cho hồ sơ này sẽ được hiển thị tại đây khi bạn nhập nội dung ở phần Short bio."}
                              </p>
                              <div className="mt-3 grid grid-cols-3 gap-2">
                                <div
                                  className="h-16 rounded-md bg-cover bg-center"
                                  style={{
                                    backgroundImage:
                                      "url(https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=300&q=80)",
                                  }}
                                />
                                <div
                                  className="h-16 rounded-md bg-cover bg-center"
                                  style={{
                                    backgroundImage:
                                      "url(https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=300&q=80)",
                                  }}
                                />
                                <div
                                  className="h-16 rounded-md bg-cover bg-center"
                                  style={{
                                    backgroundImage:
                                      "url(https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=300&q=80)",
                                  }}
                                />
                              </div>
                            </>
                          )}
                          {activeSection === "video" && (
                            <div className="space-y-3">
                              <p>
                                Xem trước khu vực video cho card này. Nhập đường dẫn
                                YouTube ở phần &quot;YouTube video URL&quot; để dùng cho
                                chiến dịch thực tế.
                              </p>
                              <div className="space-y-3">
                                {[
                                  "https://www.youtube.com/embed/dQw4w9WgXcQ",
                                  "https://www.youtube.com/embed/oHg5SJYRHA0",
                                  "https://www.youtube.com/embed/3GwjfUFyY6M",
                                ].map((src) => (
                                  <div
                                    key={src}
                                    className="overflow-hidden rounded-lg border bg-black/90"
                                  >
                                    <iframe
                                      src={src}
                                      title="Promo video"
                                      className="h-36 w-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowFullScreen
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {activeSection === "shop" && (
                            <div className="space-y-3">
                              <p>
                                Mô phỏng khu vực giới thiệu gói dịch vụ hoặc sản phẩm để
                                gắn với card này.
                              </p>
                              <div className="grid gap-2">
                                {[
                                  {
                                    name: "Gói tư vấn tiêu chuẩn",
                                    price: "1.500.000đ",
                                    description: "Buổi tư vấn 1:1 trong 60 phút.",
                                  },
                                  {
                                    name: "Gói dịch vụ premium",
                                    price: "4.900.000đ",
                                    description:
                                      "Giải pháp trọn gói cho doanh nghiệp nhỏ.",
                                  },
                                  {
                                    name: "Sản phẩm nổi bật",
                                    price: "Liên hệ",
                                    description:
                                      "Tuỳ chỉnh theo nhu cầu từng khách hàng.",
                                  },
                                ].map((product) => (
                                  <div
                                    key={product.name}
                                    className="flex items-center justify-between rounded-lg border bg-card px-3 py-2 text-[11px] shadow-sm"
                                  >
                                    <div>
                                      <div className="font-semibold text-foreground">
                                        {product.name}
                                      </div>
                                      <div className="text-[10px] text-muted-foreground">
                                        {product.description}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xs font-semibold text-amber-700">
                                        {product.price}
                                      </div>
                                      <button
                                        type="button"
                                        className="mt-1 inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground"
                                      >
                                        Xem thêm
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {activeSection === "home" && (
                          <>
                            <div className="mt-3 flex justify-center gap-2">
                              <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow hover:bg-amber-700"
                              >
                                Lưu danh bạ
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full border border-amber-600 bg-background px-3 py-1.5 text-[11px] font-semibold text-amber-700 shadow-sm hover:bg-amber-50"
                              >
                                Quét mã QR
                              </button>
                            </div>

                            <div className="mt-4 space-y-2 text-[11px]">
                              {contactItems
                                .filter((item) => item.show)
                                .map((item) => (
                                  <div
                                    key={item.key}
                                    className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2 shadow-sm"
                                  >
                                    <div
                                      className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${item.iconBg}`}
                                    >
                                      {item.icon}
                                    </div>
                                    <div className="flex-1 truncate text-xs text-foreground">
                                      {item.value}
                                    </div>
                                  </div>
                                ))}
                            </div>

                            {linksLabelParts.length > 0 && (
                              <div className="mt-4 text-center text-[10px] text-muted-foreground">
                                {linksCount} link{linksCount === 1 ? "" : "s"} ·{" "}
                                {linksLabelParts.join(" · ")}
                              </div>
                            )}
                          </>
                        )}

                        <div className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Pro ID • Preview
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border bg-muted/50 px-3 py-2 text-xs">
                    <div className="font-medium">Card owner</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      <div>Name: {owner.name}</div>
                      <div>
                        Email:{" "}
                        <a
                          href={`mailto:${owner.email}`}
                          className="text-primary underline"
                        >
                          {owner.email}
                        </a>
                      </div>
                      <div>
                        Plan:{" "}
                        <span className="font-medium">
                          {getPlanLabel(owner.plan)}
                        </span>
                      </div>
                      <div>
                        Status:{" "}
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusClasses(owner.status)}`}
                        >
                          {owner.status.charAt(0).toUpperCase() + owner.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 lg:col-span-3">
                  <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2 border-b pb-3">
                      <div>
                        <div className="text-sm font-semibold">
                          Edit card details (mock)
                        </div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">
                          Edit contact, social, and media fields for each language. These
                          changes only affect the preview in your browser; nothing is saved
                          to a backend.
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-muted px-1 py-0.5 text-[10px] font-medium">
                        {languages.map((language) => (
                          <button
                            key={language}
                            type="button"
                            onClick={() => setSelectedLanguage(language)}
                            className={`rounded-full px-2 py-0.5 ${
                              language === selectedLanguage
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {language.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="text-xs font-semibold">Contact information</div>
                        <div className="mt-2 grid gap-3 md:grid-cols-2">
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Name
                            </label>
                            <input
                              type="text"
                              value={activeForm.name}
                              onChange={(e) => handleFieldChange("name", e.target.value)}
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Title
                            </label>
                            <input
                              type="text"
                              value={activeForm.title}
                              onChange={(e) => handleFieldChange("title", e.target.value)}
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Company
                            </label>
                            <input
                              type="text"
                              value={activeForm.company}
                              onChange={(e) =>
                                handleFieldChange("company", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Email
                            </label>
                            <input
                              type="email"
                              value={activeForm.email}
                              onChange={(e) => handleFieldChange("email", e.target.value)}
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Phone
                            </label>
                            <input
                              type="tel"
                              value={activeForm.phone}
                              onChange={(e) => handleFieldChange("phone", e.target.value)}
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Phone 2
                            </label>
                            <input
                              type="tel"
                              value={activeForm.phone2}
                              onChange={(e) => handleFieldChange("phone2", e.target.value)}
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Address 1
                            </label>
                            <input
                              type="text"
                              value={activeForm.address1}
                              onChange={(e) =>
                                handleFieldChange("address1", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Address 2
                            </label>
                            <input
                              type="text"
                              value={activeForm.address2}
                              onChange={(e) =>
                                handleFieldChange("address2", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                        </div>

                        <div className="mt-3">
                          <label className="text-[11px] font-medium text-muted-foreground">
                            Short bio
                          </label>
                          <textarea
                            value={activeForm.bio}
                            onChange={(e) => handleFieldChange("bio", e.target.value)}
                            rows={3}
                            className="mt-1 w-full resize-none rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold">Social links</div>
                        <div className="mt-2 grid gap-3 md:grid-cols-2">
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Website
                            </label>
                            <input
                              type="url"
                              value={activeForm.website}
                              onChange={(e) =>
                                handleFieldChange("website", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Website 2
                            </label>
                            <input
                              type="url"
                              value={activeForm.website2}
                              onChange={(e) =>
                                handleFieldChange("website2", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              LinkedIn
                            </label>
                            <input
                              type="url"
                              value={activeForm.linkedin}
                              onChange={(e) =>
                                handleFieldChange("linkedin", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              X / Twitter
                            </label>
                            <input
                              type="url"
                              value={activeForm.twitter}
                              onChange={(e) =>
                                handleFieldChange("twitter", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Facebook
                            </label>
                            <input
                              type="url"
                              value={activeForm.facebook}
                              onChange={(e) =>
                                handleFieldChange("facebook", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              TikTok
                            </label>
                            <input
                              type="url"
                              value={activeForm.tiktok}
                              onChange={(e) =>
                                handleFieldChange("tiktok", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Shopee
                            </label>
                            <input
                              type="url"
                              value={activeForm.shopee}
                              onChange={(e) =>
                                handleFieldChange("shopee", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              WeChat ID
                            </label>
                            <input
                              type="text"
                              value={activeForm.wechatId}
                              onChange={(e) =>
                                handleFieldChange("wechatId", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              WeChat QR Code URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.wechatQr}
                              onChange={(e) =>
                                handleFieldChange("wechatQr", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Kakao ID
                            </label>
                            <input
                              type="text"
                              value={activeForm.kakaoId}
                              onChange={(e) =>
                                handleFieldChange("kakaoId", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Kakao QR Code URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.kakaoQr}
                              onChange={(e) =>
                                handleFieldChange("kakaoQr", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Zalo Number
                            </label>
                            <input
                              type="text"
                              value={activeForm.zaloNumber}
                              onChange={(e) =>
                                handleFieldChange("zaloNumber", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Zalo QR Code URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.zaloQr}
                              onChange={(e) =>
                                handleFieldChange("zaloQr", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Tax Info
                            </label>
                            <input
                              type="text"
                              value={activeForm.taxInfo}
                              onChange={(e) =>
                                handleFieldChange("taxInfo", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold">Media</div>
                        <div className="mt-2 grid gap-3 md:grid-cols-2">
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Profile image URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.profileImageUrl}
                              onChange={(e) =>
                                handleFieldChange("profileImageUrl", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              Cover image URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.coverImageUrl}
                              onChange={(e) =>
                                handleFieldChange("coverImageUrl", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              YouTube video URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.youtubeUrl}
                              onChange={(e) =>
                                handleFieldChange("youtubeUrl", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-muted-foreground">
                              YouTube channel URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.youtubeChannel}
                              onChange={(e) =>
                                handleFieldChange("youtubeChannel", e.target.value)
                              }
                              className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                      This is a mock form. Refreshing the page will reset any changes for
                      all languages. No data is written to a backend.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default BusinessCardDetailsPage;

export const getServerSideProps: GetServerSideProps<
  CardDetailsPageProps
> = async (context) => {
  const cardId: string = context.params?.id as string;

  const card: BusinessCard | undefined = businessCardsMock.find(
    (c) => c.id === cardId
  );

  if (!card) {
    return {
      props: {
        card: null,
        owner: null,
      },
    };
  }

  const owner: AdminUser | undefined = usersMock.find(
    (u) => u.id === card.ownerId
  );

  return {
    props: {
      card: card ?? null,
      owner: owner ?? null,
    },
  };
};