// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/api/client";
import { useAuth } from "@/app/auth/AuthProvider";
import Link from "next/link";
import { FormData } from "@/app/types";
export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [userType, setUserType] = useState<"intern" | "company">("intern");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
    company_name: "",
    company_description: "",
    skills: "",
    bio: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // フォーム入力の処理
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ユーザータイプの切り替え
  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value as "intern" | "company");
  };

  // 登録処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      // 登録情報の作成
      const userData = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        name: formData.name,
        user_type: userType,
        ...(userType === "company" && {
          company_name: formData.company_name,
          company_description: formData.company_description,
        }),
        ...(userType === "intern" && {
          skills: formData.skills,
          bio: formData.bio,
        }),
      };

      // 登録APIの呼び出し
      const response = await registerUser(userData);

      // 登録成功時の処理
      login(response.token, response);
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Registration error:", error);
      setErrors(["登録中にエラーが発生しました。もう一度お試しください。"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウント登録
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            または{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              既にアカウントをお持ちの方はこちら
            </Link>
          </p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-md">
            <div className="text-sm text-red-700">
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="user-type" className="sr-only">
                ユーザータイプ
              </label>
              <select
                id="user-type"
                name="user_type"
                value={userType}
                onChange={handleUserTypeChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="intern">インターン生</option>
                <option value="company">企業</option>
              </select>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                メールアドレス
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード"
              />
            </div>
            <div>
              <label htmlFor="password-confirmation" className="sr-only">
                パスワード（確認）
              </label>
              <input
                id="password-confirmation"
                name="password_confirmation"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password_confirmation}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード（確認）"
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                名前
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="名前"
              />
            </div>

            {userType === "company" && (
              <>
                <div>
                  <label htmlFor="company-name" className="sr-only">
                    会社名
                  </label>
                  <input
                    id="company-name"
                    name="company_name"
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="会社名"
                  />
                </div>
                <div>
                  <label htmlFor="company-description" className="sr-only">
                    会社概要
                  </label>
                  <textarea
                    id="company-description"
                    name="company_description"
                    required
                    value={formData.company_description}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="会社概要"
                    rows={4}
                  />
                </div>
              </>
            )}

            {userType === "intern" && (
              <>
                <div>
                  <label htmlFor="skills" className="sr-only">
                    スキル
                  </label>
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    required
                    value={formData.skills}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="スキル（例: JavaScript, React, Ruby）"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="sr-only">
                    自己紹介
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    required
                    value={formData.bio}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="自己紹介"
                    rows={4}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "登録中..." : "アカウント登録"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
