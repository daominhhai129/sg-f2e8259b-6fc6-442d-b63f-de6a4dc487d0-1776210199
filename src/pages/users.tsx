import type { NextPage } from "next";
import { SEO } from "@/components/SEO";
import {
  usersMock,
  getPlanLabel,
  getStatusClasses,
  type AdminUser,
} from "@/components/admin/adminData";

const UsersPage: NextPage = () => {
  const totalUsers: number = usersMock.length;

  return (
    <>
      <SEO
        title="Users – Admin Dashboard"
        description="Browse and review user accounts for your digital business cards."
      />
      <div className="min-h-screen bg-background text-foreground">
        <main className="container py-8 space-y-6">
          <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-semibold leading-tight md:text-2xl">
                Users
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Overview of all user accounts and how many business cards they
                have.
              </p>
            </div>
            <div className="rounded-full border bg-card px-4 py-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{totalUsers}</span>{" "}
              users in this workspace (mock data)
            </div>
          </header>

          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="mb-3 flex flex-col gap-2 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold md:text-base">
                  Users table
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Static mock data to illustrate how you will review and manage
                  user accounts.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
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
                  {usersMock.map((user: AdminUser) => (
                    <tr key={user.id} className="align-middle hover:bg-muted/40">
                      <td className="border-b px-3 py-2">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium md:text-sm">
                            {user.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground md:text-xs">
                            {user.email}
                          </span>
                        </div>
                      </td>
                      <td className="border-b px-3 py-2">
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700 md:text-xs">
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="border-b px-3 py-2">
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 md:text-xs">
                          {getPlanLabel(user.plan)}
                        </span>
                      </td>
                      <td className="border-b px-3 py-2">
                        <span className="text-xs font-medium md:text-sm">
                          {user.cards}
                        </span>
                      </td>
                      <td className="border-b px-3 py-2">
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
                      <td className="border-b px-3 py-2">
                        <span className="text-[11px] text-muted-foreground md:text-xs">
                          {user.lastActive}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-[11px] text-muted-foreground md:text-xs">
              This page is powered by static mock data only. In a real setup,
              these rows would come from your database.
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default UsersPage;