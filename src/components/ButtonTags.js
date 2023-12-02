import React from "react";
import close from "../assets/close.png"
export default function ButtonTags(){
    return(
        <>
         <div className="buttonTag">
            <div className="groups-tag">
            <div className="ingredient-groupe-tag" style={{display: "flex"}}>
                <h1 className="ingredient-tag">Lait de coco</h1>
            <img className="closeTagIngredient" src={close} alt="icon pour fermer le tag"/>
            </div>
            </div>
        </div>
        </>
    )
}
