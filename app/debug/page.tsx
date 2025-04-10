"use client";

import { useEffect, useState } from "react";

export default function DebugPage() {
  const [envVars, setEnvVars] = useState({
    supabaseUrl: "",
    supabaseAnonKey: "",
  });

  useEffect(() => {
    setEnvVars({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? "Key is present (hidden for security)"
        : "Not set",
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Debug</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p className="mb-2">
          <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {envVars.supabaseUrl}
        </p>
        <p>
          <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{" "}
          {envVars.supabaseAnonKey}
        </p>
      </div>
    </div>
  );
}
