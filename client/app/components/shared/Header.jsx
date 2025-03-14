"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IconSearch, IconMenu2 } from "@tabler/icons-react";
import homeIcon from "@/public/icons/home.png";
import jobsIcon from "@/public/icons/jobs.png";
import employersIcon from "@/public/icons/employ.png";
import notificationsIcon from "@/public/icons/notification.png";
import messageIcon from "@/public/icons/message.png";
import userImg from "@/public/icons/user.png";

import Logo from "./Logo";
import Image from "next/image";
import ProfileDropdown from "./ProfileDrobDown";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const pagesLinks = [
    { title: "Home", icon: homeIcon, href: "/home" },
    { title: "Jobs", icon: jobsIcon, href: "/jobs" },
    { title: "Employers", icon: employersIcon, href: "/employers" },
  ];

  const userLinks = [
    { title: "Notifications", icon: notificationsIcon, href: "/notifications" },
    { title: "Messaging", icon: messageIcon, href: "/messaging" },
  ];

  const profileLinks = [
    { title: "Setting and privacy", href: "/settings" },
    { title: "Language", href: "/language" },
    { title: "Help", href: "/help" },
  ];

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }

    // Add event listener when the sidebar is open
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <header className="bg-[var(--mainDark)] p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Mobile User Icon with Menu Indicator - visible only on mobile */}
          <div
            className="lg:hidden relative cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <Image src={userImg} alt="User" width={40} height={40} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--mainGray)] rounded-full flex items-center justify-center">
              <IconMenu2 className="text-black" size={12} />
            </div>
          </div>

          {/* Logo - right aligned on mobile */}
          <div className="lg:hidden">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Layout: Logo and Search together with gap */}
          <div className="hidden lg:flex items-center gap-10 flex-1">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>

            <div className="relative max-w-md w-full">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="bg-[var(--mainGreen)] p-2 rounded-full">
                  <IconSearch className="text-white" size={20} />
                </div>
              </div>
              <input
                type="text"
                placeholder="Search by name, job title..."
                className="w-full pl-16 pr-4 py-3 bg-white rounded-full text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Navigation Links Section - visible only on desktop */}
          <div className="hidden lg:flex items-center gap-8 text-[#E6E6E6] ml-16">
            {/* Pages Links */}
            <div className="flex items-center space-x-10">
              {pagesLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="flex flex-col items-center"
                >
                  <Image
                    src={link.icon}
                    className="text-white"
                    width={25}
                    height={25}
                    alt={`${link.title} icon`}
                  />
                  <span className="text-white text-xs mt-1">{link.title}</span>
                </Link>
              ))}
            </div>

            {/* Separator */}
            <div className="h-8 w-[1px] bg-[#D6D6D699]" />

            {/* User Links */}
            <div className="flex items-center space-x-10">
              {userLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <Image
                      src={link.icon}
                      className="text-white"
                      width={25}
                      height={25}
                      alt={`${link.title} icon`}
                    />
                  </div>
                  <span className="text-white text-xs mt-1">{link.title}</span>
                </Link>
              ))}

              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/40 bg-opacity-50 z-40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={sidebarRef}
          className={`fixed right-0 top-0 w-72 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* User Profile Section */}
          <div className="p-6 border-b border-[var(--mainGray)]">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                <Image src={userImg} alt="User" width={64} height={64} />
              </div>
              <div className="ml-4">
                <h2 className="text-black text-lg font-semibold">
                  Ahmed Amaar
                </h2>
                <p className="text-gray-400 text-sm">UX UI designer</p>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="p-6">
            {/* Navigation Links */}
            <div className="space-y-6">
              <div className="space-y-4">
                {pagesLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex items-center space-x-3 text-[var(--lightBlack)] hover:text-[var(--mainGreen)] transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Image
                      src={link.icon}
                      width={20}
                      height={20}
                      alt={`${link.title} icon`}
                      className="opacity-60"
                    />
                    <span>{link.title}</span>
                  </Link>
                ))}
                {userLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex items-center space-x-3 text-[var(--lightBlack)] hover:text-[var(--mainGreen)] transition-colors mb-4"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Image
                      src={link.icon}
                      width={20}
                      height={20}
                      alt={`${link.title} icon`}
                      className="opacity-60"
                    />
                    <span>{link.title}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-[var(--mainGray)] pt-4">
                {profileLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex items-center space-x-3 text-[var(--lightBlack)] hover:text-[var(--mainGreen)] transition-colors mb-4"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span>{link.title}</span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-[var(--mainGray)] pt-4">
                <Link
                  href="/logout"
                  className="text-red-600 font-bold"
                  onClick={() => setSidebarOpen(false)}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
