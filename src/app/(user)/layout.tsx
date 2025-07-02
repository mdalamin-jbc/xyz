"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSubscriptionGuard } from "@/hooks/payment/useSubscriptionGuard";
import Sidebar from "@/components/dashboard/user/Sidebar";
import MenuProfile from "@/components/dashboard/user/MenuProfile";

interface Props {
  children: React.ReactNode;
}

const UserDashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading, hasActiveSubscription } = useSubscriptionGuard(true);

  const pathname = usePathname();

  // Define routes where sidebar and menu should be hidden
  const hideUIRoutes = ["/login", "/register", "/user/verify-otp"];
  const shouldHideUI = hideUIRoutes.includes(pathname);

  const handleMenuToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <div className="main_gradient_bg min-h-screen text-white flex">
      {!shouldHideUI && (
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      )}

      <div
        className={`flex-1 ${
          !shouldHideUI ? "lg:ml-[250px]" : ""
        } h-screen flex flex-col`}
      >
        {!shouldHideUI && (
          <div className="fixed top-0 left-0 lg:left-[250px] right-0 z-30">
            <MenuProfile
              text="ユーザーダッシュボード"
              onMenuToggle={handleMenuToggle}
            />
          </div>
        )}

        <main
          className={`mt-[${
            !shouldHideUI ? "80px" : "0"
          }] overflow-y-auto h-full px-4`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
