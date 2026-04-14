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
            <div className="relative">
              {content.coverImageUrl ? (
                <div
                  className="h-32 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${content.coverImageUrl})` }}
                />
              ) : (
                <div className="h-32 w-full bg-muted" />
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <div className="inline-flex gap-4 rounded-t-xl bg-background/95 px-4 pt-2 pb-2 text-[11px] font-medium shadow-sm">
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