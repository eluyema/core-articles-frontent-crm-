import "../../../assets/flags/css/flags.css";

const languageToCountryCodeDict: Record<string, string> = {
    en: "gb",       // English → Great Britain (could also use "us")
    ua: "ua",       // Ukrainian → Ukraine
    ru: "ru",       // Russian → Russia
    fr: "fr",       // French → France
    de: "de",       // German → Germany
    es: "es",       // Spanish → Spain
    pt: "pt",       // Portuguese → Portugal
    it: "it",       // Italian → Italy
    pl: "pl",       // Polish → Poland
    nl: "nl",       // Dutch → Netherlands
    tr: "tr",       // Turkish → Turkey
    el: "gr",       // Greek → Greece
    cs: "cz",       // Czech → Czech Republic
    sv: "se",       // Swedish → Sweden
    fi: "fi",       // Finnish → Finland
    da: "dk",       // Danish → Denmark
    no: "no",       // Norwegian → Norway
    ro: "ro",       // Romanian → Romania
    hu: "hu",       // Hungarian → Hungary
    bg: "bg",       // Bulgarian → Bulgaria
    sr: "rs",       // Serbian → Serbia
    zh: "cn",       // Chinese → China
    ja: "jp",       // Japanese → Japan
    ko: "kr",       // Korean → South Korea
    hi: "in",       // Hindi → India
    ar: "sa",       // Arabic → Saudi Arabia (generic Arabic)
};


const CountryFlag = ({language}: {language: string}) => <span className={`flag flag-${languageToCountryCodeDict[language] ?? "doesnt-exist"}`}></span>

export default CountryFlag;