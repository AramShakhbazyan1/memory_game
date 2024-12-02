import React, { useEffect, useRef } from "react";
import "./styles.css";

interface ModalProps {
    result: string | null;
    restartGame: () => void;
}

const Modal: React.FC<ModalProps> = ({ result, restartGame }) => {
    const winAudioRef = useRef<HTMLAudioElement>(null);
    const loseAudioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (result === "win" && winAudioRef.current) {
            winAudioRef.current.play();
        } else if (result === "lose" && loseAudioRef.current) {
            loseAudioRef.current.play();
        }
    }, [result]);

    return (
        <div className="modal">
            <div className="modal-content">
                {result === "win" ? (
                    <>
                        <h2>🎉 You Win! 🎉</h2>
                        <audio ref={winAudioRef} src="src/assets/audios/win.mp3" />
                    </>
                ) : (
                    <>
                        <h2>😞 You Lose! 😞</h2>
                        <audio ref={loseAudioRef} src="src/assets/audios/lose.mp3" />
                    </>
                )}
                <button onClick={restartGame}>Play Again</button>
            </div>
        </div>
    );
}

export default Modal;
