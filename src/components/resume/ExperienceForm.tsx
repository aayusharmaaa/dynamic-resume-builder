import { Dispatch, SetStateAction } from "react";
import { ResumeData } from "@/pages/Index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, Plus, Trash2 } from "lucide-react";

interface ExperienceFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

export const ExperienceForm = ({ resumeData, setResumeData }: ExperienceFormProps) => {
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: crypto.randomUUID(),
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Work Experience</h2>
        </div>
        <Button onClick={addExperience} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {resumeData.experience.map((exp) => (
          <div
            key={exp.id}
            className="p-4 rounded-lg border border-border/50 bg-secondary/20 space-y-4 animate-scale-in"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-sm text-muted-foreground">Experience Entry</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  placeholder="Software Engineer"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="City, State"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) => updateExperience(exp.id, "current", checked === true)}
              />
              <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                Currently working here
              </Label>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Key responsibilities and achievements..."
                className="min-h-[100px] resize-none"
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
              />
            </div>
          </div>
        ))}

        {resumeData.experience.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No experience entries yet. Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
