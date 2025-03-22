"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, Image, HelpCircle } from "lucide-react";
import { Command } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";

const sidebarItems = {
    user_data: {
        name: "cainho",
        email: "cainho@gmail.com",
        avatar: "/avatars/shadcn.png",
    },
    items: [
        {
            label: "Página Inicial",
            icon: LayoutDashboard,
            href: "/dashboard",
            isActive: true,
        },
        {
            label: "Postagens",
            icon: Image,
            href: "/postagens",
            isActive: false,
        },
        {
            label: "Calendário",
            icon: BookOpen,
            href: "/calendario",
            isActive: false,
        },
        {
            label: "Dúvidas frequentes",
            icon: HelpCircle,
            href: "/faq",
            isActive: false,
        }
    ]
}

export function AppSidebar({ ...props }) {
  const pathname = usePathname();
  const router = useRouter();
  const [displayNone, setDisplayNone] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("user_email");
    setDisplayNone(!userEmail || pathname === "/login");
  }, [pathname]);

  if (displayNone) {
    return null;
  }

  return (
    <Sidebar className="fixed left-0 pt-[32px] border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Bora impactar</span>
                  <span className="truncate text-xs">Associação</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarItems.items.map((item) => (
                <SidebarMenuItem key={item.href} className="mt-2">
                  <Link href={item.href}>
                    <SidebarMenuButton 
                      isActive={pathname === item.href} 
                      tooltip={item.label} 
                      className="cursor-pointer px-4 py-6"
                    >
                        <item.icon className="size-4 mr-2" />
                        {item.label}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser user={sidebarItems.user_data} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
