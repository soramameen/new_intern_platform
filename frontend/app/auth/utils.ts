// app/auth/utils.ts

import { BaseUser } from "../types";

// トークンをローカルストレージに保存
export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
};

// トークンをローカルストレージから取得
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// トークンをローカルストレージから削除（ログアウト時）
export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
};

// ユーザー情報をローカルストレージに保存
export const setUser = (user: BaseUser): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

// ユーザー情報をローカルストレージから取得
export const getUser = (): BaseUser | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// ユーザー情報をローカルストレージから削除（ログアウト時）
export const removeUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

// ユーザーがログインしているかどうかチェック
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};

// ユーザーの種類を確認（インターン生か企業か）
export const getUserType = (): string | null => {
  const user = getUser();
  return user ? user.user_type : null;
};

// ユーザーが企業かどうかチェック
export const isCompany = (): boolean => {
  return getUserType() === "company";
};

// ユーザーがインターン生かどうかチェック
export const isIntern = (): boolean => {
  return getUserType() === "intern";
};
