import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Checkbox } from '../ui/Checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ResumeData } from '@/app/dashboard/resumes/new/page';
import { BiCross, BiPlus, BiTrash } from 'react-icons/bi';
import { TextArea } from '../ui/TextArea';

interface ExperienceStepProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ data, updateData }) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      responsibilities: [''],
    };
    
    updateData('experience', [...data.experience, newExperience]);
  };

  const removeExperience = (id: string) => {
    updateData('experience', data.experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    updateData('experience', data.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addResponsibility = (expId: string) => {
    const experience = data.experience.find(exp => exp.id === expId);
    if (experience) {
      updateExperience(expId, 'responsibilities', [...experience.responsibilities, '']);
    }
  };

  const removeResponsibility = (expId: string, index: number) => {
    const experience = data.experience.find(exp => exp.id === expId);
    if (experience) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(expId, 'responsibilities', newResponsibilities);
    }
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    const experience = data.experience.find(exp => exp.id === expId);
    if (experience) {
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(expId, 'responsibilities', newResponsibilities);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience}>
          <BiPlus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.experience.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline">
              <BiPlus className="h-4 w-4 mr-2" />
              Add Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {data.experience.map((exp, expIndex) => (
            <Card key={exp.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">Job #{expIndex + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <BiTrash className="h-4 w-4 text-red-500" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title *</Label>
                    <Input
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Corp Inc."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.isCurrentJob}
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id={`current-${exp.id}`}
                        checked={exp.isCurrentJob}
                        onCheckedChange={(checked) => {
                          updateExperience(exp.id, 'isCurrentJob', checked);
                          if (checked) {
                            updateExperience(exp.id, 'endDate', '');
                          }
                        }}
                      />
                      <Label htmlFor={`current-${exp.id}`} className="text-sm">
                        I currently work here
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Key Responsibilities & Achievements</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addResponsibility(exp.id)}
                    >
                      <BiPlus className="h-4 w-4 mr-1" />
                      Add Point
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {exp.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex gap-2">
                        <TextArea
                          value={responsibility}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateResponsibility(exp.id, index, e.target.value)}
                          placeholder="• Describe your key responsibility or achievement..."
                          rows={2}
                          className="flex-1"
                        />
                        {exp.responsibilities.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeResponsibility(exp.id, index)}
                            className="self-start mt-1"
                          >
                            <BiCross className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">💡 Tips for Work Experience</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Start each bullet point with an action verb (e.g., "Led", "Developed", "Managed")</li>
          <li>• Include specific numbers and metrics when possible</li>
          <li>• Focus on achievements rather than just job duties</li>
          <li>• Use the AI Enhance button to improve your descriptions</li>
        </ul>
      </div>
    </div>
  );
};

export default ExperienceStep;