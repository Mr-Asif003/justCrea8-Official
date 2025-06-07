// components/StatCard.jsx
import React from 'react';

export default function StatCard({ label, count, theme }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md text-center ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <h2 className="text-3xl font-bold">{count}+</h2>
      <p className="text-sm mt-2">{label}</p>
    </div>
  );
}
