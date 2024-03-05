import { FC, HTMLAttributes } from "react";
import "./index.css";
import cloud from "./assets/cloud.webp";

interface IModuleDayProps {
  day?: string;
  status?: string;
  high_temperature?: number;
  low_temperature?: number;
  showDetailWeather?: () => void;
  active?: boolean
}

const ModuleDay: FC<IModuleDayProps & HTMLAttributes<HTMLDivElement>> = ({
  day = "Sun",
  status = cloud,
  high_temperature = 26,
  low_temperature = 19,
  showDetailWeather = () => {},
  active = false
}) => {
  

  return (
    <div
      className={`module-day-container ${active ? "active" : ""}`}
      onClick={showDetailWeather}
    >
      <div className="module-day-date">{day}</div>
      <img className="module-day-status" src={status} alt="status" />
      <div className="module-day-temperature__container">
        <div className="module-day-high__temperature">{high_temperature}</div>
        <span>o</span>
      </div>
      <div className="module-day-temperature__container">
        <div className="module-day-low__temperature">{low_temperature}</div>
        <span>o</span>
      </div>
    </div>
  );
};

export default ModuleDay;
