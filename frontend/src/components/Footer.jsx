const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white py-8 text-center text-xs font-light text-gray-400 tracking-wide mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        &copy; {new Date().getFullYear()} VibeHour. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;