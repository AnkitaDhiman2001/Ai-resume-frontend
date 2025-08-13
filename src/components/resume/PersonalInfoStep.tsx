import React from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { ResumeData } from '@/app/dashboard/resumes/new/page';
import { TextArea } from '../ui/TextArea';

interface PersonalInfoStepProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, updateData }) => {
  const handleChange = (field: string, value: string) => {
    updateData('personalInfo', {
      ...data.personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Full Name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Email"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Enter Location"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <TextArea
          id="summary"
          value={data.personalInfo.summary}
          onChange={(e:any) => handleChange('summary', e.target.value)}
          placeholder="Write a brief summary of your professional background and career objectives..."
          rows={4}
        />

      </div>
    </div>
  );
};

export default PersonalInfoStep;