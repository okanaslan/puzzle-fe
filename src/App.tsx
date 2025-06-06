import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Game from "./pages/game";
import { LevelGenerator } from "./utils/level-generator";

function App() {
  const initialLevel = LevelGenerator.generate(5, 0);
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<Game level={initialLevel} />} />
      </Routes>
    </Router>
  );
}

export default App;
