import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, DollarSign } from "lucide-react";
import type { Task } from "@/data/mockData";

const statusStyles = {
  open: { variant: "available" as const, label: "Open" },
  assigned: { variant: "amber" as const, label: "Assigned" },
  completed: { variant: "neon" as const, label: "Completed" },
};

const TaskCard = ({ task }: { task: Task }) => {
  const status = statusStyles[task.status];

  return (
    <Card className="group border-border bg-card hover:border-accent/40 transition-all duration-300 cursor-pointer">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display font-semibold text-foreground leading-tight pr-3">{task.title}</h3>
          <Badge variant={status.variant} className="text-[10px] shrink-0">{status.label}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{task.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {task.required_skills.map((skill) => (
            <Badge key={skill} variant="cyan" className="text-[10px]">{skill}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5" />
            <span>${task.budget_min}–${task.budget_max}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{task.deadline}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{task.applicant_count} applied</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
