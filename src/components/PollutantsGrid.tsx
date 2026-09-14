/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PollutantDetail } from '../types';
import { Info, X, ShieldCheck, AlertCircle } from 'lucide-react';

interface PollutantsGridProps {
  pollutants: Record<string, PollutantDetail>;
}

export const PollutantsGrid: React.FC<PollutantsGridProps> = ({ pollutants }) => {
  const [selectedPollutant, setSelectedPollutant] = useState<PollutantDetail | null>(null);

  const getStatusBadge = (status: PollutantDetail['status']) => {
    switch (status) {
      case 'Good':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Unhealthy':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Hazardous':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
    }
  };

  const pollutantList: PollutantDetail[] = Object.values(pollutants);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Key Atmospheric Pollutants
        </h3>
        <span className="text-[11px] text-slate-400">Tap card for WHO metrics</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {pollutantList.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedPollutant(item)}
            className="text-left rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 p-3 transition-all duration-200 shadow-sm flex flex-col justify-between group active:scale-[0.98]"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {item.chemicalFormula}
                </span>
                <span
                  className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">{item.name}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
              <div>
                <span className="text-lg font-black text-slate-100">{item.value}</span>
                <span className="text-[10px] text-slate-400 ml-1">{item.unit}</span>
              </div>
              <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      {/* Pollutant Detail Modal */}
      {selectedPollutant && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setSelectedPollutant(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-xl font-bold text-white">
                {selectedPollutant.chemicalFormula}
              </h4>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getStatusBadge(
                  selectedPollutant.status
                )}`}
              >
                {selectedPollutant.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">{selectedPollutant.name}</p>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-3 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Concentration:</span>
                <span className="font-bold text-white">
                  {selectedPollutant.value} {selectedPollutant.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">WHO Health Guideline:</span>
                <span className="font-semibold text-emerald-400">
                  {selectedPollutant.whoStandard}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <h5 className="font-bold text-slate-300 mb-0.5">Atmospheric Origin:</h5>
                <p className="text-slate-400 leading-relaxed">
                  {selectedPollutant.description}
                </p>
              </div>
              <div>
                <h5 className="font-bold text-slate-300 mb-0.5">Physiological Health Impact:</h5>
                <p className="text-slate-400 leading-relaxed">
                  {selectedPollutant.healthImpact}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPollutant(null)}
              className="mt-5 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
