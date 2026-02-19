import React, { useEffect, useRef } from 'react';

const Review: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const old = document.querySelector('script[data-taggbox]');
    if (old) old.remove();

    const script = document.createElement('script');
    script.src = 'https://widget.taggbox.com/embed.min.js';
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-taggbox', 'true');

    document.body.appendChild(script);

    const t = setTimeout(() => {
      if ((window as any)?.taggbox?.init) {
        (window as any).taggbox.init();
      }
    }, 500);

    return () => clearTimeout(t);
  }, []);

  return (
    /* py-20 provides large vertical breathing room between sections */
    /* px-6 ensures the cards never touch the side of the mobile screen */
<section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
  {/* Centered Header */}
  <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
    
    <h2 className="
      text-[#8ecd24]
      font-bold uppercase tracking-widest
      text-[10px] sm:text-xs md:text-sm lg:text-base
      mb-2 sm:mb-3
    ">
      Community Feedback
    </h2>

    <h1 className="
      text-white font-bold leading-tight
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
      mb-3 sm:mb-4 md:mb-6
      max-w-[20ch] sm:max-w-[24ch] md:max-w-none
    ">
      Real Stories, Real Results
    </h1>

    <p className="
      text-gray-400
      text-sm sm:text-base md:text-lg
      leading-relaxed
      max-w-[32ch] sm:max-w-[48ch] md:max-w-2xl lg:max-w-3xl
    ">
      We take pride in our service. See what our customers have to say about
      their experience with us.
    </p>

  </div>


      {/* 
          Container for the Taggbox. 
          The 'min-h' ensures the page doesn't jump when the reviews load.
          The 'rounded-xl' and 'overflow-hidden' add those "little details" 
          to the edges of the widget area.
      */}
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="taggbox"
          style={{ width: '100%', minHeight: '300px' }}
          data-widget-id="317440"
          data-website="1"
        />
      </div>
    </section>
  );
};

export default Review;