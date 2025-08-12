"use client";
import { useState } from "react";

interface ResumeFormProps {
  onSubmit: (data: { title: string; summary: string; skills: string[] }) => void;
  initialData: { title: string; summary: string; skills: string[] };
}

export default function ResumeForm({ onSubmit, initialData }: ResumeFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [skills, setSkills] = useState(initialData?.skills || []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, summary, skills });
  };

  return (
    <form className="space-y-4 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      <input
        className="border p-2 w-full"
        placeholder="Resume Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Professional Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Skills (comma separated)"
        value={skills.join(", ")}
        onChange={(e) => setSkills(e.target.value.split(","))}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}
