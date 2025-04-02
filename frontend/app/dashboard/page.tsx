// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/auth/AuthProvider";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getInterns } from "@/app/api/client";
import Link from "next/link";
import OfferForm from "../components/OfferForm";
// インターン生の型定義
type Intern = {
  id: number;
  name: string;
  email: string;
  skills: string;
  bio: string;
};

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, logout, isCompany } = useAuth();
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // モーダル追加用
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [offerSuccess, setOfferSuccess] = useState(false);
  // 企業ユーザーの場合、インターン生の一覧を取得
  useEffect(() => {
    const fetchInterns = async () => {
      if (isCompany) {
        setLoading(true);
        try {
          const data = await getInterns();
          // インターン生のみをフィルタリング
          const internUsers = data.filter(
            (user: any) => user.user_type === "intern"
          );
          setInterns(internUsers);
        } catch (err) {
          console.error("Failed to fetch interns:", err);
          setError("インターン生の情報の取得に失敗しました。");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInterns();
  }, [isCompany]);
  //モーダルの表示関数
  const openOfferModal = (intern: Intern) => {
    setSelectedIntern(intern);
    setShowOfferModal(true);
    setOfferSuccess(false);
  };
  const handleOfferSuccess = () => {
    setOfferSuccess(true);
    // 3秒後にモーダルを閉じる
    setTimeout(() => {
      setShowOfferModal(false);
      setOfferSuccess(false);
    }, 3000);
  };
  // ログアウト処理
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">
                  インターンマッチング
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
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
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              ダッシュボード
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6 p-6">
              {/* 企業向けダッシュボード */}
              {isCompany && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    インターン生一覧
                  </h2>

                  {loading && <p className="text-gray-500">読み込み中...</p>}

                  {error && <p className="text-red-500">{error}</p>}

                  {!loading && !error && interns.length === 0 && (
                    <p className="text-gray-500">
                      登録されているインターン生はまだいません。
                    </p>
                  )}

                  {!loading && !error && interns.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {interns.map((intern) => (
                        <div
                          key={intern.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <h3 className="text-lg font-medium">{intern.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">
                            {intern.email}
                          </p>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-700">
                              スキル:
                            </h4>
                            <p className="text-sm text-gray-600">
                              {intern.skills}
                            </p>
                          </div>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-700">
                              自己紹介:
                            </h4>
                            <p className="text-sm text-gray-600">
                              {intern.bio}
                            </p>
                          </div>
                          <button className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            詳細を見る
                          </button>
                          <button
                            onClick={() => openOfferModal(intern)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            オファーを送る
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="border rounded-lg p-6 mt-6">
                    <h3 className="text-xl font-medium mb-4">
                      企業プロフィール
                    </h3>
                    <p className="text-gray-600 mb-4">
                      企業情報を充実させてインターン生にアピールしましょう。
                    </p>
                    <Link
                      href="/profile/company/edit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      プロフィールを編集
                    </Link>
                  </div>
                </div>
              )}

              {/* インターン生向けダッシュボード */}
              {!isCompany && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    インターン生プロフィール
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="border rounded-lg p-6">
                      <h3 className="text-xl font-medium mb-4">
                        あなたのプロフィール
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            名前:
                          </h4>
                          <p className="text-gray-900">{user?.name}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            メールアドレス:
                          </h4>
                          <p className="text-gray-900">{user?.email}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            スキル:
                          </h4>
                          <p className="text-gray-900">{user?.skills}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            自己紹介:
                          </h4>
                          <p className="text-gray-900">{user?.bio}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <h3 className="text-xl font-medium mb-4">
                        おすすめの企業
                      </h3>
                      <p className="text-gray-500">
                        現在、おすすめの企業はありません。
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/profile/intern/edit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      プロフィールを編集
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* オファーモーダル */}
      {showOfferModal && selectedIntern && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            {offerSuccess ? (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    オファーを送信しました
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    インターン生からの返答をお待ちください
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowOfferModal(false);
                        setOfferSuccess(false);
                      }}
                      className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <OfferForm
                internId={selectedIntern.id}
                internName={selectedIntern.name}
                onSuccess={handleOfferSuccess}
                onCancel={() => setShowOfferModal(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
