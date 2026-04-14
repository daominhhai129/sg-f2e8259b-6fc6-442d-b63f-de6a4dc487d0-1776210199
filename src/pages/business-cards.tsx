import type { NextPage } from "next";
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
        <main className="container py-8 space-y-6">
          <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-semibold leading-tight md:text-2xl">
                Business cards
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Overview of digital business cards and who owns them.
              </p>
            </div>
            <div className="rounded-full border bg-card px-4 py-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{totalCards}</span>{" "}
              cards in this workspace (mock data)
            </div>
          </header>

          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="mb-3 flex flex-col gap-2 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold md:text-base">
                  Business cards table
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Static mock data showing how card records connect to user
                  accounts.
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
              This is static mock data only. In a real product, you would fetch
              cards and their owners from your backend.
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default BusinessCardsPage;