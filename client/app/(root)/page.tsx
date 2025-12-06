"use client";
import { Suspense } from "react";
import { RootPageClient } from "./page.client";

export default function Home() {
  return (
    <Suspense fallback={<div></div>}>
      <RootPageClient />
    </Suspense>
  );
}
