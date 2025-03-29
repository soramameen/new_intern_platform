// app/components/ProfileForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/AuthProvider";

// プロフィール編集フォームのプロパティ
type ProfileFormProps = {
  userType: "intern" | "company";
  initialData: any;
  onSubmit: (data: any) => Promise<void>;
};

export default function ProfileForm({
  userType,
  initialData,
  onSubmit,
}: ProfileFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // フォーム入力の処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // 送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      await onSubmit(formData);
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      if (error.data && error.data.errors) {
        setErrors(error.data.errors);
      } else {
        setErrors(["プロフィールの更新中にエラーが発生しました。"]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // インターン生用フォームフィールド
  const renderInternFields = () => (
    <>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          名前
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="school"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          学校名
        </label>
        <input
          id="school"
          name="school"
          type="text"
          value={formData.school || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="major"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          専攻
        </label>
        <input
          id="major"
          name="major"
          type="text"
          value={formData.major || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="expected_graduation"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          卒業予定年月
        </label>
        <input
          id="expected_graduation"
          name="expected_graduation"
          type="text"
          value={formData.expected_graduation || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="例: 2026年3月"
        />
      </div>

      <div>
        <label
          htmlFor="skills"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          スキル
        </label>
        <input
          id="skills"
          name="skills"
          type="text"
          value={formData.skills || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="例: JavaScript, React, Ruby"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          希望勤務地
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="github_url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          GitHub URL
        </label>
        <input
          id="github_url"
          name="github_url"
          type="url"
          value={formData.github_url || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="portfolio_url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          ポートフォリオURL
        </label>
        <input
          id="portfolio_url"
          name="portfolio_url"
          type="url"
          value={formData.portfolio_url || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          自己紹介
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={formData.bio || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </>
  );

  // 企業用フォームフィールド
  const renderCompanyFields = () => (
    <>
      <div>
        <label
          htmlFor="company_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          会社名
        </label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          value={formData.company_name || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="industry"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          業種
        </label>
        <input
          id="industry"
          name="industry"
          type="text"
          value={formData.industry || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="company_size"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          企業規模
        </label>
        <input
          id="company_size"
          name="company_size"
          type="text"
          value={formData.company_size || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="例: 10-50人、50-100人"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          所在地
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Webサイト
        </label>
        <input
          id="website"
          name="website"
          type="url"
          value={formData.website || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          会社概要
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="space-y-4">
        {userType === "intern" ? renderInternFields() : renderCompanyFields()}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? "更新中..." : "保存する"}
        </button>
      </div>
    </form>
  );
}
