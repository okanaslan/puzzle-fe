import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import GameWrapper from "./pages/game-wrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<GameWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
