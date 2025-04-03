// app/components/MainLayout.tsx
"use client";

import { useAuth } from "@/app/auth/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, logout, isCompany, isIntern, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  // ログアウト処理
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ナビゲーションバー */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-indigo-600">
                  インターンマッチング
                </Link>
              </div>

              {/* 認証済みユーザー向けナビゲーションリンク */}
              {isAuthenticated && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive("/dashboard")
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    ダッシュボード
                  </Link>

                  {/* 企業向けリンク */}
                  {isCompany && (
                    <>
                      <Link
                        href="/profile/company"
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          pathname.startsWith("/profile/company")
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        企業プロフィール
                      </Link>
                      <Link
                        href="/offers/company"
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          pathname.startsWith("/offers/company")
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        送信したオファー
                      </Link>
                    </>
                  )}

                  {/* インターン生向けリンク */}
                  {isIntern && (
                    <>
                      <Link
                        href="/chat"
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          isActive("/chat")
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        グループチャット
                      </Link>
                      <Link
                        href="/profile/intern"
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          pathname.startsWith("/profile/intern")
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        プロフィール
                      </Link>
                      <Link
                        href="/offers/intern"
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          pathname.startsWith("/offers/intern")
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        受信したオファー
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* ユーザー情報とログアウト */}
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="hidden md:flex items-center">
                  <span className="text-gray-700 mr-4">
                    {user?.name} (
                    {user?.user_type === "intern" ? "インターン生" : "企業"})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    ログアウト
                  </button>
                </div>

                {/* モバイル用ドロップダウンメニュー（実装する場合） */}
                <div className="sm:hidden">{/* モバイルメニューボタン */}</div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ログイン
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  新規登録
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* モバイル用ナビゲーションメニュー */}
        {isAuthenticated && (
          <div className="sm:hidden border-t border-gray-200">
            <div className="px-2 py-3 space-y-1">
              <Link
                href="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/dashboard")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                ダッシュボード
              </Link>
              <Link
                href="/chat"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/chat")
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                グループチャット
              </Link>

              {isCompany && (
                <>
                  <Link
                    href="/profile/company"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname.startsWith("/profile/company")
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    企業プロフィール
                  </Link>
                  <Link
                    href="/offers/company"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname.startsWith("/offers/company")
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    送信したオファー
                  </Link>
                </>
              )}

              {isIntern && (
                <>
                  <Link
                    href="/profile/intern"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname.startsWith("/profile/intern")
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    プロフィール
                  </Link>
                  <Link
                    href="/offers/intern"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname.startsWith("/offers/intern")
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    受信したオファー
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                ログアウト
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* メインコンテンツ */}
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
