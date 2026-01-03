import React, { useEffect, useRef } from "react";

const ProLiquidCursor: React.FC = () => {
  const blobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const blob = blobRef.current;

    const move = (e: MouseEvent) => {
      if (!blob) return;

      blob.animate(
        {
          left: `${e.clientX - 150}px`,
          top: `${e.clientY - 150}px`,
        },
        { duration: 800, fill: "forwards", easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Main Jelly Blob */}
      <div
        ref={blobRef}
        className="
          w-[300px] h-[300px] 
          absolute rounded-full 
          opacity-60 
          blur-[80px] 
          bg-gradient-to-br 
          from-white/30 
          via-white/10 
          to-transparent
        "
      />

      {/* Inner Glow */}
      <div
        className="
          absolute w-[170px] h-[170px]
          rounded-full bg-white/5 
          blur-[40px]
          pointer-events-none
        "
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default ProLiquidCursor;
