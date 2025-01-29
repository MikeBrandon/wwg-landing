import Image from "next/image";
import { FaTrophy } from "react-icons/fa6";
import { useState, useEffect } from "react";

const AwardsCarousel = () => {
    const awards = [
        {
            title: "Tournament Champions",
            description: "Best performing team of 2023",
            winnerImage: "/youtube_2024.jpg", 
            winnerUsername: "username",
            yearWon: "2023",
        },
        {
            title: "Community Choice",
            description: "Most helpful community member",
            winnerImage: "/youtube_2024.jpg",
            winnerUsername: "username",
            yearWon: "2023",
        },
        {
            title: "Content Creator", 
            description: "Best gaming content creator",
            winnerImage: "/youtube_2024.jpg",
            winnerUsername: "username",
            yearWon: "2023",
        },
        {
            title: "Tournament Champions",
            description: "Best performing team of 2023",
            winnerImage: "/youtube_2024.jpg", 
            winnerUsername: "username",
            yearWon: "2023",
        },
        {
            title: "Community Choice",
            description: "Most helpful community member",
            winnerImage: "/youtube_2024.jpg",
            winnerUsername: "username",
            yearWon: "2023",
        },
        {
            title: "Content Creator", 
            description: "Best gaming content creator",
            winnerImage: "/youtube_2024.jpg",
            winnerUsername: "username",
            yearWon: "2023",
        },
        {
            title: "Tournament Champions",
            description: "Best performing team of 2023",
            winnerImage: "/youtube_2024.jpg", 
            winnerUsername: "username",
            yearWon: "2023",
        },
        {
            title: "Community Choice",
            description: "Most helpful community member",
            winnerImage: "/youtube_2024.jpg",
            winnerUsername: "username",
            yearWon: "2023",
        },
        {
            title: "Content Creator", 
            description: "Best gaming content creator",
            winnerImage: "/youtube_2024.jpg",
            winnerUsername: "username",
            yearWon: "2023",
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
                        className="bg-primary/100 aspect-square rounded-lg border border-secondary overflow-hidden transform transition-all duration-500 ease-in-out"
                    >
                        <div className="relative h-3/5 w-full">
                            <Image 
                                src={award.winnerImage || "/placeholder-winner.jpg"}
                                alt={`${award.title} Winner`}
                                className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
                                width={1920}
                                height={1080}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/90 to-transparent h-16" />
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
        </div>
    );
}

export default AwardsCarousel;