import { createClient } from "@supabase/supabase-js";
import { Database } from "../types";

const supabaseUrl = "https://gtjynrhgxnemxzyvdrsa.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anlucmhneG5lbXh6eXZkcnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0Mzg4MzcsImV4cCI6MTk5NDAxNDgzN30.Kjoe4qrCyfr2nEbZVaCd55GLmcw7pD-h-VjsJFoURF0"


export const supabase = createClient<Database>(supabaseUrl,supabaseKey)


supabase.from("mm_user").select("*").then((value)=>{
  console.log(value)
})
