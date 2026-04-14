import type { NextPage } from "next";
import { SEO } from "@/components/SEO";

type UserStatus = "active" | "invited" | "suspended";
type UserRole = "admin" | "user";
type UserPlan = "free" | "pro" | "enterprise";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  plan: UserPlan;
  cards: number;
  lastActive: string;
}

const mockUsers: AdminUser[] = [
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

function getStatusClasses(status: UserStatus): string {
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

function getPlanLabel(plan: UserPlan): string {
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

const DashboardPage: NextPage = () => {
  const totalUsers: number = mockUsers.length;
  const totalCards: number = mockUsers.reduce((sum, user) => sum + user.cards, 0);
  const activeUsers: number = mockUsers.filter((user) => user.status === "active").length;

  return (
    <>
      <SEO
        title="Admin Dashboard – Digital Business Cards"
        description="Admin dashboard to manage user accounts and their digital business cards."
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
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
                Overview
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg bg-primary/10 px-3 py-2 text-left text-sm font-medium text-primary"
              >
                <span>Dashboard</span>
                <span className="rounded-full bg-primary text-[10px] font-semibold text-primary-foreground px-2 py-0.5">
                  Now
                </span>
              </button>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
                Management
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <span>Users</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <span>Business cards</span>
              </button>
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

          <main className="flex-1 flex flex-col">
            <header className="flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur md:px-6 lg:px-8">
              <div>
                <h1 className="text-lg font-semibold leading-tight md:text-xl">
                  Admin dashboard
                </h1>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  Manage user accounts and their digital business cards.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground md:flex">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Frontend-only preview</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  Create business card
                </button>
              </div>
            </header>

            <section className="flex-1 px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <div className="text-xs font-medium text-muted-foreground">Total users</div>
                  <div className="mt-2 text-2xl font-semibold">{totalUsers}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    All user accounts in your workspace.
                  </div>
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <div className="text-xs font-medium text-muted-foreground">
                    Total business cards
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{totalCards}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Digital business cards created by users.
                  </div>
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <div className="text-xs font-medium text-muted-foreground">
                    Active users
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{activeUsers}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Users with an active status right now.
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-sm font-semibold md:text-base">Users</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Overview of user accounts and their digital business cards.
                    </p>
                  </div>
                  <div className="flex w-full gap-2 sm:w-auto">
                    <input
                      type="search"
                      placeholder="Search users (UI only, no logic yet)"
                      className="h-8 w-full rounded-full border bg-background px-3 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-52"
                    />
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-[720px] w-full border-separate border-spacing-0 text-left text-xs md:text-sm">
                    <thead className="bg-muted/60">
                      <tr>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          User
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Role
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Plan
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Cards
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Status
                        </th>
                        <th className="border-b px-3 py-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
                          Last active
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/50">
                          <td className="border-b px-3 py-2 align-middle">
                            <div className="flex flex-col">
                              <span className="text-xs font-medium md:text-sm">
                                {user.name}
                              </span>
                              <span className="text-[11px] text-muted-foreground md:text-xs">
                                {user.email}
                              </span>
                            </div>
                          </td>
                          <td className="border-b px-3 py-2 align-middle">
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700 md:text-xs">
                              {user.role === "admin" ? "Admin" : "User"}
                            </span>
                          </td>
                          <td className="border-b px-3 py-2 align-middle">
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 md:text-xs">
                              {getPlanLabel(user.plan)}
                            </span>
                          </td>
                          <td className="border-b px-3 py-2 align-middle">
                            <span className="text-xs font-medium md:text-sm">
                              {user.cards}
                            </span>
                          </td>
                          <td className="border-b px-3 py-2 align-middle">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium md:text-xs ${getStatusClasses(
                                user.status
                              )}`}
                            >
                              {user.status === "active"
                                ? "Active"
                                : user.status === "invited"
                                ? "Invited"
                                : "Suspended"}
                            </span>
                          </td>
                          <td className="border-b px-3 py-2 align-middle">
                            <span className="text-[11px] text-muted-foreground md:text-xs">
                              {user.lastActive}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground md:text-xs">
                  <div>
                    Showing <span className="font-medium">{mockUsers.length}</span> users
                  </div>
                  <div>Selection and editing will be added in the next steps.</div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;