import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in — Dalsland" };

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-xl font-semibold text-zinc-900">Sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
