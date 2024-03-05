// Function to convert Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

// Function to convert Fahrenheit to Celsius
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

// Convert Kelvin to Fahrenheit
export const kToCelsius = (k: number): number => {
  return Math.ceil(k - 273.15);
};

// Convert Kelvin to Fahrenheit
export const kToFahrenheit = (k: number): number => {
  return Math.ceil(((k - 273.15) * 9) / 5 + 32);
};

export const convertDateAndHourFormat = (unixTimestamp: number): string => {
  // Convert Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Get day of the week (0-6) and map it to a day name
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];

  // Get hour in 12-hour format (1-12) and AM/PM
  const hour = date.getHours() % 12 || 12; // Convert 0 to 12
  const amPm = date.getHours() < 12 ? "AM" : "PM";

  // Format the date string
  const formattedDate = `${dayName} ${hour}${amPm}`;

  return formattedDate;
};

export const convertDateFormat = (unixTimestamp: number): string => {
  // Convert Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Get the day of the week (0-6) and use it to get the abbreviated day name
  const dayAbbreviation = date.toLocaleString('en-US', { weekday: 'short' });

  return dayAbbreviation;
}

// Convert KPH to MPH
export const kphToMph = (kph: number): string => {
  return (kph / 1.609344).toFixed(2);
};

// Convert MPH to KPH
export const mphToKph = (mph: number): string => {
  return (mph * 1.609344).toFixed(2);
};
