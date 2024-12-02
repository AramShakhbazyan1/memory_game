import { useEffect, useReducer } from "react";
import Header from "./components/header/Header";
import GameBoard from "./components/GameBoard/GameBoard";
import Modal from "./components/Modal/Modal";
import "./App.css";

export const levels = {
  easy: { pairs: 6, time: 60 },
  medium: { pairs: 10, time: 120 },
  hard: { pairs: 15, time: 180 },
};

type Level = keyof typeof levels;

interface State {
  level: Level;
  timer: number;
  isGameActive: boolean;
  result: string | null;
  matchedPairs: number;
  reset: boolean;
}

type Action =
  | { type: "SET_LEVEL"; payload: Level }
  | { type: "START_GAME" }
  | { type: "MATCH_PAIR" }
  | { type: "UPDATE_TIMER" }
  | { type: "END_GAME"; payload: string }
  | { type: "RESTART_GAME" }
  | { type: "RESET_FLAG" }
  | { type: "DECREMENT_TIMER" };


const initialState: State = {
  level: "easy",
  timer: levels.easy.time,
  isGameActive: false,
  result: null,
  matchedPairs: 0,
  reset: false,
};

function gameReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LEVEL":
      return {
        ...state,
        level: action.payload,
        timer: levels[action.payload].time,
        isGameActive: false,
        result: null,
        matchedPairs: 0,
      };
    case "START_GAME":
      return { ...state, isGameActive: true };
    case "MATCH_PAIR":
      return {
        ...state,
        matchedPairs: state.matchedPairs + 1,
      };
    case "UPDATE_TIMER":
      return { ...state, timer: state.timer - 1 };
    case "END_GAME":
      return { ...state, isGameActive: false, result: action.payload };
    case "RESTART_GAME":
      return {
        ...state,
        timer: levels[state.level].time,
        isGameActive: false,
        result: null,
        matchedPairs: 0,
        reset: true,
      };
    case "RESET_FLAG":
      return {
        ...state,
        reset: false,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const restartGame = () => {
    dispatch({ type: "RESTART_GAME" });
  };

  useEffect(() => {
    if (state.isGameActive && state.timer > 0) {
      const timerInterval = setInterval(() => {
        dispatch({ type: "UPDATE_TIMER" });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [state.isGameActive, state.timer]);

  useEffect(() => {
    dispatch({ type: "SET_LEVEL", payload: state.level });
  }, [state.level]);

  return (
    <div className="App">
      <Header
        level={state.level}
        setLevel={(level) => dispatch({ type: "SET_LEVEL", payload: level })}
        timer={state.timer}
        restartGame={restartGame}
      />
      <GameBoard
        level={state.level}
        gameState={state}
        dispatch={dispatch}
      // reset={restartGame}
      />
      {state.result && (
        <Modal result={state.result} restartGame={restartGame} />
      )}
    </div>
  );
}

export default App;
