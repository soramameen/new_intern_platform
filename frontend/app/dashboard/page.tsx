// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/auth/AuthProvider";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getInterns, getCompanies } from "@/app/api/client";
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

// 企業の型定義
type Company = {
  id: number;
  name: string;
  email: string;
  company_name: string;
  industry: string;
  location: string;
  company_size: string;
  description: string;
};

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, isCompany } = useAuth();
  const [interns, setInterns] = useState<Intern[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredInterns, setFilteredInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  // モーダル追加用
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [offerSuccess, setOfferSuccess] = useState(false);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (isCompany) {
          // 企業ユーザーの場合、インターン生一覧を取得
          const data = await getInterns();
          const internUsers = data.filter(
            (user: any) => user.user_type === "intern"
          );
          setInterns(internUsers);
          setFilteredInterns(internUsers);

          // 利用可能なスキルの抽出
          const skills = new Set<string>();
          internUsers.forEach((intern: Intern) => {
            if (intern.skills) {
              intern.skills.split(",").forEach((skill) => {
                skills.add(skill.trim());
              });
            }
          });
          setAvailableSkills(Array.from(skills).sort());
        } else {
          // インターン生ユーザーの場合、企業一覧を取得
          const data = await getCompanies();
          setCompanies(data);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(
          isCompany
            ? "インターン生の情報の取得に失敗しました。"
            : "企業情報の取得に失敗しました。"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isCompany]);

  // スキルフィルタリングの処理
  const handleSkillFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = e.target.value;
    setSkillFilter(skill);

    if (skill === "") {
      // フィルターがクリアされた場合、全てのインターン生を表示
      setFilteredInterns(interns);
    } else {
      // 選択されたスキルを持つインターン生のみをフィルタリング
      const filtered = interns.filter(
        (intern) =>
          intern.skills &&
          intern.skills
            .split(",")
            .map((s) => s.trim())
            .includes(skill)
      );
      setFilteredInterns(filtered);
    }
  };

  // スキルフィルターをリセット
  const resetFilter = () => {
    setSkillFilter("");
    setFilteredInterns(interns);
  };

  // モーダルの表示関数
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

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ダッシュボード</h1>

      {/* 企業向けダッシュボード */}
      {isCompany && (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              インターン生一覧
            </h2>

            {/* スキルフィルター */}
            <div className="mt-2 md:mt-0 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <label htmlFor="skill-filter" className="text-sm text-gray-700">
                スキルで絞り込み:
              </label>
              <select
                id="skill-filter"
                value={skillFilter}
                onChange={handleSkillFilterChange}
                className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">すべて表示</option>
                {availableSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              {skillFilter && (
                <button
                  onClick={resetFilter}
                  className="flex items-center px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
                >
                  リセット
                </button>
              )}
            </div>
          </div>

          {loading && <p className="text-gray-500">読み込み中...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && filteredInterns.length === 0 && (
            <p className="text-gray-500">
              {skillFilter
                ? `「${skillFilter}」のスキルを持つインターン生は見つかりませんでした。`
                : "登録されているインターン生はまだいません。"}
            </p>
          )}

          {!loading && !error && filteredInterns.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInterns.map((intern) => (
                <div
                  key={intern.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium">{intern.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{intern.email}</p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      スキル:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {intern.skills?.split(",").map((skill, idx) => (
                        <span
                          key={idx}
                          className={`inline-block mr-2 mb-1 px-2 py-1 rounded-full text-xs ${
                            skill.trim() === skillFilter
                              ? "bg-indigo-100 text-indigo-800 font-medium"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      自己紹介:
                    </h4>
                    <p className="text-sm text-gray-600">{intern.bio}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      詳細を見る
                    </button>
                    <button
                      onClick={() => openOfferModal(intern)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      オファーを送る
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border rounded-lg p-6 mt-6">
            <h3 className="text-xl font-medium mb-4">企業プロフィール</h3>
            <p className="text-gray-600 mb-4">
              企業情報を充実させてインターン生にアピールしましょう。
            </p>
            <div className="flex space-x-4">
              <Link
                href="/profile/company/edit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                プロフィールを編集
              </Link>
              <Link
                href="/offers/company"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                送信したオファーを確認
              </Link>
            </div>
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
              <h3 className="text-xl font-medium mb-4">あなたのプロフィール</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">名前:</h4>
                  <p className="text-gray-900">{user?.name}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    メールアドレス:
                  </h4>
                  <p className="text-gray-900">{user?.email}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">スキル:</h4>
                  <p className="text-gray-900">{user?.skills}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    自己紹介:
                  </h4>
                  <p className="text-gray-900">{user?.bio}</p>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <Link
                  href="/profile/intern/edit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  プロフィールを編集
                </Link>
                <Link
                  href="/offers/intern"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  受信したオファーを確認
                </Link>
              </div>
            </div>

            {/* 企業一覧セクション */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">企業一覧</h3>

              {loading && <p className="text-gray-500">読み込み中...</p>}

              {error && <p className="text-red-500">{error}</p>}

              {!loading && !error && companies.length === 0 && (
                <p className="text-gray-500">
                  登録されている企業はまだありません。
                </p>
              )}

              {!loading && !error && companies.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-medium">
                        {company.company_name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {company.industry}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">
                        {company.location} | {company.company_size}
                      </p>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          会社概要:
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {company.description}
                        </p>
                      </div>
                      <div className="mt-4">
                        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          詳細を見る
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
