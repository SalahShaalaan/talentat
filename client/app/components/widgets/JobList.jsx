import { useState } from "react";
import JobCard from "../shared/JobCard";
import gaming from "@/public/icons/gaming.png";
import react from "@/public/icons/react.png";
import senior from "@/public/icons/senior.png";
export default function JobList() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Gaming UI designer",
      company: "Rockstar Games",
      companyLogo: gaming,
      location: "ElMansoura, Egypt",
      postedTime: "10 days ago",
      experienceLevel: "0 - 3y of exp",
      jobType: "Full time",
      workMode: "Remote",
      tags: ["Creative / Design", "IT / Software development", "Gaming"],
      isFavorite: false,
    },
    {
      id: 2,
      title: "Senior UX UI Designer",
      company: "Egabi",
      companyLogo: senior,
      location: "Cairo, Egypt",
      postedTime: "1 month ago",
      experienceLevel: "0 - 3y of exp",
      jobType: "Full time",
      workMode: "Hybrid",
      tags: ["Creative / Design", "IT / Software development"],
      isFavorite: false,
    },
    {
      id: 3,
      title: "React Frontend developer",
      company: "Masara",
      companyLogo: react,
      location: "Cairo, Egypt",
      postedTime: "1 month ago",
      experienceLevel: "5 - 7y of exp",
      jobType: "Freelance",
      workMode: "Remote",
      tags: ["Creative / Design", "IT / Software development"],
      isFavorite: false,
    },
  ]);

  return (
    <div className="mt-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
