-- 1. Lock down SECURITY DEFINER functions
-- grant_admin_to_owner is a trigger function: nobody should call it directly.
REVOKE EXECUTE ON FUNCTION public.grant_admin_to_owner() FROM PUBLIC, anon, authenticated;

-- has_role is referenced by RLS policies, so the authenticated role must still
-- be able to evaluate it. Anonymous users never need it (no anon policy uses it).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- 2. Replace the "WITH CHECK (true)" insert policy on whatsapp_clicks with a
-- bounded one so public click tracking still works but oversized payloads are rejected.
DROP POLICY IF EXISTS "Anyone can insert clicks" ON public.whatsapp_clicks;

CREATE POLICY "Anyone can insert clicks"
ON public.whatsapp_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (cta_label      IS NULL OR length(cta_label)      <= 200)
  AND (utm_source     IS NULL OR length(utm_source)     <= 200)
  AND (utm_medium     IS NULL OR length(utm_medium)     <= 200)
  AND (utm_campaign   IS NULL OR length(utm_campaign)   <= 200)
  AND (utm_term       IS NULL OR length(utm_term)       <= 200)
  AND (utm_content    IS NULL OR length(utm_content)    <= 200)
  AND (referrer       IS NULL OR length(referrer)       <= 2048)
  AND (search_engine  IS NULL OR length(search_engine)  <= 100)
  AND (search_keyword IS NULL OR length(search_keyword) <= 500)
  AND (gclid          IS NULL OR length(gclid)          <= 500)
  AND (fbclid         IS NULL OR length(fbclid)         <= 500)
  AND (landing_page   IS NULL OR length(landing_page)   <= 2048)
  AND (user_agent     IS NULL OR length(user_agent)     <= 1000)
  AND (device         IS NULL OR length(device)         <= 50)
  AND (session_id     IS NULL OR length(session_id)     <= 128)
  AND (route          IS NULL OR length(route)          <= 500)
  AND (source         IS NULL OR length(source)         <= 100)
);