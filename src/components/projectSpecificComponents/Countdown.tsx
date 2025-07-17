// Countdown Timer (dummy date)
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
export default function Countdown() {
   const theme=useTheme()
  const deadline = new Date("2025-12-31").getTime();
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m left`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
        <div className={`w-full backdrop-blur-xl  border border-white/30 shadow-2xl p-4 flex justify-between rounded `}>
      <h4 className="font-bold text-sm">Deadline Countdown</h4>
      <p className="text-white mt-1">{timeLeft}</p>
      
    </div>
  );
}
