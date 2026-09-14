/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LocationData } from '../types';
import { POPULAR_CITIES, searchCities } from '../services/airQualityService';
import {
  MapPin,
  Search,
  Navigation,
  X,
  Clock,
  Loader2,
  AlertCircle,
  Globe2,
} from 'lucide-react';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
  onUseGps: () => void;
  isDetectingGps: boolean;
  gpsError: string | null;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
  onUseGps,
  isDetectingGps,
  gpsError,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentLocations, setRecentLocations] = useState<LocationData[]>([]);

  // Load recent locations from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('airpulse_recent_locations');
      if (saved) {
        setRecentLocations(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchCities(searchQuery);
        setSearchResults(results);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelect = (loc: LocationData) => {
    // Save to recents
    try {
      const filtered = recentLocations.filter(
        (r) => !(r.cityName === loc.cityName && r.country === loc.country)
      );
      const updated = [loc, ...filtered].slice(0, 5);
      setRecentLocations(updated);
      localStorage.setItem('airpulse_recent_locations', JSON.stringify(updated));
    } catch {
      // ignore
    }

    onSelectLocation(loc);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Location Selection"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-slate-100 animate-in fade-in"
    >
      <div className="w-full max-w-md max-h-[85vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Select Location</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any global city or coordinates..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* GPS Auto-Detect Button */}
          <button
            onClick={onUseGps}
            disabled={isDetectingGps}
            className="mt-3 w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isDetectingGps ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Locating high-precision GPS station...</span>
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Use Current Location (GPS Auto-Detect)</span>
              </>
            )}
          </button>

          {gpsError && (
            <div className="mt-2 p-2 rounded-lg bg-rose-950/50 border border-rose-800/60 text-[11px] text-rose-300 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
              <span>{gpsError}</span>
            </div>
          )}
        </div>

        {/* Results / List Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Search Results */}
          {isSearching && (
            <div className="flex items-center justify-center py-6 text-xs text-slate-400 gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Searching Open-Meteo worldwide database...</span>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Matching Cities
              </h4>
              <div className="space-y-1.5">
                {searchResults.map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(loc)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white">{loc.cityName}</span>
                      <p className="text-[11px] text-slate-400">
                        {[loc.region, loc.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                    <MapPin className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-400">
              No matching cities found for &quot;{searchQuery}&quot;. Please try a different spelling.
            </div>
          )}

          {/* Recent Locations */}
          {recentLocations.length > 0 && !searchQuery && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Recent Searches</span>
              </div>
              <div className="space-y-1.5">
                {recentLocations.map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(loc)}
                    className="w-full text-left p-2 rounded-xl bg-slate-950/50 hover:bg-slate-800 border border-slate-800/80 flex items-center justify-between text-xs transition"
                  >
                    <span className="text-slate-200 font-medium">{loc.cityName}</span>
                    <span className="text-[10px] text-slate-500">{loc.country}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Global Cities */}
          {!searchQuery && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Popular Global Metros</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {POPULAR_CITIES.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(city)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition flex flex-col justify-between ${
                      currentLocation.cityName === city.cityName
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-950/60 hover:bg-slate-800 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="font-semibold">{city.cityName}</span>
                    <span className="text-[10px] text-slate-400">{city.country}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
