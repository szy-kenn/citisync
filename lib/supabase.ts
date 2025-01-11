import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://vsbkxysdsqapomfudqih.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_ACCESS_KEY!)
