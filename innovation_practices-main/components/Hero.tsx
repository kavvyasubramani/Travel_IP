"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdLocationPin } from "react-icons/md";

const Hero = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async () => {
        if (!searchText) return;
        setLoading(true);

        // Navigate to the listing page with the search query
        router.push(`/destinations?query=${encodeURIComponent(searchText)}`);
    };

    return (
        <section className="max_padd_container w-full relative flexCenter" id="home">
            <div className="absolute h-full w-full bg-[#2f6a7f2f] top-0 bottom-0 z-10"></div>
            <video src={"./video.mp4"} muted autoPlay loop className="absolute h-full w-full top-0 bottom-0 object-cover"></video>

            <div className="w-full h-max pt-28 pb-12 flex flex-col gap-y-3 justify-center m-auto z-20 lg:pt-64 lg:pb-24">
                <div className="px-0 py-8 text-white">
                    <span className="uppercase regular-18">TRAVEL TO ANY CORNER OF THE WORLD</span>
                    <h2 className="h2 max-w-[777px]">Make Your Tour Amazing With Us</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-6 px-8 py-10 md:px-12 bg-white rounded-full shadow-lg">
                    <div className="flex flex-col w-full xl:px-6">
                        <label className="block text-gray-50 pb-2">Search your destination:</label>
                        <div className="flexCenter h-12 px-4 bg-gray-100 rounded-full w-full">
                            <input
                                type="text"
                                placeholder="Enter destination..."
                                className="bg-transparent border-none outline-none w-full regular-14 px-2"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <MdLocationPin className="text-lg text-gray-500" />
                        </div>
                    </div>

                    <button
                        className="bg-blue-500 text-white border-none outline-none px-5 py-2 text-sm rounded-full w-24"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? "..." : "Search"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
