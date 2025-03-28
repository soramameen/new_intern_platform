// app/components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/AuthProvider";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedUserTypes?: ("intern" | "company")[];
};

// 認証が必要なルートを保護するコンポーネント
export default function ProtectedRoute({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ロード中は何もしない
    if (loading) return;

    // 認証されていない場合はログインページにリダイレクト
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // 特定のユーザータイプだけアクセスを許可する場合
    if (
      allowedUserTypes &&
      user &&
      !allowedUserTypes.includes(user.user_type)
    ) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, loading, router, allowedUserTypes]);

  // ロード中は何も表示しない
  if (loading) {
    return <div>Loading...</div>;
  }

  // 認証されていない場合は何も表示しない
  if (!isAuthenticated) {
    return null;
  }

  // ユーザータイプの制限がある場合、チェック
  if (allowedUserTypes && user && !allowedUserTypes.includes(user.user_type)) {
    return null;
  }

  // 認証OKの場合は子コンポーネントを表示
  return <>{children}</>;
}
