"use client";

import { useEffect, useState } from "react";

export function DebugEnv() {
  const [supabaseUrl, setSupabaseUrl] = useState<string>("");

  useEffect(() => {
    // Access the environment variable in the client component
    setSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || "Not found");
  }, []);

  return (
    <div className="p-4 mt-4 bg-red-100 text-red-800 rounded">
      <h3 className="font-bold">Debug Info</h3>
      <p>Supabase URL: {supabaseUrl}</p>
    </div>
  );
}
