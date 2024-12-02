import React from "react";
import "./styles.css";

interface CardProps {
    card: {
        image: string;
    };
    onClick: () => void;
    isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isFlipped }) => {
    return (
        <div
            className={`card ${isFlipped ? "flipped" : ""}`}
            onClick={onClick}
        >
            <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back">
                    <img src={card.image} alt="Card" />
                </div>
            </div>
        </div>
    );
}

export default Card;