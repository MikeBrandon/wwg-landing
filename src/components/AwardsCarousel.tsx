import Image from "next/image";
import { FaTrophy } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Link from "next/link";

const AwardsCarousel = () => {
    const awards = [
        {
            title: "Youtube Content Creator of the Year",
            winnerImage: "/lulu.jpg", 
            winnerUsername: "czyLulu",
            yearWon: "2024",
        },
        {
            title: "Twitch Content Creator of the Year",
            winnerImage: "/someothergirl.jpg",
            winnerUsername: "_someothergirl",
            yearWon: "2024",
        },
        {
            title: "TikTok Content Creator of the Year",
            winnerImage: "/icebaby.jpg",
            winnerUsername: "icebaby484",
            yearWon: "2024",
        },
        {
            title: "Best Technical Content Creator of the Year",
            winnerImage: "/bloody.jpg",
            winnerUsername: "BloodyActor",
            yearWon: "2024",
        },
        {
            title: "PC Content Creator of the Year",
            winnerImage: "/cecily.jpg",
            winnerUsername: "cecily960",
            yearWon: "2024",
        },
        {
            title: "Mobile Content Creator of the Year",
            winnerImage: "/ptk.jpg",
            winnerUsername: "PTKAfrica",
            yearWon: "2024",
        },
        {
            title: "Male Content Creator of the Year",
            winnerImage: "/mamba.jpg",
            winnerUsername: "mambaJB",
            yearWon: "2024",
        },
        {
            title: "Female Content Creator of the Year",
            winnerImage: "/mich.jpg",
            winnerUsername: "MICHPUBG",
            yearWon: "2024",
        },
        {
            title: "Best Content Creator of the Year",
            winnerImage: "/ptk.jpg",
            winnerUsername: "PTKAfrica",
            yearWon: "2024",
        },
        {
            title: "Console Content Creator of the Year",
            winnerImage: "/angel.jpg",
            winnerUsername: "AngxlWolfie",
            yearWon: "2024",
        },
        {
            title: "Esports Caster of the Year",
            winnerImage: "/eugene.jpg",
            winnerUsername: "Eugene Abuderby",
            yearWon: "2024",
        },
    ];

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(awards.length / itemsPerPage);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % totalPages);
        }, 5000); // Change slides every 5 seconds

        return () => clearInterval(timer);
    }, [totalPages]);

    const visibleAwards = awards.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-8 transition-all duration-500 ease-in-out">
                {visibleAwards.map((award, index) => (
                    <div
                        key={`${currentPage}-${index}`}
                        className="bg-primary/100 aspect-square border border-secondary overflow-hidden transform transition-all duration-500 ease-in-out flex"
                    >
                        <div className="relative h-full min-w-max">
                            <Image 
                                src={award.winnerImage || "/placeholder-winner.jpg"}
                                alt={`${award.title} Winner`}
                                className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
                                width={331}
                                height={586}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-16" />
                        </div>
                        <div className="p-4">
                            <FaTrophy className="text-white text-2xl mb-2" />
                            <h3 className="text-xl font-semibold mb-1">{award.title}</h3>
                            <p className="text-gray-300 text-sm">@{award.winnerUsername || "username"}</p>
                            <p className="text-gray-400 text-xs mt-1">{award.yearWon || "2023"}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 gap-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === currentPage ? 'bg-secondary' : 'bg-secondary/30'
                        }`}
                        onClick={() => setCurrentPage(i)}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <Link
                href="/awards"
                className="inline-flex items-center bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all mt-4"
                >
                    View More
                </Link>
            </div>
        </div>
    );
}

export default AwardsCarousel;