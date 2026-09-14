/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SeoArticle {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  readingTimeMinutes: number;
  category: 'Pollution Science' | 'Health & Safety' | 'Standards & Guidelines' | 'AdMob Compliance';
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    content: string[];
  }[];
}

export interface SeoFaq {
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  category: string;
}

export const SEO_ARTICLES: SeoArticle[] = [
  {
    id: 'understanding-aqi-scale',
    slug: 'understanding-air-quality-index-aqi-scale',
    title: 'The Definitive Guide to the Air Quality Index (AQI): Scales, Hazards & Protection',
    metaDescription: 'Learn how the EPA Air Quality Index is calculated, what PM2.5 and PM10 mean, and how to protect yourself across the 6 AQI severity categories.',
    readingTimeMinutes: 5,
    category: 'Standards & Guidelines',
    summary: 'The Air Quality Index (AQI) acts as an environmental thermometer for the air we breathe. It translates complex ambient concentrations of particulate matter, ozone, and toxic gases into an actionable scale from 0 to 500.',
    keyTakeaways: [
      'AQI 0-50 represents clean, optimal air quality suitable for all outdoor activity.',
      'AQI 101-150 begins triggering symptoms in sensitive populations such as asthmatics and the elderly.',
      'AQI exceeding 200 represents acute emergency health warnings where everyone should limit outdoor exertion.',
      'The dominant pollutant is the single parameter that yields the highest calculated AQI score at any given time.'
    ],
    sections: [
      {
        heading: 'How the US EPA AQI Scale Works',
        content: [
          'The United States Environmental Protection Agency (EPA) establishes National Ambient Air Quality Standards (NAAQS) under the Clean Air Act. The AQI condenses five major criteria air pollutants into a piecewise linear function.',
          'The equation converts raw pollutant concentrations (such as micrograms per cubic meter or parts per billion) against pre-established health breakpoints. The final reported AQI equals the maximum sub-index calculated across all monitored criteria pollutants.'
        ]
      },
      {
        heading: 'The Six Standard Severity Categories',
        content: [
          'Good (0 - 50, Green): Air quality is satisfactory, and air pollution poses little or no risk.',
          'Moderate (51 - 100, Yellow): Air quality is acceptable; however, unusually sensitive people may experience minor respiratory discomfort from ozone or particle pollution.',
          'Unhealthy for Sensitive Groups (101 - 150, Orange): Members of sensitive groups—including children, older adults, and people with lung or heart disease—may experience adverse health effects.',
          'Unhealthy (151 - 200, Red): Everyone may begin to experience adverse health effects; members of sensitive groups may experience more serious health effects.',
          'Very Unhealthy (201 - 300, Purple): Health alert: The risk of health effects is increased for everyone in the population.',
          'Hazardous (301 - 500, Maroon): Health warning of emergency conditions: Everyone is more likely to be seriously affected. Outdoor activity should be avoided entirely.'
        ]
      }
    ]
  },
  {
    id: 'pm25-vs-pm10-science',
    slug: 'pm25-vs-pm10-particulate-matter-deep-dive',
    title: 'PM2.5 vs PM10: Particle Sizes, Biological Penetration & Long-Term Health Risks',
    metaDescription: 'Discover the scientific differences between fine (PM2.5) and coarse (PM10) particulate matter, including pulmonary alveoli translocation and cardiovascular harm.',
    readingTimeMinutes: 6,
    category: 'Pollution Science',
    summary: 'Particulate matter is not a single chemical entity, but a complex mixture of microscopic solids and liquid droplets suspended in the atmosphere. Understanding particle diameter is key to understanding pulmonary deposition.',
    keyTakeaways: [
      'PM2.5 particles are under 2.5 micrometers in aerodynamic diameter, enabling them to bypass nasal ciliary filtration.',
      'PM2.5 can cross the blood-air barrier in pulmonary alveoli, entering systemic arterial circulation.',
      'PM10 particles originate mainly from mechanical grinding, road dust, construction, and agricultural activities.',
      'WHO 2021 updated guidelines recommend an annual PM2.5 mean exposure below 5 µg/m³ and 24-hour mean below 15 µg/m³.'
    ],
    sections: [
      {
        heading: 'Aerodynamic Size Differences and Sources',
        content: [
          'PM10 includes particles up to 10 micrometers in diameter, including windblown dust, pollen fragments, mold spores, and pulverized road aggregates.',
          'PM2.5 (fine particulate matter) primarily originates from high-temperature combustion processes: vehicle exhaust emissions, coal-fired thermoelectric power plants, wood burning, industrial metallurgy, and forest wildfires.'
        ]
      },
      {
        heading: 'Systemic Physiological Impact',
        content: [
          'When inhaled, coarse PM10 particles are largely arrested by mucosal cilia in the upper trachea and nasopharyngeal passages.',
          'In contrast, ultra-fine PM2.5 particles penetrate directly into bronchioles and alveolar sacs. Chemical components such as polycyclic aromatic hydrocarbons (PAHs), heavy metals (lead, cadmium, arsenic), and elemental black carbon provoke intense cellular oxidative stress and macrophage inflammation.'
        ]
      }
    ]
  },
  {
    id: 'admob-publisher-policies-guide',
    slug: 'admob-publisher-policies-best-practices-guide',
    title: 'AdMob Publisher Policy Compliance: Clean Ad Placements & Better Ads Standards',
    metaDescription: 'A comprehensive technical overview of Google AdMob company policies: accidental click prevention, ad labeling, interstitial frequency capping, and rewarded ad opt-ins.',
    readingTimeMinutes: 4,
    category: 'AdMob Compliance',
    summary: 'Google AdMob maintains rigorous quality guidelines to protect advertisers, publishers, and end users. Building a compliant Android application requires careful architectural segregation between interactive UI elements and monetization units.',
    keyTakeaways: [
      'Mandatory Ad Labeling: Every ad unit must display unambiguous labeling such as "Ad", "Sponsored", or "Advertisement".',
      'Accidental Click Mitigation: Maintain a strict minimum safe buffer (16px+) away from interactive buttons, menus, and scrollbars.',
      'No Unexpected Interstitials: Interstitials must never appear during active user tasks, cold boots, or upon app exit.',
      'Transparent Rewarded Opt-In: Users must explicitly choose to watch a rewarded video with clear pre-disclosure of the reward.',
      'Better Ads Coalition Compliance: No auto-playing audio ads, flashing creatives, or full-screen overlays without instant close controls.'
    ],
    sections: [
      {
        heading: 'Labeling & Visual Distinction Standards',
        content: [
          'Under Google AdMob policy, ads must never be disguised as core application interface components or navigation controls.',
          'Native ads must include an "Ad" or "Sponsored" badge with legible contrast against the container background. Misleading arrows or clickable borders that falsely indicate native functionality violate AdMob placement policies.'
        ]
      },
      {
        heading: 'Buffer Zones & Accidental Click Defenses',
        content: [
          'Accidental clicks erode advertiser ROI and trigger AdMob policy strikes. In this application, adaptive banner ads are anchored in a dedicated bottom frame with physical separation from touch targets.',
          'All touch areas on adjacent controls (such as bottom tabs, pull-to-refresh headers, and search buttons) have padded safety boundaries.'
        ]
      }
    ]
  },
  {
    id: 'masks-air-purifiers-protection',
    slug: 'air-pollution-protection-masks-purifiers-hepa',
    title: 'Personal Defense Against Toxic Smog: HEPA Purifiers, N95 Masks & Indoor Air Quality',
    metaDescription: 'Evidence-based strategies for purifying indoor air and selecting certified respiratory protective equipment during hazardous wildfire smoke or urban smog episodes.',
    readingTimeMinutes: 5,
    category: 'Health & Safety',
    summary: 'When ambient AQI reaches Unhealthy or Hazardous levels, behavioral adjustments are critical. Surgical and cloth masks offer negligible protection against PM2.5; certified respirators and sealed HEPA filtration are essential.',
    keyTakeaways: [
      'True HEPA (High-Efficiency Particulate Air) filters capture 99.97% of particles as small as 0.3 micrometers.',
      'Surgical paper and cloth masks leak around edges, providing less than 20% filtration against fine PM2.5.',
      'NIOSH-certified N95, European FFP2, or Korean KF94 respirators with tight facial seals are the clinical standard.',
      'Keep indoor windows tightly closed when outdoor AQI exceeds 150, and switch vehicle ventilation to recirculation mode.'
    ],
    sections: [
      {
        heading: 'Selecting Certified Respirators',
        content: [
          'During high-pollution episodes, standard cotton bandanas or loose surgical masks do not create a pneumatic seal around the nose and jaw, allowing polluted air to bypass the filter medium entirely.',
          'Certified N95, KN95, or FFP2 respirators utilize electrostatically charged meltblown polypropylene fibers that trap microscopic particles through interception, impaction, and diffusion.'
        ]
      },
      {
        heading: 'Indoor Air Management and Clean Air Rooms',
        content: [
          'Create a designated "Clean Air Room" inside your home: an interior room with minimal windows and exterior doors where a properly sized HEPA air purifier runs continuously.',
          'Calculate Clean Air Delivery Rate (CADR): Your purifier CADR rating (measured in cubic feet per minute) should equal at least two-thirds of the room floor area in square feet.'
        ]
      }
    ]
  }
];

export const SEO_FAQS: SeoFaq[] = [
  {
    question: 'How often does this app update real-time AQI data?',
    shortAnswer: 'Every hour from continuous atmospheric monitoring stations.',
    detailedAnswer: 'AirPulse queries real-time ground-based air quality monitoring stations and spatial chemistry satellite grids hourly through the Open-Meteo atmospheric monitoring network. Hourly forecasts update continuously as wind, solar radiation, and boundary layer heights evolve.',
    category: 'Data & Accuracy'
  },
  {
    question: 'What is the difference between US AQI and European AQI (EAQI)?',
    shortAnswer: 'US AQI uses a 0–500 numeric scale; EAQI uses a 1–6 index scale.',
    detailedAnswer: 'The US EPA AQI standardizes all five criteria pollutants onto a 0–500 scale with 6 health-based color categories. The European Air Quality Index (EAQI) developed by the European Environment Agency categorizes levels into 5 to 6 bands (Good, Fair, Moderate, Poor, Very Poor, Extremely Poor) based on rolling hourly concentration thresholds for PM2.5, PM10, NO2, and O3.',
    category: 'Standards'
  },
  {
    question: 'Can I exercise outdoors if the AQI is in the Moderate (51-100) range?',
    shortAnswer: 'Yes for most individuals, with caution for those with asthma.',
    detailedAnswer: 'For the general healthy population, moderate air quality does not pose significant immediate risks. However, highly sensitive individuals, individuals with chronic bronchitis or exercise-induced asthma, and young children engaging in prolonged aerobic exercise may notice mild throat irritation. Limiting strenuous outdoor interval training near heavy highway traffic is advised.',
    category: 'Health'
  },
  {
    question: 'Why does AQI often peak during early mornings and late evenings?',
    shortAnswer: 'Due to nocturnal thermal inversions trapping ground emissions.',
    detailedAnswer: 'During clear nights, the Earth\'s surface cools rapidly through infrared radiation, cooling the air immediately above it. This cooler, denser air gets trapped underneath a layer of warmer air above—a phenomenon known as a thermal inversion. This prevents vertical atmospheric convection, trapping vehicular exhaust, wood smoke, and factory emissions near ground breathing level until morning sunlight re-establishes atmospheric mixing.',
    category: 'Pollution Science'
  },
  {
    question: 'What AdMob policies are implemented in this application?',
    shortAnswer: 'Clear "Ad" labeling, no accidental clicks, Better Ads Standards, and user-consented rewarded ad flows.',
    detailedAnswer: 'This application rigorously respects Google AdMob publisher policies: 1) Every monetization unit displays distinct "Ad" or "Sponsored" badges; 2) Adaptive anchor banners are isolated with dedicated layout margins to avoid accidental taps near navigation bars; 3) No intrusive pop-up ads appear unexpectedly; and 4) Rewarded units require explicit opt-in confirmation with complete disclosures.',
    category: 'AdMob Compliance'
  },
  {
    question: 'Does this app store or transmit my precise GPS coordinates to third parties?',
    shortAnswer: 'No. Geolocation coordinates are used client-side solely to query environmental data.',
    detailedAnswer: 'Your privacy is strictly respected. When you grant browser location permissions, coordinates are queried directly via client-side HTTPS requests to atmospheric data endpoints. No persistent tracking, location logs, or telemetry are stored on external commercial ad trackers.',
    category: 'Privacy'
  }
];
