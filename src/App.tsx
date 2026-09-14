/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  AirQualityData,
  LocationData,
} from './types';
import {
  fetchAirQualityData,
  getCurrentGPSLocation,
  reverseGeocode,
  POPULAR_CITIES,
} from './services/airQualityService';
import { AQIGauge } from './components/AQIGauge';
import { PollutantsGrid } from './components/PollutantsGrid';
import { HourlyTrendChart } from './components/HourlyTrendChart';
import { DailyForecastView } from './components/DailyForecastView';
import { HealthRecommendations } from './components/HealthRecommendations';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { AdMobBanner } from './components/AdMobBanner';
import { AdMobNativeCard } from './components/AdMobNativeCard';
import { AdMobInterstitial } from './components/AdMobInterstitial';
import { AdMobRewarded } from './components/AdMobRewarded';
import { AdMobPolicyInspector } from './components/AdMobPolicyInspector';
import { SeoEducationHub } from './components/SeoEducationHub';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { AndroidFrame } from './components/AndroidFrame';

import {
  MapPin,
  RefreshCw,
  ShieldCheck,
  Compass,
  Calendar,
  HeartPulse,
  BookOpen,
  Smartphone,
  ChevronRight,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  AlertCircle,
  Loader2,
  Share2,
} from 'lucide-react';

export default function App() {
  // Default starting location
  const [currentLocation, setCurrentLocation] = useState<LocationData>(POPULAR_CITIES[0]);
  const [airData, setAirData] = useState<AirQualityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GPS state
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Modals & Sheets
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPolicyInspectorOpen, setIsPolicyInspectorOpen] = useState(false);
  const [isInterstitialOpen, setIsInterstitialOpen] = useState(false);
  const [isRewardedOpen, setIsRewardedOpen] = useState(false);
  const [isExtendedUnlocked, setIsExtendedUnlocked] = useState(false);

  // Active Android Navigation Tab
  const [activeTab, setActiveTab] = useState<'live' | 'forecast' | 'health' | 'learn'>('live');

  // Android Phone Frame Toggle (for desktop users)
  const [isDesktopFrameActive, setIsDesktopFrameActive] = useState(false);

  // Load Air Quality Data
  const loadData = useCallback(async (loc: LocationData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAirQualityData(loc);
      setAirData(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to retrieve air quality data.';
      setError(msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial Load with automatic GPS detection attempt
  useEffect(() => {
    let isMounted = true;

    async function initialDetection() {
      try {
        if ('geolocation' in navigator) {
          const coords = await getCurrentGPSLocation();
          const geoInfo = await reverseGeocode(coords.latitude, coords.longitude);
          if (isMounted) {
            const gpsLoc: LocationData = {
              latitude: coords.latitude,
              longitude: coords.longitude,
              cityName: geoInfo.cityName,
              region: geoInfo.region,
              country: geoInfo.country,
              isCurrentLocation: true,
            };
            setCurrentLocation(gpsLoc);
            loadData(gpsLoc);
            return;
          }
        }
      } catch {
        // Fall back gracefully to default city (New York)
      }

      if (isMounted) {
        loadData(POPULAR_CITIES[0]);
      }
    }

    initialDetection();

    return () => {
      isMounted = false;
    };
  }, [loadData]);

  // Handle explicit GPS request from user
  const handleUseGps = async () => {
    setIsDetectingGps(true);
    setGpsError(null);
    try {
      const coords = await getCurrentGPSLocation();
      const geoInfo = await reverseGeocode(coords.latitude, coords.longitude);
      const gpsLoc: LocationData = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        cityName: geoInfo.cityName,
        region: geoInfo.region,
        country: geoInfo.country,
        isCurrentLocation: true,
      };
      setCurrentLocation(gpsLoc);
      setIsLocationModalOpen(false);
      await loadData(gpsLoc);
    } catch (err: unknown) {
      const message =
        err instanceof GeolocationPositionError && err.code === err.PERMISSION_DENIED
          ? 'Location permission was denied. Please allow location access in your browser settings or select a city below.'
          : 'Could not resolve GPS location. Please choose your city manually.';
      setGpsError(message);
    } finally {
      setIsDetectingGps(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData(currentLocation);
  };

  const handleSelectLocation = (newLoc: LocationData) => {
    setCurrentLocation(newLoc);
    loadData(newLoc);
  };

  return (
    <AndroidFrame
      currentTime={airData?.lastUpdated}
      isDesktopFrameActive={isDesktopFrameActive}
      onToggleFrame={() => setIsDesktopFrameActive(!isDesktopFrameActive)}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col min-h-full">
        {/* Top Android App Bar */}
        <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5">
          <div className="flex items-center justify-between">
            {/* Location Selector Pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-left transition group active:scale-95"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-100 truncate max-w-[130px] sm:max-w-[180px]">
                    {currentLocation.cityName}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition" />
                </div>
                <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                  {currentLocation.isCurrentLocation ? 'Current Location (GPS)' : currentLocation.country}
                </p>
              </div>
            </button>

            {/* Quick Actions: Policy Inspector, Frame Toggle & Refresh */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPolicyInspectorOpen(true)}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition active:scale-90"
                title="AdMob Policy Inspector (Audit Verification)"
                aria-label="AdMob Policy Audit"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsDesktopFrameActive(!isDesktopFrameActive)}
                className="hidden sm:flex p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                title="Toggle Android Device Frame Preview"
                aria-label="Toggle device frame"
              >
                <Smartphone className="w-4 h-4" />
              </button>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition active:scale-90 disabled:opacity-50"
                title="Refresh Air Quality Data"
                aria-label="Refresh data"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 p-3.5 sm:p-4 space-y-4 pb-28">
          {/* PWA Install Banner */}
          <PWAInstallPrompt />

          {/* Loading State */}
          {isLoading && !airData && (
            <div className="flex flex-col items-center justify-center py-24 space-y-3">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
              <p className="text-xs text-slate-400">
                Fetching real-time atmospheric readings for {currentLocation.cityName}...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <AlertCircle className="w-4 h-4" />
                <span>Atmospheric Monitoring Error</span>
              </div>
              <p>{error}</p>
              <button
                onClick={() => loadData(currentLocation)}
                className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-slate-950 font-bold transition"
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* Populated Data Views based on Active Tab */}
          {airData && (
            <>
              {/* TAB 1: Live AQI & Pollutant Metrics */}
              {activeTab === 'live' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Weather Snapshot Bar */}
                  <div className="grid grid-cols-4 gap-2 text-center p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 text-xs">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-amber-400" /> Temp
                      </span>
                      <span className="font-bold text-slate-100 mt-0.5">{airData.temperatureC}°C</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-sky-400" /> Humidity
                      </span>
                      <span className="font-bold text-slate-100 mt-0.5">{airData.humidityPercent}%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Wind className="w-3 h-3 text-teal-400" /> Wind
                      </span>
                      <span className="font-bold text-slate-100 mt-0.5">{airData.windSpeedKmh} km/h</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Sun className="w-3 h-3 text-yellow-400" /> UV Index
                      </span>
                      <span className="font-bold text-slate-100 mt-0.5">{airData.uvIndex}</span>
                    </div>
                  </div>

                  {/* Primary AQI Meter Gauge */}
                  <AQIGauge
                    aqi={airData.usAqi}
                    levelInfo={airData.levelInfo}
                    dominantPollutant={airData.dominantPollutant}
                    onOpenDetails={() => setActiveTab('health')}
                  />

                  {/* 24-Hour Sparkline & Hourly Forecast */}
                  <HourlyTrendChart hourlyForecast={airData.hourlyForecast} />

                  {/* AdMob In-Feed Native Card (Strict Policy Compliant) */}
                  <AdMobNativeCard />

                  {/* Criteria Pollutants Grid (PM2.5, PM10, O3, NO2, SO2, CO) */}
                  <PollutantsGrid pollutants={airData.pollutants} />

                  {/* Quick Health Callout Banner */}
                  <div
                    onClick={() => setActiveTab('health')}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800/80 border border-slate-700/80 shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-600 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <HeartPulse className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">
                          Personal Protection Guidance
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {airData.healthAdvice.maskUsage.required ? 'N95 Respirator Advised' : 'Safe for Outdoor Exercise'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              )}

              {/* TAB 2: Forecast & Trends */}
              {activeTab === 'forecast' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <DailyForecastView
                    dailyForecast={airData.dailyForecast}
                    isExtendedUnlocked={isExtendedUnlocked}
                    onUnlockExtended={() => setIsRewardedOpen(true)}
                  />

                  <HourlyTrendChart hourlyForecast={airData.hourlyForecast} />

                  {/* Interstitial Ad Demo Trigger */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-center space-y-2">
                    <p className="text-slate-300">
                      Want to inspect the AdMob Interstitial Ad compliance flow?
                    </p>
                    <button
                      onClick={() => setIsInterstitialOpen(true)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition"
                    >
                      Preview AdMob Interstitial (5s Safe Countdown)
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Actionable Health Guidelines */}
              {activeTab === 'health' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <HealthRecommendations
                    healthAdvice={airData.healthAdvice}
                    aqi={airData.usAqi}
                  />

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-slate-200">
                      Why PM2.5 Requires Certified N95 Respirators:
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Microscopic combustion particles (≤2.5 micrometers) easily pass around loose cotton or surgical masks. Electrostatic N95 or KN95 respirators capture 95%+ of sub-micron particles when properly sealed across the nasal bridge.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: High SEO Knowledge Hub & Scientific Articles */}
              {activeTab === 'learn' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <SeoEducationHub
                    currentCity={currentLocation.cityName}
                    currentAqi={airData.usAqi}
                  />
                </div>
              )}
            </>
          )}
        </main>

        {/* AdMob Policy-Compliant Bottom Anchor Banner */}
        <div className="sticky bottom-[58px] z-20">
          <AdMobBanner onOpenPolicy={() => setIsPolicyInspectorOpen(true)} />
        </div>

        {/* Android Material 3 Bottom Navigation Bar */}
        <nav
          aria-label="App Navigation"
          className="sticky bottom-0 z-30 bg-slate-950 border-t border-slate-800/90 px-3 py-1.5 flex items-center justify-around shadow-2xl backdrop-blur-md"
        >
          <button
            onClick={() => setActiveTab('live')}
            className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'live'
                ? 'text-emerald-400 font-bold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Live AQI</span>
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'forecast'
                ? 'text-emerald-400 font-bold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">7-Day</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'health'
                ? 'text-emerald-400 font-bold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HeartPulse className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Health</span>
          </button>

          <button
            onClick={() => setActiveTab('learn')}
            className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'learn'
                ? 'text-emerald-400 font-bold bg-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Guides & FAQ</span>
          </button>
        </nav>

        {/* Modals and Ad Units */}
        <LocationSelectorModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          currentLocation={currentLocation}
          onSelectLocation={handleSelectLocation}
          onUseGps={handleUseGps}
          isDetectingGps={isDetectingGps}
          gpsError={gpsError}
        />

        <AdMobPolicyInspector
          isOpen={isPolicyInspectorOpen}
          onClose={() => setIsPolicyInspectorOpen(false)}
          onTriggerInterstitial={() => setIsInterstitialOpen(true)}
          onTriggerRewarded={() => setIsRewardedOpen(true)}
        />

        <AdMobInterstitial
          isOpen={isInterstitialOpen}
          onClose={() => setIsInterstitialOpen(false)}
        />

        <AdMobRewarded
          isOpen={isRewardedOpen}
          onClose={() => setIsRewardedOpen(false)}
          onRewardGranted={() => setIsExtendedUnlocked(true)}
        />
      </div>
    </AndroidFrame>
  );
}
