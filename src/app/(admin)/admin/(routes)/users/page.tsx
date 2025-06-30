"use client";

import { useUsers } from "@/hooks/admin/useUsers";
import React, { useState } from "react";
import { CheckCircle, XCircle, User as UserIcon, ShieldCheck, Mail, Star } from "lucide-react";

const badge = (value: boolean | string, trueLabel: string, falseLabel: string, color: string) => (
  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${value ? color : "bg-gray-200 text-gray-500"}`}>
    {value ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
    {value ? trueLabel : falseLabel}
  </span>
);

const kindBadge = (kind: string) => {
  const color = kind === "ADMIN" ? "bg-blue-100 text-blue-700" : kind === "USER" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
  return <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${color}`}><ShieldCheck className="w-3 h-3" />{kind}</span>;
};

const Users: React.FC = () => {
  const [search, setSearch] = useState("");
  const { data: users, isLoading, isError, error } = useUsers();

  const filtered = users?.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.kind && u.kind.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">ユーザー管理</h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="メールアドレス・権限で検索..."
          className="w-full sm:w-80 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse p-6 bg-white rounded-xl border shadow flex flex-col gap-3">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/3 mb-1"></div>
              <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              <div className="flex gap-2 mt-2">
                <div className="h-5 w-16 bg-gray-100 rounded"></div>
                <div className="h-5 w-16 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">エラー: {(error as Error).message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered && filtered.length > 0 ? filtered.map((user, idx) => (
            <div
              key={user.id || user.email}
              className="p-6 bg-white rounded-xl border shadow hover:shadow-lg transition flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <UserIcon className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-semibold text-gray-800 truncate">{user.email}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {kindBadge(user.kind)}
                {badge(user.is_active, "有効", "無効", "bg-green-100 text-green-700")}
                {badge(user.is_verified, "認証済", "未認証", "bg-blue-100 text-blue-700")}
                {badge(user.is_subscribed === true || user.is_subscribed === "true", "サブスク中", "未サブスク", "bg-yellow-100 text-yellow-700")}
              </div>
              <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" />{user.email}</div>
                <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" />{String(user.is_subscribed)}</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-400" />{user.kind}</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />{String(user.is_active)}</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />{String(user.is_verified)}</div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center text-gray-500 py-12">ユーザーが見つかりません</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
