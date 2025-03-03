"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface Attraction {
    name: string;
    description: string;
    image: string;
}

interface Activity {
    name: string;
    description: string;
}

interface Cuisine {
    name: string;
    description: string;
}

interface TravelTip {
    tip: string;
    description: string;
}

interface Hotel {
    name: string;
    description: string;
    image: string;
}

interface DestinationDetails {
    location: { country: string; coordinates: Coordinates };
    popular_attractions: Attraction[];
    best_time_to_visit: string;
    activities: Activity[];
    local_cuisine: Cuisine[];
    travel_tips: TravelTip[];
    hotels: Hotel[];
}

const Destination = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const name = searchParams.get("name");
    const [details, setDetails] = useState<DestinationDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (name) {
            setLoading(true);
            setError(null);
            fetch(`/api/getDestinationDetails?name=${encodeURIComponent(name)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                        setDetails(null);
                    } else {
                        setDetails(data.details);
                    }
                })
                .catch(() => setError("Failed to fetch destination details."))
                .finally(() => setLoading(false));
        }
    }, [name]);

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="relative h-80 w-full rounded-xl overflow-hidden bg-cover bg-center flex items-center justify-center shadow-lg"
                style={{ backgroundImage: details ? `url(${details.popular_attractions[0]?.image})` : "" }}>
                <h1 className="text-5xl font-extrabold text-white backdrop-blur-lg px-4 py-2 rounded-lg shadow-xl">{name}</h1>
            </div>

            {loading && <p className="text-center text-gray-500 mt-6">Loading...</p>}

            {!loading && details && (
                <div className="mt-10 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {details.popular_attractions.map((attraction, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                <img src={attraction.image} alt={attraction.name} className="w-full h-56 object-cover" />
                                <div className="p-5">
                                    <h3 className="text-xl font-bold">{attraction.name}</h3>
                                    <p className="text-gray-600 mt-2">{attraction.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold">🏨 Hotels</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {details.hotels.map((hotel, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer" onClick={() => router.push(`/hotelDetails?name=${encodeURIComponent(hotel.name)}`)}>
                                <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                                <h3 className="text-lg font-bold">{hotel.name}</h3>
                                <p className="text-gray-600">{hotel.description}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold">🎯 Activities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {details.activities.map((activity, index) => (
                            <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-semibold">{activity.name}</h3>
                                <p className="text-gray-600">{activity.description}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold">🍽️ Local Cuisine</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {details.local_cuisine.map((dish, index) => (
                            <div key={index} className="bg-green-100 p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-semibold">{dish.name}</h3>
                                <p className="text-gray-600">{dish.description}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold">💡 Travel Tips</h2>
                    <ul className="list-disc list-inside bg-yellow-100 p-5 rounded-lg shadow-lg">
                        {details.travel_tips.map((tip, index) => (
                            <li key={index} className="text-gray-700 font-semibold">{tip.tip}: <span className="font-normal">{tip.description}</span></li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default Destination;