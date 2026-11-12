import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swigrriofdjzpdtgkoes.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_Jw-DFEgRejuoXejhCNv_ww_Rik6sflv";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Safe client initializer that won't throw during build if env variables are empty
const dummyClient = new Proxy({} as SupabaseClient, {
  get: () => () => ({
    from: () => ({
      select: () => ({ order: () => Promise.resolve({ data: [], error: null }), eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }) }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
  }),
});

function getClient(url: string, key: string, options?: any): SupabaseClient {
  if (!url || !key) {
    return dummyClient;
  }
  try {
    return createClient(url, key, options);
  } catch {
    return dummyClient;
  }
}

// Public client for browser / public queries
export const supabase = getClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side mutations (posts create, edit, delete, storage)
export const supabaseAdmin = getClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
