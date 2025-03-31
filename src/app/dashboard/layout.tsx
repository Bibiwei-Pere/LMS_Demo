"use client";
import React, { useEffect } from "react";
import { AppSidebar } from "@/components/ui/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar/sidebar";
import { useGetUser } from "@/hooks/users";
import { useRouter } from "next/navigation";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user, status } = useGetUser();
  const router = useRouter();

  useEffect(() => {
    if (status === "success") if (!user?.isPasswordReset) router.push("/update-profile");
  }, [user]);

  if (status !== "success") return null;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          <SidebarTrigger className='fixed z-50 md:hidden pl-4' />
          <div className='flex flex-col w-full pb-10'>{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
