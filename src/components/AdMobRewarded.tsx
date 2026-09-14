/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Gift, Play, X, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface AdMobRewardedProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardGranted: () => void;
  rewardTitle?: string;
}

export const AdMobRewarded: React.FC<AdMobRewardedProps> = ({
  isOpen,
  onClose,
  onRewardGranted,
  rewardTitle = '7-Day Extended Hourly Smog & Pollen Forecast',
}) => {
  const [step, setStep] = useState<'prompt' | 'playing' | 'rewarded'>('prompt');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep('prompt');
      setProgress(0);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (step !== 'playing') return;

    const duration = 6000; // 6 seconds demo
    const interval = 100;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setStep('rewarded');
          onRewardGranted();
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [step, onRewardGranted]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 text-slate-100 animate-in fade-in duration-150"
    >
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 relative overflow-hidden">
        {step === 'prompt' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[9px] uppercase tracking-wider">
                  Rewarded Ad Opt-In
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <Gift className="w-7 h-7" />
            </div>

            <h3 className="text-center text-lg font-bold text-slate-100">
              Unlock Premium Forecast
            </h3>
            <p className="text-center text-xs text-slate-300 mt-1 mb-4 leading-relaxed">
              Under Google AdMob policy, rewarded ads are strictly voluntary. Watch a brief sponsor presentation to unlock:
            </p>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 mb-5 flex items-center gap-2.5 text-xs text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{rewardTitle}</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setStep('playing')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Watch Short Ad (6s)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 px-4 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
              >
                No thanks, keep basic forecast
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>AdMob Rewarded Policy: Explicit opt-in confirmed</span>
            </div>
          </div>
        )}

        {step === 'playing' && (
          <div className="py-4 text-center">
            <div className="flex items-center justify-between mb-3 text-[10px] text-slate-400">
              <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold text-[8px] uppercase">
                Ad
              </span>
              <span>Reward in {(Math.ceil((100 - progress) / 16.6)).toString()}s</span>
            </div>

            {/* Video Simulator Container */}
            <div className="h-44 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-950 border border-slate-700 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-3">
              <Sparkles className="w-10 h-10 text-emerald-400 animate-pulse mb-2" />
              <h4 className="text-sm font-bold text-white">PureBreathe HEPA Pro</h4>
              <p className="text-[11px] text-slate-300 mt-1">
                Hospital-grade particulate filtration for your bedroom.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
              <div
                className="bg-emerald-500 h-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400">Please watch completely to grant unlock...</p>
          </div>
        )}

        {step === 'rewarded' && (
          <div className="py-2 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Reward Unlocked!</h3>
            <p className="text-xs text-slate-300 mt-1 mb-5">
              Thank you! You now have full access to the extended 7-day hourly air quality dispersion models.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              Continue to Insights
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
