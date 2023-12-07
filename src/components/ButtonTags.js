import React, { useState, useEffect } from "react";
import close from "../assets/close.png";

export default function ButtonTags({ buttontagAffiche, valueIngredientTags, resetTag,type }) {
    const [localValueIngredientTags, setLocalValueIngredientTags] = useState([]);

    useEffect(() => {
        // Mettre à jour l'état local lorsque buttontagAffiche change
        if (buttontagAffiche) {
            setLocalValueIngredientTags(valueIngredientTags);
        }
    }, [buttontagAffiche, valueIngredientTags]);

    const handleClickSpan = (valueTag) => {
        console.log("Valeur du span cliqué :", valueTag);
        const updatedTags = resetTag(valueTag);
        setLocalValueIngredientTags(updatedTags);
    };

    return (
        <>
            {buttontagAffiche && (
                    <div className="groups-tag">
                        {localValueIngredientTags && localValueIngredientTags.map((valueIngredientTag, index) => (
                            <div className={`${type}-groupe-tag`} key={index} style={{ display: "flex" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span onClick={() => handleClickSpan(valueIngredientTag)}>{valueIngredientTag}</span>
                                    <img
                                        className="closeTagIngredient"
                                        src={close}
                                        alt="icon pour fermer le tag"
                                        onClick={() => handleClickSpan(valueIngredientTag)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
            )}
        </>
    );
}