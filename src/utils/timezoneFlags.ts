import moment from "moment-timezone";

// Mappings for IANA timezones to 2-letter ISO country codes (lowercase)
const TIMEZONE_COUNTRY_MAP: Record<string, string> = {
  // Asia
  "Asia/Manila": "ph",
  "Asia/Tokyo": "jp",
  "Asia/Kolkata": "in",
  "Asia/Calcutta": "in",
  "Asia/Singapore": "sg",
  "Asia/Hong_Kong": "hk",
  "Asia/Shanghai": "cn",
  "Asia/Chongqing": "cn",
  "Asia/Harbin": "cn",
  "Asia/Urumqi": "cn",
  "Asia/Seoul": "kr",
  "Asia/Bangkok": "th",
  "Asia/Jakarta": "id",
  "Asia/Makassar": "id",
  "Asia/Jayapura": "id",
  "Asia/Kuala_Lumpur": "my",
  "Asia/Kuching": "my",
  "Asia/Dubai": "ae",
  "Asia/Riyadh": "sa",
  "Asia/Jerusalem": "il",
  "Asia/Tel_Aviv": "il",
  "Asia/Taipei": "tw",
  "Asia/Ho_Chi_Minh": "vn",
  "Asia/Saigon": "vn",
  "Asia/Kathmandu": "np",
  "Asia/Katmandu": "np",
  "Asia/Dhaka": "bd",
  "Asia/Dacca": "bd",
  "Asia/Karachi": "pk",
  "Asia/Colombo": "lk",
  "Asia/Baghdad": "iq",
  "Asia/Tehran": "ir",

  // Europe
  "Europe/London": "gb",
  "Europe/Paris": "fr",
  "Europe/Berlin": "de",
  "Europe/Rome": "it",
  "Europe/Madrid": "es",
  "Europe/Amsterdam": "nl",
  "Europe/Brussels": "be",
  "Europe/Vienna": "at",
  "Europe/Zurich": "ch",
  "Europe/Stockholm": "se",
  "Europe/Oslo": "no",
  "Europe/Copenhagen": "dk",
  "Europe/Helsinki": "fi",
  "Europe/Dublin": "ie",
  "Europe/Lisbon": "pt",
  "Europe/Athens": "gr",
  "Europe/Warsaw": "pl",
  "Europe/Prague": "cz",
  "Europe/Budapest": "hu",
  "Europe/Bucharest": "ro",
  "Europe/Istanbul": "tr",
  "Europe/Moscow": "ru",
  "Europe/Kiev": "ua",
  "Europe/Kyiv": "ua",

  // Americas
  "America/New_York": "us",
  "America/Los_Angeles": "us",
  "America/Chicago": "us",
  "America/Denver": "us",
  "America/Phoenix": "us",
  "America/Detroit": "us",
  "America/Anchorage": "us",
  "America/Honolulu": "us",
  "America/Toronto": "ca",
  "America/Vancouver": "ca",
  "America/Montreal": "ca",
  "America/Mexico_City": "mx",
  "America/Cancun": "mx",
  "America/Sao_Paulo": "br",
  "America/Rio_de_Janeiro": "br",
  "America/Buenos_Aires": "ar",
  "America/Santiago": "cl",
  "America/Bogota": "co",
  "America/Lima": "pe",
  "America/Caracas": "ve",
  "America/Havana": "cu",
  "America/Puerto_Rico": "pr",
  "America/Jamaica": "jm",

  // Africa
  "Africa/Maputo": "mz",
  "Africa/Mbabane": "sz",
  "Africa/Nairobi": "ke",
  "Africa/Cairo": "eg",
  "Africa/Johannesburg": "za",
  "Africa/Lagos": "ng",
  "Africa/Casablanca": "ma",
  "Africa/Accra": "gh",
  "Africa/Addis_Ababa": "et",
  "Africa/Algiers": "dz",
  "Africa/Tunis": "tn",
  "Africa/Harare": "zw",

  // Australia & Pacific
  "Australia/Sydney": "au",
  "Australia/Melbourne": "au",
  "Australia/Brisbane": "au",
  "Australia/Perth": "au",
  "Australia/Adelaide": "au",
  "Pacific/Auckland": "nz",
  "Pacific/Fiji": "fj",
  "Pacific/Honolulu": "us",
  "Pacific/Guam": "gu",
  "Pacific/Tahiti": "pf"
};

// Dynamically auto-populate from moment-timezone countries data for all remaining timezones
try {
  const countries = moment.tz.countries();
  countries.forEach((code) => {
    const zones = moment.tz.zonesForCountry(code);
    zones?.forEach((zone) => {
      if (!TIMEZONE_COUNTRY_MAP[zone]) {
        TIMEZONE_COUNTRY_MAP[zone] = code.toLowerCase();
      }
    });
  });
} catch (e) {
  console.warn("Could not auto-populate timezone country mapping", e);
}

export function getCountryCodeForTimezone(timezone: string): string | null {
  if (TIMEZONE_COUNTRY_MAP[timezone]) {
    return TIMEZONE_COUNTRY_MAP[timezone];
  }
  return null;
}

export function getFlagUrl(timezone: string): string | null {
  const code = getCountryCodeForTimezone(timezone);
  if (!code) return null;
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}

export function getFlagEmoji(timezone: string): string {
  const code = getCountryCodeForTimezone(timezone);
  if (!code) return "🌐";
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
