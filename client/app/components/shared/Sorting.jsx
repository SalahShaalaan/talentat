// SortingDropdown.jsx
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

export default function Sorting() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Top match");

  const options = ["Top match", "Newest", "Latest"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <span className="text-base text-black">Sorting by:</span>
        <button
          className="flex items-center gap-1 bg-transparent text-white font-medium focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-base text-[var(--mainGreen)]">
            {selectedOption}
          </span>
          <IconChevronDown
            size={16}
            className={`transition-transform ${
              isOpen ? "rotate-180" : ""
            } text-[var(--mainGreen)]`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  selectedOption === option
                    ? "text-[var(--mainGreen)] font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
