import { Dispatch, SetStateAction } from "react";
import { ResumeData } from "@/pages/Index";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

interface SummaryFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

export const SummaryForm = ({ resumeData, setResumeData }: SummaryFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Professional Summary</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          placeholder="Write a brief professional summary highlighting your key strengths and career objectives..."
          className="min-h-[120px] resize-none"
          value={resumeData.summary}
          onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
        />
      </div>
    </div>
  );
};
