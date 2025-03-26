"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaConciergeBell, FaUtensils, FaWifi, FaSwimmingPool, FaSpa, FaParking } from "react-icons/fa";
import Link from "next/link";

// Define the hotel type
interface Hotel {
    features?: string;
    ratings?: { score: number };
    price_range?: string;
    pet_policy?: string;
    parking_rules?:string;
    amenities?:string[];
}

const staticAmenities = [
    { name: "Free WiFi", icon: <FaWifi className="text-blue-500 text-xl" /> },
    { name: "Indoor Pool", icon: <FaSwimmingPool className="text-blue-600 text-xl" /> },
    { name: "Swimming Pool", icon: <FaSwimmingPool className="text-blue-600 text-xl" /> },
    { name: "Indoor Pool", icon: <FaSwimmingPool className="text-blue-600 text-xl" /> },
    { name: "Spa", icon: <FaSpa className="text-pink-500 text-xl" /> },
    { name: "Parking", icon: <FaParking className="text-gray-700 text-xl" /> },
    { name: "24-Hour Room Service", icon: <FaConciergeBell className="text-green-500 text-xl" /> },
    { name: "Restaurant", icon: <FaUtensils className="text-orange-500 text-xl" /> }
];

const HotelDescription = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const [details, setDetails] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (name) {
            setLoading(true);
            fetch(`/api/getHotelDetails?name=${encodeURIComponent(name)}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch hotel details");
                    return res.json();
                })
                .then((data) => {
                    setDetails(data.details);
                    setError(null);
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [name]);

    return (
        <div className="w-full bg-white p-6 shadow-xl">
            {loading && <p></p>}
            {error && <p className="text-center text-red-600">Error: {error}</p>}
            {details && (
                <>
                    {/* Ratings & Price */}
                    <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md mt-6">
                        <span className="text-xl text-blue-600">⭐ {details.ratings?.score}/5</span>
                        <span className="text-2xl font-semibold text-green-600">{details.price_range}</span>
                    </div>

                    {/* Features & Amenities */}
                    <div className="grid md:grid-cols-3 gap-8 mt-12 mb-10">
                    <div>
                            <h3 className="text-2xl font-semibold text-gray-900">FEATURED AMENITIES ON-SITE</h3>
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                {details.amenities && details.amenities.length > 0 ? (
                                    details.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center text-lg text-gray-800">
                                            <span className="mr-2">
                                                {amenity === "Free WiFi" && <FaWifi className="text-blue-500 text-xl" />}
                                                {amenity === "Outdoor Pool" && <FaSwimmingPool className="text-blue-600 text-xl" />}
                                                {amenity === "Spa" && <FaSpa className="text-pink-500 text-xl" />}
                                                {amenity === "Parking" && <FaParking className="text-gray-700 text-xl" />}
                                                {amenity === "24-Hour Room Service" && <FaConciergeBell className="text-green-500 text-xl" />}
                                                {amenity === "Restaurant" && <FaUtensils className="text-orange-500 text-xl" />}
                                            </span>
                                            {amenity}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No amenities available</p>
                                )}
                            </div>
                        </div>

                        {/* Room Features */}
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">ROOM FEATURES</h3>
                            <p className="mt-4 text-lg text-gray-800">{details.features || "Not available"}</p>
                        </div>

                        {/* Pet & Parking Policy */}
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">Pet Policy</h3>
                            <p className="mt-4 text-lg text-gray-800">
                                {details.pet_policy}
                            </p>

                            <h3 className="mt-6 text-2xl font-semibold text-gray-900">Parking</h3>
                            <p className="mt-4 text-lg text-gray-800">
                                {details.parking_rules}
                            </p>
                        </div>
                    </div>

                    {/* Reserve Now Button */}
                    <div className="flex justify-center mt-8 mb-12">
                        <Link href="/booking-confirmation">
                            <button className="bg-gray-900 text-white w-64 px-6 py-3 text-lg font-semibold rounded-md hover:bg-gray-800 transition">
                                Reserve Now
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default HotelDescription;
