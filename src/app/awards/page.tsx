"use client";

import AwardsCarousel from "@/components/AwardsCarousel";
import Image from "next/image";

const AwardsPage = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 w-full mt-4 md:mt-8">
          <div className="youtube-video-container w-full md:w-1/2">
            <iframe
              src="https://www.youtube.com/embed/Nu0OsbCxvqE"
              title="YouTube video player"
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="youtube-video-description w-full md:w-1/2">
            <h2 className="image-container">
              <Image
                src="/wwgca.png"
                alt="Awards"
                className="w-[60%] md:w-[60%] mx-auto md:mx-0 mb-4 md:mb-6"
                width={5112}
                height={2051}
                quality={10}
              />
            </h2>
            <p className="text-primary text-base md:text-lg text-center md:text-left">
              Welcome to the 3rd Annual Watu Wa Gaming Creator Awards - a
              prestigious celebration dedicated to recognizing and promoting
              Kenya&apos;s talented gaming content creators. This platform aims to
              showcase and uplift local gaming creators who are shaping the
              future of gaming content in Kenya.
            </p>
          </div>
        </div>

        <div className="text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
            <span className="text-secondary">2024</span>
          </h3>
          <AwardsCarousel showAll={true} />
        </div>
      </div>
    </section>
  );
};

export default AwardsPage;
