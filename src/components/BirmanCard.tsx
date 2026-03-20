"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BirmanCardProps {
  image?: string;
  title?: string;
  tag?: string;
  subtitle?: string;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'white' | 'glass' | 'sapphire';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export const BirmanCard = ({
  image,
  title,
  tag,
  subtitle,
  description,
  footer,
  variant = 'white',
  className = "",
  style = {},
  delay = 0
}: BirmanCardProps) => {
  const cardStyle = {
    background: variant === 'sapphire' ? 'var(--clr-sapphire)' : variant === 'glass' ? 'rgba(255,255,255,0.7)' : 'white',
    color: variant === 'sapphire' ? 'white' : 'var(--clr-text)',
    ...style
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`card-apple ${variant === 'glass' ? 'card-glass' : ''} ${className}`}
      style={cardStyle}
    >
      {image && (
        <div className="card-image-wrapper mb-8" style={{ height: '240px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
          <Image src={image} alt={title || ""} fill style={{ objectFit: 'cover' }} />
          {tag && (
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '10px', fontWeight: 800, color: 'var(--clr-gold-real)', textTransform: 'uppercase' }}>
              {tag}
            </div>
          )}
        </div>
      )}

      {tag && !image && (
        <span className="section-tag" style={{ fontSize: '0.7rem', color: variant === 'sapphire' ? 'rgba(255,255,255,0.7)' : 'var(--clr-gold-real)' }}>
          {tag}
        </span>
      )}

      {title && (
        <h3 className="mb-2" style={{ fontSize: '1.8rem', color: variant === 'sapphire' ? 'white' : 'var(--clr-seal)', fontFamily: 'var(--font-serif)' }}>
          {title}
        </h3>
      )}

      {subtitle && (
        <p className="mb-8" style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.8 }}>
          {subtitle}
        </p>
      )}

      {description && (
        <p className="mb-12" style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.9 }}>
          {description}
        </p>
      )}

      {footer && (
        <div className="mt-auto">
          {footer}
        </div>
      )}
    </motion.div>
  );
};
