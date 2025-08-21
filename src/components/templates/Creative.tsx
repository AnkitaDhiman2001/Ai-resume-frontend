import React from "react";
import { ResumeData } from "@/app/dashboard/resumes/new/page";

interface Props {
  data: ResumeData;
}

const CreativeTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-50 to-purple-100 p-10 rounded-2xl shadow-2xl">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-purple-700">{data.personalInfo.fullName}</h1>
        <p className="text-gray-700 mt-2">{data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}</p>
      </div>

      {data.personalInfo.summary && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-purple-700">About Me</h2>
          <p className="mt-2 text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-purple-700">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((s) => (
              <span key={s} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-purple-700">Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mt-4">
              <h3 className="font-bold text-lg">{exp.jobTitle} @ {exp.company}</h3>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}</p>
              <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-purple-700">Education</h2>
          {data.education.map((edu) => (
            <p key={edu.id} className="mt-2">{edu.degree}, {edu.institution} ({edu.startYear} - {edu.endYear})</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreativeTemplate;
