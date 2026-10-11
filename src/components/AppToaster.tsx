"use client";

import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#1f2430",
          color: "#f3f4f6",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    />
  );
}
