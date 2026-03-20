"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  containerSize?: 'default' | 'large' | 'small';
  id?: string;
  dark?: boolean;
}

export const Section = ({ 
  children, 
  className = "", 
  style = {}, 
  containerSize = 'large',
  id,
  dark = false
}: SectionProps) => {
  const containerClass = containerSize === 'large' 
    ? 'container-large' 
    : containerSize === 'small' 
    ? 'container-small' 
    : 'container';

  return (
    <section 
      id={id}
      className={`section ${className}`} 
      style={{ 
        background: dark ? 'var(--clr-sapphire)' : 'transparent',
        color: dark ? 'white' : 'inherit',
        ...style 
      }}
    >
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
};
