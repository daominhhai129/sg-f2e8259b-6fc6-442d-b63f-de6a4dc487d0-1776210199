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
                    <h2 className="text-sm font-semibold md:text-base">
                      Business cards table
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Static mock data showing how card records connect to user accounts.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[720px] w-full border-separate border-spacing-0 text-left text-xs md:text-sm">
                    <thead className="bg-muted/60">
                      <tr>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Card
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Title / company
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Owner
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Plan
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Status
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Links
                        </th>
                      </tr>
                    </thead>
                    <tbody>
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
                          <tr
                            key={card.id}
                            className="align-middle hover:bg-muted/40"
                          >
                            <td className="border-b px-3 py-2">
                              <div className="flex flex-col">
                                <span className="text-xs font-medium md:text-sm">
                                  {card.name}
                                </span>
                                <span className="text-[11px] text-muted-foreground md:text-xs">
                                  Primary digital business card
                                </span>
                              </div>
                            </td>
                            <td className="border-b px-3 py-2">
                              <div className="flex flex-col">
                                <span className="text-xs md:text-sm">
                                  {card.title || "—"}
                                </span>
                                <span className="text-[11px] text-muted-foreground md:text-xs">
                                  {card.company || "—"}
                                </span>
                              </div>
                            </td>
                            <td className="border-b px-3 py-2">
                              {owner ? (
                                <div className="flex flex-col">
                                  <span className="text-xs font-medium md:text-sm">
                                    {owner.name}
                                  </span>
                                  <span className="text-[11px] text-muted-foreground md:text-xs">
                                    {owner.email}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[11px] text-muted-foreground md:text-xs">
                                  Unknown user
                                </span>
                              )}
                            </td>
                            <td className="border-b px-3 py-2">
                              {owner ? (
                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 md:text-xs">
                                  {getPlanLabel(owner.plan)}
                                </span>
                              ) : (
                                <span className="text-[11px] text-muted-foreground md:text-xs">
                                  —
                                </span>
                              )}
                            </td>
                            <td className="border-b px-3 py-2">
                              {owner ? (
                                <span
                                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium md:text-xs ${getStatusClasses(
                                    owner.status
                                  )}`}
                                >
                                  {owner.status === "active"
                                    ? "Active"
                                    : owner.status === "invited"
                                    ? "Invited"
                                    : "Suspended"}
                                </span>
                              ) : (
                                <span className="text-[11px] text-muted-foreground md:text-xs">
                                  —
                                </span>
                              )}
                            </td>
                            <td className="border-b px-3 py-2">
                              <span className="text-xs font-medium md:text-sm">
                                {linksCount}
                              </span>
                              <span className="ml-1 text-[11px] text-muted-foreground md:text-xs">
                                link{linksCount === 1 ? "" : "s"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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