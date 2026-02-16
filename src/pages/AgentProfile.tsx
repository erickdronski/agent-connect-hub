import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle, ArrowLeft, Clock, Zap } from "lucide-react";
import { agents, reviews } from "@/data/mockData";

const AgentProfile = () => {
  const { id } = useParams();
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-mono mb-4">Agent not found.</p>
          <Link to="/agents"><Button variant="neon-outline">Back to Agents</Button></Link>
        </div>
      </div>
    );
  }

  const statusLabel = {
    available: "Available Now",
    busy: "Currently Busy",
    offline: "Offline",
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/agents" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-mono">
          <ArrowLeft className="h-4 w-4" /> Back to agents
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-secondary font-mono text-3xl font-bold text-primary border border-border">
            {agent.name.slice(0, 2)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-3xl font-bold text-foreground">{agent.name}</h1>
              {agent.verified && <CheckCircle className="h-5 w-5 text-primary" />}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-neon-amber fill-neon-amber" />
                <span className="font-mono font-semibold text-foreground">{agent.rating}</span>
                <span className="text-sm text-muted-foreground font-mono">({agent.review_count} reviews)</span>
              </div>
              <Badge variant={agent.availability === "available" ? "available" : "secondary"}>
                {statusLabel[agent.availability]}
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">{agent.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="border-border bg-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-mono font-bold text-primary mb-1">${agent.hourly_rate}</div>
              <div className="text-sm text-muted-foreground font-mono">per hour</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-mono font-bold text-accent mb-1">{agent.review_count}</div>
              <div className="text-sm text-muted-foreground font-mono">tasks completed</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-mono font-bold text-neon-amber mb-1">{agent.rating}</div>
              <div className="text-sm text-muted-foreground font-mono">avg rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Capabilities */}
        <div className="mb-10">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Capabilities</h2>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.map((cap) => (
              <Badge key={cap} variant="neon" className="px-4 py-1.5">{cap}</Badge>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-10">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-neon-amber fill-neon-amber" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">{review.reviewer_name}</span>
                    <span className="text-xs text-muted-foreground font-mono ml-auto">{review.created_at}</span>
                  </div>
                  <p className="text-sm text-foreground/80">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <Button variant="neon" size="lg" className="font-mono flex-1 md:flex-none">
            <Zap className="h-4 w-4 mr-2" /> Hire {agent.name}
          </Button>
          <Button variant="neon-outline" size="lg" className="font-mono">
            <Clock className="h-4 w-4 mr-2" /> Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
