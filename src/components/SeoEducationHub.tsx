/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SEO_ARTICLES, SEO_FAQS, SeoArticle } from '../data/seoContent';
import {
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  FileText,
  Search,
  Scale,
  Sparkles,
  Share2,
  ShieldCheck,
} from 'lucide-react';

interface SeoEducationHubProps {
  currentCity: string;
  currentAqi: number;
}

export const SeoEducationHub: React.FC<SeoEducationHubProps> = ({
  currentCity,
  currentAqi,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<SeoArticle | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'faqs' | 'standards'>('articles');
  const [copiedShare, setCopiedShare] = useState(false);

  const filteredFaqs = SEO_FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.detailedAnswer.toLowerCase().includes(faqSearchQuery.toLowerCase())
  );

  const handleShare = async () => {
    const text = `AirPulse Report for ${currentCity}: Current AQI is ${currentAqi}. Check live PM2.5 and atmospheric health advisories here: https://airpulse-aqi.app`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'articles'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Guides & Science
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'faqs'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            FAQ & Answers
          </button>
          <button
            onClick={() => setActiveTab('standards')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'standards'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EPA vs WHO
          </button>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95"
          title="Share air quality report"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{copiedShare ? 'Copied!' : 'Share AQI'}</span>
        </button>
      </div>

      {/* Articles View */}
      {activeTab === 'articles' && (
        <div className="space-y-3">
          {selectedArticle ? (
            <article className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-sm space-y-4 animate-in fade-in">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                ← Back to All Guides
              </button>

              <header>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider border border-emerald-500/30">
                  {selectedArticle.category}
                </span>
                <h2 className="text-lg font-bold text-white mt-2 leading-snug">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{selectedArticle.readingTimeMinutes} min read • Peer-reviewed environmental metrics</span>
                </div>
              </header>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70">
                <h4 className="text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Key Clinical Takeaways:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedArticle.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                {selectedArticle.sections.map((section, idx) => (
                  <section key={idx}>
                    <h3 className="text-sm font-bold text-slate-100 mb-1.5">
                      {section.heading}
                    </h3>
                    <div className="space-y-2">
                      {section.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
              >
                Done Reading
              </button>
            </article>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SEO_ARTICLES.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition cursor-pointer shadow-sm flex flex-col justify-between group active:scale-[0.99]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingTimeMinutes} min
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-semibold text-emerald-400">
                    <span>Read Full Guide</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FAQs View */}
      {activeTab === 'faqs' && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              placeholder="Search air quality & policy FAQs..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-bold text-slate-200 hover:text-white"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold mb-2">
                        Quick Summary: {faq.shortAnswer}
                      </div>
                      <p>{faq.detailedAnswer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Standards View: EPA vs WHO comparison */}
      {activeTab === 'standards' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200">
              EPA Standard vs WHO 2021 Global Guidelines
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            The World Health Organization (WHO) updated its Air Quality Guidelines in 2021 to reflect recent epidemiological data proving adverse cardiovascular and pulmonary effects at much lower concentrations than previously understood.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] uppercase text-slate-400">
                  <th className="py-2 pr-2">Pollutant</th>
                  <th className="py-2 px-2">WHO 2021 Limit</th>
                  <th className="py-2 px-2">US EPA Standard</th>
                  <th className="py-2 pl-2">Biological Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px]">
                <tr>
                  <td className="py-2 pr-2 font-bold text-white">PM2.5 (24h)</td>
                  <td className="py-2 px-2 text-emerald-400 font-semibold">15 µg/m³</td>
                  <td className="py-2 px-2 text-amber-400">35 µg/m³</td>
                  <td className="py-2 pl-2 text-slate-400">Arterial thrombosis</td>
                </tr>
                <tr>
                  <td className="py-2 pr-2 font-bold text-white">PM10 (24h)</td>
                  <td className="py-2 px-2 text-emerald-400 font-semibold">45 µg/m³</td>
                  <td className="py-2 px-2 text-amber-400">150 µg/m³</td>
                  <td className="py-2 pl-2 text-slate-400">Airway hyperreactivity</td>
                </tr>
                <tr>
                  <td className="py-2 pr-2 font-bold text-white">NO2 (24h)</td>
                  <td className="py-2 px-2 text-emerald-400 font-semibold">25 µg/m³</td>
                  <td className="py-2 px-2 text-amber-400">188 µg/m³</td>
                  <td className="py-2 pl-2 text-slate-400">Childhood asthma</td>
                </tr>
                <tr>
                  <td className="py-2 pr-2 font-bold text-white">Ozone (8h)</td>
                  <td className="py-2 px-2 text-emerald-400 font-semibold">100 µg/m³</td>
                  <td className="py-2 px-2 text-amber-400">137 µg/m³</td>
                  <td className="py-2 pl-2 text-slate-400">Alveolar damage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
