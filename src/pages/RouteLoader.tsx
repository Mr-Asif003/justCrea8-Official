// components/RouteLoader.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500); // delay to simulate loading transition

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-red-600 rounded-full animate-bounce" />
        <div className="w-8 h-8 bg-green-700 rounded-full animate-bounce delay-400" />
        <div className="w-8 h-8 bg-yellow-800 rounded-full animate-bounce delay-800" />
      </div>
    </div>
  );
}
