import type { NextPage } from "next";
import { SEO } from "@/components/SEO";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const DashboardPage: NextPage = () => {
  return (
    <>
      <SEO
        title="Admin Dashboard – Digital Business Cards"
        description="Admin dashboard to manage user accounts and their digital business cards."
      />
      <AdminDashboard />
    </>
  );
};

export default DashboardPage;