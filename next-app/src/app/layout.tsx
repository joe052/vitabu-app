import type { Metadata } from "next";
import { SITE } from "@/constants";
import Providers from "@/providers/Providers";
import "./globals.css";

// The favicon is src/app/icon.png (the Developers Mania mark) - Next.js picks it up automatically.
export const metadata: Metadata = {
  // Pages set `metadata.title` and it becomes e.g. "Dashboard | Next Template".
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
