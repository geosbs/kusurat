import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div lang="en" className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <div className="w-full max-w-md rounded-2xl bg-cream-soft p-8 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">GEOSBAU</p>
        <h1 className="mt-2 font-serif text-3xl text-navy">Admin sign in</h1>
        <p className="mt-2 text-sm text-ink-muted">Restricted editorial access. All activity is logged by session.</p>
        <div className="mt-6">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
