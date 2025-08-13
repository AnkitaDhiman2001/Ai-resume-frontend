import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ResumeData } from '@/app/dashboard/resumes/new/page';
import { CiMail, CiPhone } from 'react-icons/ci';
import { BiCalendar, BiMapPin } from 'react-icons/bi';

interface PreviewStepProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-yellow-800 text-sm">
          <strong>Preview Mode:</strong> This is how your resume will look. You can go back to previous steps to make changes or download as PDF.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto bg-white shadow-lg">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <CiMail className="h-4 w-4" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <CiPhone className="h-4 w-4" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <BiMapPin className="h-4 w-4" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
                Work Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                        {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                      </div>
                      <div className="text-right text-gray-600 text-sm flex items-center gap-1">
                        <BiCalendar className="h-4 w-4" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>
                    {exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        {exp.responsibilities
                          .filter(resp => resp.trim())
                          .map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.fieldOfStudy && <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>}
                    </div>
                    <div className="text-right text-gray-600 text-sm">
                      <p>{edu.startYear} - {edu.endYear}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewStep;