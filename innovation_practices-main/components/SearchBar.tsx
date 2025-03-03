"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdLocationPin } from "react-icons/md";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async () => {
        if (!query.trim()) return alert("Please enter a destination.");

        setLoading(true);
        try {
            const response = await fetch("/api/extractKeyword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
                return;
            }

            const data = await response.json();
            if (data.keyword) {
                router.push(`/destinations/${data.keyword.toLowerCase()}`);
            } else {
                alert("Could not determine the destination.");
            }
        } catch (error) {
            console.error("Error fetching keyword:", error);
            alert("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full xl:px-6">
            <label htmlFor="search" className="block text-gray-700 pb-2">Search your destination:</label>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter destination..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent border-none outline-none w-full px-4 py-2 text-gray-900"
                />
                <MdLocationPin className="text-2xl text-gray-600 cursor-pointer" onClick={handleSearch} />
            </div>
            <button onClick={handleSearch} className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-full shadow-md text-lg">
                {loading ? "Searching..." : "Search"}
            </button>
        </div>
    );
};

export default SearchBar;
