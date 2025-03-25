"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Hotel {
  famous_dish: string;
  images: { fitness: string; pool: string };
}

const ViewMore = () => {
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

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="relative ml-[-32px] w-[1600px] h-[500px] bg-black text-white flex">
      {loading && <p></p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
        <div className="flex-1 flex flex-col justify-center px-16">
          <h2 className="text-5xl font-serif">{details?.famous_dish || "Etereo"}</h2>
          <p className="mt-4 text-white-600 max-w-md">
            Discover unique rooftop scene with outdoor pool, amazing views and delicious sharing plates.
          </p>
          <button className="mt-6 px-2 py-2 w-20 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-300 transition">
            Explore
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <img
            src={details?.images?.fitness || "https://cache.marriott.com/is/image/marriotts7prod/ak-milak-cocktail-etereo-14239:Classic-Hor?wid=750&fit=constrain"}
            alt="Etereo Rooftop"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="flex flex-col items-center py-12 bg-white">
        <h2 className="text-3xl font-light text-gray-700 mb-8 text-center">More Ways to Enjoy Your Stay</h2>
        <div className="flex flex-col md:flex-row items-center max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="w-full md:w-1/2">
            <Image
              src={details?.images?.fitness || "https://cache.marriott.com/is/image/marriotts7prod/ak-milak-gym-18957:Wide-Hor?wid=1318&fit=constrain"}
              alt="Fitness Center"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase">Fitness</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">Fitness Center</h3>
            <p className="text-gray-600 mt-2">Gym for hotel guests offers cardio equipment, weight training machines, hand weights, and skill-building tools.</p>
            <button className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800">See More</button>
          </div>
        </div>
        
        <div className="flex flex-col mt-9 md:flex-row items-center max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="w-full md:w-1/2 p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">Swimming Pool</h3>
            <p className="text-gray-600 mt-2">Dive into relaxation! A joyful splash zone for all ages. Create memories, one splash at a time.</p>
            <button className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800">See More</button>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src={details?.images?.pool || "https://cache.marriott.com/is/image/marriotts7prod/ak-milak--rooftop-pool-and-d-11124-10924:Wide-Hor?wid=1318&fit=constrain"}
              alt="Swimming Pool"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
