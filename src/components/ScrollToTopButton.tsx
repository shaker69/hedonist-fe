'use client'

import React, { useEffect, useState } from 'react';

import ArrowUpIcon from '../../public/icon-arrow-up.svg';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-3 z-[9999]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-2 rounded-full bg-[#F5F5F5] text-white shadow-md hover:bg-gray-700 transition-all"
        >
          <ArrowUpIcon className="fill-color-primary" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
