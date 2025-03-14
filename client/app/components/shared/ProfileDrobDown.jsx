import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import userImg from "@/public/icons/user.png";
import { IconChevronDown } from "@tabler/icons-react";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex flex-col items-center focus:outline-none group"
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
          <Image src={userImg} width={30} height={30} alt="Profile icon" />
        </div>
        <div className="flex items-center mt-1">
          <span className="text-white text-xs">Profile</span>
          <IconChevronDown
            size={14}
            className={`ml-1 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg z-50">
          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-200">
            <Link href="/profile" className="flex items-center group">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image src={userImg} width={48} height={48} alt="User" />
              </div>
              <div className="ml-3 flex-grow">
                <h3 className="text-gray-800 font-medium text-base">
                  Ahmed Amaar
                </h3>
                <p className="text-gray-500 text-sm">UX UI designer</p>
              </div>
              <div className="text-gray-400 group-hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/settings"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              Setting and privacy
            </Link>
            <Link
              href="/language"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              Language
            </Link>
            <Link
              href="/help"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              Help
            </Link>
          </div>

          {/* Logout Option */}
          <div className="border-t border-gray-200 py-2">
            <Link
              href="/logout"
              className="block px-4 py-3 text-red-600 font-medium hover:bg-gray-50"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
