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
} from "@/components/admin/adminData";

type CardSection = "home" | "about" | "video" | "shop";

interface CardPreviewPageProps {
  card: BusinessCard | null;
  owner: AdminUser | null;
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

const CardPreviewPage: NextPage<CardPreviewPageProps> = ({ card, owner }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    card?.defaultLanguage ?? "vi"
  );
  const [activeSection, setActiveSection] = useState<CardSection>("home");

  if (!card) {
    return (
      <>
        <SEO
          title="Card not found – Preview"
          description="The requested digital business card could not be found in the mock dataset."
        />
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-sm text-muted-foreground">
          <p>This card ID does not exist in the current mock dataset.</p>
          <Link
            href="/business-cards"
            className="mt-4 inline-flex items-center rounded-full border bg-card px-4 py-1.5 text-[11px] text-muted-foreground hover:bg-muted md:text-xs"
          >
            Back to admin cards
          </Link>
        </div>
      </>
    );
  }

  const content = card.languages[selectedLanguage];

  const linksCount: number = [
    content.website,
    content.linkedin,
    content.twitter,
    content.youtubeUrl,
  ].filter((value) => !!value && value.trim() !== "").length;

  const linksLabelParts: string[] = [];
  if (content.website) {
    linksLabelParts.push("Website");
  }
  if (content.linkedin) {
    linksLabelParts.push("LinkedIn");
  }
  if (content.twitter) {
    linksLabelParts.push("X / Twitter");
  }
  if (content.youtubeUrl) {
    linksLabelParts.push("YouTube");
  }

  const contactItems: ContactItem[] = [
    {
      key: "phone",
      show: content.phone.trim() !== "",
      value: content.phone,
      iconBg: "bg-emerald-500",
      icon: <Phone className="h-3.5 w-3.5" />,
    },
    {
      key: "email",
      show: content.email.trim() !== "",
      value: content.email,
      iconBg: "bg-sky-500",
      icon: <Mail className="h-3.5 w-3.5" />,
    },
    {
      key: "website",
      show: (content.website ?? "").trim() !== "",
      value: content.website ?? "",
      iconBg: "bg-indigo-500",
      icon: <Globe className="h-3.5 w-3.5" />,
    },
    {
      key: "linkedin",
      show: (content.linkedin ?? "").trim() !== "",
      value: content.linkedin ?? "",
      iconBg: "bg-blue-700",
      icon: <Linkedin className="h-3.5 w-3.5" />,
    },
    {
      key: "twitter",
      show: (content.twitter ?? "").trim() !== "",
      value: content.twitter ?? "",
      iconBg: "bg-slate-800",
      icon: <Twitter className="h-3.5 w-3.5" />,
    },
    {
      key: "youtube",
      show: (content.youtubeUrl ?? "").trim() !== "",
      value: content.youtubeUrl ?? "",
      iconBg: "bg-red-600",
      icon: <Youtube className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <>
      <SEO
        title={`${content.name} – Digital business card preview`}
        description="Standalone preview of a multilingual digital business card from the admin dashboard mock data."
      />
      <div className="min-h-screen bg-muted">
        <header className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground md:px-6 lg:px-8">
          <Link
            href="/business-cards"
            className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-[11px] hover:bg-muted"
          >
            Back to admin
          </Link>
          <div className="inline-flex items-center gap-1 rounded-full bg-background px-1 py-0.5 text-[10px] font-medium md:text-xs">
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

        <main className="flex justify-center px-4 pb-10 pt-2 md:px-6 lg:px-8">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border bg-background shadow-lg">
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
                  {content.coverImageUrl ? (
                    <div
                      className="h-32 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${content.coverImageUrl})` }}
                    />
                  ) : (
                    <div className="h-32 w-full bg-muted" />
                  )}
                </div>

                <div className="px-4 pb-5 pt-10">
                  <div className="flex justify-center">
                    {content.profileImageUrl ? (
                      <div className="relative -mt-14 h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md">
                        <img
                          src={content.profileImageUrl}
                          alt={content.name || "Profile"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative -mt-14 h-24 w-24 rounded-full border-4 border-background bg-muted shadow-md" />
                    )}
                  </div>

                  <div className="mt-3 text-center">
                    <div className="text-base font-semibold uppercase tracking-wide">
                      {content.name}
                    </div>
                    <div className="mt-1 text-xs font-medium text-muted-foreground">
                      {content.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {content.company}
                    </div>
                  </div>

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
                </div>
              </>
            )}

            <div className={activeSection === "home" ? "px-4 pb-4" : "px-4 pb-4 pt-4"}>
              <div className="text-[11px] text-muted-foreground">
                {activeSection === "home" && (
                  <p>
                    This is the main contact view for {content.name}. Use the buttons
                    below to save the contact or scan the QR code.
                  </p>
                )}
                {activeSection === "about" && (
                  <p>
                    {content.bio && content.bio.trim() !== ""
                      ? content.bio
                      : "A short introduction about this person or business in the selected language will appear here."}
                  </p>
                )}
                {activeSection === "video" && (
                  <div className="rounded-lg border bg-card px-3 py-2 text-center">
                    {content.youtubeUrl && content.youtubeUrl.trim() !== "" ? (
                      <p>
                        Video placeholder for{" "}
                        <span className="font-medium text-foreground">
                          {content.youtubeUrl}
                        </span>
                        .
                      </p>
                    ) : (
                      <p>
                        Add a YouTube link in the admin to highlight a promo or intro
                        video on this card.
                      </p>
                    )}
                  </div>
                )}
                {activeSection === "shop" && (
                  <div className="space-y-1">
                    <p>Highlight key links to your shop or featured services.</p>
                    <ul className="list-disc pl-4">
                      <li>Main online shop page</li>
                      <li>Featured product or service for this profile</li>
                    </ul>
                  </div>
                )}
              </div>

              {activeSection === "about" && (
                <>
                  <div className="mt-4 text-[11px] text-muted-foreground">
                    <p>
                      {content.bio && content.bio.trim() !== ""
                        ? content.bio
                        : "Một đoạn giới thiệu ngắn về cá nhân hoặc doanh nghiệp này sẽ hiển thị tại đây. Bạn có thể dùng phần này để kể câu chuyện thương hiệu và điểm khác biệt chính."}
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
                  </div>
                </>
              )}

              {activeSection === "video" && (
                <div className="space-y-3">
                  <p>
                    Bộ sưu tập video giới thiệu, case study hoặc testimonial cho{" "}
                    <span className="font-medium text-foreground">{content.name}</span>.
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
                          className="h-40 w-full"
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
                    Một vài gói dịch vụ hoặc sản phẩm tiêu biểu mà khách hàng có thể
                    quan tâm.
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
                        description: "Giải pháp trọn gói cho doanh nghiệp nhỏ.",
                      },
                      {
                        name: "Sản phẩm nổi bật",
                        price: "Liên hệ",
                        description: "Giải pháp tùy chỉnh theo nhu cầu.",
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

              {activeSection === "home" && (
                <>
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
        </main>
      </div>
    </>
  );
};

export default CardPreviewPage;

export const getServerSideProps: GetServerSideProps<CardPreviewPageProps> = async (
  context
) => {
  const idParam: string | string[] | undefined = context.params?.id;
  const id: number = Number(Array.isArray(idParam) ? idParam[0] : idParam);

  if (!id || Number.isNaN(id)) {
    return {
      props: {
        card: null,
        owner: null,
      },
    };
  }

  const card: BusinessCard | undefined = businessCardsMock.find(
    (item) => item.id === id
  );
  const owner: AdminUser | undefined = card
    ? usersMock.find((user) => user.id === card.userId)
    : undefined;

  return {
    props: {
      card: card ?? null,
      owner: owner ?? null,
    },
  };
};