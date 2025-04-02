// app/offers/intern/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getOffers, updateOfferStatus } from "@/app/api/client";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function InternOffers() {
  return (
    <ProtectedRoute allowedUserTypes={["intern"]}>
      <InternOffersContent />
    </ProtectedRoute>
  );
}

interface Offer {
  id: string;
  company: {
    company_name: string;
    email: string;
  };
  details: string | null;
  position: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  created_at: string;
}

function InternOffersContent() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    error: "",
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const data = await getOffers();
      setOffers(data);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
      setError("オファー情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    offerId: string,
    status: "pending" | "accepted" | "declined"
  ) => {
    try {
      setUpdateStatus({ loading: true, error: "" });
      await updateOfferStatus(offerId, status);
      // 更新後、オファーリストを再取得
      await fetchOffers();
    } catch (err) {
      console.error("Failed to update offer status:", err);
      setUpdateStatus({
        loading: false,
        error: "ステータスの更新に失敗しました",
      });
    } finally {
      setUpdateStatus({ loading: false, error: "" });
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">受信したオファー</h1>
        <p className="mt-1 text-sm text-gray-500">企業からのオファー一覧です</p>
      </div>

      {loading && <p className="text-center py-4">読み込み中...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}
      {updateStatus.error && (
        <p className="text-center text-red-500 py-4">{updateStatus.error}</p>
      )}

      {!loading && !error && offers.length === 0 && (
        <div className="p-6">
          <p className="text-center text-gray-500">
            受信したオファーはまだありません
          </p>
        </div>
      )}

      {!loading && !error && offers.length > 0 && (
        <div className="space-y-6 p-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg border"
            >
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {offer.company && offer.company.company_name}
                    からのオファー
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    ポジション: {offer.position}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                    offer.status
                  )}`}
                >
                  {getStatusLabel(offer.status)}
                </span>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">企業</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {offer.company && offer.company.company_name}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      メッセージ
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {offer.message}
                    </dd>
                  </div>
                  {offer.details && (
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        詳細情報
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {offer.details}
                      </dd>
                    </div>
                  )}
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      受信日
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(offer.created_at).toLocaleDateString("ja-JP")}
                    </dd>
                  </div>
                </dl>
              </div>

              {offer.status === "pending" && (
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end space-x-3 border-t border-gray-200">
                  <button
                    onClick={() => handleStatusUpdate(offer.id, "declined")}
                    disabled={updateStatus.loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    辞退する
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(offer.id, "accepted")}
                    disabled={updateStatus.loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    承諾する
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
