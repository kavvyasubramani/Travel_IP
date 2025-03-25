"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const destinations = [
  { name: "India", image: "/india.jpg" },
  { name: "Dubai", image: "/dubai.jpg" },
  { name: "Singapore", image: "/singapore.jpg" },
  { name: "Italy", image: "/italy.jpg" },
  { name: "Switzerland", image: "/switzerland.jpg" },
];

const DestinationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextDestination = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const prevDestination = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextDestination, 3000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="relative w-screen h-screen flex items-center justify-center bg-black text-white overflow-hidden m-0 p-0">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={destinations[currentIndex].image}
          alt={destinations[currentIndex].name}
          layout="fill"
          objectFit="cover"
          className="opacity-80 transition-all duration-500"
        />
      </div>

      {/* Heading & Subheading */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10 text-center px-6 text-white">
        <h2 className="text-5xl md:text-6xl font-bold">DESTINATIONS</h2>
        <p className="text-lg md:text-xl mt-2 text-white">— for every bucket list —</p>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 text-center">
        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prevDestination}
            className="text-4xl p-2 bg-white/30 rounded-full hover:bg-white/50 transition"
          >
            <RiArrowLeftSLine />
          </button>
          <h3 className="text-2xl md:text-3xl font-semibold">
            {destinations[currentIndex].name}
          </h3>
          <button
            onClick={nextDestination}
            className="text-4xl p-2 bg-white/30 rounded-full hover:bg-white/50 transition"
          >
            <RiArrowRightSLine />
          </button>
        </div>

        {/* Discover More Button */}
        <Link href="/destinations">
          <button className="mt-6 px-6 py-3 bg-tertiary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all">
            Discover more
          </button>
        </Link>
      </div>
    </section>
  );
};

export default DestinationSection;
