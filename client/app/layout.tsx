import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import { AuthProvider } from "@/store/AuthProvider";

export const metadata: Metadata = {
  title: "Cloud Computing CCP",
  description: "Cloud Computing CCP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("antialiased w-screen overflow-x-clip")}>
        <ReactQueryProvider>
          <AuthProvider>
            <Toaster richColors={true} position="top-right" />
            <main>{children}</main>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
