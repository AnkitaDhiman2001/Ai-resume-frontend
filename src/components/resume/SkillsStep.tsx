import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Badge } from '../ui/Badge';
import { ResumeData } from '@/app/dashboard/resumes/new/page';
import { BiCross, BiPlus } from 'react-icons/bi';

interface SkillsStepProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const SkillsStep: React.FC<SkillsStepProps> = ({ data, updateData }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      updateData('skills', [...data.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateData('skills', data.skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git',
    'Project Management', 'Team Leadership', 'Communication',
    'Problem Solving', 'Data Analysis', 'Adobe Creative Suite',
    'Microsoft Office', 'Agile', 'Scrum', 'AWS'
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="skill-input">Add Skills</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="skill-input"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a skill and press Enter or click Add"
            />
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <BiPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {data.skills.length > 0 && (
          <div>
            <Label>Your Skills</Label>
            <div className="flex flex-wrap gap-2 mt-2 p-4 border rounded-lg bg-gray-50">
              {data.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm py-1 px-3 flex items-center gap-2"
                >
                  {skill}
                  <BiCross
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label>Suggested Skills</Label>
          <p className="text-sm text-gray-600 mb-2">
            Click on any skill below to add it to your resume
          </p>
          <div className="flex flex-wrap gap-4 my-2">
            {suggestedSkills
              .filter(skill => !data.skills.includes(skill))
              .map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => updateData('skills', [...data.skills, skill])}
                >
                  + {skill}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Tips for Adding Skills</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include both technical and soft skills relevant to your target job</li>
          <li>• Be specific (e.g., "React.js" instead of just "Programming")</li>
          <li>• Add 8-12 skills for the best impact</li>
          <li>• Use keywords from job descriptions you're targeting</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsStep;