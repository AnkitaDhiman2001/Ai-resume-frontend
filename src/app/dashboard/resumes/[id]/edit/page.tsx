'use client';
import ResumeForm from "@/components/ResumeForm";

export default function EditResumePage({ params }: { params: { id: string } }) {
  const existingData = {
    title: "Frontend Developer Resume",
    summary: "Experienced developer in React & Next.js",
    skills: ["React", "Next.js", "JavaScript"],
  };

  const handleSave = (data: { title: string; summary: string; skills: string[] }) => {
    console.log("Updating resume:", params.id, data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Resume</h1>
      <ResumeForm onSubmit={handleSave} initialData={existingData} />
    </div>
  );
}
