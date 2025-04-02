// frontend/app/chat/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getMessages, postMessage } from "@/app/api/client";
import MainLayout from "@/app/components/MainLayout";
import { useAuth } from "@/app/auth/AuthProvider";

type Message = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
};

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // メッセージ一覧取得
  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError("メッセージの取得に失敗しました");
    }
  };

  // 初回ロード時にメッセージを取得
  useEffect(() => {
    fetchMessages();

    // ユーザーがログインしている場合、ニックネームを設定
    if (user) {
      setNickname(user.name);
    }

    // 定期的に更新 (30秒ごと)
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // メッセージ送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim() || !content.trim()) {
      setError("ニックネームとメッセージを入力してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await postMessage({ nickname, content });
      setContent(""); // メッセージ入力をクリア
      fetchMessages(); // メッセージを再取得
    } catch (err) {
      console.error("Failed to post message:", err);
      setError("メッセージの送信に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">
          インターン生グループチャット
        </h1>

        {/* メッセージ入力フォーム */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                ニックネーム
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                メッセージ
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "送信中..." : "送信"}
              </button>
            </div>
          </form>
        </div>

        {/* メッセージ一覧 */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              メッセージがありません
            </p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{message.nickname}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(message.created_at).toLocaleString("ja-JP")}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-wrap">{message.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
