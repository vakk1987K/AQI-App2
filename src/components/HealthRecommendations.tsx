/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HealthAdvice } from '../types';
import {
  Activity,
  Wind,
  ShieldCheck,
  ShieldAlert,
  Fan,
  Users,
  Check,
  X,
  AlertOctagon,
} from 'lucide-react';

interface HealthRecommendationsProps {
  healthAdvice: HealthAdvice;
  aqi: number;
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({
  healthAdvice,
  aqi,
}) => {
  const cards = [
    {
      title: 'Outdoor Exercise',
      allowed: healthAdvice.outdoorExercise.allowed,
      recommendation: healthAdvice.outdoorExercise.recommendation,
      icon: Activity,
      statusLabel: healthAdvice.outdoorExercise.allowed ? 'Recommended' : 'Avoid / Limit',
      statusColor: healthAdvice.outdoorExercise.allowed
        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
        : 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      title: 'Windows & Ventilation',
      allowed: healthAdvice.windowsVentilation.allowed,
      recommendation: healthAdvice.windowsVentilation.recommendation,
      icon: Wind,
      statusLabel: healthAdvice.windowsVentilation.allowed ? 'Safe to Open' : 'Keep Closed',
      statusColor: healthAdvice.windowsVentilation.allowed
        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
        : 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Respiratory Protection',
      allowed: !healthAdvice.maskUsage.required,
      recommendation: `${healthAdvice.maskUsage.type}: ${healthAdvice.maskUsage.recommendation}`,
      icon: healthAdvice.maskUsage.required ? ShieldAlert : ShieldCheck,
      statusLabel: healthAdvice.maskUsage.required ? 'Mask Advised' : 'Not Required',
      statusColor: healthAdvice.maskUsage.required
        ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'HEPA Air Purifier',
      allowed: healthAdvice.airPurifier.recommended,
      recommendation: `${healthAdvice.airPurifier.mode} - ${healthAdvice.airPurifier.recommendation}`,
      icon: Fan,
      statusLabel: healthAdvice.airPurifier.recommended ? 'Operate Filter' : 'Standby Mode',
      statusColor: healthAdvice.airPurifier.recommended
        ? 'text-sky-400 bg-sky-500/10 border-sky-500/20'
        : 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Actionable Health & Lifestyle Guidelines
        </h3>
        <span className="text-[11px] text-slate-400">Personal precautions</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-200">{card.title}</span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${card.statusColor}`}
                  >
                    {card.statusLabel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {card.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sensitive Populations Warning Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">
              High-Risk Demographic Advisory
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              {healthAdvice.sensitiveGroups.warning}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {healthAdvice.sensitiveGroups.groups.map((group, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-medium text-slate-300 border border-slate-700"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
