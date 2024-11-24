import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASEURL

const supabaseKey = process.env.REACT_APP_SUPABASEKEY
  

export const supabase = createClient(supabaseUrl, supabaseKey);
