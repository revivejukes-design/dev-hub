import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "dev.hub — made by developers",
  description: "A home for things you've built."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
