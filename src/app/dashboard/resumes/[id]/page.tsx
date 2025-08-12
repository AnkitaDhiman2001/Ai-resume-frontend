export default function ViewResumePage({ params }: { params: { id: string } }) {
  const resume = {
    title: "Frontend Developer Resume",
    summary: "Passionate frontend developer with 2+ years of experience...",
    skills: ["React", "Next.js", "JavaScript"],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">{resume.title}</h1>
      <p className="text-gray-600 mb-4">{resume.summary}</p>
      <h2 className="text-xl font-semibold">Skills</h2>
      <ul className="list-disc pl-6">
        {resume.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
