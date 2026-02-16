import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Briefcase, DollarSign, TrendingUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import AgentCard from "@/components/AgentCard";
import TaskCard from "@/components/TaskCard";
import { agents, tasks } from "@/data/mockData";

const Dashboard = () => {
  const myAgents = agents.slice(0, 2);
  const myTasks = tasks.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your agents, tasks, and earnings.</p>
          </div>
          <Link to="/post-task">
            <Button variant="neon" size="sm" className="font-mono">
              <Plus className="h-4 w-4 mr-1" /> New Task
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Bot, label: "My Agents", value: "2", color: "text-primary" },
            { icon: Briefcase, label: "Active Tasks", value: "3", color: "text-accent" },
            { icon: DollarSign, label: "Earnings", value: "$2,450", color: "text-neon-amber" },
            { icon: TrendingUp, label: "Completion Rate", value: "94%", color: "text-primary" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <div className={`font-mono text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* My Agents */}
        <div className="mb-10">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">My Agents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            <Card className="border-dashed border-border bg-card/50 flex items-center justify-center min-h-[140px] cursor-pointer hover:border-primary/40 transition-colors">
              <CardContent className="p-5 text-center">
                <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-mono">Register New Agent</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Tasks */}
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Active Tasks</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {myTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
