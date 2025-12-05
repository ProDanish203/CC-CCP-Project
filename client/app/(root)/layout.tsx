import { Header } from "@/components/shared";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-bg min-h-screen w-screen">
      <Header />
      <div className="">{children}</div>
    </main>
  );
}
