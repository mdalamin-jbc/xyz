"use client";

import { useUsers } from "@/hooks/admin/useUsers";
import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  ShieldCheck,
  Mail,
  Star,
  Search,
} from "lucide-react";

const StatusBadge = ({ status, type }) => {
  const getConfig = () => {
    switch (type) {
      case "active":
        return status
          ? {
              color: "bg-green-100 text-green-700 border-green-200",
              icon: CheckCircle,
              text: "有効",
            }
          : {
              color: "bg-red-100 text-red-700 border-red-200",
              icon: XCircle,
              text: "無効",
            };
      case "verified":
        return status
          ? {
              color: "bg-blue-100 text-blue-700 border-blue-200",
              icon: CheckCircle,
              text: "認証済",
            }
          : {
              color: "bg-gray-100 text-gray-600 border-gray-200",
              icon: XCircle,
              text: "未認証",
            };
      case "subscribed":
        return status === true || status === "true"
          ? {
              color: "bg-yellow-100 text-yellow-700 border-yellow-200",
              icon: Star,
              text: "サブスク中",
            }
          : {
              color: "bg-gray-100 text-gray-600 border-gray-200",
              icon: XCircle,
              text: "未サブスク",
            };
      default:
        return {
          color: "bg-gray-100 text-gray-600 border-gray-200",
          icon: XCircle,
          text: "N/A",
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      <IconComponent className="w-3 h-3" />
      {config.text}
    </span>
  );
};

const RoleBadge = ({ role }) => {
  const getConfig = () => {
    switch (role) {
      case "ADMIN":
        return {
          color: "bg-purple-100 text-purple-700 border-purple-200",
          text: "ADMIN",
        };
      case "MODERATOR":
        return {
          color: "bg-orange-100 text-orange-700 border-orange-200",
          text: "MODERATOR",
        };
      case "END_USER":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          text: "END USER",
        };
      case "USER":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          text: "USER",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-600 border-gray-200",
          text: role || "UNKNOWN",
        };
    }
  };

  const config = getConfig();

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      <ShieldCheck className="w-3 h-3" />
      {config.text}
    </span>
  );
};

const Users = () => {
  const [search, setSearch] = useState("");
  const { data: users, isLoading, isError, error } = useUsers();

  const filtered = users?.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.kind && u.kind.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="p-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center py-4 border-b last:border-b-0"
              >
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse mr-6"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mr-6"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mr-6"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mr-6"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">
            エラー: {(error as Error)?.message || "データを読み込めません"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ユーザー管理</h1>
        <p className="text-gray-600">
          システム内のすべてのユーザーを管理・監視できます
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5" />
              <span className="font-medium">
                総ユーザー数: {filtered?.length || 0}
              </span>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="メールアドレス・権限で検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    メールアドレス
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    権限
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  アクティブ
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  認証状態
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    サブスク
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered && filtered.length > 0 ? (
                filtered.map((user, idx) => (
                  <tr
                    key={user.email}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RoleBadge role={user.kind} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <StatusBadge status={user.is_active} type="active" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <StatusBadge status={user.is_verified} type="verified" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <StatusBadge
                        status={user.is_subscribed}
                        type="subscribed"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <User className="w-12 h-12 text-gray-300" />
                      <div className="text-gray-500">
                        <p className="text-lg font-medium">
                          ユーザーが見つかりません
                        </p>
                        <p className="text-sm">
                          検索条件を変更してお試しください
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        {filtered && filtered.length > 0 && (
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
              <span className="font-medium text-center sm:text-left">
                {filtered.length} 件のユーザーが表示されています
              </span>
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
                <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs sm:text-sm">
                    アクティブ: {filtered.filter((u) => u.is_active).length}
                  </span>
                </span>
                <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs sm:text-sm">
                    認証済: {filtered.filter((u) => u.is_verified).length}
                  </span>
                </span>
                <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs sm:text-sm">
                    サブスク:{" "}
                    {
                      filtered.filter(
                        (u) =>
                          u.is_subscribed === true || u.is_subscribed === "true"
                      ).length
                    }
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
