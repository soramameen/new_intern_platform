"use client";

import { useEffect, useState } from "react";
import ProfileForm from "@/app/components/ProfileForm";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getProfile, updateCompanyProfile } from "@/app/api/client";
import { CompanyProfile } from "@/app/types";

export default function EditCompanyProfilePage() {
  return (
    <ProtectedRoute allowedUserTypes={["company"]}>
      <EditCompanyProfileContent />
    </ProtectedRoute>
  );
}

function EditCompanyProfileContent() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("プロフィール情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (data: CompanyProfile) => {
    try {
      await updateCompanyProfile(data);
      // Next.jsのルーターではなく直接ブラウザのAPIを使用
      window.location.href = "/profile/company";
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!profile)
    return <div className="p-8 text-center">プロフィールが見つかりません</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            企業プロフィール編集
          </h1>
          <ProfileForm
            userType="company"
            initialData={profile}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
