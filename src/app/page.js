// app/page.tsx

import { redirect } from "next/navigation";

export default function HomePage() {
  // Perform the redirect
  redirect("/market");

  // You can return null or a loading message if needed
  return null;
}
