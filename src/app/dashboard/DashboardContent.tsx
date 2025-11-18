'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/app/components/LogoutButton";
import { useWhitelabel } from "@/app/context/WhitelabelContext";
import SidebarLink from "./SidebarLink";

interface Business {
  id: number;
  businessName: string;
}

export default function DashboardContent({ businesses, isAdmin, isInternal, children }: { businesses: Business[]; isAdmin: boolean; isInternal: boolean; children: React.ReactNode }) {
  const { settings } = useWhitelabel();

  const showInternalTools = isAdmin || isInternal;

  // Clone children to inject isAdmin and isInternal props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isAdmin, isInternal });
    }
    return child;
  });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="relative w-64 text-white px-4 pt-4 space-y-0" style={{ backgroundColor: settings.primaryColor }}>
        <nav className="space-y-0 font-semibold text-white">
          <div className="flex items-center space-x-2 mb-8">
            <SidebarLink href="/dashboard/profile" className="py-1.5 px-2 text-sm">
              Profile
            </SidebarLink>
            <LogoutButton className="py-1.5 px-2 text-sm" />
          </div>
          {settings.logoUrl && (
            <div className="mb-4">
              <Image src={settings.logoUrl} alt="Business Logo" width={96} height={96} className="h-24 w-auto object-contain mx-auto" />
            </div>
          )}
          <SidebarLink href="/dashboard">Home</SidebarLink>
          <SidebarLink href="/dashboard/library">Library</SidebarLink>
          <SidebarLink href="/dashboard/courses">Courses</SidebarLink>
          <SidebarLink href="/dashboard/messages">Messages</SidebarLink>
          <SidebarLink href="/dashboard/schedule-a-time">Schedule a time with me</SidebarLink>
          <SidebarLink href="/dashboard/invoices-payments">Invoices & Payments</SidebarLink>

          {showInternalTools && (
            <>
              <h2 className="text-lg font-semibold text-light-gray uppercase mt-6 mb-2">
                Internal Tools
              </h2>
              <SidebarLink href="/dashboard/resources">Resources</SidebarLink>
              <SidebarLink href="/dashboard/invoicing">Invoicing</SidebarLink>
              <SidebarLink href="/dashboard/client-documents">Client Documents</SidebarLink>
              <SidebarLink href="/dashboard/admin/events">Events</SidebarLink>
              <SidebarLink href="/dashboard/admin/CreateCourse">Courses</SidebarLink>
            </>
          )}

          {isAdmin && (
            <>
              <h2 className="text-lg font-semibold text-light-gray uppercase mt-6 mb-2">
                Admin Tools
              </h2>
              <SidebarLink href="/dashboard/businesses">Business Lines</SidebarLink>
              <SidebarLink href="/dashboard/admin/account-requests">Account Requests</SidebarLink>
              {businesses.map((business) => (
                <SidebarLink
                  key={business.id}
                  href={`/dashboard/businesses/${business.id}`}
                  className="block py-2 px-6 text-sm"
                >
                  - {business.businessName}
                </SidebarLink>
              ))}
              <SidebarLink href="/dashboard/admin/users">User Management</SidebarLink>
              <SidebarLink href="/dashboard/whitelabel" className="mt-8">Whitelabel</SidebarLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col text-foreground p-6">
        {childrenWithProps}
        <footer className="mt-auto py-4 text-center text-sm text-foreground">
          Tech By Badjr
        </footer>
      </main>
    </div>
  );
}
