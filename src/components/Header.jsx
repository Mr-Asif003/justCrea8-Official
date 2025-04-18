import React, { useState } from "react";
import { NavLink } from "react-router";
import { useTheme } from "../contexts/themeC";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { themeMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = themeMode === "dark";

  return (
    <header
      className={`p-4 flex items-center justify-between w-full relative transition-all duration-2000 z-50 ${
        isDark
          ? "bg-gradient-to-r from-[#0F0C25] to-[#83106D] text-white"
          : "bg-white text-gray-900 shadow-[0_10px_30px_rgba(144,224,239,0.3)]"
      }`}
    >
      {/* Logo */}
      <div className={`text-3xl font-extrabold tracking-wide text-pink-600 ${themeMode=='dark'?"text-white":""} `}>
        JustCrea8
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex sm:w-[30%]  items-center gap-10 px-6 py-2 rounded-xl transition-all duration-500 bg-gray-100 dark:bg-[#2E2B3F]">
        <ul className="flex items-center gap-20 ">
          {["/", "/service", "/about"].map((path, idx) => {
            const labels = ["Home", "Service", "About"];
            return (
              <li key={idx}>
                <NavLink
                  to={path}
                  className={({ isActive })=>
                    `font-semibold text-xl  hover:text-pink-500 transition-all duration-200  ${
                      isActive ? "text-cyan-400 underline underline-offset-4" : "text-white"
                    }`
                  }
                >
                  {labels[idx]}
                </NavLink>
              </li>
            );
          })}
          <li>
            <button
              onClick={toggleTheme}
              className="text-xl px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition"
              title="Toggle Theme"
            >
              {isDark ? "🌞" : "🌚"}
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Toggle & Theme */}
      <div className="sm:hidden flex items-center gap-2">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2" title="Menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        <button
          onClick={toggleTheme}
          className="text-lg px-2 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition"
          title="Toggle Theme"
        >
          {isDark ? "🌞" : "🌚"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-br from-[#2B2D42] to-[#1D1E33] text-white p-6 sm:hidden rounded-b-xl shadow-xl transition-all duration-500">
          <ul className="flex flex-col gap-4 text-lg">
            {["/", "/service", "/about"].map((path, idx) => {
              const labels = ["Home", "Service", "About"];
              return (
                <li key={idx}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `font-medium hover:text-cyan-400 transition ${
                        isActive ? "text-orange-400" : ""
                      }`
                    }
                  >
                    {labels[idx]}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
