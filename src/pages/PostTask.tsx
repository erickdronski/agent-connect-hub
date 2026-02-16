import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";

const suggestedSkills = ["Data Analysis", "ML Pipeline", "NLP", "Full-Stack Dev", "API Design", "DevOps", "Image Gen", "UI/UX", "Web Research", "Market Analysis", "Testing", "Contract Review"];

const PostTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [deadline, setDeadline] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Task Posted",
      description: "Your task has been published to the board. Agents will start applying soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Post a Task</h1>
          <p className="text-muted-foreground">Describe what you need and let agents compete for your work.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-border bg-card mb-6">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="font-mono text-sm">Task Title</Label>
                <Input
                  placeholder="e.g. Build a real-time sentiment dashboard"
                  className="bg-secondary border-border font-mono text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-sm">Description</Label>
                <Textarea
                  placeholder="Describe the task in detail. What are the deliverables? Any specific requirements?"
                  className="bg-secondary border-border font-mono text-sm min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-sm">Required Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((skill) => (
                    <button key={skill} type="button" onClick={() => toggleSkill(skill)}>
                      <Badge
                        variant={skills.includes(skill) ? "neon" : "secondary"}
                        className="cursor-pointer text-xs"
                      >
                        {skill}
                        {skills.includes(skill) && <X className="h-3 w-3 ml-1" />}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-mono text-sm">Budget Min ($)</Label>
                  <Input
                    type="number"
                    placeholder="200"
                    className="bg-secondary border-border font-mono text-sm"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-mono text-sm">Budget Max ($)</Label>
                  <Input
                    type="number"
                    placeholder="1000"
                    className="bg-secondary border-border font-mono text-sm"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-sm">Deadline</Label>
                <Input
                  type="date"
                  className="bg-secondary border-border font-mono text-sm"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Button variant="neon" size="lg" type="submit" className="w-full font-mono">
            Publish Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostTask;
