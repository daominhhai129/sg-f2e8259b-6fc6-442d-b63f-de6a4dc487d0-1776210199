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
  website: string;
  linkedin: string;
  twitter: string;
}

const BusinessCardDetailsPage: NextPage<CardDetailsPageProps> = ({ card, owner }) => {
  const [form, setForm] = useState<BusinessCardForm>(() => {
    if (!card) {
      return {
        name: "",
        title: "",
        company: "",
        bio: "",
        website: "",
        linkedin: "",
        twitter: "",
      };
    }

    return {
      name: card.name,
      title: card.title,
      company: card.company,
      bio: card.bio,
      website: card.website ?? "",
      linkedin: card.linkedin ?? "",
      twitter: card.twitter ?? "",
    };
  });

  const linksCount: number = [
    form.website,
    form.linkedin,
    form.twitter,
  ].filter((value) => !!value && value.trim() !== "").length;

  const linksLabelParts: string[] = [];
  if (form.website) {
    linksLabelParts.push("Website");
  }
  if (form.linkedin) {
    linksLabelParts.push("LinkedIn");
  }
  if (form.twitter) {
    linksLabelParts.push("X / Twitter");
  }

  return (
    <>
      <SEO
        title={
          card
            ? `Edit card – ${card.name}`
            : "Business card not found – Admin Dashboard"
        }
        description="Edit a digital business card for one of your users (mock data only, no persistence)."
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
                    ? "Adjust the details for this digital business card. Changes are local to this preview."
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
                          Live preview of how this digital business card looks with the
                          current values.
                        </p>
                      </div>
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
                    </div>

                    <div className="mt-3 rounded-lg border bg-background px-3 py-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">
                            {form.name || card.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {form.title || "Title"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] font-medium text-muted-foreground">
                            {form.company || "Company"}
                          </div>
                          <div className="mt-1 flex flex-wrap justify-end gap-1 text-[10px] text-primary">
                            {form.website && <span>Website</span>}
                            {form.linkedin && <span>LinkedIn</span>}
                            {form.twitter && <span>Twitter</span>}
                          </div>
                        </div>
                      </div>
                      {form.bio && (
                        <p className="mt-2 text-[11px] text-muted-foreground">
                          {form.bio}
                        </p>
                      )}
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
                            {linksCount} link{linksCount === 1 ? "" : "s"} ·{" "}
                            {linksLabelParts.join(" · ") || "No links"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border bg-card p-4 shadow-sm lg:col-span-3">
                    <div className="border-b pb-3">
                      <h2 className="text-sm font-semibold md:text-base">
                        Edit card details (mock)
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        This form updates the preview only. No data is saved to any
                        backend or database.
                      </p>
                    </div>

                    <form className="mt-4 space-y-3 text-xs">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-muted-foreground">
                            Name
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                name: event.target.value,
                              }))
                            }
                            className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                            placeholder={card.name}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-muted-foreground">
                            Title
                          </label>
                          <input
                            type="text"
                            value={form.title}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                title: event.target.value,
                              }))
                            }
                            className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                            placeholder={card.title || "Role or position"}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-muted-foreground">
                          Company
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              company: event.target.value,
                            }))
                          }
                          className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                          placeholder={card.company || "Company name"}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-muted-foreground">
                          Short bio
                        </label>
                        <textarea
                          value={form.bio}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              bio: event.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full rounded-md border bg-background px-2 py-1.5 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                          placeholder={card.bio || "One or two lines about this person."}
                        />
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-muted-foreground">
                            Website
                          </label>
                          <input
                            type="url"
                            value={form.website}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                website: event.target.value,
                              }))
                            }
                            className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                            placeholder={card.website || "https://"}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-muted-foreground">
                            LinkedIn
                          </label>
                          <input
                            type="url"
                            value={form.linkedin}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                linkedin: event.target.value,
                              }))
                            }
                            className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                            placeholder={card.linkedin || "Profile URL"}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-muted-foreground">
                            X / Twitter
                          </label>
                          <input
                            type="url"
                            value={form.twitter}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                twitter: event.target.value,
                              }))
                            }
                            className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                            placeholder={card.twitter || "@handle or URL"}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                        <span>
                          This is a mock form. Refreshing the page will reset any changes.
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
  const id: number = Number(
    Array.isArray(idParam) ? idParam[0] : idParam
  );

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