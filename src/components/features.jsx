import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
const featuresList = [
  { title: "To-Do List + Smart Reminders", desc: "Create, schedule, and get AI-based reminders to stay on track." },
  { title: "Goal Planner & Progress Tracker", desc: "Break your goals into steps, track completion with beautiful charts." },
  { title: "Journal & AI Reflection Buddy", desc: "Write your thoughts or talk to an empathetic AI daily companion." },
  { title: "Routine Maker + Habit Streaks", desc: "Build discipline with visual streaks and daily routines." },
  { title: "Blog Creator & Sharing", desc: "Write, publish, and share personal blogs with the community." },
  { title: "Tourist Tracker (Family Safety)", desc: "Real-time family member tracking + safe-check-in system." },
  { title: "Notes + Smart Folders & Tags", desc: "Organize your thoughts, docs, or voice notes with smart filters." },
  { title: "Productivity Stats + Weekly Insights", desc: "See where your time went, what you achieved, and what to improve." },
  { title: "Custom Dashboard & Widgets", desc: "Personalize your home screen with tools you use the most." },
  { title: "Focus Mode + Ambient Sounds", desc: "Work in a distraction-free environment with relaxing sounds." },
  { title: "Plugin System", desc: "Enable only what you need. More features, less clutter." },
];

const InfiniteCarousel = () => {
  const containerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;
    let lastTimestamp = 0;

    const scrollSpeed = 0.5; // pixels per frame

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      container.scrollLeft += scrollSpeed;

      // Reset scroll to start for infinite loop
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
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
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
    <section className="w-full py-16 px-6 md:px-20 bg-gradient-to-br  from-[#1D1D30] to-[#2E2B3F] text-center">
      <h2 className="text-3xl md:text-4xl text-white font-bold mb-10">
        Core Features That Help You Thrive
      </h2>
      <div
        ref={containerRef}
        className="relative flex overflow-hidden whitespace-nowrap no-scrollbar"
      >
        {/* Double the features list for infinite effect */}
        {[...featuresList, ...featuresList].map((item, index) => (
          <Fade cascade direction="left" duration={4000} delay={index * 100}>
            <div
              key={index}
              className={`carousel-card inline-block mx-4 transition-all duration-300 ease-in-out ${index === centerIndex ? "scale-110 z-10" : "scale-90 opacity-70"
                } min-w-[280px] sm:min-w-[300px] md:min-w-[320px] p-6 bg-white dark:bg-[#2D2B4C] rounded-2xl shadow-md`}
            >
              <h3 className="text-xl font-semibold text-purple-600 dark:text-cyan-300 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{item.desc}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default InfiniteCarousel;
