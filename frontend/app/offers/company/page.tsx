// app/offers/company/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getOffers } from "@/app/api/client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { Offer } from "@/app/types";

export default function CompanyOffers() {
  return (
    <ProtectedRoute allowedUserTypes={["company"]}>
      <CompanyOffersContent />
    </ProtectedRoute>
  );
}

function CompanyOffersContent() {
  const [offers, setOffers] = useState<Offer[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffers();
        setOffers(data);
      } catch (err) {
        console.error("Failed to fetch offers:", err);
        setError("オファー情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // オファー状態に応じたバッジの色を決定
  const getStatusBadgeClass = (status: "pending" | "accepted" | "declined") => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // オファー状態の日本語表示
  const getStatusLabel = (status: "pending" | "accepted" | "declined") => {
    switch (status) {
      case "pending":
        return "保留中";
      case "accepted":
        return "承諾済み";
      case "declined":
        return "拒否";
      default:
        return "不明";
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">送信したオファー</h1>
        <p className="mt-1 text-sm text-gray-500">
          インターン生へのオファー一覧です
        </p>
      </div>

      {loading && <p className="text-center py-4">読み込み中...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {!loading && !error && offers.length === 0 && (
        <div className="p-6">
          <p className="text-center text-gray-500">
            送信したオファーはまだありません
          </p>
        </div>
      )}

      {!loading && !error && offers.length > 0 && (
        <div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  インターン生
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ポジション
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  メッセージ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  状態
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  送信日
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {offer.intern?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {offer.intern?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {offer.position}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 truncate max-w-xs">
                      {offer.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        offer.status
                      )}`}
                    >
                      {getStatusLabel(offer.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(offer.created_at).toLocaleDateString("ja-JP")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
