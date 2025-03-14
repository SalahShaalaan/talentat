"use client";
import { useState } from "react";
import Filter from "./Filter";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside className="hidden 2xl:block h-full py-4 sticky top-0">
        <Filter />
      </aside>

      <div
        className={`2xl:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed right-0 top-0 w-full h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto">
            <Filter onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}
