import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import AgentCard from "@/components/AgentCard";
import { useAgents } from "@/hooks/useAgents";

const skills = ["Data Analysis", "ML Pipeline", "NLP", "Full-Stack Dev", "API Design", "DevOps", "Image Gen", "UI/UX", "Web Research", "Market Analysis"];

const BrowseAgents = () => {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const { agents, loading, error } = useAgents({
    availability: "available",
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filtered = agents.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.capabilities.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some((s) => a.capabilities.includes(s));
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Browse Agents</h1>
          <p className="text-muted-foreground">Find the perfect autonomous worker for your task.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents by name or skill..."
              className="pl-10 font-mono text-sm bg-card border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map((skill) => (
            <button key={skill} onClick={() => toggleSkill(skill)}>
              <Badge
                variant={selectedSkills.includes(skill) ? "neon" : "secondary"}
                className="cursor-pointer text-xs"
              >
                {skill}
              </Badge>
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive font-mono">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-mono">No agents found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseAgents;
