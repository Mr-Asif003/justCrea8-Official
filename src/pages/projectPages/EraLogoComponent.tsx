import React from 'react'

export default function  EraLogoComponent({ size = 100 }) {
  return (
     <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Neon border circle */}
      <div
        className="absolute inset-0 rounded-full animate-spin-fast  border-4"
        style={{
          borderImage: `conic-gradient(from 0deg, #0ff, #f0f, #0ff) 1`,
          WebkitMaskImage:
            "radial-gradient(circle at center, black 98%, transparent 100%)",
          maskImage:
            "radial-gradient(circle at center, black 98%, transparent 100%)",
        }}
      ></div>

      {/* Pulsing inner circle */}
      <div
        className="z-10 p-2 flex justify-center  items-center rounded-full from-blue-300 to-pink-600 mix-blend-screen animate-pulse  shadow-[0_0_30px_#D90166] opacity-90"
        style={{
          width: size * 0.3,
          height: size * 0.3,
        }}
      >
        <p className='font-mono text-sm'>Era</p>
      </div>
    </div>
  )
}
