// InfiniteCarousel.tsx
import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "@/contexts/ThemeContext";
interface Feature {
  name: string;
  description: string;
  status: string;
}

interface InfiniteCarouselProps {
  features: Feature[];
}



const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ features }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.5;

    const step = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      container.scrollLeft += scrollSpeed;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      updateCenterCard();
      animationFrameId = requestAnimationFrame(step);
    };

    const updateCenterCard = () => {
      const cards = Array.from(container.querySelectorAll(".carousel-card"));
      const containerCenter = container.offsetLeft + container.offsetWidth / 2;

      let minDistance = Infinity;
      let closestIndex = 0;

      cards.forEach((card, index) => {
        const cardCenter = (card as HTMLElement).offsetLeft + (card as HTMLElement).offsetWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setCenterIndex(closestIndex);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="w-full py-4 px-6 md:px-20 bg-gradient-to-br  text-center">
      <h2 className={`text-xl md:text-2xl font-bold mb-5 text-black dark:text-cyan-500 `}>
        Core Features That Help You Thrive
      </h2>
      <div
        ref={containerRef}
        className="relative flex overflow-hidden whitespace-nowrap no-scrollbar"
      >
        {[...features, ...features].map((item, index) => (
          <Fade
            key={index}
            cascade
            direction="left"
            duration={4000}
            delay={index * 100}
          >
            <div
              className={`carousel-card inline-block mx-4 transition-all duration-300 ease-in-out ${
                index === centerIndex ? "scale-110 z-10" : "scale-90 opacity-70"
              } min-w-[280px] sm:min-w-[300px] md:min-w-[320px] p-3 bg-white dark:bg-[#2D2B4C] rounded-2xl shadow-md`}
            >
              <h3 className="text-xl font-semibold text-cyan-500 dark:text-cyan-300 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {item.description}
              </p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default InfiniteCarousel;
