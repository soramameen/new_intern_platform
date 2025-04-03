// app/types.ts

/**
 * ユーザー基本情報
 */
export interface BaseUser {
  id: number;
  email: string;
  name: string;
  user_type: UserType;
}

/**
 * ユーザータイプ
 */
export type UserType = "intern" | "company";

/**
 * インターン生ユーザー
 */
export interface InternUser extends BaseUser {
  user_type: "intern";
  skills: string;
  bio: string;
  profile?: InternProfile;
}

/**
 * 企業ユーザー
 */
export interface CompanyUser extends BaseUser {
  user_type: "company";
  company_name: string;
  industry?: string;
  location?: string;
  company_size?: string;
  description?: string;
  website?: string;
}

/**
 * インターン生プロフィール
 */
export interface InternProfile {
  id?: number;
  name?: string;
  bio: string;
  school: string;
  major: string;
  expected_graduation: string;
  location: string;
  github_url?: string;
  portfolio_url?: string;
  skills: string;
}

/**
 * 企業プロフィール
 */
export interface CompanyProfile {
  id?: number;
  name?: string;
  company_name: string;
  industry: string;
  company_size: string;
  location: string;
  website?: string;
  description: string;
}

/**
 * オファーのステータス
 */
export enum OfferStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

/**
 * オファー情報
 */
export interface Offer {
  id: string;
  intern_id?: number;
  company_id?: number;
  intern?: {
    name: string;
    email: string;
  };
  company?: {
    company_name: string;
    email: string;
  };
  position: string;
  message: string;
  details?: string;
  status: OfferStatus;
  created_at: string;
}

/**
 * オファー作成用データ
 */
export interface OfferFormData {
  intern_id: number;
  message: string;
  position: string;
  details?: string;
}

/**
 * メッセージ情報
 */
export interface Message {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
}

/**
 * APIレスポンスのエラー型
 */
export type ApiError = {
  data?: {
    errors?: string[];
    message?: string;
  };
  status?: number;
};

/**
 * 認証コンテキストの型
 */
export interface AuthContextType {
  user: BaseUser | null;
  loading: boolean;
  login: (token: string, userData: BaseUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isCompany: boolean;
  isIntern: boolean;
}
export interface FormData {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  company_name: string;
  company_description: string;
  skills: string;
  bio: string;
}
export interface UserRegistration {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  user_type: UserType;
  skills?: string;
  bio?: string;
  company_name?: string;
  company_description?: string;
}
