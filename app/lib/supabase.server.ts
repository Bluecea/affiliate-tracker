import { createClient } from '@supabase/supabase-js'

// The server runtime should use process.env to read variables loaded by Vite.
// However, Vite exposes import.meta.env during SSR in Dev.
const supabaseUrl =
  (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : '') ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '')

// Using the service role key is strictly required for backend endpoints (like webhooks)
// so they can bypass RLS without needing an authenticated user session.
const supabaseServiceKey =
  (typeof process !== 'undefined'
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : '') ||
  (typeof import.meta !== 'undefined'
    ? import.meta.env?.VITE_SUPABASE_SERVICE_ROLE_KEY ||
      import.meta.env?.SUPABASE_SERVICE_ROLE_KEY
    : '')

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Webhooks require this to bypass RLS.',
    { supabaseUrl, supabaseServiceKey },
  )
}

export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceKey || '',
)
