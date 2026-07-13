import React from 'react';

interface LesakaIconProps {
  className?: string;
  size?: number;
}

export function LesakaIcon({ className = "", size = 40 }: LesakaIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Minimalist Cow Head */}
      <path 
        d="M20 8C16 8 12 10 10 14C8 18 8 22 10 26C12 30 16 32 20 32C24 32 28 30 30 26C32 22 32 18 30 14C28 10 24 8 20 8Z" 
        fill="#2E7D32"
        opacity="0.2"
      />
      <circle cx="16" cy="18" r="1.5" fill="#2E7D32" />
      <circle cx="24" cy="18" r="1.5" fill="#2E7D32" />
      <path 
        d="M14 12C13 11 11 11 10 12" 
        stroke="#2E7D32" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M26 12C27 11 29 11 30 12" 
        stroke="#2E7D32" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M18 24C18 24 19 26 20 26C21 26 22 24 22 24" 
        stroke="#2E7D32" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* GPS/Tracker Element */}
      <circle 
        cx="32" 
        cy="32" 
        r="5" 
        fill="#2E7D32"
      />
      <circle 
        cx="32" 
        cy="32" 
        r="2.5" 
        fill="white"
      />
      <path 
        d="M32 26 L32 28" 
        stroke="#2E7D32" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M32 36 L32 38" 
        stroke="#2E7D32" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M26 32 L28 32" 
        stroke="#2E7D32" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M36 32 L38 32" 
        stroke="#2E7D32" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </svg>
  );
}
