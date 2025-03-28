"use client";
import { useState, useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";

const FALLBACK_IMAGE = "fallback.jpg";

const BookingForm = () => {
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const rooms = ["Deluxe", "Standard", "Executive Suite", "Family Room"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Deluxe");
  
  // New state for form validation
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors: string[] = [];

    // Check dates
    if (!checkInDate) {
      errors.push("Please select a check-in date");
    }
    if (!checkOutDate) {
      errors.push("Please select a check-out date");
    }
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      
      if (checkOut <= checkIn) {
        errors.push("Check-out date must be after check-in date");
      }
    }

    // Check room and guest counts
    if (guestCount > roomCount * 4) {
      errors.push("Too many guests for selected number of rooms");
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const updateCount = (type: "room" | "guest", delta: number, max: number) => {
    if (type === "room") {
      setRoomCount((prev) => Math.max(1, Math.min(prev + delta, max)));
    } else {
      setGuestCount((prev) => Math.max(1, Math.min(prev + delta, max)));
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const isValid = validateForm();

    if (isValid) {
      // Proceed with booking or API call
      try {
        // Simulate API call or booking process
        console.log("Booking submitted", {
          checkInDate,
          checkOutDate,
          roomCount,
          guestCount,
          selectedRoom
        });
        // Reset submission state after success
        setIsSubmitting(false);
      } catch (error) {
        console.error("Booking failed", error);
        setFormErrors(["Booking failed. Please try again."]);
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Error Handling */}
      {formErrors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <ul className="list-disc list-inside">
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Fallback Image */}
      {/* <div className="mb-6">
        <Image 
          src={FALLBACK_IMAGE} 
          alt="Hotel booking" 
          width={1200} 
          height={400} 
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </div> */}

      <div className="p-4 w-full bg-white flex items-center justify-between border border-gray-300 shadow-sm rounded-lg border-b">
        {/* Check-in Date */}
        <div className="flex items-center space-x-3 bg-white p-3">
          <IoCalendarOutline size={20} className="text-gray-600" />
          <div>
            <span className="text-xs text-gray-500 uppercase">CHECK-IN</span>
            <p className="text-lg font-medium">
              <input 
                type="date" 
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-transparent border-none focus:outline-none cursor-pointer" 
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
              />
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-l border-gray-300 h-10"></div>

        {/* Check-out Date */}
        <div className="flex items-center space-x-4 bg-white p-3">
          <IoCalendarOutline size={20} className="text-gray-600" />
          <div>
            <span className="text-xs text-gray-500 uppercase">CHECK-OUT</span>
            <p className="text-lg font-medium">
              <input 
                type="date" 
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-transparent border-none focus:outline-none cursor-pointer"
                min={checkInDate || new Date().toISOString().split('T')[0]} // Prevent dates before check-in
              />
            </p>
          </div>
        </div>

        {/* Rooms & Guests Dropdown */}
        <div className="relative w-64">
          <div
            className="flex items-center space-x-4 cursor-pointer p-3"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <FaRegUser size={20} className="text-gray-600" />
            <div>
              <span className="text-xs text-gray-500 uppercase">ROOMS & GUESTS</span>
              <p className="text-lg font-medium">
                {roomCount} Room, {guestCount} Guest
              </p>
            </div>
            <IoIosArrowDown size={20} className="text-gray-600" />
          </div>

          {dropdownVisible && (
            <div className="absolute mt-2 p-4 bg-white border rounded-lg shadow-lg w-full">
              {["Rooms", "Guests"].map((label, i) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <p className="font-medium">{label}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      className="p-2 border rounded"
                      onClick={() => updateCount(i ? "guest" : "room", -1, i ? 1 : 1)}
                    >
                      <AiOutlineMinus />
                    </button>
                    <span>{i ? guestCount : roomCount}</span>
                    <button
                      className="p-2 border rounded"
                      onClick={() => updateCount(i ? "guest" : "room", 1, i ? 10 : 5)}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Room Types Dropdown */}
        <div className="relative w-[200px]">
          <div
            className="flex items-center space-x-4 cursor-pointer p-3 bg-white min-w-[250px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdOutlineBedroomParent size={20} className="text-gray-600" />
            <div className="flex-1">
              <span className="text-xs text-gray-500 uppercase">ROOM TYPES</span>
              <p className="text-lg font-medium flex items-center whitespace-nowrap">
                {selectedRoom}
                <IoIosArrowDown size={20} className="text-gray-600 ml-2" />
              </p>
            </div>
          </div>

          {isOpen && (
            <div className="absolute mt-2 p-2 bg-white border rounded-lg shadow-lg w-full min-w-[250px]">
              {rooms.map((room, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedRoom(room);
                    setIsOpen(false);
                  }}
                >
                  {room}
                </div> 
              ))}
            </div>
          )}
        </div>

        {/* View Rates Button */}
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
            ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-700'}
            text-white px-6 py-2 rounded-full font-medium transition-colors duration-300
          `}
        >
          {isSubmitting ? 'Processing...' : 'View Rates'}
        </button>
      </div>
    </div>
  );
};

export default BookingForm;