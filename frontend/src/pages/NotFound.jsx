import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-6xl font-light text-gray-900 mb-6 tracking-tighter">404</h1>
        <p className="text-sm font-light text-gray-500 uppercase tracking-widest mb-10">
          The page you are looking for does not exist.
        </p>
        
        <Link 
          to="/" 
          className="bg-black text-white px-8 py-3 text-xs font-medium uppercase tracking-widest hover:bg-gray-900 transition-colors rounded-sm"
        >
          Return Home
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;