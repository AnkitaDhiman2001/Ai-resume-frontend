'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

import PersonalInfoStep from '@/components/resume/PersonalInfoStep';
import EducationStep from '@/components/resume/EducationStep';
import SkillsStep from '@/components/resume/SkillsStep';
import ExperienceStep from '@/components/resume/ExperienceStep';
import PreviewStep from '@/components/resume/PreviewStep';
import useAuth from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import { RiSparkling2Line } from 'react-icons/ri';
import { BiDownload } from 'react-icons/bi';
import { FaArrowRightLong } from 'react-icons/fa6';
import { toasterError, toasterInfo, toasterSuccess } from '@/components/core/Toaster';

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
};

const ResumeBuilderPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Education', component: EducationStep },
    { title: 'Skills', component: SkillsStep },
    { title: 'Experience', component: ExperienceStep },
    { title: 'Preview', component: PreviewStep },
  ];


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

  const generateAIContent = async () => {
    setIsGeneratingAI(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

       if (currentStep === 3) {
        const enhancedExperience = resumeData.experience.map(exp => ({
          ...exp,
          responsibilities: exp.responsibilities.length > 0
            ? exp.responsibilities
            : [
              `Led ${exp.jobTitle.toLowerCase()} initiatives resulting in improved team performance`,
              'Collaborated with cross-functional teams to deliver projects on time',
              'Implemented best practices and contributed to process improvements',
            ]
        }));

        updateResumeData('experience', enhancedExperience);
        nextStep();
        toasterSuccess('AI enhanced your work experience descriptions!');
      } else {
        toasterInfo('Add more information for better AI suggestions');
      }
    } catch (error) {
      toasterError('AI generation failed. Please try again.');
      console.error('AI generation error:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      saveResume();
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
console.log(currentStep)
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
                {currentStep === 4 && (
                  <Button
                    onClick={() => toasterSuccess('Resume downloaded as PDF!')}
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

              {(currentStep < steps.length - 1 && currentStep != 3) ? (
                <Button onClick={nextStep}>
                  Next
                  <FaArrowRightLong className="h-4 w-4 ml-2" />
                </Button>
              ) :
                currentStep == 3 ? (
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
                        saveResume();
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