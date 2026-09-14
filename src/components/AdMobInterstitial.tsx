/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

interface AdMobInterstitialProps {
  isOpen: boolean;
  onClose: () => void;
  onAdCompleted?: () => void;
}

export const AdMobInterstitial: React.FC<AdMobInterstitialProps> = ({
  isOpen,
  onClose,
  onAdCompleted,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(5);
      setCanClose(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanClose(true);
          if (onAdCompleted) onAdCompleted();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onAdCompleted]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interstitial Advertisement"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white select-none animate-in fade-in duration-200"
    >
      {/* Top AdMob Header with Policy Label & Safe Close Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase">
            Ad
          </span>
          <span className="text-xs text-slate-300 font-medium">
            AdMob Interstitial • Test ca-app-pub-3940256099942544/1033173712
          </span>
        </div>

        <div>
          {canClose ? (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20 shadow-md"
              aria-label="Close Advertisement"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Reward in {secondsRemaining}s</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Interstitial Creative Content */}
      <div className="max-w-md mx-auto w-full text-center my-auto py-8">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-1 shadow-2xl flex items-center justify-center mb-6">
          <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
          SmartHome Air IQ Matrix
        </h3>
        <p className="text-sm text-slate-300 mb-6 max-w-sm mx-auto leading-relaxed">
          Automate your HVAC ventilation dampers when outdoor AQI spikes above 100. Certified zero-ozone plasma filtration technology.
        </p>

        <button
          onClick={() => {
            alert('AdMob Demo: Interstitial CTA clicked.');
            onClose();
          }}
          className="w-full max-w-xs mx-auto py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <span>Explore Smart System</span>
          <ExternalLink className="w-4 h-4" />
        </button>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Complies with Google Better Ads & Frequency Capping Policies</span>
        </div>
      </div>

      {/* Bottom AdMob Compliance Notice */}
      <div className="text-center text-[10px] text-slate-500 pb-2">
        AdMob Interstitial Simulator • Ad will not disrupt subsequent navigation.
      </div>
    </div>
  );
};
