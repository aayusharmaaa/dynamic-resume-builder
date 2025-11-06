import { Dispatch, SetStateAction } from "react";
import { ResumeData } from "@/pages/Index";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SummaryForm } from "./SummaryForm";
import { EducationForm } from "./EducationForm";
import { ExperienceForm } from "./ExperienceForm";
import { SkillsForm } from "./SkillsForm";
import { Card } from "@/components/ui/card";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

export const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-[var(--shadow-card)] border-border/50">
        <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)] border-border/50">
        <SummaryForm resumeData={resumeData} setResumeData={setResumeData} />
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)] border-border/50">
        <EducationForm resumeData={resumeData} setResumeData={setResumeData} />
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)] border-border/50">
        <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)] border-border/50">
        <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />
      </Card>
    </div>
  );
};
