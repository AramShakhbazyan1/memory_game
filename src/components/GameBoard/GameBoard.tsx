import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { generateCards } from "../../utils/generateCards";
import { levels } from "../../App";
import "./styles.css";

export interface CardType {
    id: number;
    image: string;
    flipped: boolean;
    matched: boolean;
}

interface GameState {
    level: keyof typeof levels;
    timer: number;
    isGameActive: boolean;
    result: string | null;
    matchedPairs: number;
    reset: boolean;
}

interface GameBoardProps {
    level: keyof typeof levels;
    gameState: GameState;
    dispatch: Function;
}

const GameBoard: React.FC<GameBoardProps> = ({ level, gameState, dispatch }) => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<CardType[]>([]);

    useEffect(() => {
        setCards(generateCards(level));
    }, [level]);

    useEffect(() => {
        if (gameState.reset) {
            setFlippedCards([]);
            setCards(generateCards(level));
            dispatch({ type: "RESET_FLAG" });
        }
    }, [gameState.reset, level, dispatch]);

    useEffect(() => {
        if (gameState.isGameActive && gameState.timer > 0) {
            const timer = setInterval(() => {
                dispatch({ type: "DECREMENT_TIMER" });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState.isGameActive, gameState.timer, dispatch]);

    useEffect(() => {
        if (gameState.isGameActive) {
            if (gameState.matchedPairs === Math.floor(cards.length / 2)) {
                dispatch({ type: "END_GAME", payload: "win" });
            } else if (gameState.timer <= 0) {
                dispatch({ type: "END_GAME", payload: "lose" });
            }
        }
    }, [gameState.matchedPairs, gameState.timer, gameState.isGameActive, cards.length, dispatch]);

    const handleCardClick = (card: CardType) => {
        if (!gameState.isGameActive) {
            dispatch({ type: "START_GAME" });
        }

        if (card.flipped || card.matched || flippedCards.length === 2) return;

        const updatedCards = cards.map((c) =>
            c.id === card.id ? { ...c, flipped: true } : c
        );
        setCards(updatedCards);

        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstCard, secondCard] = newFlippedCards;
            if (firstCard.image === secondCard.image) {

                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((c) =>
                            c.id === firstCard.id || c.id === secondCard.id
                                ? { ...c, matched: true }
                                : c
                        )
                    );
                    setFlippedCards([]);
                    dispatch({ type: "MATCH_PAIR" });
                }, 1000);
            } else {
                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((c) =>
                            c.id === firstCard.id || c.id === secondCard.id
                                ? { ...c, flipped: false }
                                : c
                        )
                    );
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className={`game-board grid-${level}`}>
            {cards.map((card) => (
                <Card
                // Using an index for key is not a good idea, but my Cards will not be added or removed here
                // otherwise I would use a UUID
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card)}
                    isFlipped={card.flipped || card.matched}
                />
            ))}
        </div>
    );
};

export default GameBoard;
