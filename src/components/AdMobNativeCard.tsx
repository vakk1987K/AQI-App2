/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface AdMobNativeCardProps {
  className?: string;
}

export const AdMobNativeCard: React.FC<AdMobNativeCardProps> = ({ className = '' }) => {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-700/60 p-4 shadow-md relative overflow-hidden ${className}`}
    >
      {/* AdMob Policy Disclosure Label */}
      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[9px] uppercase tracking-wider">
            Sponsored
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            AdMob Native Advanced • Test ID ca-app-pub-3940256099942544/2247696110
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-500">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Verified Policy Compliant</span>
        </div>
      </div>

      {/* Ad Content */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-100 leading-snug">
            BreathFree Pro: Real-Time Wearable PM2.5 Sensor
          </h4>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            Laser-precision laser scattering detection. Clip onto your backpack or stroller to monitor personal toxic smog exposure in real time.
          </p>
        </div>
      </div>

      {/* Footer Call to Action with Safe Padding to Avoid Accidental Taps */}
      <div className="mt-3.5 pt-2.5 flex items-center justify-between">
        <div className="text-[11px] text-slate-400">
          <span className="text-amber-400 font-semibold">4.8 ★</span> (1,240 reviews) • Free Shipping
        </div>
        <button
          onClick={() => {
            alert('AdMob Demo: User clicked compliant native ad CTA button. Target: BreathFree Sponsor Store.');
          }}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span>Check Availability</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
