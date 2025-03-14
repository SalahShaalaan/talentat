"use client";
import { useState } from "react";

import { IconMenu2 } from "@tabler/icons-react";
import JobsNav from "./components/shared/JobsNav";
import JobList from "./components/widgets/JobList";
import Filter from "./components/widgets/Filter";
import Sorting from "./components/shared/Sorting";

export default function Home() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex items-start gap-4">
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="hidden lg:block">
              <Sorting />
            </div>          </div>
          <JobsNav />
          <JobList />
        </div>

        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="2xl:hidden mt-6 p-3 rounded-md bg-gray-100 border border-gray-300 text-white shadow-md hover:bg-[var(--mainGreenDark)] transition-colors duration-200 flex-shrink-0 flex items-center justify-center"
        >
          <IconMenu2 className="text-black" />
        </button>
      </div>

      <div
        className={`2xl:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`fixed right-0 top-0 w-full h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="h-full overflow-y-auto">
            <Filter onClose={() => setIsMobileFilterOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}