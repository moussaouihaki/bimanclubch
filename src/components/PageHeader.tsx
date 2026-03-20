"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  tag?: string;
  title?: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  theme?: 'default' | 'dark';
}

export const PageHeader = ({ 
  tag, 
  title, 
  subtitle, 
  centered = true,
  theme = 'default' 
}: PageHeaderProps) => {
  const isDark = theme === 'dark';

  return (
    <div 
      className={`page-header ${centered ? 'text-center' : ''}`} 
      style={{ marginBottom: 'clamp(4rem, 12vw, 8rem)' }}
    >
      {tag && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-tag"
          style={{ color: isDark ? 'var(--clr-gold-real)' : undefined }}
        >
          {tag}
        </motion.span>
      )}
      
      {title && (
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="title-massive"
          style={{ color: isDark ? 'white' : undefined }}
        >
          {title}
        </motion.h1>
      )}
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section-subtitle mx-auto"
          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : undefined }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

