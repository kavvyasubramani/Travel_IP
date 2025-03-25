"use client";

import { MdLogin, MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";

const BookingConfirmation = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left Side - Hotel Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <img
          src="/armani.jpg"
          alt="Hotel"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Right Side - Booking Information */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white mt-10">
        <h2 className="text-2xl font-bold">Your booking is confirmed. Thank you!</h2>
        <p className="text-blue-500 font-semibold">
          Confirmation Code: <span className="text-gray-800">DLRWF</span>
        </p>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500">Dubai</p>
          <p className="text-xl font-bold">Armani Hotel</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col items-center gap-1">
            <MdLogin className="text-3xl text-gray-600" />
            <p className="text-lg font-bold uppercase">Check-in</p>
            <p className="text-gray-600">April 23, 2025</p>
          </div>
          <div className="text-gray-500 text-sm">5 days</div>
          <div className="flex flex-col items-center gap-1">
            <MdLogout className="text-3xl text-gray-600" />
            <p className="text-lg font-bold uppercase">Check-out</p>
            <p className="text-gray-600">April 28, 2025</p>
          </div>
        </div>
        
        <div className="mt-6 border-t pt-4 text-sm text-gray-600">
          <p><span className="font-semibold">Details:</span> Deluxe Suite</p>
          <p><span className="font-semibold">Status:</span> Confirmed</p>
        </div>

        <div className="mt-4 border-t pt-4 flex justify-between text-gray-800 font-semibold">
          <p>Total:</p>
          <p>$615.10</p>
        </div>

        <button 
          className="mt-10 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
