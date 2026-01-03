import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface AnimWrapperProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'slide-right' | 'zoom-in';
  delay?: number;
}

const AnimWrapper: React.FC<AnimWrapperProps> = ({ 
  children, 
  className = '', 
  animation = 'fade-up',
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getAnimClass = () => {
    switch (animation) {
      case 'slide-right':
        return isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 -translate-x-10';
      case 'zoom-in':
        return isVisible ? 'opacity-100 scale-100 transition-all duration-700' : 'opacity-0 scale-95';
      case 'fade-up':
      default:
        return isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${getAnimClass()}`}
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimWrapper;
