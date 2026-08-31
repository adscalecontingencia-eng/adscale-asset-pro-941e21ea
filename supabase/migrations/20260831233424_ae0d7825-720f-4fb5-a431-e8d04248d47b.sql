ALTER TABLE public.whatsapp_clicks
  ADD COLUMN IF NOT EXISTS asset_category text,
  ADD COLUMN IF NOT EXISTS cta_id text;

CREATE INDEX IF NOT EXISTS whatsapp_clicks_asset_category_idx
  ON public.whatsapp_clicks (asset_category, created_at DESC);