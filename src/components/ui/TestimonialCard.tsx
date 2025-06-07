// components/TestimonialCard.jsx
import React from 'react';

export default function TestimonialCard({ name, quote }) {
  return (
    <div className="bg-black/20 p-4 rounded-xl shadow-md text-white">
      <p className="italic">“{quote}”</p>
      <p className="mt-3 text-sm text-right font-semibold">- {name}</p>
    </div>
  );
}
