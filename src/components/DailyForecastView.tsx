/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DailyForecastItem } from '../types';
import { Calendar, Sparkles, Lock } from 'lucide-react';

interface DailyForecastViewProps {
  dailyForecast: DailyForecastItem[];
  isExtendedUnlocked: boolean;
  onUnlockExtended: () => void;
}

export const DailyForecastView: React.FC<DailyForecastViewProps> = ({
  dailyForecast,
  isExtendedUnlocked,
  onUnlockExtended,
}) => {
  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800/90 p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            7-Day Air Quality Outlook
          </h3>
        </div>
        {!isExtendedUnlocked && (
          <button
            onClick={onUnlockExtended}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
          >
            <Sparkles className="w-3 h-3" />
            <span>Unlock Extended Models</span>
          </button>
        )}
      </div>

      <div className="space-y-2">
        {dailyForecast.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs"
          >
            <div className="w-20">
              <span className="font-semibold text-slate-200">{item.dayName}</span>
              <p className="text-[10px] text-slate-400">{item.date.slice(5)}</p>
            </div>

            <div className="flex items-center gap-2 flex-1 px-3">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] text-slate-300 truncate">
                {item.category}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-slate-400">
                Max: <strong className="text-slate-200">{item.maxAqi}</strong>
              </span>
              <div
                className="w-8 h-6 rounded-md flex items-center justify-center font-bold text-[11px] text-slate-950 shadow-sm"
                style={{ backgroundColor: item.color }}
              >
                {item.avgAqi}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isExtendedUnlocked && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-200">
                Detailed Aerosol & Chemical Wind Dispersion
              </p>
              <p className="text-[10px] text-slate-400">
                Watch a short sponsor message to activate full 7-day hourly breakdown.
              </p>
            </div>
          </div>
          <button
            onClick={onUnlockExtended}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition-colors"
          >
            Unlock
          </button>
        </div>
      )}
    </div>
  );
};
