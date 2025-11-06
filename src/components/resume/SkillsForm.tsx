import { Dispatch, SetStateAction, useState } from "react";
import { ResumeData } from "@/pages/Index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Plus, X } from "lucide-react";

interface SkillsFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

export const SkillsForm = ({ resumeData, setResumeData }: SkillsFormProps) => {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !resumeData.skills.includes(skillInput.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Code className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Skills</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skill-input">Add Skills</Label>
        <div className="flex gap-2">
          <Input
            id="skill-input"
            placeholder="e.g., JavaScript, React, Python..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={addSkill} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {resumeData.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 rounded-lg bg-secondary/30 border border-border/50">
          {resumeData.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="pl-3 pr-1 py-1.5 gap-1 animate-scale-in"
            >
              {skill}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeSkill(skill)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {resumeData.skills.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No skills added yet. Type a skill and press Enter or click the + button.</p>
        </div>
      )}
    </div>
  );
};
