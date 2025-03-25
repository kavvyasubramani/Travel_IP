import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Logo & Social Links */}
        <div className="flex flex-col items-start">
          <img src="/logo.png" alt="Logo" className="w-40 h-auto mb-2" />
          <p className="mt-2">Follow us</p>
          <div className="flex gap-4 mt-2">
            <FaFacebookF className="cursor-pointer hover:text-gray-400" />
            <FaTwitter className="cursor-pointer hover:text-gray-400" />
            <FaInstagram className="cursor-pointer hover:text-gray-400" />
            <FaYoutube className="cursor-pointer hover:text-gray-400" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick links</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-gray-400">Attractions</Link></li>
            <li><Link href="#" className="hover:text-gray-400">Experiences</Link></li>
            <li><Link href="#" className="hover:text-gray-400">Festivals & Events</Link></li>
            <li><Link href="#" className="hover:text-gray-400">FAQs</Link></li>
            <li><Link href="#" className="hover:text-gray-400">Content Hub</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p>Sign up for exciting news, updates, and travel ideas.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 px-3 py-2 rounded bg-gray-800 text-white outline-none"
          />
          <button className="mt-3 bg-red-600 px-4 py-2 text-white rounded hover:bg-red-700">
            Subscribe Now
          </button>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3">Scan to chat</h3>
          <img src="/qr.png" alt="Scan to chat" className="w-24 h-24 mx-auto" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 text-center py-4 text-sm">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="#" className="hover:text-gray-400">Terms of Use</Link>
          <Link href="#" className="hover:text-gray-400">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-400">Contact Us</Link>
        </div>
        <p className="mt-2 text-gray-500">© 2025 BookMyJourney. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
