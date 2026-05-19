
CREATE TABLE public.newsletter_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  pillar_slug text,
  pillar_label text,
  source_route text,
  landing_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  device text,
  user_agent text,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit newsletter"
  ON public.newsletter_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 255
  );

CREATE POLICY "Admins can view newsletter leads"
  ON public.newsletter_leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_newsletter_leads_created_at ON public.newsletter_leads (created_at DESC);
CREATE INDEX idx_newsletter_leads_pillar ON public.newsletter_leads (pillar_slug);
