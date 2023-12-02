import React from "react"
import clock from "../assets/clock.png"
export default function Card({ id, name, time, picture, ingredients, description }) {
    return (
        <>
            <div className="card" id={`recipe-${id}`}>
                <div className="card-img">
                    <img src={picture} alt="" />
                </div>
                <div className="card-body">
                    <div className="recipe-name">
                        <h1 className="card-text">{name}</h1>
                        <div className="time">
                            <img src={clock} alt="icon watch" />
                            <p className="time-number">{time} min</p>
                        </div>
                    </div>
                    <div className="details-recipes">
                        <ul className="ingredients">
                            {ingredients.map((ingredient, index) =>
                                <li key={index}><strong>{ingredient.ingredient}</strong> :{ingredient.quantity} {ingredient.unit}</li>

                            )}
                        </ul>
                        <p className="description">{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}