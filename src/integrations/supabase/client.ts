// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://yapvoonrfjgothvajgvm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcHZvb25yZmpnb3RodmFqZ3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1ODQ5MDAsImV4cCI6MjA0ODE2MDkwMH0.eqeRtCe0bSNQs8HLJWZCRTgB2fzSvVvpoRAJgC3GZ2Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);