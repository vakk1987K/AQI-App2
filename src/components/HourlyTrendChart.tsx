/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HourlyForecastItem } from '../types';
import { Clock, TrendingUp, SunMedium } from 'lucide-react';

interface HourlyTrendChartProps {
  hourlyForecast: HourlyForecastItem[];
}

export const HourlyTrendChart: React.FC<HourlyTrendChartProps> = ({ hourlyForecast }) => {
  const [selectedHour, setSelectedHour] = useState<HourlyForecastItem | null>(null);

  if (!hourlyForecast || hourlyForecast.length === 0) return null;

  // Compute max and min AQI for SVG scaling
  const aqiValues = hourlyForecast.map((h) => h.aqi);
  const maxAqi = Math.max(...aqiValues, 50);
  const minAqi = Math.min(...aqiValues, 0);

  // SVG dimensions
  const svgWidth = 480;
  const svgHeight = 70;
  const paddingX = 16;
  const paddingY = 12;

  const points = hourlyForecast.map((item, index) => {
    const x = paddingX + (index / (hourlyForecast.length - 1)) * (svgWidth - paddingX * 2);
    const range = maxAqi - minAqi || 1;
    const y = svgHeight - paddingY - ((item.aqi - minAqi) / range) * (svgHeight - paddingY * 2);
    return { x, y, item };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800/90 p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            24-Hour Smog & AQI Forecast
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Peak: <strong className="text-amber-400">{maxAqi} AQI</strong>
        </span>
      </div>

      {/* SVG Trend Sparkline */}
      <div className="relative overflow-hidden rounded-xl bg-slate-950/60 border border-slate-800/60 py-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-16 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaD} fill="url(#areaGradient)" />

          {/* Line stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sparkline dots */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3"
              fill={pt.item.color}
              stroke="#0f172a"
              strokeWidth="1.5"
              className="cursor-pointer hover:r-5 transition-all"
              onClick={() => setSelectedHour(pt.item)}
            />
          ))}
        </svg>
      </div>

      {/* Horizontal Scrollable Hourly Cards */}
      <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-700">
        {hourlyForecast.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedHour(item)}
            className={`shrink-0 flex flex-col items-center justify-between p-2.5 rounded-xl border transition-all active:scale-95 ${
              selectedHour?.time === item.time
                ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                : 'bg-slate-950/70 hover:bg-slate-800/70 border-slate-800/80'
            }`}
            style={{ width: '70px' }}
          >
            <span className="text-[11px] font-medium text-slate-400">{item.displayTime}</span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center my-1.5 text-xs font-bold text-slate-950 shadow-sm"
              style={{ backgroundColor: item.color }}
            >
              {item.aqi}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-300">
              <span>PM:</span>
              <span className="font-semibold">{item.pm2_5}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedHour && (
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs flex items-center justify-between animate-in fade-in">
          <div>
            <span className="font-bold text-slate-200">{selectedHour.displayTime} Details:</span>
            <div className="text-[11px] text-slate-400 mt-0.5">
              AQI {selectedHour.aqi} ({selectedHour.category}) • PM2.5: {selectedHour.pm2_5} µg/m³
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
            <SunMedium className="w-4 h-4" />
            <span>UV: {selectedHour.uvIndex}</span>
          </div>
        </div>
      )}
    </div>
  );
};
