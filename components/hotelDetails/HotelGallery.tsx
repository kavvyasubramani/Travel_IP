"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface Hotel {
    name: string;
    subtitle: string;
    description?: string;
    images?: string[];
}

function HotelGalleryContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const [details, setDetails] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && name) {
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

    if (!name) {
        return (
            <div className="w-full bg-white p-6 text-center">
                <p className="text-gray-600">No hotel selected</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="w-full bg-white p-6 text-center">
                <p className="text-gray-600 py-5 text-lg">Loading hotel details ....</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-white p-6 text-center">
                <p className="text-red-600">Error: {error}</p>
            </div>
        );
    }

    if (!details) {
        return (
            <div className="w-full bg-white p-6 text-center">
                <p className="text-gray-600">No hotel details available</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white">
            <div className="p-6 shadow-xl mx-0 mt-0 bg-white">
                <p className="text-sm tracking-widest text-gray-600 uppercase">{details.subtitle}</p>
                <h2 className="text-5xl font-serif font-light text-gray-700 mt-2">{details.name}</h2>
                <div className="w-12 h-0.5 bg-gray-400 my-4"></div>
                <p className="text-lg text-gray-700 leading-relaxed">{details.description}</p>
                <div className="grid grid-cols-3 mt-8">
                    <div className="col-span-2 ml-6">
                        <Image
                            src={"/room1.jpg"}
                            alt="Main hotel image"
                            width={850}
                            height={300}
                            className="rounded-lg shadow-md object-cover"
                        />
                    </div>
                    <div className="grid grid-rows-2 ml-4 gap-4">
                        {[1, 2].map((index) => (
                            <Image
                                key={index}
                                src={"/room1.jpg"} 
                                alt={`Gallery image ${index}`}
                                width={400}
                                height={180}
                                className="rounded-lg shadow-md object-cover h-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const HotelGallery = () => {
    return (
        <Suspense fallback={<div className="w-full bg-white p-6 text-center">Loading...</div>}>
            <HotelGalleryContent />
        </Suspense>
    );
};

export default HotelGallery;
