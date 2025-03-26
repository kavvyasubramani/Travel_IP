"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaConciergeBell, FaUtensils, FaWifi, FaSwimmingPool, FaSpa, FaParking } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Define the hotel type
interface Hotel {
    features?: string;
    ratings?: { score: number };
    price_range?: string;
    pet_policy?: string;
    parking_rules?:string;
    amenities?:string[];
    image?: string;
}

const FALLBACK_IMAGE = "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg";

const HotelDescriptionContent = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const [details, setDetails] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!name) {
            setError("No hotel name provided");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`/api/getHotelDetails?name=${encodeURIComponent(name)}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (!data || !data.details) {
                    throw new Error("No hotel details found");
                }
                setDetails(data.details);
            })
            .catch((err) => {
                console.error("Failed to fetch hotel details:", err);
                setError(err.message || "An unexpected error occurred");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [name]);

    if (loading) {
        return (
            <div className="w-full bg-white p-6 shadow-xl flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-white p-6 shadow-xl">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                    <Image 
                        src={FALLBACK_IMAGE} 
                        alt="Fallback hotel image" 
                        width={600} 
                        height={400} 
                        className="mt-4 rounded-lg object-cover"
                    />
                </div>
            </div>
        );
    }

    if (!details) {
        return (
            <div className="w-full bg-white p-6 shadow-xl">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">No Details Available: </strong>
                    <span className="block sm:inline">Unable to retrieve hotel information.</span>
                    <Image 
                        src={FALLBACK_IMAGE} 
                        alt="Fallback hotel image" 
                        width={600} 
                        height={400} 
                        className="mt-4 rounded-lg object-cover"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-6 shadow-xl">
            {/* Rest of the existing render logic remains the same */}
            {/* ... previous rendering code ... */}
		 <>
                {/* Hotel Image */}
                {/* <div className="mb-6">
                    <Image 
                        src={details.image || FALLBACK_IMAGE} 
                        alt={`${name} hotel`} 
                        width={1200} 
                        height={600} 
                        className="w-full h-[400px] object-cover rounded-lg"
                        onError={(e) => {
                            const imgElement = e.target as HTMLImageElement;
                            imgElement.onerror = null;
                            imgElement.src = FALLBACK_IMAGE;
                        }}
                    />
                </div> */}

                {/* Ratings & Price */}
                <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md mt-6">
                    <span className="text-xl text-blue-600">⭐ {details.ratings?.score || 'N/A'}/5</span>
                    <span className="text-2xl font-semibold text-green-600">{details.price_range || 'Price not available'}</span>
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
                            {details.pet_policy || "No specific pet policy available"}
                        </p>

                        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Parking</h3>
                        <p className="mt-4 text-lg text-gray-800">
                            {details.parking_rules || "No parking information available"}
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

        </div>
    );
};

const HotelDescription = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HotelDescriptionContent />
        </Suspense>
    );
};

export default HotelDescription;