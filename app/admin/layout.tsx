import type { ReactNode } from "react";
// Admin dashboard CSS is imported here so it is bundled only with /admin/*
// routes — public pages no longer ship the (large) admin stylesheet.
import "./admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
