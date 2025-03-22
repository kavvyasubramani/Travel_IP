"use client";
import { useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { FaConciergeBell, FaMapMarkerAlt, FaMoon, FaPhoneAlt, FaRegHeart, FaRegUser, FaSun, FaUtensils } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { FaWifi, FaSwimmingPool, FaSpa, FaParking } from "react-icons/fa";
import router from "next/router";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


// Define the hotel type
interface Hotel {
    name: string;
    subtitle:string;
    location: string;
    famous_dish:string;
    amenities: string[];
    nearby_attractions: string[];
    nearby_hotels:string[];
    ratings: { score: number; reviews: string[] };
    price_range: string;
    booking_options: string[];
    images?: string[];
    description?: string;
    features?: string;
    reviews:string[];
    address?: string;
    rules?: string;
    image: string;
}

const reviews = [
  {
    name: "Archan Kumar Adhikary",
    date: "Stayed 19 Feb, 2025",
    travelerType: "Group Traveller",
    review: "nice hotel, lots of restrictions in this hotel good",
    rating: 3,
  },
  {
    name: "Karthik Aryaan",
    date: "Stayed 13 Jan, 2025",
    travelerType: "Group Traveller",
    review:
      "One hell of an experience. Hotel staff was so polite and cool. I had the best time of my life. I enjoyed staying here a-lot. And also made some new friends. Would totally recommend to stay here. Loved it <3",
    rating: 5,
  },
];

const staticAmenities = [
    { name: "Free WiFi", icon: <FaWifi className="text-blue-500 text-xl" /> },
    { name: "Outdoor Pool", icon: <FaSwimmingPool className="text-blue-600 text-xl" /> },
    { name: "Spa", icon: <FaSpa className="text-pink-500 text-xl" /> },
    { name: "Parking", icon: <FaParking className="text-gray-700 text-xl" /> },
    { name: "24-Hour Room Service", icon: <FaConciergeBell className="text-green-500 text-xl" /> },
    { name: "Restaurant", icon: <FaUtensils className="text-orange-500 text-xl" /> }
];

const HotelDetails = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const [details, setDetails] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showMoreImages, setShowMoreImages] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    
    const updateCount = (id: string, change: number, limit: number) => {
        let elem = document.getElementById(id);
        if (elem) {
          let value = parseInt(elem.innerText, 10);
          if ((change === -1 && value > 1) || (change === 1 && value < limit)) {
            elem.innerText = (value + change).toString();
          }
        }
      };

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
      <section className={`w-full min-h-screen font-sans transition-all duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <header className="sticky top-0 z-50 w-full shadow-md p-6 flex items-center justify-between border-b bg-gray-700 border-gray-200 text-white">
      
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.png" // Replace with your actual hotel logo URL
          alt="Casa Brera Logo"
          className="h-7"
        />
      </div>

      {/* Navigation */}
      <nav className="flex space-x-11 text-lg font-medium">
        <a href="#" className="text-white-600 hover:text-blue-500">Overview</a>
        <a href="#" className="text-white-600 border-b-2 border-blue-500">Rooms</a>
        <a href="#a-section" className="text-white-600 hover:text-blue-500">Accessibility</a>
        <a href="#reviews-section" className="text-white-600 hover:text-blue-500">Reviews</a>
      </nav>

      {/* Contact & Location */}
      <div className="flex items-center space-x-6">
        <a href="#" className="flex items-center space-x-1 hover:text-blue-500">
          <FaMapMarkerAlt />
          <span>View Map</span>
        </a>
      </div>
    </header>


    <div className="p-4 max-w-7x2 mx-auto bg-white flex items-center justify-between border border-gray-300 shadow-sm rounded-lg">
      
      {/* Check-in Date */}
<div className="flex items-center space-x-3 bg-white p-3 ">
  <IoCalendarOutline size={20} className="text-gray-600" />
  <div>
    <span className="text-xs text-gray-500 uppercase">CHECK-IN</span>
    <p className="text-lg font-medium">
      <input 
        type="date" 
        className="bg-transparent border-none focus:outline-none cursor-pointer"
      />
    </p>
  </div>
</div>


      {/* Divider */}
      <div className="border-l border-gray-300 h-10"></div>

      {/* Check-out Date */}
<div className="flex items-center space-x-4 bg-white p-3 ">
  <IoCalendarOutline size={20} className="text-gray-600" />
  <div>
    <span className="text-xs text-gray-500 uppercase">CHECK-OUT</span>
    <p className="text-lg font-medium">
      <input 
        type="date" 
        className="bg-transparent border-none focus:outline-none cursor-pointer"
      />
    </p>
  </div>
</div>
      
      {/* Divider */}
      <div className="border-l border-gray-300 h-10"></div>

      <div className="relative w-64">
      {/* Dropdown Trigger */}
      <div className="flex items-center space-x-4 cursor-pointer p-3 "
        onClick={() => document.getElementById("dropdown")?.classList.toggle("hidden")}>
        <FaRegUser size={20} className="text-gray-600" />
        <div>
          <span className="text-xs text-gray-500 uppercase">ROOMS & GUESTS</span>
          <p className="text-lg font-medium"><span id="room">1</span> Room, <span id="guest">1</span> Guest</p>
        </div>
        <IoIosArrowDown size={20} className="text-gray-600" />
      </div>

      {/* Dropdown */}
      <div id="dropdown" className="hidden absolute mt-2 p-4 bg-white border rounded-lg shadow-lg w-full">
        {["Rooms", "Guests"].map((label, i) => (
          <div key={i} className="flex justify-between items-center py-2">
            <p className="font-medium">{label}</p>
            <div className="flex items-center space-x-4">
              <button className="p-2 border rounded" onClick={() => updateCount(i ? "guest" : "room", -1, i ? 1 : 1)}>
                <AiOutlineMinus />
              </button>
              <span id={i ? "guest" : "room"}>1</span>
              <button className="p-2 border rounded" onClick={() => updateCount(i ? "guest" : "room", 1, i ? 10 : 5)}>
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Divider */}
      <div className="border-l border-gray-300 h-10"></div>

      {/* Special Rates */}
      <div className="flex items-center space-x-4 cursor-pointer">
        <MdOutlineBedroomParent size={20} className="text-gray-600" />
        <div>
          <span className="text-xs text-gray-500 uppercase">SPECIAL RATES</span>
          <p className="text-lg font-medium">Lowest Regular Rate</p>
        </div>
        <IoIosArrowDown size={20} className="text-gray-600" />
      </div>

      {/* View Rates Button */}
      <button className="bg-gray-700 text-white px-6 py-2 rounded-full font-medium">
        View Rates
      </button>

    </div>

            {/* Loading and Error Handling */}
            {loading && <p className="text-center text-gray-600 mt-6">Loading hotel details...</p>}
            {error && <p className="text-center text-red-600 mt-6">Error: {error}</p>}

            {/* Hotel Details */}
            {details && (
                <div className="max-w-6x1 mx-auto bg-white p-8 rounded-xl shadow-xl mt-5">
                {/* Subtitle */}
                <p className="text-sm tracking-widest text-gray-600 uppercase">
                    {details.subtitle}
                </p>

               {/* Title */}
                    <div className="mt-2">
                    <h2 className="text-5xl font-serif font-light text-gray-700">
                        {details.name}
                    </h2>
                    </div>
 

                {/* Divider */}
                <div className="w-12 h-0.5 bg-gray-400 mx-3 my-6"></div>

                {/* Description */}
                <p className="text-lg text-gray-700 leading-relaxed max-w-7xl mx-auto mt-4">
                    {details.description}
                </p>
             <div>
 

      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-3 mt-11">
        {/* Main Image - Spanning Two Columns */}
        <div className="col-span-2 pl-16">
          <Image
            src={details.images?.[0] || "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"}
            alt="Main hotel image"
            width={850}
            height={300}
            className="rounded-lg shadow-md object-cover  "
          />
        </div>

        {/* Two Smaller Images */}
        <div className="grid grid-rows-2 gap-3 -ml-14 pr-2">
          {[1, 2].map((index) => (
            <Image
              key={index}
              src={
                details.images?.[index] ||
                "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
              }
              alt={`Gallery image ${index}`}
              width={400}
              height={180}
              className="rounded-lg shadow-md object-cover h-full"
            />
          ))}
        </div>
      </div>

      {/* "View More" Button - Positioned Over Small Images */}
      <div className="absolute bottom-[-254px] right-[106px] transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg text-center z-50">

      <button
        onClick={() => setShowMoreImages(!showMoreImages)}
        className="text-black hover:text-red-800 text-lg font-semibold transition-all duration-300"
      >
        {showMoreImages ? "View Less" : "View More"}
      </button>
    </div> 

      {/* Show More Images - Scrollable Row */}
{showMoreImages && (
  <div className="mt-5 flex space-x-4 overflow-x-auto scrollbar-hide p-2">
    {[1, 2, 3, 4, 5,6,7,8].map((index) => (
      <div key={`more-${index}`} className="flex-none w-30">
        <Image
          src={
            details.images?.[index] ||
            "https://photos.mandarinoriental.com/is/image/MandarinOriental/dubai-suite-skyline-view-bedroom"
          }
          alt={`More gallery image ${index}`}
          width={300}
          height={150}
          className="rounded-lg shadow-md object-cover w-full"
        />
      </div>
    ))}
  </div>
)}

    </div>

                    {/* Ratings & Price */}
                    <div id="a-section" className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md mt-11">
                        <span className="teibold text-blue-600">⭐ {details.ratings?.score}/5</span>
                        <span className="text-2xl font-semibold text-green-600">{details.price_range}</span>
                    </div>

                    

                    
                    {/* Features & Amenities */}
<div className="grid md:grid-cols-3 gap-8 mt-[80px] mb-[70px]">
    {/* Featured Amenities */}
    <div>
        <h3 className="text-2xl font-semibold text-gray-900">FEATURED AMENITIES ON-SITE</h3>
        <div className="grid grid-cols-2 gap-8 mt-8">
            {staticAmenities.map((amenity, index) => (
                <div key={index} className="flex items-center text-lg text-gray-800">
                    <span className="mr-2">{amenity.icon}</span>
                    {amenity.name}
                </div>
            ))}
        </div>
    </div>

    {/* Hotel Information */}
    <div>
        <h3 className="text-2xl font-semibold text-gray-900">ROOM FEATURES</h3>
        <p className="mt-2 text-lg text-gray-800 mt-8">{details?.features || "Not available"}</p>
    </div>

    {/* Pet & Parking Policy */}
    <div>
        <h3 className="text-2xl font-semibold text-gray-900">Pet Policy</h3>
        <p className="mt-2 text-lg text-gray-800">
            Pets Welcome<br />
            1 pet 15kg max per room with non-refundable fee<br />
            Non-Refundable Pet Fee Per Stay: €125.00<br />
            Maximum Pet Weight: 15.0kgs<br />
            Maximum Number of Pets in Room: 1
        </p>

        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Parking</h3>
        <p className="mt-2 text-lg text-gray-800">
            Valet<br />
            Daily: €80.00
        </p>
    </div>
</div>

{/* Reserve Now Button */}
<div className="flex justify-center mt-8 mb-12">
    <button className="bg-gray-900 text-white w-64 px-6 py-3 text-lg font-semibold rounded-md hover:bg-gray-800 transition">
        Reserve Now
    </button>
</div>



<div className="relative ml-[-32px] w-[1600px] h-[500px] bg-black text-white flex">
      {/* Left Section - Text Content */}
      <div className="flex-1 flex flex-col justify-center px-16     ">
      <h2 className="text-5xl font-serif">{details?.famous_dish || "Etereo"}</h2>
        <p className="mt-4 text-white-600 max-w-md">
          Discover Milan’s unique rooftop scene with outdoor pool, amazing views and delicious sharing plates.
        </p>
        <button className="mt-6 px-2 py-2 w-20 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-300 transition">
  Explore
</button>

      </div>

      {/* Right Section - Static Image */}
      <div className="flex-1 overflow-hidden">
        <img
          src="https://cache.marriott.com/is/image/marriotts7prod/ak-milak-cocktail-etereo-14239:Classic-Hor?wid=750&fit=constrain"
          alt="Etereo Rooftop"
          className="w-full h-full object-cover"
        />
      </div>
    </div>


    <div className="flex flex-col items-center py-12 bg-white">
      {/* Section Title */}
      <h2 className="text-3xl font-light text-gray-700 mb-8 text-center">
        More Ways to Enjoy Your Stay
      </h2>

      {/* Card Container */}
      <div className="flex flex-col md:flex-row items-center max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="https://cache.marriott.com/is/image/marriotts7prod/ak-milak-gym-18957:Wide-Hor?wid=1318&fit=constrain"
            alt="Fitness Center"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 p-8 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase">
            Fitness
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-1">
            Fitness Center
          </h3>
          <p className="text-gray-600 mt-2">
            Gym for hotel guests offers cardio equipment, weight training
            machines, hand weights, and skill-building tools.
          </p>

          {/* Button */}
          <button className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800">
            See More
          </button>
        </div>
      </div>

            {/* Card Container */}
      <div className="flex flex-col mt-9 md:flex-row items-center max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left Side - content2 */}
        <div className="w-full md:w-1/2 p-8 text-center">
          
          <h3 className="text-2xl font-semibold text-gray-900 mt-1">
            Swimming Pool
          </h3>
          <p className="text-gray-600 mt-2">
          "Dive into relaxation!" "A joyful splash zone for all ages.""Dive in, the fun is fine!" "Create memories, one splash at a time."
          </p>

          {/* Button */}
          <button className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800">
            See More
          </button>
        </div>

        {/* Right Side - Image2 */}
        <div className="w-full md:w-1/2">
          <Image
            src="https://cache.marriott.com/is/image/marriotts7prod/ak-milak--rooftop-pool-and-d-11124-10924:Wide-Hor?wid=1318&fit=constrain"
            alt="Fitness Center"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
     
     {/* Heading */}
  <h3 className="text-3xl mt-7 font-semibold text-gray-700 mb-4">Nearby Attractions</h3>

    <div className="w-full max-w-8xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      
    {details?.nearby_attractions?.map((attraction, index) => (
  <div
    key={index}
    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
  >
    {/* Image */}
    <div className="relative">
      <img
        src={
          index === 0
            ? "https://tse4.mm.bing.net/th?id=OIP.ZRQLcRGiP0kn5iXqv1FZVgHaEo&pid=Api&P=0&h=180"
            : index === 1
            ? "http://media.cntraveler.com/photos/57d87670fd86274a1db91acd/master/pass/most-beautiful-paris-pont-alexandre-iii-GettyImages-574883771.jpg"
            : index === 2
            ? "http://media.cntraveler.com/photos/57d961ce3e6b32bf25f5ad0f/master/pass/most-beautiful-paris-louvre-GettyImages-536267205.jpg"
            : index === 3
            ? "https://lp-cms-production.imgix.net/2021-06/500pxRF_113358197.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=20&dpr=5"
            : "https://example.com/default-image.jpg" // Default image for all others
        }
        alt={attraction}
        className="w-full h-56 object-cover"
      />
    </div>


      {/* Content */}
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{attraction}</h1>

      </div>
    </div>
  ))}
</div>



                    {/* SH Section - Similar Hotels in Grid Format */}
<div className="p-6 ml-[-20px] mt-10">
    <h3 className="text-3xl font-semibold text-gray-700">Similar Hotels</h3>


    {/* Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {details?.nearby_hotels && details.nearby_hotels.length > 0 ? (
            details.nearby_hotels.map((hotel, index) => {
                console.log("Rendering Hotel:", hotel); // Debugging

                return (
                    <div 
                        key={`sh-${index}`} 
                        className="border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                        onClick={() => router.push(`/hotelDetails?name=${encodeURIComponent(hotel || hotel)}`)}
                    >
                        <Image 
                            src="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
                            alt={hotel || hotel} 
                            width={300} 
                            height={200} 
                            className="rounded-md object-cover w-full h-40" 
                        />
                        <h4 className="text-lg font-semibold mt-2">{hotel || hotel}</h4>
                        <h3 className="text-2xl font-semibold text-green-600">{details.price_range}</h3>
                    </div>
                );
            })
        ) : (
            <p className="col-span-4 text-gray-800">No similar hotels listed.</p>
        )}
    </div>
</div>

                {/* Reviews */}
                <div id="reviews-section" className="max-w-8x1 mx-auto space-y-4">
                <h1 className="text-2xl font-semibold mt-8 text-gray-700 text-left">Reviews</h1>
                      {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md border flex items-start gap-4">
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-lg">
                            {review.name[0] + review.name.split(" ")[1][0]}
                          </div>
                          <div className="flex-1">
                            <h2 className="font-bold text-gray-900">{review.name} <span className="text-gray-500 font-normal">({review.date})</span></h2>
                            <p className="text-gray-600 text-sm">{review.travelerType}</p>
                            <p className="mt-2 text-gray-800">{review.review}</p>
                          </div>
                          <div className="bg-green-500 text-white px-2 py-1 rounded-lg font-bold text-sm self-start">
                            {review.rating}/5
                          </div>
                        </div>
                      ))}
                    </div>
                    
               {/* Booking Section */}
                <div className="p-6 ml-[-10px] mt-6 text-left">
                <h3 className="text-2xl font-semibold text-gray-700">Booking Options</h3>
                <p className="mt-5 ml-7 flex flex-wrap gap-11">
                    {details.booking_options?.map((option, index) => (
                        <span key={index} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">{option}</span>
                    ))}
                </p>
                </div>

               </div>
               )}
        </section>
    );
};

export default HotelDetails;
