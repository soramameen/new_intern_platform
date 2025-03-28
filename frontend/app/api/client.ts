// app/api/client.ts
import { getToken } from "@/app/auth/utils";

// API基本URL
const API_BASE_URL = "http://localhost:3001/api/v1";

// 共通のフェッチ関数
const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // デフォルトのヘッダー
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // 認証トークンが存在する場合、ヘッダーに追加
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // エラーレスポンスの処理
      throw {
        status: response.status,
        data,
      };
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// ユーザー登録
export const registerUser = (userData: any) => {
  return fetchApi("/users", {
    method: "POST",
    body: JSON.stringify({ user: userData }),
  });
};

// ログイン
export const login = (email: string, password: string) => {
  return fetchApi("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// ログアウト（クライアント側でトークンを削除するのみ）
export const logout = () => {
  return fetchApi("/logout", {
    method: "DELETE",
  });
};

// ログイン状態確認
export const checkLoginStatus = () => {
  return fetchApi("/logged_in");
};

// インターン生一覧取得（企業ユーザー用）
export const getInterns = () => {
  return fetchApi("/users");
};
