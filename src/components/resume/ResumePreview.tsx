import { ResumeData } from "@/pages/Index";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, MapPin, Phone, Globe, Linkedin } from "lucide-react";
import { format } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const [year, month] = dateString.split("-");
      return format(new Date(parseInt(year), parseInt(month) - 1), "MMM yyyy");
    } catch {
      return dateString;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Preview</h2>
        <Button onClick={handlePrint} className="gap-2" size="sm">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="p-8 bg-card shadow-[var(--shadow-soft)] print:shadow-none" id="resume-preview">
        {/* Header */}
        <div className="border-b-2 border-primary pb-6 mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {resumeData.personalInfo.email}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                {resumeData.personalInfo.phone}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {resumeData.personalInfo.location}
              </div>
            )}
            {resumeData.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-3.5 w-3.5" />
                {resumeData.personalInfo.linkedin}
              </div>
            )}
            {resumeData.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                {resumeData.personalInfo.website}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2 uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {resumeData.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-3 uppercase tracking-wide">
              Work Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="animate-fade-in">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.position || "Position"}</h3>
                      <p className="text-sm text-foreground/80">{exp.company || "Company"}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {exp.location && <p>{exp.location}</p>}
                      <p>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-foreground/90 mt-2 whitespace-pre-wrap leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-3 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="animate-fade-in">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground">{edu.degree || "Degree"}</h3>
                      <p className="text-sm text-foreground/80">{edu.institution || "Institution"}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {edu.location && <p>{edu.location}</p>}
                      <p>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-foreground/90 mt-2 whitespace-pre-wrap leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-3 uppercase tracking-wide">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!resumeData.personalInfo.fullName &&
          !resumeData.summary &&
          resumeData.experience.length === 0 &&
          resumeData.education.length === 0 &&
          resumeData.skills.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Start filling out the form to see your resume preview here!</p>
            </div>
          )}
      </Card>
    </div>
  );
};
