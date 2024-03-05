import { FC, HTMLAttributes, useRef, useState } from "react";
import clearIcon from "./assets/clear.webp";
import searchIcon from "./assets/search.webp";
import "./index.css";

interface ISearchBoxProps {
  place: string;
  setPlace: (place: string) => void;
  search: () => void;
}

const SearchBox: FC<ISearchBoxProps & HTMLAttributes<HTMLDivElement>> = ({
  place,
  setPlace,
  search,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showClearIcon, setShowClearIcon] = useState<boolean>(false);
  const [showSearchIcon, setSearchIcon] = useState<boolean>(false);

  const onChangePlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlace = e.target.value;
    if (newPlace !== "") {
      setShowClearIcon(true);
      setSearchIcon(true);
    }
    setPlace(newPlace);
  };

  const clearInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.value = "";
    }
    setPlace("");
    setShowClearIcon(false);
  };

  return (
    <div className="search-container">
      <input
        defaultValue={place}
        ref={inputRef}
        onChange={onChangePlace}
        className="search-input"
        placeholder="Location/city"
      />
      {showSearchIcon && (
        <img
          src={searchIcon}
          alt="search"
          className="search-icon"
          onClick={search}
        />
      )}
      {showClearIcon && (
        <img
          src={clearIcon}
          alt="clear"
          className="clear-icon"
          onClick={clearInput}
        />
      )}
    </div>
  );
};

export default SearchBox;
