import React from "react";
import { Badge } from "../ui/Badge";
import { CiMail, CiPhone } from "react-icons/ci";
import { BiCalendar, BiMapPin } from "react-icons/bi";
import { ResumeData } from "@/app/dashboard/resumes/new/page";

interface Props {
  data: ResumeData;
}

const ModernTemplate: React.FC<Props> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 space-y-6 border-l-8 border-blue-600">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-4xl font-bold text-blue-700">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
          {data.personalInfo.email && <span className="flex items-center gap-1"><CiMail /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="flex items-center gap-1"><CiPhone /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="flex items-center gap-1"><BiMapPin /> {data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 border-b pb-1">Summary</h2>
          <p className="text-gray-700 mt-2">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 border-b pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 border-b pb-1">Experience</h2>
          <div className="space-y-4 mt-2">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{exp.jobTitle}</p>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <BiCalendar />
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 border-b pb-1">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between mt-2">
              <div>
                <p className="font-semibold">{edu.degree} - {edu.fieldOfStudy}</p>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
