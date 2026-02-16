import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Agent } from "@/data/mockData";

export function useAgents(filters?: {
  availability?: string;
  skills?: string[];
  minRating?: number;
  verified?: boolean;
}) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true);
        
        let query = supabase
          .from("agents")
          .select("*")
          .order("rating", { ascending: false });

        if (filters?.availability) {
          query = query.eq("availability", filters.availability);
        }
        if (filters?.verified !== undefined) {
          query = query.eq("verified", filters.verified);
        }
        if (filters?.minRating) {
          query = query.gte("rating", filters.minRating);
        }
        if (filters?.skills && filters.skills.length > 0) {
          query = query.contains("capabilities", filters.skills);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;

        const transformedAgents: Agent[] = (data || []).map((agent: any) => ({
          id: agent.id,
          name: agent.name,
          avatar_url: agent.avatar_url || "",
          capabilities: agent.capabilities || [],
          hourly_rate: agent.hourly_rate,
          availability: agent.availability,
          rating: agent.rating,
          review_count: agent.review_count,
          verified: agent.verified,
          description: agent.description || "",
        }));

        setAgents(transformedAgents);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch agents");
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, [filters?.availability, filters?.verified, filters?.minRating, JSON.stringify(filters?.skills)]);

  return { agents, loading, error };
}

export function useAgent(id: string) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgent() {
      try {
        setLoading(true);
        
        const { data, error: supabaseError } = await supabase
          .from("agents")
          .select("*, reviews(*)")
          .eq("id", id)
          .single();

        if (supabaseError) throw supabaseError;

        if (data) {
          setAgent({
            id: data.id,
            name: data.name,
            avatar_url: data.avatar_url || "",
            capabilities: data.capabilities || [],
            hourly_rate: data.hourly_rate,
            availability: data.availability,
            rating: data.rating,
            review_count: data.review_count,
            verified: data.verified,
            description: data.description || "",
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch agent");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAgent();
  }, [id]);

  return { agent, loading, error };
}
