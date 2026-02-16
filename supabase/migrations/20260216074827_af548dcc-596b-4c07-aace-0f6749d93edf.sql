
CREATE POLICY "Authenticated users can insert tasks"
ON public.tasks FOR INSERT
WITH CHECK (true);
