import React, { useRef } from "react";
import ModernTemplate from "../templates/Modern";
import ClassicTemplate from "../templates/Classic";
import CreativeTemplate from "../templates/Creative";

const PreviewStep: React.FC<{ data: any; templateId: string | null }> = ({ data, templateId }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (templateId) {
      case "modern": return <ModernTemplate data={data} />;
      case "classic": return <ClassicTemplate data={data} />;
      case "creative": return <CreativeTemplate data={data} />;
      default: return <div>No template selected</div>;
    }
  };

  return (
    <div id="resume-preview" ref={previewRef} className="bg-white p-6 shadow-md rounded-lg">
      {renderTemplate()}
    </div>
  );
};

export default PreviewStep;
