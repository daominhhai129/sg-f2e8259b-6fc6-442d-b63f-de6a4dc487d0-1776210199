import type { NextPage } from "next";
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

const BusinessCardsPage: NextPage = () => {
  const totalCards: number = businessCardsMock.length;

  return (
    <>
      <SEO
        title="Business Cards – Admin Dashboard"
        description="Browse and review digital business cards created by your users."
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
                  Business cards
                </h1>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  Overview of digital business cards and who owns them.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full border bg-card px-4 py-1.5 text-[11px] text-muted-foreground md:text-xs">
                  <span className="font-medium text-foreground">{totalCards}</span>{" "}
                  cards in this workspace (mock data)
                </div>
              </div>
            </header>

            <section className="flex-1 space-y-6 px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="mb-3 flex flex-col gap-2 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-sm font-semibold md:text-base">Business cards</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Static mock data showing how card records connect to user accounts.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground md:text-xs">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-foreground">
                      Grid view
                    </span>
                    <span>{totalCards} cards</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {businessCardsMock.map((card: BusinessCard) => {
                    const owner: AdminUser | undefined = usersMock.find(
                      (user) => user.id === card.userId
                    );

                    const linksCount: number = [
                      card.website,
                      card.linkedin,
                      card.twitter,
                    ].filter((value) => !!value && value.trim() !== "").length;

                    return (
                      <article
                        key={card.id}
                        className="flex flex-col justify-between rounded-lg border bg-background p-3 text-xs shadow-sm"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-sm font-semibold">{card.name}</div>
                              <div className="text-[11px] text-muted-foreground">
                                Primary digital business card
                              </div>
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

                          <div>
                            <div className="text-xs md:text-sm">
                              {card.title || "—"}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {card.company || "—"}
                            </div>
                          </div>

                          {owner ? (
                            <div>
                              <div className="text-[11px] font-medium">{owner.name}</div>
                              <div className="text-[11px] text-muted-foreground">
                                {owner.email}
                              </div>
                              <div className="mt-1">
                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 md:text-xs">
                                  {getPlanLabel(owner.plan)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-[11px] text-muted-foreground">
                              Unknown owner
                            </div>
                          )}

                          <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>
                              {linksCount} link{linksCount === 1 ? "" : "s"}
                            </span>
                            <span>
                              {card.website ? "Website" : ""}
                              {card.linkedin
                                ? card.website
                                  ? " · LinkedIn"
                                  : "LinkedIn"
                                : ""}
                              {card.twitter
                                ? card.website || card.linkedin
                                  ? " · X / Twitter"
                                  : "X / Twitter"
                                : ""}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                          >
                            Edit card
                          </button>
                          <span className="text-[10px] text-muted-foreground">
                            Mock only, no real edits
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-3 text-[11px] text-muted-foreground md:text-xs">
                  This is static mock data only. In a real product, you would fetch cards
                  and their owners from your backend.
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default BusinessCardsPage;