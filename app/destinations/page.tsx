"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RiMapPinLine, RiTimeLine, RiArrowRightLine } from "react-icons/ri";
import { TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

interface Destination {
    name: string;
    location: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    duration: string;
    description: string;
}

const FALLBACK_IMAGE_URL = "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg";

const Destinations = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (query !== null && query !== undefined) {
            setLoading(true);
            setError(null);
            fetch(`/api/getDestinations?query=${encodeURIComponent(query)}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    if (!data.destinations || data.destinations.length === 0) {
                        setError("No destinations found for the given query.");
                    }
                    setDestinations(data.destinations || []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch destinations:", err);
                    setError("Failed to load destinations. Please try again later.");
                    setLoading(false);
                });
        }
    }, [query]);
    

    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-16 border-slate-200">
            {loading ? (
                <div className="flex justify-center items-center mt-6">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-tertiary rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-600 text-xl">
                    {error}
                </div>
            ) : destinations.length === 0 ? (
                <div className="text-center text-gray-600 text-xl">
                    No destinations found. Try a different search query.
                </div>
            ) : (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-12">
                    {destinations.map((destination) => (
                        <DestinationCard key={destination.name} destination={destination} />
                    ))}
                </div>
            )}
        </section>
    );
};

const DestinationCard = ({ destination }: { destination: Destination }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 group h-full flex flex-col">
            <Link href={`/destination?name=${encodeURIComponent(destination.name)}`} className="overflow-hidden relative block">
                <Image 
                    src={imageError ? FALLBACK_IMAGE_URL : destination.imageUrl} 
                    height={366} 
                    width={640} 
                    alt={destination.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                    onError={handleImageError}
                />
                <span className="bold-16 text-white bg-tertiary absolute top-4 right-4 px-4 py-2 rounded-full flex items-center gap-2 group-hover:bg-gray-500 shadow-md">
                    Explore <RiArrowRightLine className="text-lg" />
                </span>
            </Link>
            <div className="p-4 bg-white flex-grow flex flex-col">
                <div className="capitalize medium-22">
                    <span>{destination.name}</span>
                    <div className="flex items-center gap-x-2 my-1">
                        <RiMapPinLine className="text-gray-50" />
                        <span className="regular-16 text-gray-50">{destination.location}</span>
                    </div>
                </div>
                <hr className="mt-3" />
                <p className="my-3 text-gray-600 flex-grow">{destination.description}</p>
                <hr className="mb-3" />
                <div className="flexBetween">
                    <div className="flexCenter gap-x-4">
                        <div className="flexCenter gap-x-2 text-secondary">
                            {[...Array(Math.floor(destination.rating) || 0)].map((_, i) => (
                                <TbStarFilled key={i} />
                            ))}
                            {destination.rating && destination.rating % 1 !== 0 && <TbStarHalfFilled />}
                        </div>
                        <span className="medium-16">({destination.reviews})</span>
                    </div>
                    <div className="flexStart gap-2 text-gray-50">
                        <RiTimeLine className="text-lg" />
                        <span className="medium-16">{destination.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destinations;