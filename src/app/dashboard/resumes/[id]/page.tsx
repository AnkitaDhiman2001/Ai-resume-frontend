'use client';
import { toasterError } from "@/components/core/Toaster";
import PreviewStep from "@/components/resume/PreviewStep";
import useAuth from "@/contexts/AuthContext";
import API from "@/utils/Api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Resume {
  id: string;
  resume_title: string;
  template_type: string | null;
  updatedAt: string;
  content: JSON;
}
export default function ViewResumePage() {
    const params = useParams();
  const { id } = params;

  const [data, setData] = useState<Resume | null>(null);
  const { user, isLoading } = useAuth();
  const router = useRouter();

    useEffect(() => {
      if (isLoading) return;
      if (!user) {
        router.push('/auth/login');
        return;
      }
      fetchResumes();
    }, [user, isLoading, router]);

   const fetchResumes = async () => {
    if(user && id) {
      try{
        const url = `api/resumes/fetch/${user?.id}/${id}`;
        const res = await API.get(url);

        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        toasterError("Failed to complete resume. Please try again.");
      }
    }
  }

  if(!data) return null;
  return (
    <div className="p-8">
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => router.push('/dashboard')}>Back</button>
      <PreviewStep data={data.content} templateId={data.template_type} />
    </div>
  );
}
