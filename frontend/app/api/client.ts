/*
 * APIクライアント
 * このファイルはAPIとの通信を行うための関数を定義しています。
 * 各関数はfetchを使用してAPIエンドポイントにリクエストを送信します。
 * 認証トークンが必要な場合は、ヘッダーに追加されます。
 */

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
//-------------------- ユーザー登録・ログイン・ログアウト ------------------------
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
//-------------------- インターン生取得 ------------------------
// インターン生一覧取得（企業ユーザー用）
export const getInterns = () => {
  return fetchApi("/users");
};
// -------------------- 企業一覧取得 ----------------------------
// 企業一覧取得（インターン生用）
export const getCompanies = () => {
  return fetchApi("/users?type=companies");
};

// ---------------- profile 更新・取得--------------------
// インターン生プロフィール更新
export const updateInternProfile = (profileData: any) => {
  return fetchApi("/intern_profile", {
    method: "PATCH",
    body: JSON.stringify({ intern_profile: profileData }),
  });
};

// 企業プロフィール更新
export const updateCompanyProfile = (profileData: any) => {
  return fetchApi("/company_profile", {
    method: "PATCH",
    body: JSON.stringify({ company_profile: profileData }),
  });
};

// プロフィール取得
export const getProfile = () => {
  return fetchApi("/profile");
};
//-------------------- オファー関数 ------------------------

// オファー送信（企業側）
export const sendOffer = (offerData: any) => {
  return fetchApi("/offers", {
    method: "POST",
    body: JSON.stringify({ offer: offerData }),
  });
};

// オファー一覧取得
export const getOffers = () => {
  return fetchApi("/offers");
};

// オファー詳細取得
export const getOfferById = (id: string) => {
  return fetchApi(`/offers/${id}`);
};

// オファーステータス更新（インターン側）
export const updateOfferStatus = (offerId: string, status: string) => {
  return fetchApi(`/offers/${offerId}`, {
    method: "PATCH",
    body: JSON.stringify({ offer: { status } }),
  });
};
// -------------------- メッセージ関数 ------------------------
// メッセージ一覧取得
export const getMessages = () => {
  return fetchApi("/messages");
};

// メッセージ投稿
export const postMessage = (message: { nickname: string; content: string }) => {
  return fetchApi("/messages", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};
