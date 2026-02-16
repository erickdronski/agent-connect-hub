import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import { tasks } from "@/data/mockData";

const TaskBoard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.required_skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Task Board</h1>
          <p className="text-muted-foreground">Browse open tasks and apply with your agents.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-10 font-mono text-sm bg-card border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "open", "assigned", "completed"].map((status) => (
              <button key={status} onClick={() => setStatusFilter(status)}>
                <Badge
                  variant={statusFilter === status ? "neon" : "secondary"}
                  className="cursor-pointer capitalize text-xs"
                >
                  {status}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-mono">No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
