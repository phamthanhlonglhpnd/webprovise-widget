import { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";
import "./index.css";
import ModuleDetail from "../../components/ModuleDetail";
import ModuleDay from "../../components/ModuleDay";
import { ApiMethod } from "../../apis/api";
import {
  convertDateAndHourFormat,
  convertDateFormat,
  kToCelsius,
  kToFahrenheit,
  kphToMph,
  mphToKph,
} from "../../utils/globalFunction";
import { GET_ICON_WEATHER_URL } from "../../constants/api";
import NotFound from "../../components/NotFound";
const appId = import.meta.env.VITE_API_KEY || "";

const WeatherModule = () => {
  const [place, setPlace] = useState<string>("");

  // Example Data
  // const obj = {
  //   coord: {
  //     lon: 105.8466,
  //     lat: 21.0307,
  //   },
  //   weather: [
  //     {
  //       id: 800,
  //       main: "Clear",
  //       description: "clear sky",
  //       icon: "01d",
  //     },
  //   ],
  //   base: "stations",
  //   main: {
  //     temp: 300.12,
  //     feels_like: 299.55,
  //     temp_min: 300.12,
  //     temp_max: 300.12,
  //     pressure: 1002,
  //     humidity: 30,
  //     sea_level: 1002,
  //     grnd_level: 1000,
  //   },
  //   visibility: 10000,
  //   wind: {
  //     speed: 2.39,
  //     deg: 352,
  //     gust: 3.22,
  //   },
  //   clouds: {
  //     all: 5,
  //   },
  //   dt: 1709619498,
  //   sys: {
  //     type: 1,
  //     id: 9308,
  //     country: "VN",
  //     sunrise: 1709594036,
  //     sunset: 1709636555,
  //   },
  //   timezone: 25200,
  //   id: 1561096,
  //   name: "Xom Pho",
  //   cod: 200,
  // };

  const [currentDayWeather, setCurrentDayWeather] = useState<any>({});
  const [currentDayDetail, setCurrentDayDetail] = useState<any>({});
  const [nextSevenDayForecast, setNextSevenDayForecast] = useState([]);
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(true);
  const [isCelsius, setIsCelsius] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCurrent, setActiveCurrent] = useState<boolean>(false);

  const fetchDataWeather = async () => {
    const data = await ApiMethod.getGeoCodingOfCityByName(place, appId);
    if (data?.lat) {
      setIsLoading(false);
      const { lat, lon } = data;
      setCurrentDayDetail(data);
      const currentDayWeather = await ApiMethod.getCurrentDayWearther(
        lat,
        lon,
        appId
      );
      setCurrentDayWeather(currentDayWeather);
      const nextSevenDayForecast = await ApiMethod.getNextSevenDayForecast(
        lat,
        lon,
        appId
      );
      const newData = nextSevenDayForecast.map((item: any, index: number) => ({
        ...item,
        id: index,
      }));
      setNextSevenDayForecast(newData);
    }
  };

  const handleConvertTemperature = () => {
    if (isFahrenheit) {
      setIsFahrenheit(false);
      setIsCelsius(true);
    } else {
      setIsFahrenheit(true);
      setIsCelsius(false);
    }
  };

  const showDetailDayWeather = (item: any) => {
    const newItem = {
      ...item,
      main: {
        humidity: item?.humidity,
        temp: item?.temp?.day,
      },
      wind: {
        speed: item?.wind_speed,
      },
    };
    setCurrentDayWeather(newItem);
    const activeElement = nextSevenDayForecast.find(
      (data: any) => data.id === item.id
    );
    activeElement && setActiveCurrent(true);
  };

  return (
    <div className="weather-module-container">
      <SearchBox place={place} setPlace={setPlace} search={fetchDataWeather} />
      <div className="weather-module-detail">
        {!isLoading ? (
          <>
            <ModuleDetail
              place={`${currentDayDetail?.name}, ${currentDayDetail?.country}`}
              day={convertDateAndHourFormat(currentDayWeather?.dt)}
              overview={currentDayWeather?.weather?.[0]?.description}
              temperature={
                isFahrenheit
                  ? kToFahrenheit(currentDayWeather?.main?.temp)
                  : kToCelsius(currentDayWeather?.main?.temp)
              }
              humidity={`${currentDayWeather?.main?.humidity}%`}
              wind={
                isFahrenheit
                  ? `${kphToMph(currentDayWeather?.wind?.speed)} MPH`
                  : `${mphToKph(currentDayWeather?.wind?.speed)} KPH`
              }
              icon={`${GET_ICON_WEATHER_URL}/${currentDayWeather?.weather?.[0]?.icon}@2x.png`}
              convertTemperature={handleConvertTemperature}
              isFahrenheit={isFahrenheit}
              isCelsius={isCelsius}
            />
            <div className="weather-module-week">
              {nextSevenDayForecast?.length > 0 &&
                nextSevenDayForecast.map((item: any, index: any) => (
                  <div key={index}>
                    <ModuleDay
                      day={convertDateFormat(item.dt)}
                      high_temperature={
                        isFahrenheit
                          ? kToFahrenheit(item?.temp?.day)
                          : kToCelsius(item?.temp?.day)
                      }
                      low_temperature={
                        isFahrenheit
                          ? kToFahrenheit(item?.temp?.max)
                          : kToCelsius(item?.temp?.min)
                      }
                      status={`${GET_ICON_WEATHER_URL}/${item?.weather?.[0]?.icon}@2x.png`}
                      active={activeCurrent}
                      showDetailWeather={() => showDetailDayWeather(item)}
                    />
                  </div>
                ))}
            </div>
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default WeatherModule;
