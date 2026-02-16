
DROP POLICY "Authenticated users can insert tasks" ON public.tasks;

CREATE POLICY "Authenticated users can insert tasks"
ON public.tasks FOR INSERT
TO authenticated
WITH CHECK (true);
