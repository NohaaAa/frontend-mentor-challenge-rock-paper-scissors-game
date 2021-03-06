import "../styles/game-container.scss";
import GameHeader from "./game-header";
import GameStart from "./game-start";
import GameResults from "./game-results";
import { gameActions } from "../store/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import GameRulesModal from "./game-rules-modal";
const GameContainer = () => {
  const dispatch = useDispatch();
  const [showResults, setShowResults] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const gameScore = useSelector((state) => state.score);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const elementsChoicesList = [
    {
      name: "paper",
      gradiant: ["hsl(230, 89%, 62%)", "hsl(230, 89%, 65%)"],
    },
    {
      name: "scissors",
      gradiant: ["hsl(39, 89%, 49%) ", "hsl(40, 84%, 53%)"],
    },
    {
      name: "rock",
      gradiant: ["hsl(349, 71%, 52%)", "hsl(349, 70%, 56%)"],
    },
  ];
  const onGameStarting = () => {
    setShowResults(true);
    setDataIsLoading(true);
    setIsModalOpened(false);
    setTimeout(() => {
      dispatch(gameActions.pickRandomChoiceForHouse());
      setDataIsLoading(false);
    }, 1000);
  };
  return (
    <div
      className="game__container"
      onClick={() => {
        setIsModalOpened(false);
      }}
    >
      <div className="game__container_header-wrapper">
        <GameHeader score={gameScore} />
      </div>
      {!showResults && (
        <GameStart
          onElementSelected={onGameStarting}
          ChoicesList={elementsChoicesList}
        />
      )}
      {showResults && (
        <GameResults
          choicesList={elementsChoicesList}
          onPlayAgain={() => {
            setShowResults(false);
          }}
          choiceLoading={dataIsLoading}
        />
      )}
      <div className="game__container_game-rules">
        <button
          className="rules-btn"
          onClick={(event) => {
            event.stopPropagation();
            setIsModalOpened(true);
          }}
        >
          Rules
        </button>
      </div>
      <div
        className={`game__container_game-rules_modal ${
          isModalOpened ? "opened" : ""
        }`}
      >
        <GameRulesModal
          closeModal={() => {
            setIsModalOpened(false);
          }}
        />
      </div>
      <div className="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor.
        </a>
        Coded by{" "}
        <a href="https://github.com/NohaaAa" target="_blank">
          Noha M.
        </a>
        .
      </div>
    </div>
  );
};
export default GameContainer;
