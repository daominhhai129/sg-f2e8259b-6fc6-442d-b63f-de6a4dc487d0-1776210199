import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
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
  website: string;
  linkedin: string;
  twitter: string;
  profileImageUrl: string;
  coverImageUrl: string;
  youtubeUrl: string;
}

const languages: SupportedLanguage[] = ["vi", "en", "zh"];

const emptyForm: BusinessCardForm = {
  name: "",
  title: "",
  company: "",
  bio: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
  twitter: "",
  profileImageUrl: "",
  coverImageUrl: "",
  youtubeUrl: "",
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
      website: data.website ?? "",
      linkedin: data.linkedin ?? "",
      twitter: data.twitter ?? "",
      profileImageUrl: data.profileImageUrl ?? "",
      coverImageUrl: data.coverImageUrl ?? "",
      youtubeUrl: data.youtubeUrl ?? "",
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

  const [forms, setForms] = useState<Record<SupportedLanguage, BusinessCardForm>>(
    () => createInitialForms(card)
  );

  const activeForm: BusinessCardForm = forms[selectedLanguage];

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

  const handleFieldChange = (field: keyof BusinessCardForm, value: string): void => {
    setForms((current) => ({
      ...current,
      [selectedLanguage]: {
        ...current[selectedLanguage],
        [field]: value,
      },
    }));
  };

  return (
    <>
      <SEO
        title={
          card
            ? `Edit card – ${card.languages[card.defaultLanguage].name}`
            : "Business card not found – Admin Dashboard"
        }
        description="Edit a multilingual digital business card for one of your users (mock data only, no persistence)."
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
              <div className="mt-1">You are viewing a frontend-only admin preview.</div>
            </div>
          </aside>

          <main className="flex flex-1 flex-col">
            <header className="flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur md:px-6 lg:px-8">
              <div>
                <h1 className="text-lg font-semibold leading-tight md:text-xl">
                  {card ? "Edit business card" : "Card not found"}
                </h1>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {card
                    ? "Adjust the details for this multilingual digital business card. Changes are local to this preview only."
                    : "The requested business card could not be found in the mock data."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/business-cards"
                  className="inline-flex items-center rounded-full border bg-card px-4 py-1.5 text-[11px] text-muted-foreground hover:bg-muted md:text-xs"
                >
                  Back to cards
                </Link>
              </div>
            </header>

            <section className="flex-1 space-y-6 px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
              {!card ? (
                <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
                  This card ID does not exist in the current mock dataset. Go back to the
                  cards list and choose another entry.
                </div>
              ) : (
                <div className="grid gap-4 lg:grid-cols-5">
                  <div className="rounded-xl border bg-card p-4 shadow-sm lg:col-span-2">
                    <div className="flex items-start justify-between gap-2 border-b pb-3">
                      <div>
                        <h2 className="text-sm font-semibold md:text-base">
                          Card preview
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Live preview for the currently selected language dataset.
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {owner ? (
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium md:text-xs ${getStatusClasses(
                              owner.status
                            )}`}
                          >
                            {owner.status === "active"
                              ? "Active"
                              : owner.status === "invited"
                              ? "Invited"
                              : "Suspended"}
                          </span>
                        ) : null}
                        <div className="inline-flex items-center gap-1 rounded-full bg-muted px-1 py-0.5 text-[10px] font-medium md:text-xs">
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
                    </div>

                    <div className="mt-3 overflow-hidden rounded-lg border bg-background">
                      {activeForm.coverImageUrl ? (
                        <div
                          className="h-20 w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${activeForm.coverImageUrl})` }}
                        />
                      ) : (
                        <div className="h-20 w-full bg-muted" />
                      )}
                      <div className="flex items-center gap-3 px-3 py-2 text-xs">
                        {activeForm.profileImageUrl ? (
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border bg-muted">
                            <img
                              src={activeForm.profileImageUrl}
                              alt={activeForm.name || "Profile"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 flex-shrink-0 rounded-full border bg-muted" />
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-semibold">
                            {activeForm.name ||
                              card.languages[selectedLanguage].name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {activeForm.title || "Title"}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {activeForm.company || "Company"}
                          </div>
                        </div>
                      </div>
                      {activeForm.bio && (
                        <p className="px-3 pb-2 text-[11px] text-muted-foreground">
                          {activeForm.bio}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-t px-3 py-2 text-[10px] text-muted-foreground">
                        <div className="flex flex-wrap gap-1 text-primary">
                          {activeForm.website && <span>Website</span>}
                          {activeForm.linkedin && <span>LinkedIn</span>}
                          {activeForm.twitter && <span>X / Twitter</span>}
                          {activeForm.youtubeUrl && <span>YouTube</span>}
                        </div>
                        <div>
                          {linksCount} link{linksCount === 1 ? "" : "s"}
                          {linksLabelParts.length > 0
                            ? ` · ${linksLabelParts.join(" · ")}`
                            : ""}
                        </div>
                      </div>
                    </div>

                    {owner && (
                      <div className="mt-4 space-y-1 text-[11px] text-muted-foreground">
                        <div className="font-medium text-foreground">Owner</div>
                        <div>{owner.name}</div>
                        <div>{owner.email}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 md:text-xs">
                            {getPlanLabel(owner.plan)}
                          </span>
                          <span className="text-[10px]">
                            Active language: {selectedLanguage.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border bg-card p-4 shadow-sm lg:col-span-3">
                    <div className="flex items-start justify-between gap-2 border-b pb-3">
                      <div>
                        <h2 className="text-sm font-semibold md:text-base">
                          Edit card details (mock)
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Edit contact, social, and media fields for each language. These
                          changes only affect the preview in your browser; nothing is saved
                          to a backend.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-muted px-1 py-0.5 text-[10px] font-medium md:text-xs">
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

                    <form className="mt-4 space-y-4 text-xs">
                      <div>
                        <div className="text-[11px] font-semibold text-muted-foreground">
                          Contact information
                        </div>
                        <div className="mt-2 grid gap-3 md:grid-cols-2">
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              Name
                            </label>
                            <input
                              type="text"
                              value={activeForm.name}
                              onChange={(event) =>
                                handleFieldChange("name", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder={card.languages[selectedLanguage].name}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              Title
                            </label>
                            <input
                              type="text"
                              value={activeForm.title}
                              onChange={(event) =>
                                handleFieldChange("title", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder={card.languages[selectedLanguage].title}
                            />
                          </div>
                        </div>

                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              Company
                            </label>
                            <input
                              type="text"
                              value={activeForm.company}
                              onChange={(event) =>
                                handleFieldChange("company", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder={card.languages[selectedLanguage].company}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              Email
                            </label>
                            <input
                              type="email"
                              value={activeForm.email}
                              onChange={(event) =>
                                handleFieldChange("email", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder="name@company.com"
                            />
                          </div>
                        </div>

                        <div className="mt-3 space-y-1">
                          <label className="block text-[11px] font-medium text-muted-foreground">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={activeForm.phone}
                            onChange={(event) =>
                              handleFieldChange("phone", event.target.value)
                            }
                            className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                            placeholder="+84 ..."
                          />
                        </div>

                        <div className="mt-3 space-y-1">
                          <label className="block text-[11px] font-medium text-muted-foreground">
                            Short bio
                          </label>
                          <textarea
                            value={activeForm.bio}
                            onChange={(event) =>
                              handleFieldChange("bio", event.target.value)
                            }
                            rows={3}
                            className="w-full rounded-md border bg-background px-2 py-1.5 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                            placeholder="One or two lines about this person in the selected language."
                          />
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-semibold text-muted-foreground">
                          Social links
                        </div>
                        <div className="mt-2 grid gap-3 md:grid-cols-3">
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              Website
                            </label>
                            <input
                              type="url"
                              value={activeForm.website}
                              onChange={(event) =>
                                handleFieldChange("website", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder="https://"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              LinkedIn
                            </label>
                            <input
                              type="url"
                              value={activeForm.linkedin}
                              onChange={(event) =>
                                handleFieldChange("linkedin", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder="Profile URL"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              X / Twitter
                            </label>
                            <input
                              type="url"
                              value={activeForm.twitter}
                              onChange={(event) =>
                                handleFieldChange("twitter", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder="@handle or URL"
                            />
                          </div>
                        </div>

                        <div className="mt-3 space-y-1">
                          <label className="block text-[11px] font-medium text-muted-foreground">
                            YouTube video URL
                          </label>
                          <input
                            type="url"
                            value={activeForm.youtubeUrl}
                            onChange={(event) =>
                              handleFieldChange("youtubeUrl", event.target.value)
                            }
                            className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-semibold text-muted-foreground">
                          Media
                        </div>
                        <div className="mt-2 grid gap-3 md:grid-cols-2">
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              Profile image URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.profileImageUrl}
                              onChange={(event) =>
                                handleFieldChange("profileImageUrl", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[11px] font-medium text-muted-foreground">
                              Cover image URL
                            </label>
                            <input
                              type="url"
                              value={activeForm.coverImageUrl}
                              onChange={(event) =>
                                handleFieldChange("coverImageUrl", event.target.value)
                              }
                              className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                        <span>
                          This is a mock form. Refreshing the page will reset any changes
                          for all languages.
                        </span>
                        <span>No data is written to a backend.</span>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default BusinessCardDetailsPage;

export const getServerSideProps: GetServerSideProps<CardDetailsPageProps> = async (
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