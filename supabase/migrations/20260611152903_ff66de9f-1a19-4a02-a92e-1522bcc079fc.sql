
CREATE TABLE public.gsc_daily_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  clicks integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  ctr numeric(6,4) NOT NULL DEFAULT 0,
  position numeric(6,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gsc_daily_metrics TO authenticated;
GRANT ALL ON public.gsc_daily_metrics TO service_role;
ALTER TABLE public.gsc_daily_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage gsc_daily_metrics" ON public.gsc_daily_metrics FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.gsc_query_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date date NOT NULL,
  query text NOT NULL,
  page text,
  clicks integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  ctr numeric(6,4) NOT NULL DEFAULT 0,
  position numeric(6,2) NOT NULL DEFAULT 0,
  device text,
  country text,
  intent text,
  opportunity text,
  score integer,
  page_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX gsc_query_snapshots_date_idx ON public.gsc_query_snapshots(snapshot_date);
CREATE INDEX gsc_query_snapshots_query_idx ON public.gsc_query_snapshots(query);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gsc_query_snapshots TO authenticated;
GRANT ALL ON public.gsc_query_snapshots TO service_role;
ALTER TABLE public.gsc_query_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage gsc_query_snapshots" ON public.gsc_query_snapshots FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.gsc_page_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date date NOT NULL,
  page text NOT NULL,
  clicks integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  ctr numeric(6,4) NOT NULL DEFAULT 0,
  position numeric(6,2) NOT NULL DEFAULT 0,
  query_count integer NOT NULL DEFAULT 0,
  top_query text,
  page_type text,
  status text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX gsc_page_snapshots_date_idx ON public.gsc_page_snapshots(snapshot_date);
CREATE INDEX gsc_page_snapshots_page_idx ON public.gsc_page_snapshots(page);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gsc_page_snapshots TO authenticated;
GRANT ALL ON public.gsc_page_snapshots TO service_role;
ALTER TABLE public.gsc_page_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage gsc_page_snapshots" ON public.gsc_page_snapshots FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.gsc_index_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date date NOT NULL,
  page text NOT NULL,
  state text,
  reason text,
  priority text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gsc_index_status TO authenticated;
GRANT ALL ON public.gsc_index_status TO service_role;
ALTER TABLE public.gsc_index_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage gsc_index_status" ON public.gsc_index_status FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.seo_optimizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  type text NOT NULL,
  applied_at timestamptz NOT NULL DEFAULT now(),
  notes text,
  before_json jsonb,
  after_json jsonb,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_optimizations TO authenticated;
GRANT ALL ON public.seo_optimizations TO service_role;
ALTER TABLE public.seo_optimizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage seo_optimizations" ON public.seo_optimizations FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.seo_action_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  priority text NOT NULL DEFAULT 'media',
  type text NOT NULL,
  page text,
  query text,
  metric text,
  recommendation text NOT NULL,
  status text NOT NULL DEFAULT 'todo',
  score integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  result_json jsonb,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
CREATE INDEX seo_action_items_status_idx ON public.seo_action_items(status);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_action_items TO authenticated;
GRANT ALL ON public.seo_action_items TO service_role;
ALTER TABLE public.seo_action_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage seo_action_items" ON public.seo_action_items FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
