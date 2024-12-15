export interface CountryResponse {
    name: {
        common: string;
        official: string;
    };
    cca2: string;
    cca3: string;
    ccn3: string;
    altSpellings: string[];
    independent: boolean;
    status: string;
    unMember: boolean;
    idd: {
        root: string;
        suffixes: string[];
    };
    capital: string;
    region: string;
    area: number;
    population: number;
    timezones: string[];
    continents: string[];
    flags: {
        png: string;
    };
    
}