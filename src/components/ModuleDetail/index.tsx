import { FC, HTMLAttributes } from "react";
import "./index.css";

interface IModuleDetailProps {
  place?: string;
  day?: string;
  overview?: string;
  temperature?: number;
  humidity?: string;
  wind?: string;
  icon?: string;
  isFahrenheit?: boolean;
  isCelsius?: boolean;
  convertTemperature?: () => void;
}

const ModuleDetail: FC<IModuleDetailProps & HTMLAttributes<HTMLDivElement>> = ({
  place = "Hanoi, VN",
  day = "Wednesday",
  overview = "",
  temperature = 26,
  humidity = "63%",
  wind = "13 KPH",
  icon = "",
  isFahrenheit = true,
  isCelsius = false,
  convertTemperature = () => {},
}) => {
  return (
    <div className="module-detail-container">
      <div className="module-detail-top">
        <div className="module-detail-place">{place}</div>
        <div className="module-detail-day">
          {day} - {overview}
        </div>
      </div>
      <div className="module-detail-bottom">
        <div className="module-detail-bottom__left">
          <img
            src={icon}
            alt="icon"
            className="module-detail-bottom__left-icon"
          />
          <div className="module-detail-bottom__container">
            <div className="module-detail-bottom__temperature">
              {temperature}
            </div>
            <div>o</div>
          </div>
          <div className="module-detail-bottom__temperature-unit">
            <div
              className={`${
                isFahrenheit
                  ? "temperature-unit-item active"
                  : "temperature-unit-item"
              }`}
              onClick={convertTemperature}
            >
              F
            </div>
            /
            <div
              className={`${
                isCelsius
                  ? "temperature-unit-item active"
                  : "temperature-unit-item"
              }`}
              onClick={convertTemperature}
            >
              C
            </div>
          </div>
        </div>
        <div className="module-detail-bottom__right">
          <div className="module-detail-bottom__item">Humidity: {humidity}</div>
          <div className="module-detail-bottom__item">Wind: {wind}</div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
