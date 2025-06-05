import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Game from "./pages/game";
import { initialLevel } from "./levels/levels";
import GameWrapper from "./pages/game-level-wrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<Game level={initialLevel} />} />
        <Route path="/game/easy/:level" element={<GameWrapper difficulty="easy" />} />
        <Route path="/game/medium/:level" element={<GameWrapper difficulty="medium" />} />
        <Route path="/game/hard/:level" element={<GameWrapper difficulty="hard" />} />
      </Routes>
    </Router>
  );
}

export default App;
