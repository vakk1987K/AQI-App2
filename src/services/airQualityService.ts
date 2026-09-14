/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AirQualityData,
  AQICategory,
  AQILevelInfo,
  DailyForecastItem,
  HealthAdvice,
  HourlyForecastItem,
  LocationData,
  PollutantDetail,
} from '../types';

export const AQI_LEVELS: Record<AQICategory, AQILevelInfo> = {
  'Good': {
    category: 'Good',
    min: 0,
    max: 50,
    color: '#10b981', // Emerald 500
    bgColor: 'bg-emerald-950/40',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    healthImplications: 'Air quality is satisfactory and poses little or no health risk.',
    cautionaryStatement: 'Ideal for outdoor fitness, walks, and opening windows.',
  },
  'Moderate': {
    category: 'Moderate',
    min: 51,
    max: 100,
    color: '#eab308', // Amber 500
    bgColor: 'bg-amber-950/40',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    healthImplications: 'Air quality is acceptable; however, some pollutants may cause moderate health concerns for unusually sensitive individuals.',
    cautionaryStatement: 'Unusually sensitive individuals should consider reducing prolonged or heavy outdoor exertion.',
  },
  'Unhealthy for Sensitive Groups': {
    category: 'Unhealthy for Sensitive Groups',
    min: 101,
    max: 150,
    color: '#f97316', // Orange 500
    bgColor: 'bg-orange-950/40',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    healthImplications: 'Members of sensitive groups (asthma, heart disease, children, seniors) may experience health effects.',
    cautionaryStatement: 'Sensitive groups should reduce prolonged outdoor exertion. Wear masks during heavy traffic.',
  },
  'Unhealthy': {
    category: 'Unhealthy',
    min: 151,
    max: 200,
    color: '#ef4444', // Red 500
    bgColor: 'bg-red-950/40',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/30',
    healthImplications: 'Everyone may begin to experience adverse health effects; sensitive groups may experience more serious symptoms.',
    cautionaryStatement: 'Avoid prolonged outdoor exertion. Keep windows closed and run HEPA air filtration.',
  },
  'Very Unhealthy': {
    category: 'Very Unhealthy',
    min: 201,
    max: 300,
    color: '#a855f7', // Purple 500
    bgColor: 'bg-purple-950/40',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    healthImplications: 'Health alert: The risk of health effects is significantly heightened for all individuals in the area.',
    cautionaryStatement: 'Active children and adults, and people with respiratory disease should avoid all outdoor exertion.',
  },
  'Hazardous': {
    category: 'Hazardous',
    min: 301,
    max: 500,
    color: '#881337', // Rose 900
    bgColor: 'bg-rose-950/60',
    borderColor: 'border-rose-500/40',
    textColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/30 text-rose-300 border-rose-500/40',
    healthImplications: 'Emergency health warning: Entire population is likely to be affected by severe respiratory and cardiovascular stress.',
    cautionaryStatement: 'Remain indoors, seal windows, wear N95/FFP2 respirators if venturing outside, and operate continuous HEPA air cleaners.',
  },
};

export function getAQILevel(aqi: number): AQILevelInfo {
  if (aqi <= 50) return AQI_LEVELS['Good'];
  if (aqi <= 100) return AQI_LEVELS['Moderate'];
  if (aqi <= 150) return AQI_LEVELS['Unhealthy for Sensitive Groups'];
  if (aqi <= 200) return AQI_LEVELS['Unhealthy'];
  if (aqi <= 300) return AQI_LEVELS['Very Unhealthy'];
  return AQI_LEVELS['Hazardous'];
}

export const POPULAR_CITIES: LocationData[] = [
  { cityName: 'New York', region: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, isCurrentLocation: false },
  { cityName: 'Los Angeles', region: 'California', country: 'United States', latitude: 34.0522, longitude: -118.2437, isCurrentLocation: false },
  { cityName: 'London', region: 'England', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, isCurrentLocation: false },
  { cityName: 'Delhi', region: 'National Capital Territory', country: 'India', latitude: 28.6139, longitude: 77.2090, isCurrentLocation: false },
  { cityName: 'Tokyo', region: 'Kanto', country: 'Japan', latitude: 35.6762, longitude: 139.6503, isCurrentLocation: false },
  { cityName: 'Beijing', region: 'Beijing', country: 'China', latitude: 39.9042, longitude: 116.4074, isCurrentLocation: false },
  { cityName: 'Paris', region: 'Île-de-France', country: 'France', latitude: 48.8566, longitude: 2.3522, isCurrentLocation: false },
  { cityName: 'Sydney', region: 'New South Wales', country: 'Australia', latitude: -33.8688, longitude: 151.2093, isCurrentLocation: false },
  { cityName: 'Dubai', region: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, isCurrentLocation: false },
  { cityName: 'Sao Paulo', region: 'São Paulo', country: 'Brazil', latitude: -23.5505, longitude: -46.6333, isCurrentLocation: false },
];

export async function getCurrentGPSLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}

export async function reverseGeocode(lat: number, lon: number): Promise<{ cityName: string; region: string; country: string }> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`, {
      headers: {
        'Accept-Language': 'en',
      },
    });
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const cityName = addr.city || addr.town || addr.municipality || addr.village || addr.county || 'Local Area';
      const region = addr.state || addr.region || addr.province || '';
      const country = addr.country || '';
      return { cityName, region, country };
    }
  } catch {
    // fallback
  }

  return {
    cityName: 'Current Location',
    region: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
    country: '',
  };
}

export async function searchCities(query: string): Promise<LocationData[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=8&language=en&format=json`);
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) return [];

    return data.results.map((item: { name: string; admin1?: string; country?: string; latitude: number; longitude: number; timezone?: string }) => ({
      cityName: item.name,
      region: item.admin1 || '',
      country: item.country || '',
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone,
      isCurrentLocation: false,
    }));
  } catch {
    return [];
  }
}

export async function fetchAirQualityData(location: LocationData): Promise<AirQualityData> {
  const { latitude, longitude } = location;

  // 1. Fetch Air Quality Metrics
  const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index&hourly=us_aqi,pm2_5,pm10,ozone,uv_index&timezone=auto`;
  
  // 2. Fetch Surface Weather Conditions (Temperature, Humidity, Wind)
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=auto`;

  const [aqiRes, weatherRes] = await Promise.all([
    fetch(aqiUrl),
    fetch(weatherUrl).catch(() => null),
  ]);

  if (!aqiRes.ok) {
    throw new Error('Failed to retrieve atmospheric air quality data.');
  }

  const aqiJson = await aqiRes.json();
  const weatherJson = weatherRes && weatherRes.ok ? await weatherRes.json() : null;

  const currentAqi = aqiJson.current || {};
  const hourlyAqi = aqiJson.hourly || {};

  const usAqi = Math.round(currentAqi.us_aqi ?? currentAqi.european_aqi ?? 35);
  const europeanAqi = Math.round(currentAqi.european_aqi ?? 20);
  const levelInfo = getAQILevel(usAqi);

  // Pollutants breakdown
  const pm2_5 = Number((currentAqi.pm2_5 ?? 8.2).toFixed(1));
  const pm10 = Number((currentAqi.pm10 ?? 14.5).toFixed(1));
  const o3 = Number((currentAqi.ozone ?? 45.0).toFixed(1));
  const no2 = Number((currentAqi.nitrogen_dioxide ?? 18.0).toFixed(1));
  const so2 = Number((currentAqi.sulphur_dioxide ?? 4.2).toFixed(1));
  const co = Number((currentAqi.carbon_monoxide ?? 280).toFixed(0));
  const uvIndex = Number((currentAqi.uv_index ?? 3).toFixed(1));
  const dust = Number((currentAqi.dust ?? 5.0).toFixed(1));

  // Determine dominant pollutant
  let dominantPollutant = 'PM2.5';
  if (pm10 > 50 && pm10 > pm2_5 * 2) dominantPollutant = 'PM10';
  else if (o3 > 100) dominantPollutant = 'Ozone (O3)';
  else if (no2 > 80) dominantPollutant = 'Nitrogen Dioxide (NO2)';

  const pollutants: Record<string, PollutantDetail> = {
    pm2_5: {
      id: 'pm2_5',
      name: 'Fine Particulate Matter',
      chemicalFormula: 'PM2.5',
      value: pm2_5,
      unit: 'µg/m³',
      status: pm2_5 <= 12 ? 'Good' : pm2_5 <= 35.4 ? 'Moderate' : pm2_5 <= 55.4 ? 'Unhealthy' : 'Hazardous',
      whoStandard: '15 µg/m³ 24h limit',
      description: 'Microscopic inhalable particles ≤ 2.5 µm that penetrate deep into the pulmonary alveoli and enter the bloodstream.',
      healthImpact: 'Can trigger asthma attacks, chronic bronchitis flare-ups, and systemic vascular inflammation.',
    },
    pm10: {
      id: 'pm10',
      name: 'Coarse Particulate Matter',
      chemicalFormula: 'PM10',
      value: pm10,
      unit: 'µg/m³',
      status: pm10 <= 54 ? 'Good' : pm10 <= 154 ? 'Moderate' : pm10 <= 254 ? 'Unhealthy' : 'Hazardous',
      whoStandard: '45 µg/m³ 24h limit',
      description: 'Inhalable particles ≤ 10 µm originating from construction dust, pollen, agricultural activity, and pulverized road aggregates.',
      healthImpact: 'Causes irritation of eyes, nasal passages, and upper bronchial airways.',
    },
    o3: {
      id: 'o3',
      name: 'Ground-Level Ozone',
      chemicalFormula: 'O₃',
      value: o3,
      unit: 'µg/m³',
      status: o3 <= 54 ? 'Good' : o3 <= 70 ? 'Moderate' : o3 <= 85 ? 'Unhealthy' : 'Hazardous',
      whoStandard: '100 µg/m³ 8h limit',
      description: 'Photochemical oxidant formed when NOx and volatile organic compounds (VOCs) react under sunlight.',
      healthImpact: 'Strong pulmonary irritant that reduces lung capacity and provokes coughing and chest tightness.',
    },
    no2: {
      id: 'no2',
      name: 'Nitrogen Dioxide',
      chemicalFormula: 'NO₂',
      value: no2,
      unit: 'µg/m³',
      status: no2 <= 53 ? 'Good' : no2 <= 100 ? 'Moderate' : no2 <= 360 ? 'Unhealthy' : 'Hazardous',
      whoStandard: '25 µg/m³ 24h limit',
      description: 'Reddish-brown gas produced by automotive internal combustion engines and fossil fuel power plants.',
      healthImpact: 'Exacerbates asthma symptoms, decreases lung function growth in children, and increases respiratory infection vulnerability.',
    },
    so2: {
      id: 'so2',
      name: 'Sulphur Dioxide',
      chemicalFormula: 'SO₂',
      value: so2,
      unit: 'µg/m³',
      status: so2 <= 35 ? 'Good' : so2 <= 75 ? 'Moderate' : so2 <= 185 ? 'Unhealthy' : 'Hazardous',
      whoStandard: '40 µg/m³ 24h limit',
      description: 'Pungent gas emitted from heavy fuel oil, coal combustion, and industrial chemical smelting processes.',
      healthImpact: 'Causes rapid bronchoconstriction in individuals with asthma within minutes of exposure.',
    },
    co: {
      id: 'co',
      name: 'Carbon Monoxide',
      chemicalFormula: 'CO',
      value: co,
      unit: 'µg/m³',
      status: co <= 4400 ? 'Good' : co <= 9400 ? 'Moderate' : co <= 12400 ? 'Unhealthy' : 'Hazardous',
      whoStandard: '4,000 µg/m³ 24h limit',
      description: 'Colorless, odorless gas resulting from incomplete carbon fuel combustion in vehicles and heaters.',
      healthImpact: 'Binds tightly to hemoglobin, diminishing oxygen delivery to vital cardiovascular and neural organs.',
    },
  };

  // Build 24-hour forecast
  const hourlyForecast: HourlyForecastItem[] = [];
  if (hourlyAqi.time && Array.isArray(hourlyAqi.time)) {
    const times = hourlyAqi.time;
    const aqiValues = hourlyAqi.us_aqi || [];
    const pm25Values = hourlyAqi.pm2_5 || [];
    const pm10Values = hourlyAqi.pm10 || [];
    const o3Values = hourlyAqi.ozone || [];
    const uvValues = hourlyAqi.uv_index || [];

    // Find current hour index or start from 0
    const now = new Date();
    const currentHourStr = now.toISOString().slice(0, 13);
    let startIndex = times.findIndex((t: string) => t.startsWith(currentHourStr));
    if (startIndex === -1) startIndex = 0;

    for (let i = startIndex; i < Math.min(times.length, startIndex + 24); i++) {
      const timeStr = times[i];
      const dateObj = new Date(timeStr);
      const val = Math.round(aqiValues[i] ?? usAqi);
      const lvl = getAQILevel(val);

      const hours = dateObj.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHour = hours % 12 === 0 ? 12 : hours % 12;
      const displayTime = i === startIndex ? 'Now' : `${displayHour} ${ampm}`;

      hourlyForecast.push({
        time: timeStr,
        displayTime,
        aqi: val,
        pm2_5: Number((pm25Values[i] ?? pm2_5).toFixed(1)),
        pm10: Number((pm10Values[i] ?? pm10).toFixed(1)),
        o3: Number((o3Values[i] ?? o3).toFixed(1)),
        uvIndex: Number((uvValues[i] ?? 0).toFixed(1)),
        category: lvl.category,
        color: lvl.color,
      });
    }
  }

  // Daily Forecast (7-day simulated projection based on trends)
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyForecast: DailyForecastItem[] = [];
  const today = new Date();

  for (let d = 0; d < 7; d++) {
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() + d);
    const dayName = d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : dayNames[dayDate.getDay()];
    
    // Slight realistic variation for forecast simulation
    const varianceFactor = 1 + (Math.sin(d * 1.5) * 0.22);
    const projectedAqi = Math.max(15, Math.min(450, Math.round(usAqi * varianceFactor)));
    const maxAqi = Math.round(projectedAqi * 1.15);
    const lvl = getAQILevel(projectedAqi);

    dailyForecast.push({
      date: dayDate.toISOString().slice(0, 10),
      dayName,
      avgAqi: projectedAqi,
      maxAqi,
      category: lvl.category,
      color: lvl.color,
      dominantPollutant,
      weatherSummary: projectedAqi <= 50 ? 'Clear & Crisp' : projectedAqi <= 100 ? 'Fair / Mild Haze' : projectedAqi <= 150 ? 'Smoggy Haze' : 'Dense Pollution',
    });
  }

  // Health Advice Generation
  const healthAdvice: HealthAdvice = generateHealthAdvice(usAqi);

  const currentWeather = weatherJson?.current || {};

  return {
    location,
    usAqi,
    europeanAqi,
    levelInfo,
    dominantPollutant,
    pollutants,
    hourlyForecast,
    dailyForecast,
    healthAdvice,
    temperatureC: Math.round(currentWeather.temperature_2m ?? 22),
    humidityPercent: Math.round(currentWeather.relative_humidity_2m ?? 55),
    windSpeedKmh: Math.round(currentWeather.wind_speed_10m ?? 12),
    windDirectionDegrees: Math.round(currentWeather.wind_direction_10m ?? 180),
    uvIndex,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

function generateHealthAdvice(aqi: number): HealthAdvice {
  if (aqi <= 50) {
    return {
      outdoorExercise: {
        allowed: true,
        recommendation: 'Excellent conditions for running, cycling, and all outdoor recreation.',
        icon: 'Activity',
      },
      windowsVentilation: {
        allowed: true,
        recommendation: 'Great time to open windows and let clean ambient air circulate inside.',
        icon: 'Wind',
      },
      maskUsage: {
        required: false,
        type: 'None needed',
        recommendation: 'No mask or respiratory protection required for any group.',
        icon: 'ShieldCheck',
      },
      airPurifier: {
        recommended: false,
        mode: 'Eco / Standby',
        recommendation: 'Indoor air filtration is optional or can run on silent eco-mode.',
        icon: 'Fan',
      },
      sensitiveGroups: {
        warning: 'No cautionary precautions necessary.',
        groups: ['Infants', 'Elderly', 'Athletes', 'Asthmatics'],
      },
    };
  } else if (aqi <= 100) {
    return {
      outdoorExercise: {
        allowed: true,
        recommendation: 'Good for most people. Unusually sensitive runners may experience slight throat dryness.',
        icon: 'Activity',
      },
      windowsVentilation: {
        allowed: true,
        recommendation: 'Safe to open windows; close them if located immediately beside heavy freight corridors.',
        icon: 'Wind',
      },
      maskUsage: {
        required: false,
        type: 'Optional for sensitive groups',
        recommendation: 'Masks not needed for healthy individuals; asthmatics may carry an inhaler.',
        icon: 'ShieldAlert',
      },
      airPurifier: {
        recommended: true,
        mode: 'Auto / Medium',
        recommendation: 'Recommended for bedrooms and nursery rooms for sensitive individuals.',
        icon: 'Fan',
      },
      sensitiveGroups: {
        warning: 'Unusually sensitive individuals should monitor respiratory symptoms.',
        groups: ['Severe Asthmatics', 'COPD Patients'],
      },
    };
  } else if (aqi <= 150) {
    return {
      outdoorExercise: {
        allowed: false,
        recommendation: 'Reduce prolonged or heavy outdoor exertion. Move high-intensity workouts indoors.',
        icon: 'AlertTriangle',
      },
      windowsVentilation: {
        allowed: false,
        recommendation: 'Keep windows and exterior doors closed to prevent particulate infiltration.',
        icon: 'Lock',
      },
      maskUsage: {
        required: true,
        type: 'N95 / KN95 / KF94',
        recommendation: 'Recommended for children, elderly, and those commuting on foot through urban traffic.',
        icon: 'ShieldAlert',
      },
      airPurifier: {
        recommended: true,
        mode: 'High HEPA mode',
        recommendation: 'Run certified HEPA air cleaners in primary living and sleeping zones.',
        icon: 'Fan',
      },
      sensitiveGroups: {
        warning: 'High risk of bronchospasms and coughing for asthmatics and cardiovascular patients.',
        groups: ['Asthma', 'Heart Disease', 'Children < 12', 'Seniors 65+'],
      },
    };
  } else {
    return {
      outdoorExercise: {
        allowed: false,
        recommendation: 'Avoid all outdoor physical activity. Keep exertion strictly within filtered indoor facilities.',
        icon: 'XCircle',
      },
      windowsVentilation: {
        allowed: false,
        recommendation: 'Keep all windows and exterior vents strictly sealed. Switch HVAC to internal recirculation.',
        icon: 'Lock',
      },
      maskUsage: {
        required: true,
        type: 'Fitted N95 / FFP2 Respirator',
        recommendation: 'Mandatory if leaving home. Surgical masks do not seal adequately against PM2.5.',
        icon: 'AlertOctagon',
      },
      airPurifier: {
        recommended: true,
        mode: 'Maximum Turbo HEPA',
        recommendation: 'Continuous filtration in a designated clean air room; check filter saturation.',
        icon: 'Fan',
      },
      sensitiveGroups: {
        warning: 'Severe health warning: Emergency precautions for all demographics.',
        groups: ['All Demographics', 'Pregnant Women', 'Asthmatics', 'Heart Disease'],
      },
    };
  }
}
