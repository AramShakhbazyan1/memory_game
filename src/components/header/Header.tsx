import React from "react";
import "./styles.css";

interface HeaderProps {
    level: "easy" | "medium" | "hard";
    setLevel: (level: "easy" | "medium" | "hard") => void;
    timer: number;
    restartGame: () => void;
}

const Header: React.FC<HeaderProps> = ({ level, setLevel, timer, restartGame }) => {
    return (
        <div className="header">
            <h1>Memory Matching Game</h1>
            <div className="level-select">
                <label>Difficulty:</label>
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as "easy" | "medium" | "hard")}
                    disabled={timer < 60}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="timer">Time: {timer}s</div>
            <button className="restart-btn" onClick={restartGame}>
                Restart
            </button>
        </div>
    );
}

export default Header;
