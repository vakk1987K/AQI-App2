/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AQICategory = 
  | 'Good'
  | 'Moderate'
  | 'Unhealthy for Sensitive Groups'
  | 'Unhealthy'
  | 'Very Unhealthy'
  | 'Hazardous';

export interface AQILevelInfo {
  category: AQICategory;
  min: number;
  max: number;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  healthImplications: string;
  cautionaryStatement: string;
}

export interface PollutantDetail {
  id: string;
  name: string;
  chemicalFormula: string;
  value: number;
  unit: string;
  status: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
  whoStandard: string;
  description: string;
  healthImpact: string;
}

export interface HourlyForecastItem {
  time: string;
  displayTime: string;
  aqi: number;
  pm2_5: number;
  pm10: number;
  o3: number;
  uvIndex: number;
  category: AQICategory;
  color: string;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  avgAqi: number;
  maxAqi: number;
  category: AQICategory;
  color: string;
  dominantPollutant: string;
  weatherSummary: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  cityName: string;
  region: string;
  country: string;
  isCurrentLocation: boolean;
  timezone?: string;
}

export interface HealthAdvice {
  outdoorExercise: {
    allowed: boolean;
    recommendation: string;
    icon: string;
  };
  windowsVentilation: {
    allowed: boolean;
    recommendation: string;
    icon: string;
  };
  maskUsage: {
    required: boolean;
    type: string;
    recommendation: string;
    icon: string;
  };
  airPurifier: {
    recommended: boolean;
    mode: string;
    recommendation: string;
    icon: string;
  };
  sensitiveGroups: {
    warning: string;
    groups: string[];
  };
}

export interface AirQualityData {
  location: LocationData;
  usAqi: number;
  europeanAqi: number;
  levelInfo: AQILevelInfo;
  dominantPollutant: string;
  pollutants: Record<string, PollutantDetail>;
  hourlyForecast: HourlyForecastItem[];
  dailyForecast: DailyForecastItem[];
  healthAdvice: HealthAdvice;
  temperatureC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirectionDegrees: number;
  uvIndex: number;
  lastUpdated: string;
}

export interface AdMobPolicyAudit {
  labelingCompliant: boolean;
  accidentalClickDistancePx: number;
  noOverlappingContent: boolean;
  coppaChildDirectedCompliant: boolean;
  gdprCmpConsentGiven: boolean;
  rewardedOptInEnforced: boolean;
  interstitialFrequencyCapMinutes: number;
  testModeActive: boolean;
}
