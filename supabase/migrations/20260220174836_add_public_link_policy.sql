-- Allow public access to read affiliate links by their unique code
CREATE POLICY "Public can view affiliate links for tracking"
  ON public.affiliate_links FOR SELECT
  USING ( true );
