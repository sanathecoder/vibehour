import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Global Brand Navbar */}
      <Navbar />

      {/* Dynamic Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;