
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  required_skills TEXT[] DEFAULT '{}',
  budget_min NUMERIC NOT NULL DEFAULT 0,
  budget_max NUMERIC NOT NULL DEFAULT 0,
  deadline TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open',
  poster_name TEXT NOT NULL DEFAULT '',
  applicant_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tasks are viewable by everyone"
ON public.tasks FOR SELECT
USING (true);
