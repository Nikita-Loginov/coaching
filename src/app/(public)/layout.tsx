import { Header, Footer, Contacts } from "@/shared/ui";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />

      <main className="main">
        {children}

        <Contacts />
      </main>

      <Footer />
    </>
  );
}
