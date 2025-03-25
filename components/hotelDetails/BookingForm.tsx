"use client";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const BookingForm = () => {
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const rooms = ["Deluxe", "Standard", "Executive Suite", "Family Room"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Deluxe");

  const updateCount = (type: "room" | "guest", delta: number, max: number) => {
    if (type === "room") {
      setRoomCount((prev) => Math.max(1, Math.min(prev + delta, max)));
    } else {
      setGuestCount((prev) => Math.max(1, Math.min(prev + delta, max)));
    }
  };

  return (
    <div className="p-4 w-full bg-white flex items-center justify-between border border-gray-300 shadow-sm rounded-lg border-b">
      {/* Check-in Date */}
      <div className="flex items-center space-x-3 bg-white p-3">
        <IoCalendarOutline size={20} className="text-gray-600" />
        <div>
          <span className="text-xs text-gray-500 uppercase">CHECK-IN</span>
          <p className="text-lg font-medium">
            <input type="date" className="bg-transparent border-none focus:outline-none cursor-pointer" />
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
            <input type="date" className="bg-transparent border-none focus:outline-none cursor-pointer" />
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-l border-gray-300 h-10"></div>

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

      {/* Divider */}
      <div className="border-l border-gray-300 h-10"></div>

      <div className="relative w-[200px]"> {/* Set fixed width */}
      {/* Toggle Button (Prevents Shifting) */}
      <div
        className="flex items-center space-x-4 cursor-pointer p-3  bg-white min-w-[250px]"
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

      {/* Dropdown Menu */}
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
      <button className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 rounded-full font-medium">View Rates</button>
    </div>
  );
};

export default BookingForm;
