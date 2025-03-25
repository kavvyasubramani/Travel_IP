"use client";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "react-scroll/modules/components/Link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full shadow-md p-6 flex items-center justify-between bg-[#1C1C1C] text-white">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="BookMyJourney Logo" className="h-7" />
      </div>
      <nav className="flex space-x-11 text-lg font-medium">
        <a href="#" className="text-white-600 hover:text-blue-500">Overview</a>
        <Link href="/hotelDetails/HotelDescription" to={""}>
          <span className="cursor-pointer text-white-600 hover:text-blue-500">Features</span>
        </Link>
        <a href="#" className="text-white-600 hover:text-blue-500">Accessibility</a>
        <a href="#reviews-section" className="text-white-600 hover:text-blue-500">Reviews</a>
      </nav>
      <div className="flex items-center space-x-6">
        <a href="#" className="flex items-center space-x-1 hover:text-blue-500">
          <FaMapMarkerAlt />
          <span>View Map</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
