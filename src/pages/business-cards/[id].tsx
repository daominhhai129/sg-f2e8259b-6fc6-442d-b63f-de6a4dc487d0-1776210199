import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { Phone, Mail, Globe, Linkedin, Twitter, Youtube } from "lucide-react";
import { SEO } from "@/components/SEO";
import {
  businessCardsMock,
  usersMock,
  type BusinessCard,
  type AdminUser,
  type SupportedLanguage,
  type BusinessCardLanguageContent,
} from "@/components/admin/adminData";

type CardSection = "home" | "about" | "video" | "shop";

interface CardDetailsPageProps {
  card: BusinessCard | null;
  owner: AdminUser | null;
}

type BusinessCardForm = BusinessCardLanguageContent;

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

const CardDetailsPage: NextPage<CardDetailsPageProps> = ({ card, owner }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("vi");
  const [activeSection, setActiveSection] = useState<CardSection>("home");
  const [forms, setForms] = useState<Record<SupportedLanguage, BusinessCardForm>>(
    () => {
      if (!card) {
        return {} as Record<SupportedLanguage, BusinessCardForm>;
      }
      return card.languages;
    }
  );

  if (!card) {
    return (
      <>
        <SEO
          title="Card not found – Admin"
          description="The requested business card could not be found."
        />
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-sm text-foreground">
          <p>This card ID does not exist in the current mock dataset.</p>
          <Link
            href="/business-cards"
            className="mt-4 inline-flex items-center rounded-full border bg-card px-4 py-1.5 text-[11px] text-foreground hover:bg-muted md:text-xs"
          >
            Back to cards
          </Link>
        </div>
      </>
    );
  }

  const activeForm: BusinessCardForm = forms[selectedLanguage];

  const handleFieldChange = (field: keyof BusinessCardForm, value: string): void => {
    setForms((current) => ({
      ...current,
      [selectedLanguage]: {
        ...current[selectedLanguage],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (field: keyof BusinessCardForm, file: File): void => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        handleFieldChange(field, result);
      }
    };
    reader.readAsDataURL(file);
  };

  const linksCount: number = [
    activeForm.website,
    activeForm.linkedin,
    activeForm.twitter,
    activeForm.youtubeUrl,
  ].filter((value) => !!value && value.trim() !== "").length;

  const linksLabelParts: string[] = [];
  if (activeForm.website) {
    linksLabelParts.push("Website");
  }
  if (activeForm.linkedin) {
    linksLabelParts.push("LinkedIn");
  }
  if (activeForm.twitter) {
    linksLabelParts.push("X / Twitter");
  }
  if (activeForm.youtubeUrl) {
    linksLabelParts.push("YouTube");
  }

  const contactItems: ContactItem[] = [
    {
      key: "phone",
      show: activeForm.phone.trim() !== "",
      value: activeForm.phone,
      iconBg: "bg-emerald-500",
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
      show: (activeForm.website ?? "").trim() !== "",
      value: activeForm.website ?? "",
      iconBg: "bg-indigo-500",
      icon: <Globe className="h-3.5 w-3.5" />,
    },
    {
      key: "linkedin",
      show: (activeForm.linkedin ?? "").trim() !== "",
      value: activeForm.linkedin ?? "",
      iconBg: "bg-blue-700",
      icon: <Linkedin className="h-3.5 w-3.5" />,
    },
    {
      key: "twitter",
      show: (activeForm.twitter ?? "").trim() !== "",
      value: activeForm.twitter ?? "",
      iconBg: "bg-slate-800",
      icon: <Twitter className="h-3.5 w-3.5" />,
    },
    {
      key: "youtube",
      show: (activeForm.youtubeUrl ?? "").trim() !== "",
      value: activeForm.youtubeUrl ?? "",
      iconBg: "bg-red-600",
      icon: <Youtube className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <>
      <SEO
        title={`Edit ${activeForm.name} – Admin`}
        description="Edit business card details in the admin dashboard"
      />
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen">
          <aside className="hidden w-64 flex-col border-r bg-card/60 px-4 py-6 md:flex">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Admin
              </div>
              <div className="mt-1 text-lg font-semibold">Digital Cards</div>
            </div>
            <nav className="space-y-1 text-sm">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Overview
              </div>
              <Link
                href="/"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <span>Dashboard</span>
              </Link>
              <div className="mb-2 mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Management
              </div>
              <Link
                href="/users"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <span>Users</span>
              </Link>
              <Link
                href="/business-cards"
                className="flex w-full items-center justify-between rounded-lg bg-primary/10 px-3 py-2 text-left text-sm font-medium text-primary"
              >
                <span>Business cards</span>
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  Now
                </span>
              </Link>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <span>Settings</span>
              </button>
            </nav>
            <div className="mt-auto pt-8 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Session</div>
              <div className="mt-1">
                Viewing card #{card.id} owned by {owner?.name ?? "Unknown user"}
              </div>
            </div>
          </aside>

          <main className="flex flex-1 flex-col overflow-y-auto">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur md:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <Link
                  href="/business-cards"
                  className="inline-flex items-center rounded-full border bg-card px-3 py-1.5 text-[11px] text-foreground hover:bg-muted"
                >
                  ← Back
                </Link>
                <div>
                  <h1 className="text-lg font-semibold leading-tight md:text-xl">
                    Edit card details
                  </h1>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                    Changes are preview-only. No data is saved.
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-card px-1 py-0.5 text-[10px] font-medium shadow-sm md:text-xs">
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
            </header>

            <div className="grid flex-1 gap-6 p-4 md:p-6 lg:grid-cols-2 lg:p-8">
              <section className="space-y-4">
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <div className="mb-3 border-b pb-3">
                    <div className="text-sm font-semibold md:text-base">
                      Card preview
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Live preview for the currently selected language dataset.
                    </p>
                  </div>

                  <div>
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
                          <div className="mt-3 text-[11px] text-foreground">
                            {activeSection === "home" && (
                              <p>
                                Đây là bản xem trước màn hình liên hệ chính. Sử dụng form
                                bên phải để điều chỉnh thông tin cho ngôn ngữ{" "}
                                <span className="font-medium">
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
                                  {activeForm.aboutMedia1 && (
                                    <div
                                      className="h-16 rounded-md bg-cover bg-center"
                                      style={{
                                        backgroundImage: `url(${activeForm.aboutMedia1})`,
                                      }}
                                    />
                                  )}
                                  {activeForm.aboutMedia2 && (
                                    <div
                                      className="h-16 rounded-md bg-cover bg-center"
                                      style={{
                                        backgroundImage: `url(${activeForm.aboutMedia2})`,
                                      }}
                                    />
                                  )}
                                  {activeForm.aboutMedia3 && (
                                    <div
                                      className="h-16 rounded-md bg-cover bg-center"
                                      style={{
                                        backgroundImage: `url(${activeForm.aboutMedia3})`,
                                      }}
                                    />
                                  )}
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
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <form className="space-y-4">
                  <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="mb-3 border-b pb-3">
                      <div className="text-xs font-medium text-muted-foreground">
                        Contact information
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Name
                        </label>
                        <input
                          type="text"
                          value={activeForm.name}
                          onChange={(e) => handleFieldChange("name", e.target.value)}
                          placeholder="Full name"
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Title
                        </label>
                        <input
                          type="text"
                          value={activeForm.title}
                          onChange={(e) => handleFieldChange("title", e.target.value)}
                          placeholder="Job title"
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Company
                        </label>
                        <input
                          type="text"
                          value={activeForm.company}
                          onChange={(e) => handleFieldChange("company", e.target.value)}
                          placeholder="Company name"
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Email
                        </label>
                        <input
                          type="email"
                          value={activeForm.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          placeholder="email@example.com"
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={activeForm.phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          placeholder="+84..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Phone 2
                        </label>
                        <input
                          type="tel"
                          value={activeForm.phone2}
                          onChange={(e) => handleFieldChange("phone2", e.target.value)}
                          placeholder="+84..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Website
                        </label>
                        <input
                          type="url"
                          value={activeForm.website}
                          onChange={(e) => handleFieldChange("website", e.target.value)}
                          placeholder="https://..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Website 2
                        </label>
                        <input
                          type="url"
                          value={activeForm.website2}
                          onChange={(e) => handleFieldChange("website2", e.target.value)}
                          placeholder="https://..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Address 1
                        </label>
                        <input
                          type="text"
                          value={activeForm.address1}
                          onChange={(e) => handleFieldChange("address1", e.target.value)}
                          placeholder="Street, City, Country"
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Address 2
                        </label>
                        <input
                          type="text"
                          value={activeForm.address2}
                          onChange={(e) => handleFieldChange("address2", e.target.value)}
                          placeholder="Street, City, Country"
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="mb-1 block text-xs font-medium text-foreground">
                        Short bio
                      </label>
                      <textarea
                        value={activeForm.bio}
                        onChange={(e) => handleFieldChange("bio", e.target.value)}
                        placeholder="A brief introduction..."
                        rows={3}
                        className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="mb-3 border-b pb-3">
                      <div className="text-xs font-medium text-muted-foreground">
                        Social links
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={activeForm.linkedin}
                          onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          X / Twitter
                        </label>
                        <input
                          type="url"
                          value={activeForm.twitter}
                          onChange={(e) => handleFieldChange("twitter", e.target.value)}
                          placeholder="https://twitter.com/..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={activeForm.facebook}
                          onChange={(e) => handleFieldChange("facebook", e.target.value)}
                          placeholder="https://facebook.com/..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          TikTok
                        </label>
                        <input
                          type="url"
                          value={activeForm.tiktok}
                          onChange={(e) => handleFieldChange("tiktok", e.target.value)}
                          placeholder="https://tiktok.com/@..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="mb-3 border-b pb-3">
                      <div className="text-xs font-medium text-muted-foreground">
                        Media
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Profile image
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={activeForm.profileImageUrl}
                            onChange={(e) =>
                              handleFieldChange("profileImageUrl", e.target.value)
                            }
                            placeholder="https://..."
                            className="flex-1 rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload("profileImageUrl", file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Cover image
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={activeForm.coverImageUrl}
                            onChange={(e) =>
                              handleFieldChange("coverImageUrl", e.target.value)
                            }
                            placeholder="https://..."
                            className="flex-1 rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload("coverImageUrl", file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="mb-1 block text-xs font-medium text-foreground">
                        About section media 1
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={activeForm.aboutMedia1}
                          onChange={(e) =>
                            handleFieldChange("aboutMedia1", e.target.value)
                          }
                          placeholder="https://..."
                          className="flex-1 rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload("aboutMedia1", file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="mb-1 block text-xs font-medium text-foreground">
                        About section media 2
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={activeForm.aboutMedia2}
                          onChange={(e) =>
                            handleFieldChange("aboutMedia2", e.target.value)
                          }
                          placeholder="https://..."
                          className="flex-1 rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload("aboutMedia2", file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="mb-1 block text-xs font-medium text-foreground">
                        About section media 3
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={activeForm.aboutMedia3}
                          onChange={(e) =>
                            handleFieldChange("aboutMedia3", e.target.value)
                          }
                          placeholder="https://..."
                          className="flex-1 rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload("aboutMedia3", file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <div className="mb-3 text-xs font-medium text-muted-foreground">
                        YouTube
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-foreground">
                            YouTube video URL
                          </label>
                          <input
                            type="url"
                            value={activeForm.youtubeUrl}
                            onChange={(e) =>
                              handleFieldChange("youtubeUrl", e.target.value)
                            }
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-foreground">
                            YouTube channel
                          </label>
                          <input
                            type="url"
                            value={activeForm.youtubeChannel}
                            onChange={(e) =>
                              handleFieldChange("youtubeChannel", e.target.value)
                            }
                            placeholder="https://youtube.com/@..."
                            className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="mb-3 border-b pb-3">
                      <div className="text-xs font-medium text-muted-foreground">
                        Asian platforms
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          WeChat ID
                        </label>
                        <input
                          type="text"
                          value={activeForm.wechatId}
                          onChange={(e) => handleFieldChange("wechatId", e.target.value)}
                          placeholder="your_wechat_id"
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          WeChat QR Code
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={activeForm.wechatQr}
                            onChange={(e) =>
                              handleFieldChange("wechatQr", e.target.value)
                            }
                            placeholder="QR code image URL"
                            className="flex-1 rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload("wechatQr", file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Kakao ID
                        </label>
                        <input
                          type="text"
                          value={activeForm.kakaoId}
                          onChange={(e) => handleFieldChange("kakaoId", e.target.value)}
                          placeholder="your_kakao_id"
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Kakao QR Code
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={activeForm.kakaoQr}
                            onChange={(e) =>
                              handleFieldChange("kakaoQr", e.target.value)
                            }
                            placeholder="QR code image URL"
                            className="flex-1 rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload("kakaoQr", file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Zalo Number
                        </label>
                        <input
                          type="text"
                          value={activeForm.zaloNumber}
                          onChange={(e) =>
                            handleFieldChange("zaloNumber", e.target.value)
                          }
                          placeholder="+84..."
                          className="w-full rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                          Zalo QR Code
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={activeForm.zaloQr}
                            onChange={(e) => handleFieldChange("zaloQr", e.target.value)}
                            placeholder="QR code image URL"
                            className="flex-1 rounded-lg border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload("zaloQr", file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
                    This is a mock form. Refreshing the page will reset any changes for all
                    languages.
                  </div>
                </form>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CardDetailsPage;

export const getServerSideProps: GetServerSideProps<
  CardDetailsPageProps
> = async (context) => {
  const cardId: string = context.params?.id as string;

  const card: BusinessCard | undefined = businessCardsMock.find(
    (c) => c.id === parseInt(cardId, 10)
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