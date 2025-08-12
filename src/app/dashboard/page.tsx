import { ResumeCard } from "@/components/ResumeCard";

export default function DashboardPage() {
  const resumes = [
    { id: "1", title: "Frontend Developer Resume" },
    { id: "2", title: "Backend Developer Resume" },
  ];

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Resumes</h1>
        <a
          href="/dashboard/resumes/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
}
