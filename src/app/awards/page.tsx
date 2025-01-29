"use client";

import AwardsCarousel from "@/components/AwardsCarousel";
import Image from "next/image";

const AwardsPage = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
            {/* <h2 className="text-4xl font-bold mb-12 text-center text-primary">
                <span className="text-secondary">Creator</span> Awards
            </h2> */}
            <div className="youtube-video flex items-center gap-8 mb-12 w-full mt-8">
                <div className="youtube-video-container">
                    <iframe src="https://www.youtube.com/embed/Nu0OsbCxvqE" title="YouTube video player" className="w-[576px] h-[350px]" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="youtube-video-description w-full">
                    <h2 className="image-container">
                        <Image src="/wwgca.png" alt="Awards" className="w-[60%] mb-6" width={5112} height={2051} quality={10}/>
                    </h2>
                    <p className="text-primary text-lg">
                        Welcome to the 3rd Annual Watu Wa Gaming Creator Awards - a prestigious celebration dedicated to recognizing and promoting Kenya's talented gaming content creators. This platform aims to showcase and uplift local gaming creators who are shaping the future of gaming content in Kenya.
                    </p>
                </div>
            </div>

            <div className="text-white">
                <h3 className="text-2xl font-bold mb-4">
                    <span className="text-secondary">2024</span>
                </h3>
                <AwardsCarousel showAll={true} />
            </div>
            </div>
        </section>
    )
}

export default AwardsPage;