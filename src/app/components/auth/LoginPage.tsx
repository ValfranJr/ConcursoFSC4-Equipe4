"use client";

import { LoginPanel } from "./LoginPanel";

export function LoginPage() {
  return (
    <div className="min-h-svh bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500">
      <div className="mx-auto min-h-svh max-w-md px-5 py-6 ">
        <LoginPanel />
      </div>
    </div>
  );
}
