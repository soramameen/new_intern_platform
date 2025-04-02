"use client";

import { useState } from "react";
import { generateBio } from "@/app/api/client";

interface AIGenerateButtonProps {
  skills: string; // スキルデータを受け取る
  onBioGenerated: (bio: string) => void; // 生成した自己紹介を親に渡すコールバック
}

export default function AIGenerateButton({
  skills,
  onBioGenerated,
}: AIGenerateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerateBio = async () => {
    setLoading(true);
    try {
      const result = await generateBio(skills);
      onBioGenerated(result.bio); // 親に結果を渡す
    } catch (err) {
      console.error(err);
      alert("AI提案に失敗しました。もう一度試してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGenerateBio}
      disabled={loading}
      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {loading ? "生成中..." : "AIに考えてもらう"}
    </button>
  );
}
