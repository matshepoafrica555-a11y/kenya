import React from "react";
import { AdminClient } from "./AdminClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Publishing Platform | Matshepo Africa Ltd",
  description:
    "Company-managed editorial and content publishing platform for monthly newsletters and technical bulletins.",
};

export default function AdminPage() {
  return <AdminClient />;
}

