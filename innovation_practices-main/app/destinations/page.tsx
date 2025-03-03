"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Destination {
    name: string;
    location: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviews: number;
    duration: string;
    description: string;
}

const Destinations = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`/api/getDestinations?query=${encodeURIComponent(query)}`)
                .then((res) => res.json())
                .then((data) => {
                    setDestinations(data.destinations || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [query]);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-[#f8f8f8]">
            <h1 className="text-5xl font-bold text-gray-900 mt-12 mb-10">
                {query ? `Top Destinations for ${query}` : "Exclusive Travel Deals"}
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl">
                Explore top-rated destinations with unbeatable offers. Whether you're seeking a relaxing getaway, a cultural adventure, or a thrilling experience, we bring you the best deals to make your dream trip a reality!
            </p>

            {loading ? (
                <p className="text-lg text-gray-500 mt-6">Loading...</p>
            ) : (
                <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {destinations.map((destination, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
                        >
                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={destination.imageUrl}
                                    alt={destination.name}
                                    className="w-full h-56 object-cover"
                                />
                                <span className="absolute top-3 left-3 bg-black text-white text-lg font-semibold px-3 py-1 rounded-full">
                                    ${destination.price}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h2 className="text-2xl font-bold">{destination.name}</h2>
                                <p className="text-gray-600 flex items-center gap-2 mt-1">
                                    <span>📍</span> {destination.location}
                                </p>
                                <p className="text-gray-500 text-sm mt-3">{destination.description}</p>

                                {/* Ratings & Duration */}
                                <div className="flex items-center justify-between mt-4">
                                    {/* Ratings */}
                                    <div className="flex items-center gap-1 text-orange-400">
                                        {"★".repeat(Math.floor(destination.rating))}
                                        {"☆".repeat(5 - Math.floor(destination.rating))}
                                        <span className="text-gray-600 text-sm ml-1">({destination.reviews})</span>
                                    </div>
                                    
                                    {/* Duration */}
                                    <div className="flex items-center text-gray-500 gap-1 text-sm">
                                        ⏳ {destination.duration}
                                    </div>
                                </div>

                                {/* Explore Button */}
                                <button
                                    onClick={() => router.push(`/destination?name=${encodeURIComponent(destination.name)}`)}
                                    className="mt-4 w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                                >
                                    Explore →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Destinations;
