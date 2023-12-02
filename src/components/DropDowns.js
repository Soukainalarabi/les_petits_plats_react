import React, { useState } from "react";
import iconDropDown from "../assets/dropdown.png"
export default function DropDowns({ title, type, searchType, content, value, onClick }) {
    const [isModif, setIsModif] = useState(false);
    const handleImageClick = () => {
        setIsModif(!isModif); // Inverse la valeur de isModif lorsque l'image est cliquée
        
      };
      
    return (
        <>
      <div className={`dropdown-${type} dropdown`}>
    <button
      className={`dropbtn-${type} click-${type} ${
        isModif ? "dropbtn-responsive" : "hideDropDown-button"
      }`}
      style={{ width: isModif ? "667px" : "170px" }}
      onClick={() => onClick(value)}
    >
      <h2 className={`title click-${type}`} style={{ display: isModif ? "none" : "block" }}>
        {title}
      </h2>
      <input
        className={`${type}-input click-${type}`}
        type="search"
        name=""
        id={`search-${searchType}`}
        placeholder={`Rechercher un ${searchType}`}
        style={{ display: isModif ? "block" : "none" }}
      />
      <img
        className={`icon-bas-ing click-${type}`}
        src={iconDropDown}
        aria-label="icon pour ouvrir le menu déroulant"
        alt="icon vers le bas"
        onClick={handleImageClick}
      />
    </button>
    <div className={`dropdown-content-${content}`} style={{
    display: isModif ? "grid" : "none",
    width: isModif ? "667px" : "170px"
  }}>
          
    {value}
        </div>
  </div>
      </>
    );
}