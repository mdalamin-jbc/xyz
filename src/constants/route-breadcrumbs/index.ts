import { BreadcrumbItem } from "@/components/ui/Breadcrumbs";

const adminBreadcrumbs: BreadcrumbItem[] = [
  { label: "管理者", href: "/admin" },
  { label: "ユーザー管理", href: "/admin/users" },
  { label: "ユーザー詳細" }, // Current page (no href)
];

const dashboardBreadcrumbs: BreadcrumbItem[] = [
  { label: "ダッシュボード", href: "/dashboard" },
  { label: "レポート", href: "/dashboard/reports" },
  { label: "売上分析" },
];

const settingsBreadcrumbs: BreadcrumbItem[] = [
  { label: "設定", href: "/settings" },
  { label: "プロフィール" },
];
