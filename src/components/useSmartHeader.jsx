import { useEffect } from 'react';

const useSmartHeader = () => {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const header = document.getElementById('smart-header');

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scroll Down -> Hide
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scroll Up -> Show
        header.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateHeaderVisibility);
    return () => window.removeEventListener('scroll', updateHeaderVisibility);
  }, []);
};

export default useSmartHeader;
