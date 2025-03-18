export interface IData {
  flags: {
    png: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  region: string;
  population: number;
}
