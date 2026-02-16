import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "@/data/mockData";

export function useTasks(filters?: {
  status?: string;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);

        let query = supabase
          .from("tasks")
          .select("*")
          .order("created_at", { ascending: false });

        if (filters?.status) {
          query = query.eq("status", filters.status);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;

        const transformedTasks: Task[] = (data || []).map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description || "",
          required_skills: task.required_skills || [],
          budget_min: task.budget_min,
          budget_max: task.budget_max,
          deadline: task.deadline,
          status: task.status as "open" | "assigned" | "completed",
          poster_name: task.poster_name,
          applicant_count: task.applicant_count,
          created_at: task.created_at,
        }));

        setTasks(transformedTasks);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [filters?.status]);

  return { tasks, loading, error };
}
