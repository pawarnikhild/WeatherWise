// This file contains types required for HomeScreen.tsx and HomeScreenView.tsx

// Structure of the weather state for storing API data after calling it -
export type weatherType = {
  current: {
    condition: {
      text: string;
      icon: string;
    };
    temp_c: string;
    wind_kph: number;
    humidity: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
      astro: {
        sunrise: string;
      };
    }[];
  };
};
