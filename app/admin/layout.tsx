import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminShell } from "@/components/admin/AdminShell";
import { SESSION_COOKIE } from "@/lib/auth-config";
import { verifyAdminToken } from "@/lib/admin-token";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = token ? await verifyAdminToken(token) : null;

  if (!session) {
    return children;
  }

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
