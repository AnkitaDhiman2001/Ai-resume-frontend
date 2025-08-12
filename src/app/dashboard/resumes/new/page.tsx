'use client';
import ResumeForm from "@/components/ResumeForm";
import { useState } from "react";

export default function CreateResumePage() {
  const [formData, setFormData] = useState({ title: "", summary: "", skills: [] });

  const handleSave = (data: { title: string; summary: string; skills: string[] }) => {
    console.log("Creating resume:", data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Resume</h1>
      <ResumeForm onSubmit={handleSave} initialData={formData} />
    </div>
  );
}
