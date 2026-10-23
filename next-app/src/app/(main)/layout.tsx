import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

/**
 * Layout for public pages: header + footer around every page in (main).
 * Each page sets its own gutter with `.page` / `.page-narrow`.
 */
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {/* The header is sticky, so the page needs no top offset */}
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
