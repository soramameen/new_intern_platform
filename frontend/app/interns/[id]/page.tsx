"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/AuthProvider";
import MainLayout from "@/app/components/MainLayout";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import OfferForm from "@/app/components/OfferForm";
import Link from "next/link";

import { getInternById } from "@/app/api/client";

interface Intern {
  id: number;
  name: string;
  email: string;
  profile: {
    bio: string;
    school: string;
    major: string;
    expected_graduation: string;
    location: string;
    github_url: string;
    portfolio_url: string;
  };
  skills: string[];
}

export default function InternDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <ProtectedRoute allowedUserTypes={["company"]}>
      <MainLayout>
        <InternDetailContent internId={params.id} />
      </MainLayout>
    </ProtectedRoute>
  );
}

function InternDetailContent({ internId }: { internId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [intern, setIntern] = useState<Intern | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerSuccess, setOfferSuccess] = useState(false);

  useEffect(() => {
    const fetchInternData = async () => {
      try {
        // APIからインターン生データを取得
        const data = await getInternById(internId);
        setIntern(data);
      } catch (err) {
        console.error("Failed to fetch intern details:", err);
        setError("インターン生の情報を取得できませんでした");
      } finally {
        setLoading(false);
      }
    };

    fetchInternData();
  }, [internId]);

  const handleSendOffer = () => {
    setShowOfferModal(true);
  };

  const handleOfferSuccess = () => {
    setOfferSuccess(true);
    // 3秒後にモーダルを閉じる
    setTimeout(() => {
      setShowOfferModal(false);
      setOfferSuccess(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
        <div className="mt-4">
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-800"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  if (!intern) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-700">インターン生の情報が見つかりません</p>
        <div className="mt-4">
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-800"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{intern.name}</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              インターン生詳細プロフィール
            </p>
          </div>
          <button
            onClick={handleSendOffer}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            オファーを送る
          </button>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">名前</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {intern.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                メールアドレス
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {intern.email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">学校名</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {intern.profile.school || "未設定"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">専攻</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {intern.profile.major || "未設定"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                卒業予定年月
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {intern.profile.expected_graduation || "未設定"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">希望勤務地</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {intern.profile.location || "未設定"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">スキル</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {intern.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
            {intern.profile.github_url && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">GitHub</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a
                    href={intern.profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {intern.profile.github_url}
                  </a>
                </dd>
              </div>
            )}
            {intern.profile.portfolio_url && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  ポートフォリオ
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a
                    href={intern.profile.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {intern.profile.portfolio_url}
                  </a>
                </dd>
              </div>
            )}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">自己紹介</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">
                {intern.profile.bio || "未設定"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          一覧に戻る
        </button>
      </div>

      {/* オファーモーダル */}
      {showOfferModal && intern && (
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
                internId={intern.id}
                internName={intern.name}
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
