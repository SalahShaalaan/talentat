import { IconMapPin, IconCalendar, IconHeart } from "@tabler/icons-react";
import Image from "next/image";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <Image
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-full h-full object-contain"
              width={60}
              height={60}
            />
          </div>

          <div className="flex-grow">
            <h3 className="text-base sm:text-lg font-medium">{job.title}</h3>
            <p className="text-xs sm:text-sm text-[var(--mainGreen)] font-bold">
              {job.company}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-6 mt-2 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <IconMapPin size={14} className="sm:w-4 sm:h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <IconCalendar size={14} className="sm:w-4 sm:h-4" />
                <span>{job.postedTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1 mt-2">
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {job.experienceLevel}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {job.jobType}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {job.workMode}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
              {job.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center text-xs sm:text-sm text-gray-600"
                >
                  <span>{tag}</span>
                  {index < job.tags.length - 1 && (
                    <span className="mx-1 sm:mx-2 inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="text-gray-300 p-2 rounded-full border bg-white transition-colors self-start mt-2 sm:mt-1 mr-1">
          <IconHeart size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
