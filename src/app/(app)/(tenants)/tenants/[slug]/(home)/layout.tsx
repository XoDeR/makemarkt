import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar } from "@/modules/tenants/ui/components/navbar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const Layout = ({ children, params }: Props) => {
  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;