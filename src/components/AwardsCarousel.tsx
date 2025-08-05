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
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getItemsPerPage = () => {
        if (windowWidth < 768) return 1;
        return 3;
    };

    const totalPages = Math.ceil(awards.length / getItemsPerPage());

    useEffect(() => {
        if (!showAll) {
            const timer = setInterval(() => {
                setCurrentPage((prev) => (prev + 1) % totalPages);
            }, 5000);
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
            <div
                className={`grid ${
                    showAll
                        ? "grid-cols-1 md:grid-cols-3"
                        : "grid-cols-1 md:grid-cols-3"
                } gap-8 transition-all duration-500 ease-in-out`}
            >
                {visibleAwards.map((award, index) => {
                    const isMain = award.title === "Best Content Creator of the Year";
                    return (
                        <div
                            key={showAll ? index : `${currentPage}-${index}`}
                            className={`relative aspect-[3/4] overflow-hidden shadow-card border flex flex-col group transition-all duration-500 ease-in-out ${
                                isMain
                                    ? "border-yellow-400 shadow-yellow-400/40 bg-gradient-to-br from-yellow-100/30 via-yellow-50/10 to-background/60 animate-glow"
                                    : "border-secondary/60 bg-surface/80 hover:shadow-lg hover:shadow-secondary/20"
                            }`}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={award.winnerImage || "/placeholder-winner.jpg"}
                                    alt={`${award.title} Winner`}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                    width={331}
                                    height={586}
                                    priority={isMain}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                                <div className="absolute top-4 left-4">
                                    <FaTrophy
                                        className={`text-3xl drop-shadow-lg ${
                                            isMain
                                                ? "text-yellow-400 animate-bounce"
                                                : "text-secondary group-hover:text-yellow-300 transition-colors"
                                        }`}
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                    <h3
                                        className={`text-lg md:text-xl font-bold mb-2 ${
                                            isMain
                                                ? "text-yellow-400 drop-shadow"
                                                : "text-text-primary group-hover:text-secondary transition-colors"
                                        }`}
                                    >
                                        {award.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm md:text-base font-medium text-secondary-400 bg-secondary/10 px-2 py-0.5 rounded">
                                            @{award.winnerUsername || "username"}
                                        </span>
                                        <span className="text-xs text-text-muted ml-auto">
                                            {award.yearWon || "2023"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {isMain && (
                                <div className="pointer-events-none absolute inset-0 border-4 border-yellow-300 animate-pulse" />
                            )}
                        </div>
                    );
                })}
            </div>
            {!showAll && (
                <>
                    <div className="flex justify-center mt-8 gap-3">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    i === currentPage ? 'bg-secondary scale-125' : 'bg-secondary/30 hover:bg-secondary/50'
                                }`}
                                onClick={() => setCurrentPage(i)}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Link
                            href="/awards"
                            className="inline-flex items-center px-8 py-3 rounded-xl font-semibold bg-secondary hover:bg-secondary/80 hover:scale-105 transition-all duration-300 text-text-primary"
                        >
                            View All Awards
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default AwardsCarousel;