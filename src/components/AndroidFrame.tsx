/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  currentTime?: string;
  isDesktopFrameActive: boolean;
  onToggleFrame: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  currentTime,
  isDesktopFrameActive,
  onToggleFrame,
}) => {
  const displayTime = currentTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!isDesktopFrameActive) {
    // Full screen responsive mode (native mobile look & fluid desktop)
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        {children}
      </div>
    );
  }

  // Android Phone Frame Mode (for desktop preview inspection)
  return (
    <div className="min-h-screen bg-slate-950/90 text-slate-100 flex flex-col items-center justify-center p-2 sm:p-6 select-none">
      {/* Top Frame Controller Bar */}
      <div className="w-full max-w-sm mb-3 flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-medium text-emerald-400">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android Pixel Viewport (412×915)</span>
        </div>
        <button
          onClick={onToggleFrame}
          className="flex items-center gap-1 hover:text-white bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700 transition"
          title="Toggle between framed Android device and full width"
        >
          <Maximize2 className="w-3 h-3" />
          <span>Full Width</span>
        </button>
      </div>

      {/* Android Device Hardware Bezel */}
      <div className="w-full max-w-[412px] h-[860px] bg-slate-900 border-[10px] border-slate-800 rounded-[44px] shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-slate-700/60">
        {/* Camera Hole Punch Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black z-40 flex items-center justify-center border border-slate-800/80">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
        </div>

        {/* Android Material 3 Status Bar */}
        <div className="w-full h-8 bg-slate-950 text-slate-300 px-5 flex items-center justify-between text-[11px] font-medium z-30 select-none shrink-0">
          <span>{displayTime}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3 text-slate-300" />
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3 h-3 text-slate-300" />
            <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Scrollable Screen Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-between scrollbar-none bg-slate-950">
          {children}
        </div>

        {/* Android Bottom Navigation / Gesture Bar */}
        <div className="w-full h-5 bg-slate-950 flex items-center justify-center pb-1 shrink-0 z-30">
          <div className="w-28 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
