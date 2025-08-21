"use client";
import { ResumeData } from "@/app/dashboard/resumes/new/page";
import { useState } from "react";

const templates = [
  { id: "modern", name: "Modern", preview: "/templates/ModernResume.jpg" },
  { id: "classic", name: "Classic", preview: "/templates/ClassicResume.jpg" },
  { id: "creative", name: "Creative", preview: "/templates/creativeResume.jpg" },
];

export default function TemplateStep({
  data,
  updateData,
  onSelect,
}: {
    data: ResumeData;
    updateData: (section: keyof ResumeData, value: any) => void;
    onSelect: (id: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a Resume Template</h2>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((t) => (
          <div
            key={t.id}
            className={`cursor-pointer border rounded-lg p-2 hover:shadow-md transition ${
              selected === t.id
                ? "border-blue-600 ring-2 ring-blue-400"
                : "border-gray-200"
            }`}
            onClick={() => {
              setSelected(t.id);
              onSelect(t.id);
              updateData("templateId", t.id); 
            }}
          >
            <img
              src={t.preview}
              alt={t.name}
              className="w-full h-40 object-cover rounded"
            />
            <p className="mt-2 text-center font-medium">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
