import React, { useState,useEffect} from "react";
import iconDropDown from "../assets/dropdown.png"
export default function DropDowns({ title, type, searchType, content, value, onClick, onChange, inputRef, onClickContent,isModif ,handleImageClick}) {  
    return (
        <>
                <div className={`dropdown-${type} dropdown`} >
                    {!isModif ? (
                        <button
                            className={`dropbtn-${type} click-${type} ${"hideDropDown-button"}`}
                            style={{ width: "170px" }}
                            onClick={() => onClick(value)}
                        >
                            <h2 className={`title click-${type}`} style={{ display: "block" }}>
                                {title}
                            </h2>

                            <img
                                className={`icon-bas-ing click-${type}`}
                                src={iconDropDown}
                                aria-label="icon pour ouvrir le menu déroulant"
                                alt="icon vers le bas"
                                onClick={handleImageClick}
                            />
                        </button>) : (
                        <>
                            <button
                                className={`dropbtn-${type} click-${type} ${"dropbtn-responsive"
                                    }`}
                                style={{ width: "667px" }}
                                onClick={() => onClick(value)}
                            >
                                <input
                                    className={`${type}-input click-${type}`}
                                    type="search"
                                    name=""
                                    id={`search-${searchType}`}
                                    ref={inputRef}
                                    placeholder={`Rechercher un ${type}`}
                                    style={{ display: "block" }}
                                    onChange={onChange}

                                />
                                <img
                                    className={`icon-bas-ing click-${type}`}
                                    src={iconDropDown}
                                    aria-label="icon pour ouvrir le menu déroulant"
                                    alt="icon vers le bas"
                                    onClick={handleImageClick}
                                />
                            </button>
                            <div className={`dropdown-content-${content}`} onClick={handleImageClick} style={{
                                display: "grid",
                                width: "667px",
                                marginTop:"-5px"
                            }}>
                                {value}
                            </div>
                        </>
                    )
                    }
                </div>
        </>
    );
}
