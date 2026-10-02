import React from 'react';
import { VillageItemKey } from '../types/game';

interface ItemVisualProps {
  itemKey: VillageItemKey;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ItemVisual: React.FC<ItemVisualProps> = ({ itemKey, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xl',
    md: 'w-10 h-10 text-2xl',
    lg: 'w-14 h-14 text-4xl',
    xl: 'w-20 h-20 text-5xl',
  };

  switch (itemKey) {
    case 'beras':
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} title="Karung Beras Lumbung">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
            {/* Rice Sack Base */}
            <path d="M16 26 C12 38 10 52 14 58 C18 64 46 64 50 58 C54 52 52 38 48 26 Z" fill="#e8c89b" stroke="#8c5825" strokeWidth="2.5" />
            <path d="M16 26 C18 36 20 54 22 59" stroke="#cf9c60" strokeWidth="2" strokeDasharray="3 3" fill="none" />
            {/* Tied Neck */}
            <path d="M14 26 C22 23 42 23 50 26 C48 21 44 14 40 12 C36 10 28 10 24 12 C20 14 16 21 14 26 Z" fill="#f4dec0" stroke="#8c5825" strokeWidth="2.5" />
            <path d="M18 25 C25 28 39 28 46 25" stroke="#8c5825" strokeWidth="3" />
            {/* Golden Rice Grains Spilling */}
            <circle cx="28" cy="18" r="2.2" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="34" cy="17" r="2.2" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="31" cy="21" r="2.2" fill="#fde047" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="37" cy="21" r="2.2" fill="#f59e0b" stroke="#d97706" strokeWidth="0.8" />
            {/* Label stamp */}
            <rect x="22" y="38" width="20" height="12" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <path d="M26 44 L38 44" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'sayur':
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} title="Keranjang Sayuran Segar">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
            {/* Veggies popping out */}
            {/* Carrot */}
            <path d="M38 12 L44 32 L36 30 Z" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
            <path d="M39 12 L42 5" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
            {/* Tomato */}
            <circle cx="24" cy="24" r="9" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <path d="M24 15 L22 12 M24 15 L26 12 M24 15 L24 11" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
            {/* Greens / Cabbage */}
            <path d="M28 16 C30 8 40 10 38 20 C42 16 48 20 46 26" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
            {/* Woven Basket */}
            <path d="M12 28 L16 54 C17 58 47 58 48 54 L52 28 Z" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
            <path d="M10 27 C24 31 40 31 54 27" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            {/* Weave lines */}
            <path d="M19 32 L21 54 M28 32 L30 55 M36 32 L35 55 M44 32 L42 54" stroke="#92400e" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'buah':
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} title="Keranjang Buah Panen">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
            {/* Banana curve */}
            <path d="M18 16 C28 14 42 22 46 28 C42 32 30 26 22 24 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            {/* Red Apple */}
            <circle cx="36" cy="24" r="8.5" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            <path d="M36 15 C37 12 39 11 41 12" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            <path d="M38 14 C42 13 42 16 40 16" fill="#16a34a" />
            {/* Orange */}
            <circle cx="24" cy="26" r="7.5" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
            {/* Basket */}
            <path d="M12 28 L17 54 C18 58 46 58 47 54 L52 28 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
            <path d="M10 28 C26 31 38 31 54 28" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <path d="M16 40 C32 44 48 40 48 40" stroke="#78350f" strokeWidth="2" fill="none" />
          </svg>
        </div>
      );

    case 'telur':
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} title="Keranjang Telur Segar">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
            {/* Eggs */}
            <ellipse cx="23" cy="24" rx="6.5" ry="9" transform="rotate(-15 23 24)" fill="#fdba74" stroke="#c2410c" strokeWidth="1.8" />
            <ellipse cx="33" cy="20" rx="7" ry="9.5" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.8" />
            <ellipse cx="42" cy="25" rx="6.5" ry="9" transform="rotate(18 42 25)" fill="#fb923c" stroke="#c2410c" strokeWidth="1.8" />
            {/* Nest straw strands */}
            <path d="M14 30 L22 28 M40 28 L49 30 M28 32 L36 31" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
            {/* Basket */}
            <path d="M12 28 L16 54 C17 58 47 58 48 54 L52 28 Z" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
            <path d="M10 27 C24 31 40 31 54 27" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 36 L24 53 M32 36 L32 54 M42 36 L40 53" stroke="#92400e" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'madu':
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} title="Toples Madu Hutan">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
            {/* Glass Jar Body */}
            <path d="M20 22 C14 26 12 48 16 56 C20 62 44 62 48 56 C52 48 50 26 44 22 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
            {/* Honey liquid inside */}
            <path d="M16 32 C20 30 44 34 48 32 C50 44 48 54 45 56 C41 60 23 60 19 56 C16 54 14 44 16 32 Z" fill="#eab308" />
            {/* Dripping honey reflection */}
            <path d="M20 38 C22 42 22 46 20 48" stroke="#fef9c3" strokeWidth="2.5" strokeLinecap="round" />
            {/* Cloth Lid with String */}
            <path d="M16 16 C22 14 42 14 48 16 L51 22 C42 24 22 24 13 22 Z" fill="#f97316" stroke="#9a3412" strokeWidth="2" />
            <rect x="22" y="10" width="20" height="6" rx="2" fill="#fb923c" stroke="#9a3412" strokeWidth="1.5" />
            <path d="M15 22 C24 24 40 24 49 22" stroke="#78350f" strokeWidth="2.5" />
            {/* Honeycomb badge */}
            <polygon points="32,38 38,41 38,48 32,51 26,48 26,41" fill="#fffbeb" stroke="#b45309" strokeWidth="1.5" />
            <text x="32" y="47" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b45309">🍯</text>
          </svg>
        </div>
      );

    case 'ikan':
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} title="Ikan Segar Kolam Desa">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
            {/* Tail fin */}
            <path d="M46 32 L58 20 C54 28 54 36 58 44 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            {/* Fish Body */}
            <path d="M12 32 C18 20 42 20 48 32 C42 44 18 44 12 32 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2.5" />
            {/* Belly highlight */}
            <path d="M16 32 C22 40 40 40 44 32 C38 36 24 36 16 32 Z" fill="#e0f2fe" />
            {/* Dorsal fin */}
            <path d="M26 21 C32 16 38 18 40 22 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            {/* Eye */}
            <circle cx="20" cy="30" r="3" fill="#ffffff" stroke="#0369a1" strokeWidth="1" />
            <circle cx="19" cy="30" r="1.5" fill="#0f172a" />
            {/* Scales */}
            <path d="M28 28 C30 30 30 34 28 36 M34 27 C36 30 36 34 34 37" stroke="#0284c7" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Water bubbles */}
            <circle cx="10" cy="24" r="1.8" fill="#bae6fd" opacity="0.8" />
            <circle cx="7" cy="18" r="1.2" fill="#bae6fd" opacity="0.8" />
          </svg>
        </div>
      );

    case 'kayu':
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} title="Tumpukan Kayu Bakar">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
            {/* Bottom logs */}
            {/* Log 1 */}
            <rect x="10" y="36" width="36" height="14" rx="6" fill="#854d0e" stroke="#451a03" strokeWidth="2" />
            <circle cx="46" cy="43" r="7" fill="#fef08a" stroke="#451a03" strokeWidth="2" />
            <circle cx="46" cy="43" r="4" stroke="#a16207" strokeWidth="1" fill="none" />
            {/* Log 2 */}
            <rect x="18" y="42" width="34" height="14" rx="6" fill="#713f12" stroke="#451a03" strokeWidth="2" />
            <circle cx="50" cy="49" r="6" fill="#fde047" stroke="#451a03" strokeWidth="2" />
            {/* Top Log */}
            <rect x="12" y="24" width="36" height="14" rx="6" fill="#a16207" stroke="#451a03" strokeWidth="2" />
            <circle cx="48" cy="31" r="7" fill="#fef9c3" stroke="#451a03" strokeWidth="2" />
            <circle cx="48" cy="31" r="3.5" stroke="#a16207" strokeWidth="1" fill="none" />
            {/* Binding rope */}
            <path d="M26 23 L26 54 M29 23 L29 54" stroke="#eab308" strokeWidth="2.5" />
            {/* Small green leaf on wood */}
            <path d="M14 22 C12 18 16 16 18 18 C18 22 14 24 14 22 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
          </svg>
        </div>
      );

    case 'bibit':
    default:
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} title="Kantong Bibit Pohon">
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
            {/* Burlap pot */}
            <path d="M20 34 L22 56 C23 58 41 58 42 56 L44 34 Z" fill="#a16207" stroke="#451a03" strokeWidth="2" />
            <rect x="18" y="32" width="28" height="6" rx="2" fill="#ca8a04" stroke="#451a03" strokeWidth="2" />
            {/* Soil inside */}
            <ellipse cx="32" cy="34" rx="10" ry="2.5" fill="#3f2e1a" />
            {/* Green Sprout Stem */}
            <path d="M32 34 Q32 20 28 14" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Sprout Leaves */}
            <path d="M28 14 C20 12 20 22 28 20 C28 18 28 16 28 14 Z" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
            <path d="M28 16 C36 12 38 22 30 22" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
            <circle cx="28" cy="14" r="2" fill="#86efac" />
          </svg>
        </div>
      );
  }
};
