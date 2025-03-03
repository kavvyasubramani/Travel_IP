"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

// Define the hotel type
interface Hotel {
    name: string;
    location: string;
    amenities: string[];
    nearby_attractions: string[];
    ratings: { score: number; reviews: string[] };
    price_range: string;
    booking_options: string[];
    images?: string[];
    description?: string;
    features?: string;
    address?: string;
    rules?: string;
}

const HotelDetails = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const [details, setDetails] = useState<Hotel | null>(null);

    useEffect(() => {
        if (name) {
            fetch(`/api/getHotelDetails?name=${encodeURIComponent(name)}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Hotel Images:", data.details.images); // Debugging
                    setDetails(data.details);
                })
                .catch(() => setDetails(null));
        }
    }, [name]);

    return (
        <section className="w-full min-h-screen bg-white text-gray-900 font-sans">
            {/* Back Button */}
            <div className="absolute top-6 left-6">
                <a href="/destinations" className="text-gray-600 hover:text-gray-900 text-4xl">
                    <IoIosArrowBack size={42} />
                </a>
            </div>

            {/* Image Gallery */}
            <div className="w-full h-[500px] grid grid-cols-2 md:grid-cols-4 gap-2 mt-24">
                {details?.images && details.images.length > 0 ? (
                    details.images.map((img, index) => (
                        <div key={index} className="relative w-full h-full">
                            <Image
                                src={img}
                                alt={`Hotel Image ${index + 1}`}
                                width={300}
                                height={200}
                                objectFit="cover"
                                className="rounded-lg shadow-md"
                                unoptimized
                            />
                        </div>
                    ))
                ) : (
                    [...Array(4)].map((_, index) => (
                        <div key={index} className="relative w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                            <span className="text-gray-500">Image Unavailable</span>
                        </div>
                    ))
                )}
            </div>

            {/* Hotel Details Section */}
            <div className="w-full px-8 md:px-20 py-12">
                <h1 className="text-5xl font-bold text-gray-800">{details?.name || "Hotel Name"}</h1>
                <p className="text-lg text-gray-600 mt-1">{details?.address || "Hotel Address"}</p>

                {/* Ratings & Price */}
                <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-sm mt-6">
                    <span className="text-2xl font-semibold text-blue-600">
                        ⭐ {details?.ratings?.score || "N/A"}/5
                    </span>
                    <span className="text-2xl font-semibold text-green-600">
                        {details?.price_range || "Price Not Available"}
                    </span>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-700 mt-6 leading-relaxed">
                    {details?.description || "No description available."}
                </p>

                {/* Features & Amenities */}
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div className="p-6 border border-gray-200 shadow-md rounded-lg hover:shadow-lg transition-shadow">
                        <h2 className="text-3xl font-semibold text-blue-700">Room Features</h2>
                        <p className="text-lg text-gray-600 mt-3">{details?.features || "Not available"}</p>
                    </div>

                    <div className="p-6 border border-gray-200 shadow-md rounded-lg hover:shadow-lg transition-shadow">
                        <h2 className="text-3xl font-semibold text-purple-700">Amenities</h2>
                        <p className="text-lg text-gray-600 mt-3">
                            {details?.amenities?.join(", ") || "No amenities listed."}
                        </p>
                    </div>
                </div>

                {/* Nearby Attractions */}
                <div className="p-6 border border-gray-200 shadow-md rounded-lg mt-10 hover:shadow-lg transition-shadow">
                    <h2 className="text-3xl font-semibold text-orange-700">Nearby Attractions</h2>
                    <p className="text-lg text-gray-600 mt-3">
                        {details?.nearby_attractions?.join(", ") || "No nearby attractions listed."}
                    </p>
                </div>

                {/* Booking Section */}
                <div className="p-6 bg-white shadow-lg rounded-lg mt-12">
                    <h2 className="text-3xl font-semibold text-red-600">Booking Options</h2>
                    <p className="text-lg text-gray-600 mt-3">
                        {details?.booking_options?.join(", ") || "No booking options available."}
                    </p>
                    <button className="mt-6 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg transition">
                        Reserve Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HotelDetails;
