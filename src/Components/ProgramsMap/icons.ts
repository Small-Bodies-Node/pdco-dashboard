import { IIcon } from 'world-daylight-map/dist/models';

const iconToSvgWidthRatioSmallMap = 0.1;
const iconToSvgWidthRatioLargeMap = 0.05;

export const smallMapIcons: IIcon[] = [
  {
    iconLabel: 'Honolulu, Hawaii',
    iconCoord: { lat: 21.306944, lng: -157.858333 },
    iconUrl: 'images/hawaii-flag.png',
    iconToSvgWidthRatio: iconToSvgWidthRatioSmallMap
  },
  {
    iconLabel: 'Phoenix, Arizona',
    iconCoord: { lat: 33.45, lng: -112.066667 },
    iconUrl: 'images/arizona-flag.png',
    iconToSvgWidthRatio: iconToSvgWidthRatioSmallMap
  },
  {
    iconLabel: 'Washington, DC',
    iconCoord: { lat: 38.904722, lng: -77.016389 },
    iconUrl: 'images/dc-flag.svg',
    iconToSvgWidthRatio: iconToSvgWidthRatioSmallMap
  },
  {
    iconLabel: 'Santiago, Chile',
    iconCoord: { lat: -33.45, lng: -70.666667 },
    iconUrl: 'images/chile-flag.png',
    iconToSvgWidthRatio: iconToSvgWidthRatioSmallMap
  },
  {
    iconLabel: 'London, UK',
    iconCoord: { lat: 51.507222, lng: -0.1275 },
    iconUrl: 'images/utc-flag.png',
    iconToSvgWidthRatio: iconToSvgWidthRatioSmallMap
  },
  {
    iconLabel: 'Cape Town, South Africa',
    iconCoord: { lat: -33.925278, lng: 18.423889 },
    iconUrl: 'images/rsa-flag.png',
    iconToSvgWidthRatio: iconToSvgWidthRatioSmallMap
  },
  {
    iconLabel: 'Perth, Australia',
    iconCoord: { lat: -31.952222, lng: 115.858889 },
    iconUrl: 'images/aus-flag.png',
    iconToSvgWidthRatio: iconToSvgWidthRatioSmallMap
  }
];

export const largeMapIcons: IIcon[] = [
  //
  {
    iconLabel: 'University of Hawaii Institute for Astronomy',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 20.32229757302469, lng: -154.52142563968567 },
    iconLink: 'http://www.ifa.hawaii.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'NASA Infrared Telescope Facility (IRTF)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-observatory.png',
    iconCoord: { lat: 20.32229757302469, lng: -154.52142563968567 },
    iconLink: 'http://irtfweb.ifa.hawaii.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'ATLAS 1 (T05): Asteroid Terrestrial-Last Alert System',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 20.32229757302469, lng: -154.52142563968567 },
    iconLink: 'https://en.wikipedia.org/wiki/Asteroid_Terrestrial-impact_Last_Alert_System',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Las Cumbres Observatory (multiple locations)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 34.648637159303256, lng: -117.71533034016377 },
    iconLink: 'https://lco.global/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'NEOWISE: Near Earth Object Wide-Field Infrared Survey Explorer',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-rocket.png',
    iconCoord: { lat: 34.648637159303256, lng: -117.71533034016377 },
    iconLink: 'https://www.nasa.gov/mission_pages/neowise/main/index.html',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'GSSR: Goldstone Solar System Radar',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-dish.png',
    iconCoord: { lat: 34.648637159303256, lng: -117.71533034016377 },
    iconLink: 'https://gssr.jpl.nasa.gov/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Kitt Peak National Observatory',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-magnifier.png',
    iconCoord: { lat: 32.73837465712535, lng: -114.24294985426538 },
    iconLink: 'https://www.noao.edu/kpno/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Catalina Sky Survey (703)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 32.096710284340936, lng: -111.25091822377047 },
    iconLink: 'https://catalina.lpl.arizona.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Catalina Sky Survey (G96) - Mt. Lemmon',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 32.287911051356375, lng: -111.07333853486054 },
    iconLink: 'https://catalina.lpl.arizona.edu/about/facilities/telescopes',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Discovery Channel Telescope',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-magnifier.png',
    iconCoord: { lat: 34.96893451045559, lng: -111.51861811103456 },
    iconLink: 'http://ast.noao.edu/facilities/future/dct',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Lowell Observatory',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-magnifier.png',
    iconCoord: { lat: 34.96893451045559, lng: -111.51861811103456 },
    iconLink: 'https://lowell.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
    iconLink: 'http://www.mro.nmt.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel:
      'LINEAR (G45): Lincoln Near Earth Asteroid Research Program on the Space Surveillance Telescope (moving to Australia)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Astronomical Research Institute (H21)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 38.99806187893965, lng: -88.88436667636063 },
    iconLink: 'https://www.astro-research.org/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
    iconLink: 'http://www.mro.nmt.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
    iconLink: 'http://www.mro.nmt.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
    iconLink: 'http://www.mro.nmt.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Minor Planet Center under PDS-Small Bodies Node at University of Maryland',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-computer.png',
    iconCoord: { lat: 38.99025469916968, lng: -76.89422227361928 },
    iconLink: 'https://pds-smallbodies.astro.umd.edu/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Minor Planet Center',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-computer.png',
    iconCoord: { lat: 42.031487342315955, lng: -71.54235562576747 },
    iconLink: 'https://minorplanetcenter.net//iau/mpc.html',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Cerro Tololo Interational Observatory (ARI Follow-Up)',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: -31.392403639071922, lng: -67.91893496407594 },
    iconLink: 'http://www.ctio.noao.edu/noao/',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'Space Surveillance Telescope',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: -21.8957, lng: 114.0899 },
    iconLink:
      'https://www.ll.mit.edu/news/space-surveillance-telescope-western-australia-captures-its-first-image',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  {
    iconLabel: 'ESA NEOCC',
    iconUrl: '/images/esa-logo.png',
    iconCoord: { lat: 41.8252, lng: 12.6709 },
    iconLink: 'https://neo.ssa.esa.int',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'ATLAS-HKO',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 20.71, lng: -156.26 },
    iconLink: 'http://dashboard.fallingstar.com/dash/hko.html',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'ATLAS-MLO',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: 19.54, lng: -155.58 },
    iconLink: 'http://dashboard.fallingstar.com/dash/mlo.html',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'ATLAS-CHL',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: -30.47, lng: -70.76 },
    iconLink: 'http://dashboard.fallingstar.com/dash/chl.html',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  },
  //
  {
    iconLabel: 'ATLAS-STH',
    iconUrl: 'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    iconCoord: { lat: -32.38, lng: 20.81 },
    iconLink: 'http://dashboard.fallingstar.com/dash/sth.html',
    iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  }
  //
  // {
  //   iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
  //   iconUrl:
  //     'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
  //   iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
  //   iconLink: 'http://www.mro.nmt.edu/',
  // iconToSvgWidthRatio: iconToSvgWidthRatioLargeMap
  // },
];
