'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function SereneHavenLodge() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const images = [
    '/images/hotel-room-interior-with-bedroom-area-living-space-kitchen.jpg',
    '/images/interior-modern-comfortable-hotel-room (1).jpg',
    '/images/interior-modern-comfortable-hotel-room.jpg'
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Image Carousel */}
      <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={10}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  className="mb-6"
>
  {images.map((image, index) => (
    <SwiperSlide key={index}>
      <Image alt="" src={image} width={800} height={600} objectFit="cover"
      />
      </SwiperSlide>
      ))}
      </Swiper>

    

      
      <h1 className="text-4xl font-bold text-center">Serene Haven Lodge</h1>
      <p className="text-center text-gray-600 mt-2">Aspen, CO • 4 Bedrooms • 6 Bathrooms • 10 Guests</p>
      
      <div className="flex flex-col lg:flex-row mt-8 gap-6">
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-semibold">The Retreat</h2>
          <p className="text-gray-700">Serene Haven Lodge by Mountain Escapes</p>
          <p className="mt-4"><strong>PET POLICY:</strong> Pet-friendly retreat with a $75 pet fee per pet.</p>
          <p><strong>VERIFICATION:</strong> ID Collection, Rental Agreement, 21+ Minimum Age.</p>
          <p className="mt-4"><strong>Socials:</strong></p>
          <ul className="list-disc ml-6">
            <li>FB: Mountain Escapes</li>
            <li>IG: @MountainEscapesLodge</li>
            <li>TikTok: @SereneHavenCO</li>
          </ul>
          <h3 className="mt-6 text-xl font-semibold">THE SPACE:</h3>
          <p className="text-gray-700">
            Escape to <strong>Serene Haven Lodge</strong>, a modern alpine retreat perfect for families, ski vacations,
            corporate getaways, and adventure-seeking travelers. Nestled in the scenic mountains of Aspen, this
            luxurious lodge offers breathtaking views, cozy fireplaces, and easy access to ski resorts.
          </p>
        </div>

        {/* Booking Section */}
        <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Check Availability</h3>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Check-In" />
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Check-Out" />
          <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Guests" />
          <button className="w-full bg-orange-600 text-white py-2 rounded">Check Availability</button>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-700">Have questions about this lodge?</p>
        <button className="mt-2 border border-gray-400 px-4 py-2 rounded hover:bg-gray-200">Contact Property Manager</button>
      </div>
    </div>
  );
}
