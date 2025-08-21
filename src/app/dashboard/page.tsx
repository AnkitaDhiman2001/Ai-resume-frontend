'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import useAuth from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toasterError, toasterSuccess } from '@/components/core/Toaster';
import { CiCalendar } from 'react-icons/ci';
import { FiEdit } from 'react-icons/fi';
import { ImFileText2 } from 'react-icons/im';
import API from '@/utils/Api';

interface Draft {
  id: string;
  title: string;
  lastModified: string;
  status: 'draft' | 'complete';
}

interface Resume {
  id: string;
  resume_title: string;
  template_type: string;
  updatedAt: string;
}

const DashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }
    const savedResumes = localStorage.getItem(`resumes_${user.id}`);
    if (savedResumes) {
      setDrafts(JSON.parse(savedResumes));
    }
  }, [user, isLoading, router]);

  useEffect(()=> {
    fetchResumes();
  },[user])

  const fetchResumes = async () => {
    if(user){
      try{
        const url = `api/resumes/list/${user?.id}`;
        const res = await API.get(url);

        if (res.data) {
          setResumes(res.data);
        }
      } catch (error) {
        toasterError("Failed to complete resume. Please try again.");
      }
    }
  }
  const deleteResume = (id: string) => {
    const updatedResumes = drafts.filter(resume => resume.id !== id);
    setDrafts(updatedResumes);
    localStorage.setItem(`resumes_${user!.id}`, JSON.stringify(updatedResumes));
    toasterSuccess('Resume deleted successfully');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 items-center mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-xl text-gray-600">
            Manage your resumes and create new ones to land your dream job.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Create New Resume Card */}
          <Card className="border-dashed border-2 border-purple-300 bg-purple-50/50 card-hover py-6">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BiPlus className="h-16 w-16 text-purple-600 m-4" />
              <CardTitle className="text-2xl mb-2">Create New Resume</CardTitle>
              <CardDescription className="text-center mb-6 max-w-md">
                Start building a professional resume with our AI-powered tools. Get personalized suggestions and create something amazing.
              </CardDescription>
              <Button size="lg" className="px-8">
                <Link href="/dashboard/resumes/new" className='flex items-center justify-center'>
                  Start Building
                  <BiPlus className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

      
          {resumes.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Resumes</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <ImFileText2 className="h-8 w-8 text-blue-600" />
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                          >
                            <Link href={`/dashboard/resumes/${resume.id}/edit`}>
                              <FiEdit className="h-7 w-7" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteResume(resume.id)}
                          >
                            <RiDeleteBinLine className="h-7 w-7 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{resume.resume_title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <CiCalendar className="h-5 w-5 mr-1" />
                        Last modified: {resume.updatedAt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                          Completed
                        </span>
                        <Button size="sm">
                          <Link href={`/dashboard/resumes/${resume.id}/edit`}>
                            Edit Resume
                          </Link>
                        </Button>
                          <Link className='text-sm text-blue-500 border-b border-blue-500' href={`/dashboard/resumes/${resume.id}`}>
                            View
                          </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
           : (
            <Card className="text-center py-12">
              <CardContent>
                <ImFileText2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <CardTitle className="text-xl mb-2">No resumes yet</CardTitle>
                <CardDescription>
                  Create your first resume to get started on your career journey.
                </CardDescription>
              </CardContent>
            </Card>
          )}

          {/* Existing Drafts */}
          {drafts.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Drafts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drafts.map((resume) => (
                  <Card key={resume.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <ImFileText2 className="h-8 w-8 text-blue-600" />
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                          >
                            <Link href={`/dashboard/resumes/${resume.id}/edit`}>
                              <FiEdit className="h-7 w-7" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteResume(resume.id)}
                          >
                            <RiDeleteBinLine className="h-7 w-7 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{resume.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <CiCalendar className="h-5 w-5 mr-1" />
                        Last modified: {resume.lastModified}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resume.status === 'complete' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {resume.status === 'complete' ? 'Complete' : 'Draft'}
                        </span>
                        <Button size="sm">
                          <Link href={`/dashboard/resumes/${resume.id}/edit`}>
                            Edit Resume
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;