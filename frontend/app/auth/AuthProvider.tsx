// app/auth/AuthProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { checkLoginStatus } from "@/app/api/client";
import {
  getToken,
  setToken,
  removeToken,
  setUser,
  removeUser,
  getUser,
} from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import { BaseUser } from "../types";

// 認証コンテキストの型定義
type AuthContextType = {
  user: BaseUser | null;
  loading: boolean;
  login: (token: string, userData: BaseUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isCompany: boolean;
  isIntern: boolean;
};

// 認証コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 認証プロバイダーコンポーネント
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<BaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 認証状態の初期化
  useEffect(() => {
    const initAuth = async () => {
      // トークンがある場合、認証状態を確認
      if (getToken()) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = await checkLoginStatus();
          if (data.logged_in) {
            setUserState(data.user);
          } else {
            // トークンが無効な場合、ログアウト
            handleLogout();
          }
        } catch (error) {
          console.error("Failed to check login status:", error);
          handleLogout();
        }
      } else {
        // ローカルストレージにユーザー情報があれば復元
        const storedUser = getUser();
        if (storedUser) {
          setUserState(storedUser);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // ログイン処理
  const handleLogin = (token: string, userData: BaseUser) => {
    setToken(token);
    setUser(userData);
    setUserState(userData);
  };

  // ログアウト処理
  const handleLogout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    router.push("/login");
  };

  // 認証状態の判定
  const isAuthenticated = !!user;
  const isCompany = user?.user_type === "company";
  const isIntern = user?.user_type === "intern";

  // コンテキスト値
  const contextValue: AuthContextType = {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated,
    isCompany,
    isIntern,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// 認証コンテキストを使用するためのフック
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
