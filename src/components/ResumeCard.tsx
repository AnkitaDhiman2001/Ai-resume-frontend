'use client';
import { useRouter } from "next/navigation";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

export function ResumeCard({ resume }: { resume: { id: string; title: string;} }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold">{resume.title}</h3>

      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        AI-optimized resume for {resume.title.toLowerCase()} role.
      </p>
      <div className="mt-4 flex justify-end gap-5">
        <FaRegEye color="blue" size={24} onClick={() => router.push(`/dashboard/resumes/${resume.id}`)} />
        <FaRegEdit color="green" size={24} onClick={() => router.push(`/dashboard/resumes/${resume.id}/edit`)} />
        <FaRegTrashCan color="red" size={24} onClick={() => router.push(`/dashboard/resumes/${resume.id}/delete`)} />
      </div>
    </div>
  );
}
