'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

import PersonalInfoStep from '@/components/resume/PersonalInfoStep';
import EducationStep from '@/components/resume/EducationStep';
import SkillsStep from '@/components/resume/SkillsStep';
import ExperienceStep from '@/components/resume/ExperienceStep';
import TemplateStep from '@/components/resume/TemplateStep';
import PreviewStep from '@/components/resume/PreviewStep';
import useAuth from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import { RiSparkling2Line } from 'react-icons/ri';
import { BiDownload } from 'react-icons/bi';
import { FaArrowRightLong } from 'react-icons/fa6';
import { toasterError, toasterInfo, toasterSuccess } from '@/components/core/Toaster';
import API from '@/utils/Api';
import html2pdf from "html2pdf.js";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    gpa?: string;
  }>;
  skills: string[];
  experience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrentJob: boolean;
    responsibilities: string[];
  }>;
  templateId: string | null;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  education: [],
  skills: [],
  experience: [],
  templateId: null
};

const ResumeBuilderPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Education', component: EducationStep },
    { title: 'Skills', component: SkillsStep },
    { title: 'Experience', component: ExperienceStep },
    { title: 'Template Selection', component: TemplateStep},
    { title: 'Preview', component: PreviewStep },
  ];

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }
  }, [user, isLoading, router]);
  
  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const saveResume = () => {
    if (!user) return;

    const resumeId = resumeData.personalInfo.fullName;
    const resumeTitle = resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName}'s Resume`
      : 'Untitled Resume';

    const resumeToSave = {
      id: resumeId,
      title: resumeTitle,
      lastModified: new Date().toLocaleDateString(),
      status: 'draft' as const,
      data: resumeData,
    };

    const existingResumes = JSON.parse(localStorage.getItem(`resumes_${user.id}`) || '[]');
    const resumeIndex = existingResumes.findIndex((r: any) => r.id === resumeId);

    if (resumeIndex >= 0) {
      existingResumes[resumeIndex] = resumeToSave;
    } else {
      existingResumes.push(resumeToSave);
    }

    localStorage.setItem(`resumes_${user.id}`, JSON.stringify(existingResumes));
  };

const selectTemplate = () => {
  nextStep();
};

const generateAIContent = async () => {
  setIsGeneratingAI(true);
  try {
    const url = "api/resumes/generate";
     const res = await API.post(url, {
        ...resumeData,
        templateId: selectedTemplate,
      })

    if (res.data) {
        console.log("AI Resume:", res.data);
        toasterSuccess("AI generated your resume!");
        nextStep();
    }
  } catch (error) {
    toasterError("AI generation failed. Please try again.");
  } finally {
    setIsGeneratingAI(false);
  }
};

const completeResume = async() => {
  if(user){
  if (!resumeData.templateId) {
    toasterError("Please select a template before completing.");
    return;
  }
  try{
    const url = "api/resumes/complete";
    const res = await API.post(url, {
      ...resumeData,
      userId: user.id,
      templateId: selectedTemplate,
    });

    if (res.data) {
      toasterSuccess("Resume completed successfully!");
      router.push('/dashboard');
      localStorage.removeItem(`resumes_${user.id}`);
    }
  } catch (error) {
    toasterError("Failed to complete resume. Please try again.");
  }
}
}

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      saveResume();
    }
  };

 const handleDownload = async () => {
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("resume-preview");

      if (element) {
        html2pdf()
          .from(element)
          .set({
            margin: 10,
            filename: "resume.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .save();
      } else {
        toasterError("Resume preview not found.");
      }
    } catch (err) {
      console.error(err);
      toasterError("Failed to generate PDF.");
    }
  };


  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="mb-4"
            >
              <BsArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>

            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold">Resume Builder</h1>
                <p className="text-gray-600">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
              </div>

            </div>

            <Progress value={progress} className="h-2" />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                {steps[currentStep].title}
               {currentStep === 5 && (
                <Button
                  onClick={handleDownload}
                      className="ml-auto"
                      variant="outline"
                    >
                      <BiDownload className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  )}

              </CardTitle>
            </CardHeader>
            <CardContent>
            <CurrentStepComponent
                  data={resumeData}
                  updateData={updateResumeData}
                  onSelect={(id: string) => setSelectedTemplate(id)}
                  templateId={selectedTemplate}  
                />

            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              <BsArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-4">
              <Button onClick={() => {
                saveResume();
                toasterSuccess('Resume saved successfully!');
              }} variant="outline">
                Save Draft
              </Button>

              {(currentStep < steps.length - 1 && currentStep != 3 && currentStep != 4) ? (
                <Button onClick={nextStep}>
                  Next
                  <FaArrowRightLong className="h-4 w-4 ml-2" />
                </Button>
              ) :
              currentStep == 3 ? (
                  <Button
                    onClick={selectTemplate}
                    className="bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    <RiSparkling2Line className="h-4 w-4 mr-2" />
                    Select Template
                  </Button>
                ):
                currentStep == 4 ? (
                  <Button
                    onClick={generateAIContent}
                    disabled={isGeneratingAI}
                    className="bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    <RiSparkling2Line className="h-4 w-4 mr-2" />
                    {isGeneratingAI ? 'Generating...' : 'Generate with AI'}
                  </Button>
                )
                  :
                  (
                    <Button
                      onClick={() => {
                        completeResume();
                        toasterSuccess('Resume completed! Ready to download.');
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Complete Resume
                    </Button>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;