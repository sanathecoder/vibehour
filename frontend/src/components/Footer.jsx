import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* Col 1: Brand Logo & Bio */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-serif font-bold tracking-widest">VIBEHOUR</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Defining moments with precision and elegance. We curate premium timepieces for the modern individual who values detail, performance, and unmatched style.
          </p>
          <div className="flex gap-4 text-xl text-gray-400">
            <FaInstagram className="hover:text-white cursor-pointer transition" />
            <FaTwitter className="hover:text-white cursor-pointer transition" />
            <FaFacebook className="hover:text-white cursor-pointer transition" />
          </div>
        </div>

        {/* Col 2: Shop */}
        <div>
          <h4 className="font-semibold uppercase text-sm tracking-widest mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/shop/men" className="hover:text-white transition">Men's Collection</Link></li>
            <li><Link to="/shop/women" className="hover:text-white transition">Women's Collection</Link></li>
            <li><Link to="/shop/kids" className="hover:text-white transition">Kids Edition</Link></li>
            <li><Link to="/featured" className="hover:text-white transition">Featured</Link></li>
          </ul>
        </div>

        {/* Col 3: Support */}
        <div>
          <h4 className="font-semibold uppercase text-sm tracking-widest mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-white transition">Returns & Exchange</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div>
          <h4 className="font-semibold uppercase text-sm tracking-widest mb-6">Stay Connected</h4>
          <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive launches.</p>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-gray-900 border border-gray-800 p-2 text-sm text-white focus:outline-none focus:border-white w-full"
            />
            <button className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} VibeHour. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;