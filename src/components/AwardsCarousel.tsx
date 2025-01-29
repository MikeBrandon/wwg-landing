import Image from "next/image";
import { FaTrophy } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Link from "next/link";

const AwardsCarousel = ({ showAll = false }) => {
    const awards = [
        {
            title: "Best Content Creator of the Year",
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
            title: "Esports Caster of the Year",
            winnerImage: "/eugene.jpg",
            winnerUsername: "Eugene Abuderby",
            yearWon: "2024",
        },
        {
            title: "Best Technical Content Creator of the Year",
            winnerImage: "/bloody.jpg",
            winnerUsername: "BloodyActor",
            yearWon: "2024",
        },
        {
            title: "TikTok Content Creator of the Year",
            winnerImage: "/icebaby.jpg",
            winnerUsername: "icebaby484",
            yearWon: "2024",
        },
        {
            title: "Twitch Content Creator of the Year",
            winnerImage: "/someothergirl.jpg",
            winnerUsername: "_someothergirl",
            yearWon: "2024",
        },
        {
            title: "Youtube Content Creator of the Year",
            winnerImage: "/lulu.jpg", 
            winnerUsername: "czyLulu",
            yearWon: "2024",
        },
        {
            title: "Mobile Content Creator of the Year",
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
            title: "PC Content Creator of the Year",
            winnerImage: "/cecily.jpg",
            winnerUsername: "cecily960",
            yearWon: "2024",
        },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    const getItemsPerPage = () => {
        if (windowWidth < 768) return 1; // Mobile
        return 3; // Tablet and Desktop
    };

    const totalPages = Math.ceil(awards.length / getItemsPerPage());

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!showAll) {
            const timer = setInterval(() => {
                setCurrentPage((prev) => (prev + 1) % totalPages);
            }, 5000); // Change slides every 5 seconds

            return () => clearInterval(timer);
        }
    }, [totalPages, showAll]);

    const visibleAwards = showAll 
        ? awards 
        : awards.slice(
            currentPage * getItemsPerPage(), 
            (currentPage + 1) * getItemsPerPage()
        );

    return (
        <div className="w-full">
            <div className={`grid ${showAll ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-3'} gap-8 transition-all duration-500 ease-in-out`}>
                {visibleAwards.map((award, index) => (
                    <div
                        key={showAll ? index : `${currentPage}-${index}`}
                        className={`bg-primary/100 aspect-square border ${award.title === "Best Content Creator of the Year" ? 'border-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse' : 'border-secondary'} overflow-hidden transform transition-all duration-500 ease-in-out flex`}
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
                            <FaTrophy className={`${award.title === "Best Content Creator of the Year" ? 'text-yellow-400 animate-bounce' : 'text-white'} text-2xl mb-2`} />
                            <h3 className={`text-xl font-semibold mb-1 ${award.title === "Best Content Creator of the Year" ? 'text-yellow-400' : ''}`}>{award.title}</h3>
                            <p className="text-gray-300 text-sm">@{award.winnerUsername || "username"}</p>
                            <p className="text-gray-400 text-xs mt-1">{award.yearWon || "2023"}</p>
                        </div>
                    </div>
                ))}
            </div>
            {!showAll && (
                <>
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
                </>
            )}
        </div>
    );
}

export default AwardsCarousel;