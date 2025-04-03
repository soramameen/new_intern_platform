// app/offers/layout.tsx
"use client";

import { useAuth } from "@/app/auth/AuthProvider";
import MainLayout from "@/app/components/MainLayout";

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  // ロード中の表示
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
