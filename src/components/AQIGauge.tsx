/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AQILevelInfo } from '../types';
import { Shield, AlertTriangle, Wind, Info } from 'lucide-react';

interface AQIGaugeProps {
  aqi: number;
  levelInfo: AQILevelInfo;
  dominantPollutant: string;
  onOpenDetails?: () => void;
}

export const AQIGauge: React.FC<AQIGaugeProps> = ({
  aqi,
  levelInfo,
  dominantPollutant,
  onOpenDetails,
}) => {
  // Semi-circular arc calculation (180 degrees from 180 to 360/0)
  // Max AQI for full scale is 500
  const normalizedValue = Math.min(Math.max(aqi, 0), 500);
  const percentage = normalizedValue / 500;
  
  // Radius and stroke
  const radius = 96;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // 180-degree semi-circle length
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <div
      className={`rounded-3xl p-5 sm:p-6 transition-all duration-300 border shadow-xl relative overflow-hidden backdrop-blur-md ${levelInfo.bgColor} ${levelInfo.borderColor}`}
    >
      {/* Decorative ambient background blur */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: levelInfo.color }}
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: levelInfo.color }}
          />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            US EPA Air Quality Index
          </span>
        </div>
        
        {onOpenDetails && (
          <button
            onClick={onOpenDetails}
            className="text-slate-400 hover:text-slate-200 transition p-1 rounded-full hover:bg-white/5"
            aria-label="AQI Details"
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Semi-Circle Gauge Visualization */}
      <div className="relative flex flex-col items-center justify-center pt-2 pb-1">
        <svg
          viewBox="0 0 240 135"
          className="w-full max-w-[240px] overflow-visible"
        >
          <defs>
            {/* Multi-stop gradient for the scale */}
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />   {/* Good */}
              <stop offset="20%" stopColor="#eab308" />  {/* Moderate */}
              <stop offset="40%" stopColor="#f97316" />  {/* USG */}
              <stop offset="65%" stopColor="#ef4444" />  {/* Unhealthy */}
              <stop offset="85%" stopColor="#a855f7" />  {/* Very Unhealthy */}
              <stop offset="100%" stopColor="#881337" /> {/* Hazardous */}
            </linearGradient>
          </defs>

          {/* Background Track */}
          <path
            d="M 24 120 A 96 96 0 0 1 216 120"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress Arc */}
          <path
            d="M 24 120 A 96 96 0 0 1 216 120"
            fill="none"
            stroke={levelInfo.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />

          {/* Scale Labels */}
          <text x="24" y="134" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">0</text>
          <text x="62" y="60" fill="#64748b" fontSize="9" fontWeight="500" textAnchor="middle">50</text>
          <text x="120" y="32" fill="#64748b" fontSize="9" fontWeight="500" textAnchor="middle">100</text>
          <text x="178" y="60" fill="#64748b" fontSize="9" fontWeight="500" textAnchor="middle">200</text>
          <text x="216" y="134" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">500</text>
        </svg>

        {/* Center Numbers */}
        <div className="absolute bottom-1 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex items-baseline gap-1">
            <span
              className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-sm font-sans"
              style={{ color: levelInfo.color }}
            >
              {aqi}
            </span>
            <span className="text-xs font-semibold text-slate-400">AQI</span>
          </div>
        </div>
      </div>

      {/* Category Pill & Primary Pollutant Info */}
      <div className="mt-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm border mb-2"
          style={{
            backgroundColor: `${levelInfo.color}25`,
            borderColor: `${levelInfo.color}50`,
            color: levelInfo.color,
          }}
        >
          {aqi > 150 ? <AlertTriangle className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
          <span>{levelInfo.category}</span>
        </div>

        <p className="text-xs text-slate-200 font-medium px-2 leading-relaxed">
          {levelInfo.healthImplications}
        </p>

        {/* Primary Pollutant Row */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1 text-slate-400">
            <Wind className="w-3.5 h-3.5 text-slate-400" />
            Primary Pollutant:
          </span>
          <span className="font-bold text-slate-100 bg-white/10 px-2 py-0.5 rounded text-[11px]">
            {dominantPollutant}
          </span>
        </div>
      </div>
    </div>
  );
};
