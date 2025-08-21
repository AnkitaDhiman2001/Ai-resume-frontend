import React from "react";
import { ResumeData } from "@/app/dashboard/resumes/new/page";

interface Props {
  data: ResumeData;
}

const ClassicTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-10 font-serif text-black border border-gray-400">
      <h1 className="text-3xl font-bold uppercase tracking-wide">{data.personalInfo.fullName}</h1>
      <p className="text-sm italic mb-6">
        {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
      </p>

      {data.personalInfo.summary && (
        <section>
          <h2 className="text-lg font-bold underline">Professional Summary</h2>
          <p className="mt-2">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold underline mt-4">Skills</h2>
          <p className="mt-2">{data.skills.join(", ")}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <h2 className="text-lg font-bold underline mt-4">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mt-2">
              <p className="font-semibold">{exp.jobTitle}, {exp.company}</p>
              <p className="text-sm">{exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}</p>
              <ul className="list-disc list-inside ml-4">
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <h2 className="text-lg font-bold underline mt-4">Education</h2>
          {data.education.map((edu) => (
            <p key={edu.id}>{edu.degree}, {edu.institution} ({edu.startYear} - {edu.endYear})</p>
          ))}
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
