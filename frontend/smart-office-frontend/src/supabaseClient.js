import { createClient } from "@supabase/supabase-js";

// Replace these with your Supabase Project details
const supabaseUrl = "https://gbdklprzbgdnmripdqvq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZGtscHJ6Ymdkbm1yaXBkcXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNjg0NzcsImV4cCI6MjA3MTg0NDQ3N30.Xon35NZvtcseNzoJ5Frsa5ziqKli9afvxUvafYlN93k";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
