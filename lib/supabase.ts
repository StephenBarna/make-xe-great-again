import { createClient } from "@supabase/supabase-js";

// Use a direct reference to avoid any .env loading issues
const supabaseUrl = "https://zmmxbdwkodkcdepxwrnu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbXhiZHdrb2RrY2RlcHh3cm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTMwMjQsImV4cCI6MjA1OTg4OTAyNH0.g8SL33ala2H810VI2q3q30eGbmgjii47QjUYXXX9JeM";

// Create a simple supabase client with minimal options
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
