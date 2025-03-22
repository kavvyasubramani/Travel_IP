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
        router.push(`/destinations?query=${encodeURIComponent(searchText)}`);
    };

    return (
        <section className="max_padd_container w-full relative flexCenter" id="home">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#2f6a7f2f] ml-[-24px] z-10"></div>

            {/* Background Video */}
            <video 
                src={"./video.mp4"} 
                muted 
                autoPlay 
                loop 
                className="absolute top-0 left-0 w-screen h-screen object-cover"
                style={{ width: "100vw", height: "100vh" }}
            ></video>

            {/* Content */}
            <div className="relative w-full h-max pt-16 pb-12 flex flex-col gap-y-3 justify-center m-auto z-20 lg:pt-48 lg:pb-24">
                <div className="px-0 py-4 text-white text-center">
                    <span className="uppercase regular-18">TRAVEL TO ANY CORNER OF THE WORLD</span>
                    <h2 className="h2 max-w-[777px] m-auto">Make Your Tour Amazing With Us</h2>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center items-center mt-6 mb-10">
                    <div className="w-full max-w-4xl flex items-center bg-white rounded-full shadow-md overflow-hidden pr-2">
                        <div className="flex items-center px-4">
                            <MdLocationPin className="text-2xl text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Where would you like to go?"
                            className="flex-1 bg-transparent border-none outline-none text-lg px-4 py-4"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                            className="bg-gray-800 text-white border-none outline-none px-8 py-3 text-lg rounded-full flex items-center justify-center"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Search"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
