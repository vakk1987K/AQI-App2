/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Info, ExternalLink, X, ShieldCheck } from 'lucide-react';

interface AdMobBannerProps {
  position?: 'top' | 'bottom';
  className?: string;
  onOpenPolicy?: () => void;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({
  className = '',
  onOpenPolicy,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  if (isDismissed) {
    return (
      <div className="w-full py-1.5 px-4 bg-slate-900/60 border-t border-slate-800/80 text-center">
        <button
          onClick={() => setIsDismissed(false)}
          className="text-[11px] text-slate-400 hover:text-emerald-400 transition underline flex items-center justify-center gap-1 mx-auto"
        >
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          Show AdMob Compliant Banner (Test Unit)
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full bg-slate-900/95 border-t border-slate-800/90 shadow-lg backdrop-blur-md transition-all z-20 ${className}`}
    >
      {/* Top AdMob Policy Identification Bar */}
      <div className="flex items-center justify-between px-3 py-0.5 bg-slate-950/60 border-b border-slate-800/50 text-[10px] text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 tracking-wider uppercase text-[9px]">
            Ad
          </span>
          <span className="text-slate-400 font-medium">AdMob Adaptive Banner • 320×50</span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenPolicy && (
            <button
              onClick={onOpenPolicy}
              className="text-slate-400 hover:text-emerald-300 transition text-[9px] flex items-center gap-0.5"
              title="Inspect AdMob placement policy compliance"
            >
              Policy Check
            </button>
          )}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-slate-500 hover:text-slate-300 transition"
            aria-label="Ad info"
          >
            <Info className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-500 hover:text-slate-300 transition"
            aria-label="Hide test ad"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-300 leading-tight">
          <p className="flex items-center gap-1 font-medium text-emerald-400 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5" /> AdMob Better Ads & Placement Standard
          </p>
          <p className="text-slate-400 text-[10px]">
            Compliant unit ID: <code className="text-slate-300">ca-app-pub-3940256099942544/6300978111</code>. Clearly labeled with &quot;Ad&quot; badge, non-intrusive safe insets, and no accidental click overlap.
          </p>
        </div>
      )}

      {/* Main 320x50 Banner Content Container */}
      <div className="max-w-md mx-auto h-[54px] flex items-center justify-between px-3.5 py-1 gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Advertiser Icon */}
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white text-xs font-bold">Aero</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-100 truncate">
                AeroShield Medical HEPA
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              Eliminate 99.97% of PM2.5 & wildfire smoke indoors.
            </p>
          </div>
        </div>

        {/* CTA Button with safe padding */}
        <a
          href="#clean-air-guide"
          onClick={(e) => {
            e.preventDefault();
            alert('AdMob Compliance Demo: External sponsor destination opened safely. (Official Google Test Banner)');
          }}
          className="shrink-0 px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] shadow-sm flex items-center gap-1 transition-colors"
        >
          <span>Shop</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
