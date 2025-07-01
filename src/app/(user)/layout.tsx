"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubscriptionGuard } from "@/hooks/payment/useSubscriptionGuard";
import { user_role } from "@/constants/role";
import Sidebar from "@/components/dashboard/user/Sidebar";
import MenuProfile from "@/components/dashboard/user/MenuProfile";

interface Props {
  children: React.ReactNode;
}

const UserDashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { loading, hasActiveSubscription } = useSubscriptionGuard(true);

  const handleMenuToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <div className="main_gradient_bg min-h-screen text-white flex">
      {/* Sidebar (toggle works on mobile) */}
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-[250px] h-screen flex flex-col">
        <div className="fixed top-0 left-0 lg:left-[250px] right-0 z-30">
          <MenuProfile
            text="ユーザーダッシュボード"
            onMenuToggle={handleMenuToggle}
          />
        </div>

        {/* Scrollable children */}
        <main className="mt-[80px] overflow-y-auto h-full px-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
