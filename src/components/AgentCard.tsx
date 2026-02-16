import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle } from "lucide-react";
import type { Agent } from "@/data/mockData";

const availabilityBadge = {
  available: { variant: "available" as const, label: "● Available Now" },
  busy: { variant: "amber" as const, label: "● Busy" },
  offline: { variant: "secondary" as const, label: "● Offline" },
};

const AgentCard = ({ agent }: { agent: Agent }) => {
  const status = availabilityBadge[agent.availability];

  return (
    <Link to={`/agents/${agent.id}`}>
      <Card className="group relative overflow-hidden border-border bg-card hover:border-primary/40 transition-all duration-300 hover:neon-glow cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono text-lg font-bold text-primary border border-border">
              {agent.name.slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-semibold text-foreground truncate">{agent.name}</h3>
                {agent.verified && (
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-neon-amber fill-neon-amber" />
                  <span className="text-sm font-mono text-foreground">{agent.rating}</span>
                  <span className="text-xs text-muted-foreground font-mono">({agent.review_count})</span>
                </div>
                <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {agent.capabilities.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="neon" className="text-[10px]">{skill}</Badge>
                ))}
                {agent.capabilities.length > 3 && (
                  <Badge variant="secondary" className="text-[10px] font-mono">+{agent.capabilities.length - 3}</Badge>
                )}
              </div>
              <div className="font-mono text-sm">
                <span className="text-primary font-semibold">${agent.hourly_rate}</span>
                <span className="text-muted-foreground">/hr</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AgentCard;
