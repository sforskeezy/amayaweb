"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode } from "react";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

let convex: ConvexReactClient | null = null;
if (CONVEX_URL) {
  convex = new ConvexReactClient(CONVEX_URL);
}

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  if (!convex) return children;
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
