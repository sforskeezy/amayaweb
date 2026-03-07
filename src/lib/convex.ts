import { ConvexHttpClient } from "convex/browser";

export function getConvex() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is not set. Add it to your environment variables in Netlify."
    );
  }
  return new ConvexHttpClient(url);
}
