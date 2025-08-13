import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

import { ResumeData } from '@/app/dashboard/resumes/new/page';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';

interface EducationStepProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const EducationStep: React.FC<EducationStepProps> = ({ data, updateData }) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      gpa: '',
    };
    
    updateData('education', [...data.education, newEducation]);
  };

  const removeEducation = (id: string) => {
    updateData('education', data.education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    updateData('education', data.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education History</h3>
        <Button onClick={addEducation}>
          <BiPlus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.education.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12 m-12">
            <p className="text-gray-500 mb-4">No education entries added yet</p>
            <Button onClick={addEducation} variant="outline">
              <BiPlus className="h-4 w-4 mr-2" />
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">Education Entry</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <RiDeleteBinLine className="h-7 w-7 text-red-500" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution *</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="Enter your institution"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Enter your degree"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                    placeholder="Enter your field of study"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Year</Label>
                    <Input
                      value={edu.startYear}
                      onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                      placeholder="Enter start year"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Year</Label>
                    <Input
                      value={edu.endYear}
                      onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                      placeholder="Enter end year"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="Enter GPA"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationStep;