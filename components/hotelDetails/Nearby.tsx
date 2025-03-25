"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";

interface Hotel {
  nearby_attractions: string[];
  nearby_hotels: string[];
  price_range: string;
}

const reviews = [
  {
    name: "Archan Kumar Adhikary",
    date: "Stayed 19 Feb, 2025",
    travelerType: "Group Traveller",
    review: "Nice hotel, lots of restrictions in this hotel. Good",
    rating: 3,
  },
  {
    name: "Karthik Aryaan",
    date: "Stayed 13 Jan, 2025",
    travelerType: "Group Traveller",
    review:
      "One hell of an experience. Hotel staff was so polite and cool. I had the best time of my life. I enjoyed staying here a lot. And also made some new friends. Would totally recommend staying here. Loved it <3",
    rating: 5,
  },
];

const Nearby = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [details, setDetails] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (name) {
      setLoading(true);
      fetch(`/api/getHotelDetails?name=${encodeURIComponent(name)}`)
        .then((res) => res.json())
        .then((data) => setDetails(data.details))
        .finally(() => setLoading(false));
    }
  }, [name]);

  return (
    <div className="bg-white p-6">
        {loading && <p></p>}
      {/* Nearby Attractions */}
      <h3 className="text-3xl font-semibold text-gray-700">Nearby Attractions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {details?.nearby_attractions?.map((attraction, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg hover:scale-105">
            <img
              src={
                [
                  "https://tse4.mm.bing.net/th?id=OIP.ZRQLcRGiP0kn5iXqv1FZVgHaEo&pid=Api&P=0&h=180",
                  "http://media.cntraveler.com/photos/57d87670fd86274a1db91acd/master/pass/most-beautiful-paris-pont-alexandre-iii-GettyImages-574883771.jpg",
                  "http://media.cntraveler.com/photos/57d961ce3e6b32bf25f5ad0f/master/pass/most-beautiful-paris-louvre-GettyImages-536267205.jpg",
                  "https://lp-cms-production.imgix.net/2021-06/500pxRF_113358197.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=20&dpr=5",
                ][index] || "https://example.com/default-image.jpg"
              }
              alt={attraction}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h1 className="text-2xl font-semibold">{attraction}</h1>
            </div>
          </div>
        ))}
      </div>

      {/* Similar Hotels */}
      <h3 className="text-3xl font-semibold text-gray-700 mt-10">Similar Hotels</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {details?.nearby_hotels?.map((hotel, index) => (
          <div key={index} className="border rounded-lg shadow-md p-4 hover:shadow-lg">
            <Image
              src="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
              alt={hotel}
              width={300}
              height={200}
              className="rounded-md object-cover w-full h-40"
            />
            <h4 className="text-lg font-semibold mt-2">{hotel}</h4>
            <h3 className="text-2xl font-semibold text-green-600">{details.price_range}</h3>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <h3 className="text-2xl font-semibold text-gray-700 mt-10">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-lg">
              {review.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900">
                {review.name} <span className="text-gray-500 font-normal">({review.date})</span>
              </h2>
              <p className="text-gray-600 text-sm">{review.travelerType}</p>
              <p className="mt-2 text-gray-800">{review.review}</p>
            </div>
            <div className="bg-green-500 text-white px-2 py-1 rounded-lg font-bold text-sm self-start">
              {review.rating}/5
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nearby;
